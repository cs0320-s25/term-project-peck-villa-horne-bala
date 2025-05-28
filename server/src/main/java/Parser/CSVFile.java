package Parser;

import java.io.File;

/**
 * This class wraps around the File class so that the file loaded to the server can be saved,
 * access,and mutated by queries
 */
public class CSVFile {
  private File csvFile;

  public CSVFile() {
    this.csvFile = null;
  }

  public CSVFile(String fileName) {
    this.csvFile = new File(fileName);
  }

  /**
   * Method to retrieve file path of the loaded file
   *
   * @return file path
   */
  public String getFilePath() {
    return this.csvFile.getPath();
  }

  /**
   * Method to change the loaded file
   *
   * @param fileName new file to change to
   */
  public void setFile(String fileName) {
    this.csvFile = new File(fileName);
  }

  /**
   * Check if the loaded file exists
   *
   * @return boolean representing if the file is valid
   */
  public boolean isValidPath() {
    return this.csvFile != null && this.csvFile.exists();
  }
}
