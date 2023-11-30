import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Button } from "react-native"
import { useStores } from "../models"
import { Screen, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"



interface SettingScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingScreen: FC<SettingScreenProps> = observer(function SettingScreen({ navigation }) {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()

  // Function to handle button press
  const handleButtonPress = () => {
    if (authenticationStore.authToken) {
      // If the user is logged in, log them out
      authenticationStore.logout()
    } else {
      // If the user is not logged in, navigate to LoginScreen
      navigation.navigate("LogIn")
    }
  }

  // Determine button label based on authentication status
  const buttonLabel = authenticationStore.authToken ? "Log Out" : "Log In"

  return (
    <Screen style={{...$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button title={buttonLabel} onPress={handleButtonPress} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
