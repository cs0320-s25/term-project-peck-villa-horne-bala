package DecisionTree;

import DataRepresentation.DataPoint;
import java.util.List;

public class AttributeNode implements TreeNode {
  private List<Edge> edges;
  private String defaultValue;
  private String attribute;

  public AttributeNode(String attribute, String defaultValue, List<Edge> edges) {
    this.attribute = attribute;
    this.defaultValue = defaultValue;
    this.edges = edges;
  }

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
