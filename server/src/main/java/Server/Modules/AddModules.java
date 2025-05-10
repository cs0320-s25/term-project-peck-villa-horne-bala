package Server.Modules;

import Server.Utils;
import Storage.StorageInterface;
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

  private Map<String, Object> populateModuleAccess(String uid)
      throws ExecutionException, InterruptedException {
    Map<String, Object> responseMap = new HashMap<>();
    List<String> levels =
        Arrays.asList(
            "/MOneLvlOne",
            "/MOneLvlTwo",
            "/MOneLvlThree",
            "/MOneLvlFour",
            "/MTwoLvlOne",
            "/MTwoLvlTwo",
            "/MTwoLvlThree",
            "/MThreeLvlOne",
            "/MThreeLvlTwo",
            "/MThreeLvlThree",
            "/MFourLvlOne",
            "/MFourLvlTwo",
            "/MFourLvlThree");

    for (int i = 0; i < levels.size(); i++) {
      Map<String, Object> moduleLvl = new HashMap<>();
      // this part should be dictated by the decision tree
      if (i < 2) {
        moduleLvl.put("access", true);
      } else {
        moduleLvl.put("access", false);
      }
      if ((boolean) moduleLvl.get("access")) {
        moduleLvl.put("completed", true);
      }
      moduleLvl.put("completed", false);

      try {
        this.firebaseStorage.addDocument(uid, "modulesProgress", levels.get(i), moduleLvl);
        responseMap.put(levels.get(i), moduleLvl);
      } catch (Exception e) {
        System.out.println("error in firebase helper: " + e.getMessage());
      }
    }
    return responseMap;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      if (uid == null) {
        throw new IllegalArgumentException("Invalid user id");
      }
      responseMap.put("uid", populateModuleAccess(uid));
    } catch (Exception e) {
      System.out.println("Error in home screen module populator: " + e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
