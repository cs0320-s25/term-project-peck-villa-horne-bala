package Server;

import Query.QuestionsDirectory;
import com.google.gson.*;
import java.util.Scanner;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.StringEntity;
import spark.Request;
import spark.Response;
import spark.Route;

public class RunCodeHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    response.type("application/json");
    QuestionsDirectory questionsDirectory = new QuestionsDirectory();
    String questionId = request.queryParams("questionId");
    questionsDirectory.setAnswerAndContains(questionId);

    JsonObject reqBody = JsonParser.parseString(request.body()).getAsJsonObject();
    String userCode = reqBody.get("code").getAsString();

    // Check for required structure
    boolean hasPrint = userCode.contains(questionsDirectory.getCodeContains());

    // Build Piston API payload
    JsonObject payload = new JsonObject();
    payload.addProperty("language", "java");
    payload.addProperty("version", "15.0.2");

    JsonArray files = new JsonArray();
    JsonObject file = new JsonObject();
    file.addProperty("name", "Main.java");
    file.addProperty("content", userCode);
    files.add(file);
    payload.add("files", files);

    // Execute code using Piston
    String output = runWithPiston(payload.toString());

    questionsDirectory.setAnswerAndContains(questionId);
    String expectedOutput = questionsDirectory.getCodeAnswer();
    boolean outputCorrect = output.trim().equals(expectedOutput);

    JsonObject result = new JsonObject();
    if (outputCorrect && hasPrint) {
      result.addProperty("passed", hasPrint);
      result.addProperty("output", output);
    } else {
      result.addProperty("passed", false);
    }

    return result.toString();
  }

  private String runWithPiston(String jsonPayload) throws Exception {
    try (CloseableHttpClient client = HttpClients.createDefault()) {
      // sends http post request to the piston API via a client
      HttpPost request = new HttpPost("https://emkc.org/api/v2/piston/execute");

      // tells server it is being sent a JSON
      request.setHeader("Content-Type", "application/json");
      request.setEntity(new StringEntity(jsonPayload));

      // executes post request
      return client.execute(
          request,
          response -> {
            String responseBody =
                new Scanner(response.getEntity().getContent()).useDelimiter("\\A").next();

            // extracts the run object

            JsonObject pistonResponse = JsonParser.parseString(responseBody).getAsJsonObject();
            JsonObject runObject = pistonResponse.getAsJsonObject("run");
            return runObject.get("output").getAsString();
          });
    }
  }
}
