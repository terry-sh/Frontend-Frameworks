import { Dispatch } from './lib/index'

const dispatch: Dispatch = function(action: any) {
  return action;
};

dispatch({ type: 'a', payload: 1});