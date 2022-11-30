import React from "react";
import { StyleSheet, View } from "react-native";
import ColorBoxList from "./ColorBoxList";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ColorPalette">;

const ColorPaletteDetails = ({ navigation, route }: Props) => {
	console.log("navigation", navigation);
	console.log("route", route);
	return (
		<View style={styles.container}>
			<ColorBoxList data={route.params.colors} />
		</View>
	);
};

export default ColorPaletteDetails;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		margin: 10,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
