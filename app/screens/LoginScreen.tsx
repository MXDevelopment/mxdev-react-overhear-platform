import React, { FC, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"LogIn"> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>(null);
  const [authPassword, setAuthPassword] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const { authenticationStore } = useStores();

const handleEmailChange = (email: string) => {
  setAuthEmail(email); // Update local state
  authenticationStore.setAuthEmail(email); // Update email in AuthenticationStore
};
const error = isSubmitted ? authenticationStore.validationError : "";

const handleSignIn = async () => {
  setIsSubmitted(true);
  setAttemptsCount(attemptsCount + 1);

  if (authenticationStore.validationError) return;

  await authenticationStore.signInWithEmailAndPassword(authEmail, authPassword);

  // Check if authToken is set, which indicates successful login
  if (authenticationStore.authToken) {
    navigation.navigate("Overhear"); // Navigate to OverhearScreen
  } else {
    // Show an alert if authToken is not set after attempting to sign in
    Alert.alert("Login Failed", "Incorrect email or password. Please try again.");
  }

  setIsSubmitted(false);
};

const handleAnonymousSignIn = async () => {
  try {
    await authenticationStore.anonymousSignIn();
    if (authenticationStore.authToken) {
      navigation.navigate("Overhear"); // Navigate to OverhearScreen
    } else {
      Alert.alert("Error", "Could not retrieve anonymous session token.");
    }
  } catch (error) {
    console.error("Anonymous Login Error:", error);
    Alert.alert("Error", "Could not continue as anonymous.");
  }
};


  const PasswordRightAccessory = function PasswordRightAccessory() {
    return (
      <Icon
        icon={isAuthPasswordHidden ? "view" : "hidden"}
        color={colors.palette.neutral800}
      
        size={20}
        onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
      />
    )
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={handleEmailChange}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleSignIn}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={handleSignIn}
      />

      <Button
        testID="anonymous-button"
        tx="loginScreen.continueAsGuest"
        style={$tapButton}
        onPress={handleAnonymousSignIn}
      />
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
