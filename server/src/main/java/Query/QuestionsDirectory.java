package Query;

public class QuestionsDirectory {
  private String codeContains;
  private String answer;

  public QuestionsDirectory() {
    this.codeContains = "System.out.println";
    this.answer = "";

  }
  public void setAnswerAndContains(String question) {
    String answer = "";
    if (question.equals("1")) {
      answer = "Hello, World!";
    }
  }

  public String getCodeContains() {
    return this.codeContains;
  }
  public String getCodeAnswer(){
    return this.answer;
  }

}
