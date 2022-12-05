import { FlatList, StyleSheet } from "react-native";
import React from "react";
import ColorBox from "./ColorBox";
import { ColorType } from "../types/types";

const ColorBoxList = ({ data }: { data: ColorType[] }) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => {
				return (
					<ColorBox
						colorName={item.colorName}
						colorHex={item.hexCode}
					/>
				);
			}}
			keyExtractor={(item) => item.hexCode}
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
