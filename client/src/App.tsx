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

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Homescreen from "./home_screen/HomeScreen";
import SurveyManager from "./survey/SurveyManager";

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
            <Route path="/survey" element={<SurveyManager/>}/>
          </Routes>
        </Router>
      </SignedIn>
    </div>
  );
}

export default App;
