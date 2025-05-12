package DecisionTree;

import DataRepresentation.DataPoint;
import DataRepresentation.Dataset;
import Parser.Parser;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DecisionTree {
  private TreeNode root;
  private List<List<String>> rawdata;
  private List<String> attributes;
  private Dataset dataset;

  public DecisionTree(String filePath) {
    this.rawdata = new ArrayList<>();
    try {
      Parser parser = new Parser(filePath);
      this.rawdata = parser.parse();
    } catch (IOException e) {

    }
    this.attributes = this.rawdata.get(0);
    List<DataPoint> dataPoints = new ArrayList<>();
    for (int i = 1; i < this.rawdata.size(); i++) {
      dataPoints.add(new DataPoint(this.rawdata.get(i), this.attributes));
    }
    this.dataset = new Dataset(this.attributes, dataPoints);
    // this.root = this.generateTree(this.dataset, this.attributes.getLast());
  }

  private TreeNode generateTree(Dataset data, String targetAttribute) {
    List<Edge> edges = new ArrayList<>();
    Dataset splitData;
    Random rand = new Random();
    int attributeIndex = rand.nextInt(this.attributes.size() - 1); // can't use this.attributes
    String attribute = this.attributes.get(attributeIndex);
    for (String value : data.getValuesForAttribute(attribute)) {
      splitData = data.splitData(value, attribute);
      if (splitData.isAllSameValue(targetAttribute)) {
        edges.add(new Edge(new DecisionLeaf(value), value));
      } else {
        if (splitData.isAllSameValue(attribute)) {
          edges.add(new Edge(this.generateTree(splitData, targetAttribute), value));
        } else {
          splitData.getAttributes().remove(attribute);
          edges.add(new Edge(this.generateTree(splitData, targetAttribute), value));
        }
      }
    }
    if (edges.isEmpty()) {
      return new DecisionLeaf(data.getData().get(0).getAttributeValue(targetAttribute));
    }
    return new AttributeNode(attribute, this.getDefault(data, targetAttribute), edges);
  }

  public String getDecision(DataPoint data) {
    return this.root.getDecision(data);
  }

  public String getDefault(Dataset data, String attribute) {
    List<String> outputs = this.getAllValues(data.getData(), attribute);
    outputs = this.getUniqueValues(outputs);
    String defaultString = "";
    int biggestData = 0;
    for (int i = 0; i < outputs.size(); i++) {
      if (data.splitData(outputs.get(i), attribute).size() > biggestData) {
        biggestData = data.splitData(outputs.get(i), attribute).size();
        defaultString = outputs.get(i);
      }
    }
    return defaultString;
  }

  public List<String> getAllValues(List<DataPoint> data, String attribute) {
    List<String> outputs = new ArrayList<>();
    for (int i = 0; i < data.size(); i++) {
      outputs.add(data.get(i).getAttributeValue(attribute));
    }
    return outputs;
  }

  public List<String> getUniqueValues(List<String> outputs) {
    List<String> newOutputs = new ArrayList<>();
    for (int i = 0; i < outputs.size() - 1; i++) {
      if (!newOutputs.contains(outputs.get(i))) {
        newOutputs.add(outputs.get(i));
      }
    }
    return newOutputs;
  }
}
