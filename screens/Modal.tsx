import {
	StyleSheet,
	Text,
	View,
	TextInput,
	FlatList,
	Switch,
	TouchableOpacity,
} from "react-native";
import React, { useCallback, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ColorType, PalleteType } from "../types/types";
import { COLORS } from "../data/colors";
import { HEXtoHSL } from "../utilities/functions";
import { AppContext } from "../context/AppContext";

//adding a new color scheme
COLORS.forEach((color) => {
	color.hsl = HEXtoHSL(color.hexCode);
});

type ColorToggleProps = {
	color: ColorType;
	newPalette: PalleteType;
	setNewPalette: React.Dispatch<React.SetStateAction<PalleteType>>;
};

const ColorToggle = ({
	color,
	setNewPalette,
	newPalette,
}: ColorToggleProps) => {
	const { colorName, hexCode } = color;
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	const toggleSwitch = () => {
		setIsEnabled((previousState) => !previousState);
		if (isEnabled) {
			setNewPalette({
				...newPalette,
				colors: newPalette.colors.filter(
					(color) => color.hexCode !== hexCode
				),
			});
		} else {
			setNewPalette({
				...newPalette,
				colors: [...newPalette.colors, color],
			});
		}
	};

	const tileColor = {
		backgroundColor: hexCode,
	};
	return (
		<View style={styles.itemContainer}>
			<Text>{colorName}</Text>
			<View style={[styles.tile, tileColor]}></View>
			<Switch
				style={styles.toggle}
				onChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

//Modal component

const Modal = () => {
	const appContext = useContext(AppContext);
	const navigation = useNavigation();

	const [newPalette, setNewPalette] = useState<PalleteType>({
		paletteName: "",
		colors: [],
	});
	const handlePalletteNameChange = (paletteName: string) => {
		setNewPalette({ ...newPalette, paletteName });
	};
	const [searchValue, setSearchValue] = useState<string>("");
	const handleSearch = (text: string) => {
		setSearchValue(text);
	};

	const handleSubmit = () => {
		if (newPalette.paletteName === "") {
			alert("Please enter a palette name");
			return;
		} else if (newPalette.colors.length < 3) {
			alert("Please select at least 3 colors");
			return;
		} else appContext.addPalette(newPalette);
		setNewPalette({
			paletteName: "",
			colors: [],
		});
		alert("Palette added");
	};

	//filter colors based on luminosity
	const sortedColors: ColorType[] = COLORS.sort(
		(a: ColorType, b: ColorType) => {
			return b.hsl![2]! - a.hsl![2]!;
		}
	);
	//filter colors based on search value
	const filteredColors: ColorType[] = sortedColors.filter(
		(color: ColorType) => {
			return color.colorName
				.toLowerCase()
				.includes(searchValue.toLowerCase());
		}
	);

	useCallback(() => {
		filteredColors;
	}, [searchValue, newPalette]);

	useCallback(() => {
		console.log("newPalette", newPalette);
	}, [newPalette]);

	return (
		<View style={styles.modalContainer}>
			<Text style={styles.label}>Create new color scheme</Text>
			<TextInput
				style={styles.input}
				value={newPalette.paletteName}
				onChangeText={handlePalletteNameChange}
				placeholder='Palette name'
			/>
			<TextInput
				style={styles.input}
				placeholder='Enter a color name'
				onChangeText={handleSearch}
			/>
			<FlatList
				style={styles.list}
				data={filteredColors}
				renderItem={({ item }) => {
					return (
						<ColorToggle
							color={item}
							newPalette={newPalette}
							setNewPalette={setNewPalette}
						/>
					);
				}}
				keyExtractor={(item) => item.hexCode}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.buttonText}>Create</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Modal;

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: "#fff",
		flex: 1,
		padding: 20,
	},

	label: {
		fontSize: 18,
		marginTop: 10,
		marginLeft: 10,
	},
	input: {
		borderWidth: 1,
		padding: 10,
		margin: 10,
		borderRadius: 5,
	},
	list: {
		flex: 1,
		marginHorizontal: 20,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	tile: {
		width: 30,
		height: 30,
		borderRadius: 5,
		margin: 5,
	},
	toggle: {
		marginLeft: "auto",
	},
	button: {
		backgroundColor: "teal",
		padding: 10,
		margin: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
	},
});
