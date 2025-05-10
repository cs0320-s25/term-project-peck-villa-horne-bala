package Server.Modules;

import Server.Utils;
import Storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class FetchModules implements Route {
  StorageInterface storage;

  public FetchModules(StorageInterface storageInterface) {
    this.storage = storageInterface;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String uid = request.queryParams("uid");
      if (uid == null) {
        throw new IllegalArgumentException("Invalid user id");
      }
      List<Map<String, Object>> modules = this.storage.getCollection(uid, "modulesProgress");
      responseMap.put("userProgress", modules);

    } catch (Exception e) {
      System.out.println("Error in home screen module populator: " + e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
