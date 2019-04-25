
import { combineReducers } from "redux";
import companyInfo from '../container/SettingContainer/reducer';
import weatherData from '../container/WeatherRosterContainer/reducer';

export default combineReducers({
	companyInfo,
	weatherData
});