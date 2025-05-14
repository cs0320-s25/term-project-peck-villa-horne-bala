package Server.Survey;

import DecisionTree.DecisionTree;
import Parser.Parser;
import Storage.StorageInterface;
import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class SurveyResultsHandler implements Route {

  private StorageInterface storage;

  public SurveyResultsHandler(StorageInterface storage) {
    this.storage = storage;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    String uid = request.queryParams("uid");
    String surveyResponse = request.queryParams("response");
    Parser parser = new Parser(new StringReader(surveyResponse));
    List<String> parsedResponse = parser.parse().get(0);
    DecisionTree decisionTree = new DecisionTree("survey_data/survey-training-dataset.csv");
    String placement = decisionTree.getDecision(parsedResponse);


    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("response_type", "success");
    return responseMap;
  }
}
