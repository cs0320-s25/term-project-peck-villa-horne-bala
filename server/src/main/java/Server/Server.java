package Server;

import static spark.Spark.*;

import spark.Spark;

public class Server {
  public static void main(String[] args) {
    int port = 3234;
    Spark.port(port);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    // Set up handlers
    Spark.get("SurveyResults", new SurveyResultsHandler());
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }
}
