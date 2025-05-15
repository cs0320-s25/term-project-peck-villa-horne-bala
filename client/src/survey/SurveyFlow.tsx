import Card from "react-bootstrap/Card";
import "../styles/SurveyCardFlow.css"

interface SurveyFlowPageProps{
    text: string
    eventHandler: any
    surveyText:string
}

/**
 * This component is made to be reused for both survey instructions and survey completion results
 * @param props 
 * @returns 
 */
export function SurveyFlowPage(props: SurveyFlowPageProps){
    return (
      <div className="survey-flow-page">
        <Card className="survey-flow-card">
          <Card.Title className="survey-flow-card-title">
            {props.text}
          </Card.Title>
          <button className="survey-flow-btn" onClick={props.eventHandler}>
            {props.surveyText}
          </button>
        </Card>
      </div>
    );
}

export default SurveyFlowPage;