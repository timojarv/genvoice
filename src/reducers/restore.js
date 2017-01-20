import { RESTORE_DATA } from '../actions/types';

const restore = (form) => (state = {}, action) => {
	switch(action.type) {
		case RESTORE_DATA[form]:
			return { ...state, values: action.payload };
	}
	return state;
};

export const restoreSender = restore("sender");
export const restoreRecipient = restore("recipient");