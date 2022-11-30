import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
	colorName: string;
	colorHex: string;
};

const ColorBox = ({ colorName, colorHex }: Props) => {
	const boxColor = {
		backgroundColor: colorHex,
	};

	const textColor = {
		color:
			parseInt(colorHex.replace("#", ""), 16) > 0xffffff / 1.1
				? "black"
				: "white",
	};

	return (
		<View style={[styles.tile, boxColor]}>
			<Text style={[styles.text, textColor]}>
				{colorName} : {colorHex}
			</Text>
		</View>
	);
};

export default ColorBox;

const styles = StyleSheet.create({
	tile: {
		justifyContent: "center",
		paddingVertical: 10,
		marginVertical: 10,
		alignItems: "center",
	},
	text: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});
