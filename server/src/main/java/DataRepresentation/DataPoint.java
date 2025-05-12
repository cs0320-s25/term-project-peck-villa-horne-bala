package DataRepresentation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataPoint {
  private Map<String, String> attributeToValues;

  public DataPoint(List<String> attributes, List<String> values) {
    this.attributeToValues = new HashMap<>();
    for (int i = 0; i < attributes.size(); i++) {
      this.attributeToValues.put(attributes.get(i), values.get(i));
    }
  }

  public String getAttributeValue(String attribute) {
    return this.attributeToValues.get(attribute);
  }
}
