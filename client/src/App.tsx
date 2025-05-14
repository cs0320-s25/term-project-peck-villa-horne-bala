import { useEffect, useState } from "react";
import "./styles/App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homescreen from "./home_screen/HomeScreen";
import Intro from "./EntryLogic";
import SurveyManager from "./survey/SurveyQuesManager";

import MoneLvlOne from "./module_routers/module1/mOneLvlOne";
import MOneLvlTwo from "./module_routers/module1/mOneLvlTwo";
import MoneLvlThree from "./module_routers/module1/mOneLvlThree";
import MOneLvlFour from "./module_routers/module1/mOneLvlFour";

import MTwoLvlOne from "./module_routers/module2/mTwoLvlOne";
import MTwoLvlTwo from "./module_routers/module2/mTwoLvlTwo";
import MTwoLvlThree from "./module_routers/module2/mTwoLvlThree";
import MTwoLvlFour from "./module_routers/module2/mTwoLvlFour";

import MThreeLvlOne from "./module_routers/module3/mThreeLvlOne";
import MThreeLvlTwo from "./module_routers/module3/mThreeLvlTwo";
import MThreeLvlThree from "./module_routers/module3/mThreeLvlThree";

import MFourLvlOne from "./module_routers/module4/mFourLvlOne";
import MFourLvlTwo from "./module_routers/module4/mFourLvlTwo";
import MFourLvlThree from "./module_routers/module4/mFourLvlThree";

import FinalLvl from "./module_routers/finalLvl";
import { useUser } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const { user } = useUser();
  return (
    <div className="App">
      <SignedOut>
        <SignInButton fallbackRedirectUrl="/dashboard" />
      </SignedOut>
      <SignedIn>
        <Router>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/Home" element={<Homescreen />} />

            <Route path="/MOneLvlOne" element={<MoneLvlOne />} />
            <Route path="/MOneLvlTwo" element={<MOneLvlTwo />} />
            <Route path="/MOneLvlThree" element={<MoneLvlThree />} />
            <Route path="/MOneLvlFour" element={<MOneLvlFour />} />

            <Route path="/MTwoLvlOne" element={<MTwoLvlOne />} />
            <Route path="/MTwoLvlTwo" element={<MTwoLvlTwo />} />
            <Route path="/MTwoLvlThree" element={<MTwoLvlThree />} />
            <Route path="/MTwoLvlFour" element={<MTwoLvlFour />} />

            <Route path="/MThreeLvlOne" element={<MThreeLvlOne />} />
            <Route path="/MThreeLvlTwo" element={<MThreeLvlTwo />} />
            <Route path="/MThreeLvlThree" element={<MThreeLvlThree />} />

            <Route path="/MFourLvlOne" element={<MFourLvlOne />} />
            <Route path="/MFourLvlTwo" element={<MFourLvlTwo />} />
            <Route path="/MFourLvlThree" element={<MFourLvlThree />} />

            <Route path="/finalLvl" element={<FinalLvl />} />

          </Routes>
        </Router>
      </SignedIn>
    </div>
  );
}

export default App;
