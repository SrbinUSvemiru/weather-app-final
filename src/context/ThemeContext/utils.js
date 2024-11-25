import { defaultDark, defaultLight } from './themes';

const PALETTE_BY_THEME_MAP = {
	default: { light: defaultLight, dark: defaultDark },
};

export const getPaletteForTheme = (theme) => PALETTE_BY_THEME_MAP[theme.variant][theme.mode];
