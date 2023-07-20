const initialState = {
	data: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const productReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_DATA':
			return { ...state, data: payload };

		default:
			return state;
	}
};

export default productReducer;
