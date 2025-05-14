package Server.Survey;

import Server.Utils;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class SurveyResultsHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      JsonObject reqBody = JsonParser.parseString(request.body()).getAsJsonObject();
      JsonArray modulesList = reqBody.get("surveyAnswerKey").getAsJsonArray();
      JsonArray responses = reqBody.get("responses").getAsJsonArray();
      System.out.println("modulesList: " + modulesList);
      System.out.println("responses: " + responses);

      responseMap.put("response_type", "success");
      return responseMap;

    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "error");
    }
    return Utils.toMoshiJson(responseMap);
  }
}
