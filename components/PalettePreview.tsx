import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { colorType } from "./ColorBoxList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = {
	paletteName: string;
	colors: colorType[];
};

const PalettePreview = ({ paletteName, colors }: Props) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	console.log("navigation", navigation);
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("ColorPalette", {
					paletteName: paletteName,
					colors: colors,
				})
			}
		>
			<View style={styles.container}>
				<Text style={styles.text}>{paletteName}</Text>
				<FlatList
					horizontal
					data={colors.slice(0, 5)}
					renderItem={({ item }) => {
						const tileColor = {
							backgroundColor: item.hexCode,
						};
						return (
							<View style={[styles.tile, tileColor]}>
								{/* {item.colorName} */}
							</View>
						);
					}}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default PalettePreview;

const styles = StyleSheet.create({
	container: {
		margin: 10,
		padding: 10,
		flex: 1,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		opacity: 0.8,
	},
	tile: {
		width: 30,
		height: 30,
		margin: 5,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
});
