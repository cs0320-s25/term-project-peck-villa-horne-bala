package DataRepresentation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class wraps a datapoint of the dataset and its attributes for the decision tree to use for
 * construction and decision-making
 */
public class DataPoint {
  private Map<String, String> attributeToValues;

  /**
   * Constructor takes in the attributes and values of the data point and converts to a hashmap of
   * attribute to value
   *
   * @param attributes list of attribute names
   * @param values list of values for each attribute
   */
  public DataPoint(List<String> attributes, List<String> values) {
    this.attributeToValues = new HashMap<>();
    for (int i = 0; i < attributes.size(); i++) {
      this.attributeToValues.put(attributes.get(i), values.get(i));
    }
  }

  /**
   * Getter method for retrieving the datapoint's value for a specific attribute
   *
   * @param attribute the attribute to get the value of
   * @return the value of the attribute
   */
  public String getAttributeValue(String attribute) {
    return this.attributeToValues.get(attribute);
  }

  /**
   * toString method used for testing
   *
   * @return the string representation of the data point
   */
  @Override
  public String toString() {
    return this.attributeToValues.toString();
  }
}
