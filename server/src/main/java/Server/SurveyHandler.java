package Server;

import Storage.StorageInterface;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class SurveyHandler implements Route {

  StorageInterface storage;

  public SurveyHandler(StorageInterface storageInterface) {
    this.storage = storageInterface;
    System.out.println("Survey handler created");
  }

  /**
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");

      Boolean isUserSurvey = this.storage.isUserCollection(uid);

      System.out.println("boolean result survey: " + isUserSurvey);
      responseMap.put("response_type", "success");
      responseMap.put("takenSurvey", isUserSurvey);
    } catch (Exception e) {
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
