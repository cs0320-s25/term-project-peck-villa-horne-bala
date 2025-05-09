package Query;

import Parser.CSVFile;
import Parser.FileParser;
import java.io.File;
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
    CSVFile file = new CSVFile("server/src/main/java/level_answers/" + filepath + ".csv");

    if (file == null) {
      System.err.println("Could not find resource: level_answers/" + filepath + ".csv");
      return false;
    }
    List<String> parsed = new FileParser(file.getFilePath()).getRows().get(0);
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
