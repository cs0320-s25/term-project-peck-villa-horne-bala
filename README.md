# Project Details 
### Project Name:
Mosaic Learning+

### Project Description Purpose:
MosaicLearning+ an opportunity for individuals who would like to learn Java principles based upon their current level of experience. Our project helps new, intermediate, or seasoned Java programmers to continue or begin their learning experience. We begin surveying the user’s current knowledge and skills that need to be developed. From these results,  we create a personalized set of lesson plans for the user. Our app aims to help beginners learn everything from primitives to basic data structures like arrays to build up to those intermediate and proficient levels. 

### Project Description Technical:
The project uses React and Typescript to render the frontend, Java to set up our server concerning API calls, Firebase to store the progress of our users (modules and survey completion), Clerk for authenticating users, Piston for ____, and the Monaco IDE to test our users Java knowledge. 

### Team Members:
Elias Horne, ewhorne : decision tree creation, implementation, progress
Michael Peck, mpeck3: Monaco IDE implementation, handler that checks answers, handler that updates module progress, storage of module progress, module css, 
Joshua Bala, jbala: final level implementation, testing, css
Alison Villa, avilla1: survey and homescreen population, persistance of level progress, survey and homescreen css

### Estimated Time:
200 hours 

### GitHub Link:
https://github.com/cs0320-s25/term-project-peck-villa-horne-bala


# Collaborators 
mentor: Nicole Sanchez-Soto, nsanch17
chatgpt
claude

# Design Choices

### Front End

For the survey, we decided to break down the visual components into answer choices, questions, and the survey populator. The survey populator was in charge of iterating through questions and ending the survey. The survey flow class is meant to be reused for the survey instructions and the survey results. 

The homescreen components are broken down into modules and levels. The level takes care of the inside card, the module is the card that wraps all the levels. 


### Checking the Users Work
We are using Piston and Monaco to allow the user to code and test their code. So our CodeEditor class basically handles the showcasing of the Java IDE, and testing the code submited. In this class, we call the backend (api handler run) which checks whether the user response matches our answer key for this level. This is done by posting to our api the code, then the back end runs and will go to the file of that specific level and compare the contents of that file to the user input. 

Once this is completed, the handler outputs whether the response was correct or incorrect and updates the completion status of that level accordinly (to be explained further). Then, the modules list is updated in the firebase and local storage.

### Level Progress

We created a mock list that contains the first four modules of the plan. Upon survey completion, the mocked list will be stored in firestore and local storage. Local storage is meant to act as a cache and the firestore is meant to persist across log ins. Once the decision tree is implemented, the result ( the user's knowledge or current level) updates this list. Using this list, the homescreen is populated.

Within each level, the module list is fetched from the local storage, and using this list we retrieve the completion status of that level. Then, the CodeEditor class handles the completion status of the level based on the user's performance in the level. This updates the list in the local storage and the firestore.

# Errors/Bugs

At times, when a level is completed, the next level is unlocked via the continue button in the specific navigation of that level. But when you go to the homescreen, the next level is not unlocked.


# How to Run
git clone repo
In client: npm install react
In client: npm install @clerk/clerk-react
In client: npm install react-router-dom
In client: npm install react-bootstrap bootstrap
In client: npm install react-icons 
In client: Npm install @monaco-editor/react




