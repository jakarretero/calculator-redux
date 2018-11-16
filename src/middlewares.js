export const logger = store => next => action => {
  console.log('Action', action);
  next(action)
}

const timeouts = {};

export const debounce = store => next => action => {
  if(!action.meta || !action.meta.debouncetime){
    next(action);
    return;
  }

  if(timeouts.hasOwnProperty(action.type)){
    clearTimeout(timeouts[action.type]);
  }
  
  timeouts[action.type] = setTimeout(() => {
    next(action);
  }, action.meta.debouncetime);
}

let isTimeoutFinish = {};

export const throttling = store => next => action => {
  if(!action.meta || ! action.meta.throttling){
    next(action);
    return;
  }

  if(!isTimeoutFinish[action.type]){
    isTimeoutFinish[action.type] = true;
    setTimeout(() => {
      isTimeoutFinish[action.type] = false;
      next(action);
    }, action.meta.throttling);
  }
}

export const saveToLocal = store => next => action => {
  next(action);
  window.localStorage.setItem('app', JSON.stringify(store.getState()));
}

export const thunk = store => next => action => {
  if(typeof action === 'function'){
    action(store.dispatch)
    return;
  }
  next(action)
}

