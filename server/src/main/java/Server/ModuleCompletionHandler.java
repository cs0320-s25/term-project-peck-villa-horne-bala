package Server;

import Storage.StorageInterface;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class ModuleCompletionHandler implements Route {

  private StorageInterface firebaseStorage;

  public ModuleCompletionHandler(StorageInterface storage) {
    this.firebaseStorage = storage;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      JsonObject reqBody = JsonParser.parseString(request.body()).getAsJsonObject();
      JsonArray modulesList = reqBody.get("modulesList").getAsJsonArray();
      HashMap<String, HashMap<String, ArrayList<String>>> modulesToLevels = new HashMap<>();
      for (int i = 0; i < modulesList.size(); i++) {
        JsonObject module = modulesList.get(i).getAsJsonObject();
        String moduleName = module.get("name").getAsString();
        JsonArray levels = module.get("levels").getAsJsonArray();

        // Initialize level-to-properties map per module
        HashMap<String, ArrayList<String>> levelNameToProperties = new HashMap<>();

        for (JsonElement level : levels) {
          String levelName = level.getAsJsonObject().get("levelName").getAsString();
          String lockedStatus = level.getAsJsonObject().get("locked").getAsString();
          String completionStatus = level.getAsJsonObject().get("completionStatus").getAsString();

          if (!levelNameToProperties.containsKey(levelName)) {
            ArrayList<String> moduleProperties = new ArrayList<>();
            moduleProperties.add(lockedStatus);
            moduleProperties.add(completionStatus);
            levelNameToProperties.put(levelName, moduleProperties);
          }
        }

        if (!modulesToLevels.containsKey(moduleName)) {
          modulesToLevels.put(moduleName, levelNameToProperties);
        }
      }

      Map<String, Object> data = new HashMap<>();
      Gson gson = new Gson();
      String modulesJson = gson.toJson(modulesToLevels);
      data.put("modules", modulesJson);

      this.firebaseStorage.addDocument(uid, "modules", "progress", data);

      responseMap.put("status", "success");
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("status", "error");
      responseMap.put("message", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
