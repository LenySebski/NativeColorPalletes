import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colorType } from "./components/ColorBoxList";
import ColorPaletteDetails from "./components/ColorPalette";

export type RootStackParamList = {
	HomeScreen: undefined;
	ColorPalette: { paletteName: string; colors: colorType[] };
};

export default function App() {
	const RootStack = createNativeStackNavigator<RootStackParamList>();
	return (
		<NavigationContainer>
			<RootStack.Navigator>
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
			</RootStack.Navigator>
			<StatusBar style='auto' />
		</NavigationContainer>
	);
}
