package Server;

import Storage.StorageInterface;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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

      HashMap<String,String> moduleNameToLevels = new HashMap<>();

      // Parse the request body as JSON
      JsonObject reqBody = JsonParser.parseString(request.body()).getAsJsonObject();
      JsonArray modulesList = reqBody.get("modulesList").getAsJsonArray();
//      System.out.println("Modules List: " + modulesList.toString());

      // Extract module names or other relevant data
      HashMap<String,HashMap<String,ArrayList<String>>> modulesToLevels = new HashMap<>();
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

          // Prevent duplicate levels by checking before adding
          if (!levelNameToProperties.containsKey(levelName)) {
            ArrayList<String> moduleProperties = new ArrayList<>();
            moduleProperties.add(lockedStatus);
            moduleProperties.add(completionStatus);
            levelNameToProperties.put(levelName, moduleProperties);
          }
        }

        // Safely add module only if it's not already present
        if (!modulesToLevels.containsKey(moduleName)) {
          modulesToLevels.put(moduleName, levelNameToProperties);
        }
      }


      // Prepare data to store in Firebase
      Map<String, Object> data = new HashMap<>();
      data.put("modules", modulesToLevels);

      // Store the data in Firebase under the user's progress
//      System.out.println("user" + uid);
//      System.out.println(data);
      this.firebaseStorage.addDocument("user_2wk6x5tz1UQSZhlllyVMR5Sf2Fa", "modules", "progress", data);

      // Prepare the response
//      responseMap.put("modules", modules);
      responseMap.put("status", "success");
    } catch (Exception e) {
      // Handle errors and log the exception
      e.printStackTrace();
      responseMap.put("status", "error");
      responseMap.put("message", e.getMessage());
    }

    // Convert the response map to JSON and return it
    return Utils.toMoshiJson(responseMap);
  }
}