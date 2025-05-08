package Query;

public class QuestionsDirectory {
  private String codeContains;
  private String answer;

  public QuestionsDirectory() {
    this.codeContains = "System.out.println";
    this.answer = "";

  }
  public void setAnswerAndContains(String question) {
    if (question.equals("one")) {
      this.answer = "Hello, World!";
      this.codeContains = "System.out.println";
    }
  }

  public String getCodeContains() {
    return this.codeContains;
  }
  public String getCodeAnswer(){
    return this.answer;
  }

}