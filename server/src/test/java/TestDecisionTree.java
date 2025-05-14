import DecisionTree.DecisionTree;
import Parser.Parser;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TestDecisionTree {

  @Test
  public void testParser() throws IOException {
    Parser parser = new Parser("sample_testing_data/fruits-and-vegetables.csv");
    List<List<String>> parsedContent = parser.parse();
    assertEquals("color", parsedContent.get(0).get(0));
  }


  @Test
  public void testDecisionTreeOnTestData() {
    DecisionTree foodTree = new DecisionTree("sample_testing_data/fruits-and-vegetables.csv");
    List<String> carrot = new ArrayList<>();
    carrot.add("orange");
    carrot.add("true");
    carrot.add("high");
    assertEquals("vegetable", foodTree.getDecision(carrot));

    List<String> orange = new ArrayList<>();
    orange.add("orange");
    orange.add("false");
    orange.add("high");
    assertEquals("fruit", foodTree.getDecision(orange));
  }

  @Test
  public void testDecisionTreeOnSurveyData() {

  }
}
