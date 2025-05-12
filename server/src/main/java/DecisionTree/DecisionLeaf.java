package DecisionTree;

import DataRepresentation.DataPoint;
import java.util.List;

public class DecisionLeaf implements TreeNode {
  private String value;

  public DecisionLeaf(String value) {
    this.value = value;
  }

  @Override
  public String getDecision(DataPoint data) {
    return this.value;
  }
}
