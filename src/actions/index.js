import { RESTORE_DATA } from './types';


export function restoreData(form, data) {
	return {
		type: RESTORE_DATA[form],
		payload: data
	}
}