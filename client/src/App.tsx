import { useState } from "react";
import "./styles/App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homescreen from "./home_screen/HomeScreen";
import SurveyManager from "./survey/routers/SurveyManager";
import SurveyResults from "./survey/routers/SurveyResults";
import MOneLTwo from "./home_screen/routers/module1/levelTwo";
import MOneLOne from "./home_screen/routers/module1/levelOne";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <div className="App">
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/dashboard" />
      </SignedOut>
      <SignedIn>
        {/* <SignOutButton /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/survey" element={<SurveyManager />} />
            <Route path="/surveyResults" element={<SurveyResults />} />
            <Route path="/MOneLTwo" element={<MOneLTwo />} />
            <Route path="/MOneLOne" element={<MOneLOne />} />
          </Routes>
        </Router>
      </SignedIn>
    </div>
  );
}

export default App;
