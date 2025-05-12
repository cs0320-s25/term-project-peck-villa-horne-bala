package DecisionTree;

public class Edge {
  private TreeNode child;
  private String value;

  public Edge(TreeNode child, String value) {
    this.child = child;
    this.value = value;
  }

  public String getValue() {
    return this.value;
  }

  public TreeNode getChild() {
    return this.child;
  }
}
