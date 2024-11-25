const defaultErrorHandler = (errorMessage) => {
	console.error('fetchFromServer error: ', errorMessage);
};

const getResult = async (response) => {
	try {
		const responseText = await response.text();
		return responseText ? JSON.parse(responseText) : null;
	} catch (e) {
		return null;
	}
};

const fetchFromServer = async (path, errorHandler = defaultErrorHandler) => {
	try {
		const response = await fetch(path);

		const result = await getResult(response);

		if (!response.ok) {
			const errorMessage = result?.code ? 'error.' + result.code : result.message;
			errorHandler(errorMessage);
			return null;
		}

		return result;
	} catch (error) {
		// errorMessage undefined means that we don't have a clue what errored out
		// in that case we must have a default error message to show to the user
		// which should be different with every fetch request
		console.error('fetchFromServer error: ', error);
		errorHandler();
		return null;
	}
};

export default fetchFromServer;
