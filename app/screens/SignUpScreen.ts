import React, { FC, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = function SignUpScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>(null);
  const [authPassword, setAuthPassword] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { authenticationStore } = useStores();

const handleEmailChange = (email: string) => {
    setAuthEmail(email);
    authenticationStore.setAuthEmail(email);
};

  const error = isSubmitted ? authenticationStore.validationError : "";

  const handleSignUp = async () => {
    setIsSubmitted(true);

    if (authenticationStore.validationError) return;

    // Replace with your sign-up method
    await authenticationStore.signUpWithEmailAndPassword(authEmail, authPassword);

    if (authenticationStore.authToken) {
      navigation.navigate("Overhear"); // Navigate to OverhearScreen or another screen
    } else {
      Alert.alert("Sign Up Failed", "Please check your details and try again.");
    }

    setIsSubmitted(false);
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
      <Text testID="signup-heading" tx="signUpScreen.signUp" preset="heading" style={$signIn} />
      <Text tx="signUpScreen.enterDetails" preset="subheading" style={$enterDetails} />

      <TextField
        value={authEmail}
        onChangeText={handleEmailChange}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
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
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleSignUp}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="signup-button"
        tx="signUpScreen.tapToSignUp"
        style={$tapButton}
        preset="reversed"
        onPress={handleSignUp}
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

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
