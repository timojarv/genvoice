import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

import { restoreSender, restoreRecipient } from './restore';

const reducers = {
		form: formReducer
};

export default combineReducers(reducers);