package Storage;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface StorageInterface {

  void addDocument(String uid, String collection_id, String doc_id, Map<String, Object> data)
      throws ExecutionException, InterruptedException;

  void addCollection(String uid, String collection_id, String doc_id, Map<String, Object> data);

  List<Map<String, Object>> getCollection(String uid, String collection_id)
      throws InterruptedException, ExecutionException;

  void clearUser(String uid) throws InterruptedException, ExecutionException;

  boolean isUserCollection(String uid) throws InterruptedException, ExecutionException;
}
