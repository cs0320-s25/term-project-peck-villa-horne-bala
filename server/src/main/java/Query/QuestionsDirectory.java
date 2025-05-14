package Query;

import Parser.CSVFile;
import Parser.FileParser;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class QuestionsDirectory {
  private HashMap<String, String> stdOutputMap;

  public QuestionsDirectory() throws IOException {
    //    this.codeContains = "System.out.println";
    //    this.answer = "";
    this.stdOutputMap = new HashMap<>();
    this.populateStdOutput();
  }

  public boolean checkAnswer(String filepath, String output, String code) throws IOException {
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
    //    System.out.println(filepath + " output:" + cleaned);
    String outputTrimmed = output.replaceAll("\\r?\\n", "").trim();
    //    System.out.println("Output: " + outputTrimmed);
    return cleaned.equals(outputTrimmed);
  }

  // this is just a placeholder in case we are not checking std output correctly

  public void populateStdOutput() throws IOException {
    this.stdOutputMap.put("module01_level01.csv", "");
    this.stdOutputMap.put("module01_level02.csv", "");
    this.stdOutputMap.put("module01_level03.csv", "Hello, Java!");
    this.stdOutputMap.put("module01_level04.csv", "true");
    this.stdOutputMap.put("module02_level01.csv", "105 95");
    this.stdOutputMap.put("module02_level02.csv", "70 3 3.0");
    this.stdOutputMap.put("module02_level03.csv", "1 0 4 9");
    this.stdOutputMap.put("module02_level04.csv", "11 21");
    this.stdOutputMap.put("module03_level01.csv", "You are eligible to vote");
    this.stdOutputMap.put("module03_level02.csv", "Grade: B");
    this.stdOutputMap.put("module03_level03.csv", "You can enter the concert");
    this.stdOutputMap.put("module04_level01.csv", "Welcome to Java");
    this.stdOutputMap.put("module04_level02.csv", "You are years old");
    this.stdOutputMap.put("module04_level03.csv", "");
  }

  public HashMap<String, String> getStdOutput() {
    return this.stdOutputMap;
  }
}
