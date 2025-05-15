package Server.Survey;

import DecisionTree.DecisionTree;
import Parser.Parser;
import Server.Utils;
import Storage.StorageInterface;
import com.google.gson.Gson;
import java.io.StringReader;
import java.util.ArrayList;
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
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      String surveyResponse = request.queryParams("response");
      Parser parser = new Parser(new StringReader(surveyResponse));
      List<String> parsedResponse = parser.parse().get(0);
      DecisionTree decisionTree = new DecisionTree("survey_data/survey-training-dataset.csv");
      String placement = decisionTree.getDecision(parsedResponse);
      Double placementValue = Double.parseDouble(placement);
      HashMap<String, HashMap<String, ArrayList<String>>> modulesToLevels = new HashMap<>();

      Parser moduleParser = new Parser("module_data/module-data.csv");
      List<List<String>> parsedModules = moduleParser.parse();

      for (int i = 0; i < parsedModules.size(); i++) {
        List<String> module = parsedModules.get(i);

        String moduleName = module.get(0);

        HashMap<String, ArrayList<String>> levelNameToProperties = new HashMap<>();
        for (int j = 0; j < parsedModules.get(i).size() - 1; j++) {
          String levelName = module.get(j + 1);
          String lockedStatus = "Locked";
          String completionStatus = "Incomplete";
          if (i < (Math.floor(placementValue) - 1)
              || (i < (Math.floor(placementValue) - 1) && j < (int) (placementValue * 10) % 10)) {
            lockedStatus = "Unlocked";
            completionStatus = "Complete";
          }
          ArrayList<String> levelProperties = new ArrayList<>();
          levelProperties.add(lockedStatus);
          levelProperties.add(completionStatus);
          levelNameToProperties.put(levelName, levelProperties);
        }
        modulesToLevels.put(moduleName, levelNameToProperties);
      }

      Map<String, Object> data = new HashMap<>();
      Gson gson = new Gson();
      String modulesJson = gson.toJson(modulesToLevels.values());
      data.put("modules", modulesJson);

      this.storage.addDocument(uid, "modules", "progress", data);

      responseMap.put("status", "success");
      responseMap.put("placement", placement);
      responseMap.put("modulesList", modulesJson);
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("status", "error");
      responseMap.put("message", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
