import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider, defaultContext } from "./context/AppContext";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PalleteType } from "./types/types";
import ColorPaletteDetails from "./screens/ColorPaletteDetails";
import Modal from "./screens/Modal";

export type RootStackParamList = {
	HomeScreen: undefined;
	ColorPalette: PalleteType;
	Modal: undefined;
};

export default function App() {
	const RootStack = createNativeStackNavigator<RootStackParamList>();
	return (
		<AppContextProvider>
			<NavigationContainer>
				<RootStack.Navigator>
					<RootStack.Group>
						<RootStack.Screen
							name='HomeScreen'
							component={HomeScreen}
							options={{ title: "Home" }}
						/>
						<RootStack.Screen
							name='ColorPalette'
							component={ColorPaletteDetails}
							options={({ route }) => ({
								title: route.params.paletteName,
							})}
						/>
					</RootStack.Group>
					<RootStack.Group
						screenOptions={{ presentation: "modal" }}
					>
						<RootStack.Screen
							name='Modal'
							component={Modal}
							options={{ title: "Add palette" }}
						/>
					</RootStack.Group>
				</RootStack.Navigator>
				<StatusBar style='auto' />
			</NavigationContainer>
		</AppContextProvider>
	);
}
