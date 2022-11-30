import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import PalettePreview from "../components/PalettePreview";
import { colorType } from "../components/ColorBoxList";

type PalleteItemProps = {
	paletteName: string;
	colors: colorType[];
};

const HomeScreen = () => {
	const [palletes, setPalletes] = useState<PalleteItemProps[]>([]);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
			<Text style={styles.header}>Featured palettes</Text>
			<FlatList
				data={palletes}
				keyExtractor={(item) => item.paletteName}
				renderItem={({ item }) => <PalettePreview {...item} />}
				refreshing={isRefreshing}
				onRefresh={() => fetchPalletes}
			/>
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
});
