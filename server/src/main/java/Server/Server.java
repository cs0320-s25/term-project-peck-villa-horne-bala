package Server;

import static spark.Spark.*;

import Storage.FirebaseUtilities;
import Storage.StorageInterface;
import java.io.IOException;
import spark.Spark;

public class Server {

  public static void main(String[] args) {
    int port = 3232;
    Spark.port(port);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });
    options(
        "/*",
        (request, response) -> {
          String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
          if (accessControlRequestHeaders != null) {
            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
          }

          String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
          if (accessControlRequestMethod != null) {
            response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
          }
          return "OK";
        });

    StorageInterface firebaseUtils;
    try {
      firebaseUtils = new FirebaseUtilities();
      // Set up handlers
      Spark.get("SurveyResults", new SurveyResultsHandler());
      Spark.get("Survey", new SurveyHandler(firebaseUtils));

      Spark.post("run", new RunCodeHandler());
      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json.json not being found. Exiting.");
      System.exit(1);
    }
  }
}
