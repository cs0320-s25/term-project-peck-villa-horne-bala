package Server;

import Storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class RestoreProgressHandler implements Route {
  private StorageInterface storage;

  public  RestoreProgressHandler(StorageInterface storage){
    this.storage = storage;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();

    try {
      String uid = request.queryParams("uid");
      System.out.println("uid: " + uid);

      List<Map<String, Object>> vals = this.storage.getCollection(uid, "modules");

      List<String> modules = vals.stream().map(word -> word.get("modules").toString()).toList();

      responseMap.put("response_type", "success");
      responseMap.put("modules", modules);
    }
    catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "error");
      responseMap.put("message", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);

  }
}
