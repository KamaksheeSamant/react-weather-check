
import * as ActionTypes from "../../common/const/actionTypes";

const initialState = {
    weather_list: [],
    filtered_weather_list:[],
    isLoading: false,
    filter_option: "CityName"
}

export default function (state = initialState, action) {
    switch (action.type) {
        
        case ActionTypes.SET_FILTER_OPTION: {
            return {
                ...state,
                selected_filter_option: action.payload
            }
        }
        case ActionTypes.SET_FILTER_LIST: {
            return {
                ...state,
                filtered_weather_list: action.payload
            }
        }
        default: return state;
    }
}        
