package Server;

import com.google.gson.*;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.StringEntity;

import java.util.Scanner;
import spark.Request;
import spark.Response;
import spark.Route;

public class RunCodeHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    response.type("application/json");

    JsonObject reqBody = JsonParser.parseString(request.body()).getAsJsonObject();
    String userCode = reqBody.get("code").getAsString();

    // Check for required structure
    boolean hasPrint = userCode.contains("System.out.println");

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

    String expectedOutput = "Hello, World!";
    boolean outputCorrect = output.trim().equals(expectedOutput);


    JsonObject result = new JsonObject();
    result.addProperty("passed", hasPrint && outputCorrect);
    result.addProperty("output", output);

    return result.toString();
  }

  private String runWithPiston(String jsonPayload) throws Exception {
    try (CloseableHttpClient client = HttpClients.createDefault()) {
      HttpPost request = new HttpPost("https://emkc.org/api/v2/piston/execute");
      request.setHeader("Content-Type", "application/json");
      request.setEntity(new StringEntity(jsonPayload));
      return client.execute(request, response ->
          new Scanner(response.getEntity().getContent()).useDelimiter("\\A").next()
      );
    }
  }
}