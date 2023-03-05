
import { css } from "styled-components";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoginOptionsPage from "./components/LoginOptionsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|login-options-page)">
          <LoginOptionsPage {...loginOptionsPageData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const loginOptionsPageData = {
    ovhLogoartboard12X1: "/img/ovh-logoartboard-1-2x-1-5@2x.png",
    spanText1: "OVERHEAR",
    spanText2: "Sign in",
    spanText3: "Choose an option below",
    mail: "/img/mail-1@2x.png",
    spanText4: "Sign in with email",
    appleLogo: "/img/apple-logo-1@2x.png",
    spanText5: "Sign In with Apple",
    googleLogo: "/img/google-logo-1@2x.png",
    spanText6: "Sign In with Google",
    spanText7: "Skip",
};

