import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// import React from "react";
// import ListingEditScreen from "./app/screens/ListingEditScreen";
// import ListingsScreen from "./app/screens/ListingsScreen";
// import ViewImageScreen from "./app/screens/ViewImageScreen";
// import AccountScreen from "./app/screens/AccountScreen";
// import WelcomeScreen from "./app/screens/WelcomeScreen";
// import RegisterScreen from "./app/screens/RegisterScreen";
// import LoginScreen from "./app/screens/LoginScreen";
//
//
// export default function App() {
//   return <WelcomeScreen />;
// }
