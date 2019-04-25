
import * as ActionTypes from '../../common/const/actionTypes';

export function updateFilterOption(data) {
    
    return {
        type: ActionTypes.SET_FILTER_OPTION,
        payload: data
    }
}

export function updateFilteredweatherList(data) {
    
    return {
        type: ActionTypes.SET_FILTER_LIST,
        payload: data
    }
}
