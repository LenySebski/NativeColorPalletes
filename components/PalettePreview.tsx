import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { ColorType } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { AppContext } from "../context/AppContext";

type Props = {
	paletteName: string;
	colors: ColorType[];
	userPalette?: boolean;
};

const PalettePreview = ({ paletteName, colors, userPalette }: Props) => {
	const appContext = useContext(AppContext);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("ColorPalette", {
						paletteName: paletteName,
						colors: colors,
					})
				}
			>
				<View style={styles.infoContainer}>
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
			<View style={styles.buttonContainer}>
				{userPalette && (
					<TouchableOpacity
						onPress={() =>
							appContext.deletePalette(paletteName)
						}
					>
						<View style={styles.deleteButton}>
							<FontAwesomeIcon
								icon={faTrashCan}
								size={20}
								color='white'
							/>
						</View>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default PalettePreview;

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		margin: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	infoContainer: {
		margin: 10,
		padding: 10,
		flex: 1,
		alignItems: "flex-start",
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
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	deleteButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 25,
		flex: 1,
		alignItems: "center",
	},
	deleteText: {
		fontSize: 18,
		fontWeight: "bold",
		paddingVertical: 5,
		opacity: 0.9,
		color: "white",
	},
});
