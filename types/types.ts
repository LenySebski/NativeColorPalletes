export type ColorType = {
	colorName: string;
	hexCode: string;
	id?: number;
	hsl?: number[];
};

export type PalleteType = {
	paletteName: string;
	colors: ColorType[];
};
