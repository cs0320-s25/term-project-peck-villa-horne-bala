package Server;

import static spark.Spark.*;

import Server.Modules.AddModules;
import Server.Modules.FetchModules;
import Server.Survey.SurveyHandler;
import Server.Survey.SurveyResultsHandler;
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
          response.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
          response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
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
    //    before(
    //        (request, response) -> {
    //          response.header("Access-Control-Allow-Origin", "*");
    //          response.header("Access-Control-Allow-Methods", "*");
    //        });

    StorageInterface firebaseUtils;
    try {
      firebaseUtils = new FirebaseUtilities();
      // Set up handlers
      Spark.get("SurveyResults", new SurveyResultsHandler());
      Spark.post("Survey", new SurveyHandler(firebaseUtils));
      Spark.get("FetchModules", new FetchModules(firebaseUtils));
      Spark.get("LoadModules", new AddModules(firebaseUtils));
      Spark.post("run", new RunCodeHandler());
      Spark.post("storeModules", new ModuleCompletionHandler(firebaseUtils));
      Spark.get("restoreProgress", new RestoreProgressHandler(firebaseUtils));
      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json not being found. Exiting.");
      System.exit(1);
    }
  }
}
