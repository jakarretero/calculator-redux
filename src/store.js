import {initialState} from "./index";

export const clear = () => dispatch => dispatch => {
	const result = fetch('https://api.github.com/users/jakarretero').then(res=> res.json).then(data => {
		dispatch({type: "CLEAR", number: JSON.stringify(data)});
	})
}

export const calculateResult = () => ({
	type: 'CALCULATE_RESULT'
});

export const numberClick = num => ({
	type: "NUMBER_CLICK",
	num: num,
	meta:{ 
		throttling: 1000
	}
	
});

export const operatorClick = op => ({
	type: "OPERATOR_CLICK",
	op: op,
	meta: {
		debouncetime: 200
	}
});

export const updateInput1 = numberString => ({
	type: "UPDATE_INPUT_1",
	number: numberString
});

export const updateInput2 = numberString => ({
	type: "UPDATE_INPUT_2",
	number: numberString
});

export const changeSymbol = () => ({
	type: 'CHANGE_SYMBOL'
});


function calculate(input1, input2, operator) {
	let numA = parseInt(input1);
	let numB = parseInt(input2);
	switch (operator) {
		case '+':
			return numA + numB;
		case '-':
			return numA - numB;
		case '*':
			return numA * numB;
		case '/':
			return numA / numB;
		case '%':
			return numA % numB;
		default:
			return 0;
	}
}

export const calculatorReducer = (state, action) => {
	switch (action.type) {
		case "CLEAR":
			return {};
		case "UPDATE_INPUT_1":
			return {...state, input1: action.number};
		case "UPDATE_INPUT_2":
			return {...state, input2: action.number};
		case "OPERATOR_CLICK":
			return {...state, operator: action.op};
		case "NUMBER_CLICK":
			if (state.operator) {
				return {...state, input2: (state.input2?state.input2:"") + action.num};
			} else {
				return {...state, input1: (state.input1 ? state.input1:"") + action.num};
			}
		case "CHANGE_SYMBOL":
			if (state.operator) {
				return {...state, input2: (state.input2? parseInt(state.input2)*-1:"").toString()};
			} else {
				return {...state, input1: (state.input1? parseInt(state.input1)*-1:"").toString()};
			}
		case "CALCULATE_RESULT":
			return {...state, result: calculate(state.input1, state.input2, state.operator)};
		default:
			return state;
	}
}

