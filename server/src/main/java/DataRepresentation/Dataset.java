package DataRepresentation;

import java.util.ArrayList;
import java.util.List;

public class Dataset {

  private List<String> attributes;
  private List<DataPoint> data;

  public Dataset(List<String> attributes, List<DataPoint> data) {
    this.attributes = attributes;
    this.data = data;
  }

  //  public Dataset(List<String> attributes, List<List<String>> rawData) {
  //    this.attributes = attributes;
  //    this.data = new ArrayList<>();
  //    for (int i = 0; i < rawData.size(); i++) {
  //      this.data.add(new DataPoint(this.attributes, rawData.get(i)));
  //    }
  //  }

  public Dataset splitData(String value, String attribute) {
    List<DataPoint> subSet = new ArrayList<>();
    for (int i = 0; i < this.data.size(); i++) {
      if (this.data.get(i).getAttributeValue(attribute).equals(value)) {
        subSet.add(this.data.get(i));
      }
    }
    List<String> subsetAttributes = new ArrayList<>();
    for (String attributeFromList : this.attributes) {
      if (!attributeFromList.equals(attribute)) {
        subsetAttributes.add(attributeFromList);
      }
    }
    Dataset newData = new Dataset(subsetAttributes, subSet);
    return newData;
  }

  public List<String> getValuesForAttribute(String attribute) {
    List<String> attributevalues = new ArrayList<>();
    for (DataPoint dataPoint : this.data) {
      if (!attributevalues.contains(dataPoint.getAttributeValue(attribute))) {
        attributevalues.add(dataPoint.getAttributeValue(attribute));
      }
    }
    return attributevalues;
  }

  public boolean isAllSameValue(String attribute) {
    if (this.data.isEmpty()) {
      return false;
    }
    String value = this.data.get(0).getAttributeValue(attribute);
    for (DataPoint object : this.data) {
      if (!value.equals(object.getAttributeValue(attribute))) {
        return false;
      }
    }
    return true;
  }

  public List<String> getAttributes() {
    return this.attributes;
  }

  public List<DataPoint> getData() {
    return this.data;
  }

  public int size() {
    return this.data.size();
  }
}
