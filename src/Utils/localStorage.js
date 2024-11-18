export const getStorageItem = (key, defaultValue) => {
	try {
		const item = window?.localStorage?.getItem(key);
		if (item) {
			return JSON.parse(item);
		} else {
			return defaultValue;
		}
	} catch (e) {
		return defaultValue;
	}
};

export const setStorageItem = (key, value) => {
	window?.localStorage?.setItem(key, JSON.stringify(value));
};
