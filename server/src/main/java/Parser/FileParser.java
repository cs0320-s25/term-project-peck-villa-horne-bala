package Parser;

import Storage.FileStorage;
import java.io.IOException;
import java.util.List;

/**
 * This is the FileParser class which is used to parse the file and store the information in a list
 * of lists of strings. Also features a getter that returns the rows instance variable.
 */
public class FileParser {

  private List<List<String>> rows;

  /**
   * This is the constructor for the FileParser class which takes in a filepath and parses the file
   * information.
   *
   * @param filepath is the path to the file to be parsed
   * @throws IOException if the file is not found
   */
  public FileParser(String filepath) throws IOException {
    this.rows = parseFileInfo(filepath);
  }

  /**
   * Method that parses the file and stores the information in a list of lists of strings. Creates a
   * instance of FileStorage to store the parsed file information to avoid parsing the file multiple
   * times.
   *
   * @param filepath
   * @return a list of lists of strings that represent the rows of the file
   * @throws IOException, FactoryFailureException
   */
  private List<List<String>> parseFileInfo(String filepath) throws IOException {
    FileStorage fileStorage = FileStorage.getInstance();
    if (fileStorage.checkFile(filepath)) {
      return fileStorage.getFile(filepath);
    } else {
      List<List<String>> parsed = new Parser(filepath).parse();
      fileStorage.addFile(filepath, parsed);
      return parsed;
    }
  }

  /**
   * @return a copy of the rows instance variable as a way to protect the privacy of the instance
   */
  public List<List<String>> getRows() {
    return List.copyOf(this.rows);
  }
}
