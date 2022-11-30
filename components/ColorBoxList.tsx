import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import ColorBox from "./ColorBox";

export type colorType = {
	id: number;
	colorName: string;
	hexCode: string;
};

const ColorBoxList = ({ data }: { data: colorType[] }) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }: { item: colorType }) => {
				return (
					<ColorBox
						colorName={item.colorName}
						colorHex={item.hexCode}
					/>
				);
			}}
			keyExtractor={(item: colorType) => item.hexCode}
			style={styles.list}
			scrollEnabled
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		width: "100%",
	},
});

export default ColorBoxList;
