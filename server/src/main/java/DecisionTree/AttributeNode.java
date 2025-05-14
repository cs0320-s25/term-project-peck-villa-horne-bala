package DecisionTree;

import DataRepresentation.DataPoint;
import java.util.List;

/**
 * this class is a treenode for a specific attribute with edges for each value of the attribute
 */
public class AttributeNode implements TreeNode {
  private List<Edge> edges;
  private String defaultValue;
  private String attribute;

  /**
   * constructs an attributenode given the attribute, default value, and list of value edges
   */
  public AttributeNode(String attribute, String defaultValue, List<Edge> edges) {
    this.attribute = attribute;
    this.defaultValue = defaultValue;
    this.edges = edges;
  }

  /**
   * Method for getting a decision using the decision tree based on a DataPoint
   * Gets the value of the Datapoint for this attribute and traverses that edge
   * @param data datapoint with the attributes to use to make decisions
   * @return traverses the tree for the values of the data point
   */
  @Override
  public String getDecision(DataPoint data) {
    for (Edge edge : this.edges) {
      if (data.getAttributeValue(this.attribute).equals(edge.getValue())) {
        return edge.getChild().getDecision(data);
      }
    }
    return this.defaultValue;
  }
}
