import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppConnected} from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from "redux";
import {calculatorReducer} from "./store";
import {Provider} from "react-redux";
import { logger, debounce, throttling, saveToLocal, thunk } from './middlewares';


export const initialState = JSON.parse(window.localStorage.getItem('app')) || {input1: "", input2: "", result: "", operator: ""};
const store = createStore(calculatorReducer,
	initialState,	
	applyMiddleware(logger, debounce, throttling, saveToLocal, thunk) 
);

ReactDOM.render(
	<Provider store={store}>
		<AppConnected />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
