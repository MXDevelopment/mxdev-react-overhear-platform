const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "Overhear was launched in 2023 to help you tune in, be present and remember what we're here for. Stick Around!",
    topTitle: "Nice to See You",
    subHeading: "Welcome to Overhear",
  },
  signInScreen: {
    postscript:
      "Overhear was launched in 2023 to help you tune in, be present and remember what we're here for. Stick Around!",
    topTitle: "Sign In",
    subHeading: "Choose an option below",
    optionMessage: "Choose an option below",
    resetDetailsMessage: "Need to Sign Up?",
    signUpMessage: "New User? Register & Signup Here"
  },


  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
