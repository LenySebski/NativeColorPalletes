import { createContext, useState } from "react";
import { PalleteType } from "../types/types";

interface AppContextInterface {
	userPalletes: PalleteType[];
	setUserPalletes: React.Dispatch<React.SetStateAction<PalleteType[]>>;
	addPalette: (newPalette: PalleteType) => void;
	deletePalette: (paletteName: string) => void;
}

export const defaultContext = {
	userPalletes: [],
	setUserPalletes: () => {},
	addPalette: () => {},
	deletePalette: () => {},
};

export const AppContext = createContext<AppContextInterface>(defaultContext);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [userPalletes, setUserPalletes] = useState<PalleteType[]>([]);

	const addPalette = (newPalette: PalleteType) => {
		setUserPalletes([...userPalletes, newPalette]);
	};

	const deletePalette = (paletteName: string) => {
		setUserPalletes(
			userPalletes.filter(
				(palette) => palette.paletteName !== paletteName
			)
		);
	};

	return (
		<AppContext.Provider
			value={{
				userPalletes,
				setUserPalletes,
				addPalette: addPalette,
				deletePalette: deletePalette,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
