package Query;

import Parser.FileParser;
import java.io.IOException;
import java.util.List;

public class QuestionsDirectory {
  //  private String codeContains;
  //  private String answer;

  public QuestionsDirectory() {
    //    this.codeContains = "System.out.println";
    //    this.answer = "";
  }

  public boolean checkAnswer(String filepath, String output, String code) throws IOException {
    ClassLoader classLoader = getClass().getClassLoader();
    java.net.URL resourceUrl = classLoader.getResource("level_answers/" + filepath + ".csv");

    if (resourceUrl == null) {
      System.err.println("Could not find resource: level_answers/" + filepath + ".csv");
      return false;
    }
    List<String> parsed = new FileParser(resourceUrl.getPath()).getRows().get(0);
    for (int i = 0; i < parsed.size() - 1; i++) {
      if (!code.contains(parsed.get(i))) {
        System.out.println(code + " " + parsed.get(i));
        System.out.println("Code does not contain " + parsed.get(i));
        return false;
      }
    }
    String cleaned = parsed.get(parsed.size() - 1).replaceAll("\\r?\\n", "").trim();
    String outputTrimmed = output.replaceAll("\\r?\\n", "").trim();
    //    System.out.println(outputTrimmed);
    //    System.out.println(cleaned);
    return cleaned.equals(outputTrimmed);
  }
}
