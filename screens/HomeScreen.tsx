import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import PalettePreview from "../components/PalettePreview";
import { PalleteType } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { AppContext } from "../context/AppContext";
import UserPalletes from "../components/UserPalletes";

const HomeScreen = () => {
	const appContext = useContext(AppContext);
	const [palletes, setPalletes] = useState<PalleteType[]>([]);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const fetchPalletes = useCallback(async () => {
		setIsRefreshing(true);
		const response = await fetch(
			"https://color-palette-api.kadikraman.now.sh/palettes"
		);
		setIsRefreshing(true);
		if (response.ok) {
			const palletes = await response.json();
			setPalletes(palletes);
			setIsRefreshing(false);
		}
	}, []);

	useEffect(() => {
		fetchPalletes();
	}, []);

	return (
		<View style={styles.container}>
			<UserPalletes />
			<FlatList
				data={palletes}
				keyExtractor={(item) => item.paletteName}
				renderItem={({ item }) => <PalettePreview {...item} />}
				refreshing={isRefreshing}
				onRefresh={() => fetchPalletes}
				ListHeaderComponent={
					<Text style={styles.header}>Featured palettes</Text>
				}
			/>
			<TouchableOpacity onPress={() => navigation.navigate("Modal")}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>
						Add a color scheme
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 22,
		fontWeight: "bold",
		paddingVertical: 20,

		margin: 10,
		opacity: 0.8,
		textAlign: "center",
	},
	button: {
		backgroundColor: "blue",
		marginTop: 10,
		marginBottom: 30,
		marginHorizontal: 40,
		borderRadius: 25,
	},

	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		paddingVertical: 20,
		opacity: 0.9,
		textAlign: "center",
		color: "white",
	},
});
