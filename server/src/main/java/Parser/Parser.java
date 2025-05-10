package Parser;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Parser class whose main functionality is to parse the input (Reader) by storing header(If
 * hasHeader is TRUE), and turning its rows into the generic T which is declared in the class passed
 * as the creator. This creator implements the CreatorFromRow interface that has a creator class
 * that decides how to output the row data.
 */
public class Parser {

  /**
   * The fields bufferedReader, creator, parsedContent, header, and hasHeader are private because we
   * do not want the potential creator classes or other users to be able to modify these fields
   * (practice of privacy and protection).
   */
  private final BufferedReader bufferedReader;

  private List<List<String>> parsedContent;

  /**
   * Main constructor that handles improper Reader input (null cases). This is great for code
   * reusability since we can call this constructor in future constructors that pass in a specific
   * Reader. Constructor overloading will be used here!
   *
   * @param reader- abstract class that allows any reader subclass (file, string, etc.)
   */
  public Parser(Reader reader) {
    if (reader == null) throw new IllegalArgumentException("A valid reader is required.");
    this.bufferedReader =
        new BufferedReader(
            reader); // basically wrapping the reader (abstract class Reader) in the BufferedReader
    this.parsedContent = new ArrayList<>();
  }

  /**
   * Constructor overloading here! We are using the main constructor above and tailoring it to the
   * input of a file path. We make the file path into a FileReader which extends the abstract Reader
   * class. This constructor takes into account a variety of inputs!
   *
   * @param filePath - path to a csv file to be parsed
   * @throws IOException if IO error occurs
   */
  public Parser(String filePath) throws IOException {
    this(new FileReader(filePath));
  }

  /**
   * Method that parses data based on commas and whether the user indicated there to be a header. If
   * there is a header, we retrieve the header line, turn it into a list of strings, and finally
   * store it in the header variable. Then, the buferedReader continues reading the lines until the
   * input has no more. We store everything other than the header in the format specified by the
   * creator (a class that implements the CreatorFromRow interface and defines the creator method to
   * output a specified object). There is a condition where there could be no lines in the
   * file/string/etc so we have to check for that as well when populating the header.
   *
   * @throws IOException when buffer reader fails to read-in a line
   */
  public List<List<String>> parse() throws IOException {
    String line;
    // Regex splits on '|' unless inside quotes
    Pattern regexSplitCustomDelimiter = Pattern.compile("\\|(?=([^\"]*\"[^\"]*\")*(?![^\"]*\"))");

    while ((line = this.bufferedReader.readLine()) != null) {
      String[] result = regexSplitCustomDelimiter.split(line);
      List<String> lineToArr = Arrays.stream(result).toList();
      parsedContent.add(lineToArr);
    }

    this.bufferedReader.close();
    return parsedContent;
  }
}
