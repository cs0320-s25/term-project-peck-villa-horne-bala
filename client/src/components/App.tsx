import { useState } from "react";
import "../styles/App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/clerk-react";

/**
 * This is the highest level of Mock which builds the component APP;
 *
 * @return JSX of the entire mock
 *  Note: if the user is loggedIn, the main interactive screen will show,
 *  else it will stay at the screen prompting for log in
 */

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="App">
        <SignedOut>
          <SignInButton fallbackRedirectUrl="/dashboard" />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
          <div className="App-header">
            <h1 aria-label="Mosaic Learning+">Mosaic Learning+</h1>
          </div>
          <div id="modal-root"></div>
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}

export default App;

