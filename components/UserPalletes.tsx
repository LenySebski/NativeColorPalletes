import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PalettePreview from "../components/PalettePreview";

const UserPalletes = () => {
	const appContext = useContext(AppContext);

	return (
		<View
			style={appContext.userPalletes.length !== 0 && styles.container}
		>
			{appContext.userPalletes.length !== 0 && (
				<FlatList
					data={appContext.userPalletes}
					keyExtractor={(item) => item.paletteName}
					renderItem={({ item }) => (
						<PalettePreview {...item} userPalette />
					)}
					ListHeaderComponent={
						<Text style={styles.header}>User palettes</Text>
					}
				/>
			)}
		</View>
	);
};

export default UserPalletes;

const styles = StyleSheet.create({
	container: {
		height: "50%",
		padding: 10,
		backgroundColor: "white",
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
