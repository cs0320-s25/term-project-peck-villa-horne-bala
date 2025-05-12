package DecisionTree;

import DataRepresentation.DataPoint;
import java.util.List;

public interface TreeNode {
  public String getDecision(DataPoint data);
}
