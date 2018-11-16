import {
	calculateResult,
	calculatorReducer, changeSymbol,
	clear,
	numberClick,
	operatorClick,
	updateInput1,
	updateInput2
} from "./store";

describe('action creators suite', () => {
	it('should create a valid clear action', () => {
		expect(clear()).toEqual({type: "CLEAR"});
	});

	it('should create a valid calculate result action', () => {
		expect(calculateResult()).toEqual({type: "CALCULATE_RESULT"});
	});

	it('should create a valid calculate result action', () => {
		expect(numberClick(23)).toEqual({type: "NUMBER_CLICK", num: 23});
	});

	it('should create a valid calculate result action', () => {
		expect(operatorClick('+')).toEqual({type: "OPERATOR_CLICK", op: '+'});
	});

	it('should create a valid calculate result action', () => {
		expect(updateInput1("34")).toEqual({type: "UPDATE_INPUT_1", number: "34"});
	});

	it('should create a valid calculate result action', () => {
		expect(updateInput2("676")).toEqual({type: "UPDATE_INPUT_2", number: "676"});
	});

	it('should create a valid change symbol action', () => {
		expect(changeSymbol()).toEqual({type: "CHANGE_SYMBOL"});
	});
});

describe('reducer suite', () => {
	it('should return a empty state on clear action', () => {
		const initialState = {input1: "23423"};
		expect(calculatorReducer(initialState, clear())).toEqual({input1: "", input2:"", result: "", operator: ""});
	});

	it('should calculate valid + operation', () => {
		const initialState = {input1: "2", input2: "5", operator: '+'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "2", input2: "5", operator: '+', result: 7}
		);
	});

	it('should calculate valid - operation', () => {
		const initialState = {input1: "2", input2: "5", operator: '-'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "2", input2: "5", operator: '-', result: -3}
		);
	});

	it('should calculate valid * operation', () => {
		const initialState = {input1: "2", input2: "5", operator: '*'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "2", input2: "5", operator: '*', result: 10}
		);
	});

	it('should calculate valid % operation', () => {
		const initialState = {input1: "6", input2: "5", operator: '%'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "6", input2: "5", operator: '%', result: 1}
		);
	});


	it('should calculate valid / operation', () => {
		const initialState = {input1: "6", input2: "2", operator: '/'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "6", input2: "2", operator: '/', result: 3}
		);
	});

	it('should calculate valid unkown operation', () => {
		const initialState = {input1: "6", input2: "2", operator: '&'};
		expect(calculatorReducer(initialState, calculateResult())).toEqual(
			{input1: "6", input2: "2", operator: '&', result: 0}
		);
	});

	it('should concat second number after click a number pad', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, numberClick("4"))).toEqual({input1: "24"});
	});

	it('should modify second value after enter a operator', () => {
		const initialState = {input1: "2", operator: "+"};
		expect(calculatorReducer(initialState, numberClick("4"))).toEqual({input1: "2", operator: "+", input2: "4"});
	});

	it('should modify second value after enter a operator', () => {
		const initialState = {input1: "2", operator: "+"};
		expect(calculatorReducer(initialState, numberClick("4"))).toEqual({input1: "2", operator: "+", input2: "4"});
	});


	it('should set operator', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, operatorClick("/"))).toEqual({input1: "2", operator: "/"});
	});

	it('should set input1', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, updateInput1("24"))).toEqual({input1: "24"});
	});

	it('should set input2', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, updateInput2("24"))).toEqual({input1: "2", input2: "24"});
	});

	it('should return the same state with an unkown action', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, {type: "usadfnasdlfown"})).toEqual({input1: "2"});
	});

	it('should a empty object as initial state', () => {
		expect(calculatorReducer(undefined, {type: "usadfnasdlfown"})).toEqual({input1: "", input2:"", result: "", operator: ""});
	});


	it('should change input1 if not operator defined', () => {
		const initialState = {input1: "2"};
		expect(calculatorReducer(initialState, changeSymbol())).toEqual({input1: "-2"});
	});

	it('should change input2 if operator is defined', () => {
		const initialState = {input1: "2", operator: "+", input2:"3"};
		expect(calculatorReducer(initialState, changeSymbol())).toEqual({input1: "2",operator: "+", input2:"-3"});
	});

});