package Server.Modules;

import Server.Utils;
import Storage.StorageInterface;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import spark.Request;
import spark.Response;
import spark.Route;

public class AddModules implements Route {
  StorageInterface firebaseStorage;

  public AddModules(StorageInterface storage) {
    this.firebaseStorage = storage;
  }

  private List<Object> populateModuleAccess(String uid)
      throws ExecutionException, InterruptedException {
    List<Object> moduleAccess = new ArrayList<>();
    Map<String, Object> responseMap = new HashMap<>();
    List<String> levels =
        Arrays.asList(
            "MOneLvlOne",
            "MOneLvlTwo",
            "MOneLvlThree",
            "MOneLvlFour",
            "MTwoLvlOne",
            "MTwoLvlTwo",
            "MTwoLvlThree",
            "MThreeLvlOne",
            "MThreeLvlTwo",
            "MThreeLvlThree",
            "MFourLvlOne",
            "MFourLvlTwo",
            "MFourLvlThree");

    for (int i = 0; i < levels.size(); i++) {
      Map<String, Object> level = new HashMap<>();
      Map<String, Object> lvlInfo = new HashMap<>();
      // this part should be dictated by the decision tree
      if (i < 2) {
        lvlInfo.put("access", true);
      } else {
        lvlInfo.put("access", false);
      }
      if ((boolean) lvlInfo.get("access")) {
        lvlInfo.put("completed", true);
      } else {
        lvlInfo.put("completed", false);
      }
      level.put(levels.get(i), lvlInfo);

      try {
        this.firebaseStorage.addCollection(uid, "modulesProgress", levels.get(i), level);
        moduleAccess.add(level);
      } catch (Exception e) {
        System.out.println("error in firebase helper: " + e.getMessage());
      }
    }
    return moduleAccess;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      if (uid == null) {
        throw new IllegalArgumentException("Invalid user id");
      }
      responseMap.put("moduleInfo", populateModuleAccess(uid));
    } catch (Exception e) {
      System.out.println("Error in home screen module populator: " + e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
