
import React, { Component } from "react";
import WeatherRosterPage from "../../pages/WeatherRosterPage/WeatherRosterPage";
import { connect } from 'react-redux';
import { updateFilterOption, updateFilteredweatherList } from './action';
import { weatherList } from '../../common/const/commonConst';

class WeatherRosterContainer extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: "",
			filterOn: false,
			sortBy: null,
			showCityModal: false,
			showFilterModal:false,
			currentCity:{}
		}
	}
	// to set up currently clicked weather info into modal
	onSetCurrentCity=(currentCity)=>{
		this.setState({
			currentCity:currentCity
		},()=>{
			this.onshowCityModal();
		});
	}
	// to show filter modal for mobile view
	onShowFilterModal=()=>{
		window.scrollTo(0,0);
		document.body.style.overflow='hidden';
		this.setState({
			showFilterModal: true
		})
	}
	// to show weather detail modal
	onshowCityModal = () => {
		window.scrollTo(0,0);
		document.body.style.overflow='hidden';
		this.setState({
			showCityModal: true
		})
	}
	// to close filter modal for mobile view
	onCloseCityModal = () => {
		document.body.style.overflow='visible';
		this.setState({
			showCityModal: false
		});
	}
	// to close weather detail modal
	onCloseFilterModal = () => {
		document.body.style.overflow='visible';
		this.setState({
			showFilterModal: false
		});
	}
	// to clear the filter
	onClearFilter = (clearFilterBy=true) => {
		this.setState({
			filterOn: false,// hide filter
			searchValue: "", // clr search value
			sortBy: null // clr sort by option
		}, () => {
			this.props.dispatch(updateFilteredweatherList([])); // clear the filtered list
			if(clearFilterBy)
			{
				this.props.dispatch(updateFilterOption("CityName")); // reset the filter by option
			}
		});
	}
	// to toggle the filter
	onFilterToggle = () => {
		this.setState((prevState) => {
			return {
				filterOn: !prevState.filterOn
			};
		});
	}
	// to get the sorted weather list 
	onSortList = (ascending = true, weather_list = weatherList) => {
		let option = this.props.citiesInfo.selected_filter_option;
		let sortedList=null;
		if (option === "weatherDate") { // to deal with date sorting
			 sortedList = weather_list.sort(function (a, b) {
				a = (a[option].split('T'))[0].split('-');
				b = (b[option].split('T'))[0].split('-');
				let day1 = parseInt(a[2]);
				let day2 = parseInt(b[2]);
				let month1 = parseInt(a[1]);
				let month2 = parseInt(b[1]);
				let year1 = parseInt(a[0]);
				let year2 = parseInt(b[0]);
				if (year1 !== year2) {
					return year1 - year2;
				} else if (month1 !== month2) {
					return month1 - month2;
				} else {
					return day1 - day2;
				}
			});

			if(!ascending){// to revser the sorted list if it is descending
				sortedList= sortedList.reverse()
			}
		}
		else {
			 sortedList = weather_list.sort(function (a, b) {
				a = a[option];
				b = b[option];
				if (typeof a[option] === "string") {// to sort string
					a = a[option].toLowerCase();
					b = b[option].toLowerCase();
				}
				if (a < b) //sort string ascending
					return ascending ? -1 : 1
				if (a > b)
					return ascending ? 1 : -1
				return 0
			});
		}
		return sortedList;
	}
	// to get the filtered weather list
	onFilterList = (searchValue, selected_filter_option) => {
		searchValue = searchValue.trim();
		let weather_list = this.props.citiesInfo.weather_list;
		switch (selected_filter_option) {
			case "temp":
				return weather_list.filter(item => {
					let valueToCompare = item[selected_filter_option];
					return (valueToCompare.toString() === searchValue)// to get the exact match for temp
				});
				break;

			default:
				return weather_list.filter(item => {
					let valueToCompare = item[selected_filter_option].toLowerCase();
					return (valueToCompare.includes(searchValue.toLowerCase())) // to get "contains" match for other string
				});
		}
	}
	// to handle state lifting
	onStateChange = (targetState, value) => {
		let FilterList;
		if (targetState === "searchValue") {
			FilterList = this.onFilterList(value, this.props.citiesInfo.selected_filter_option);
			this.setState({
				filterOn: false
			});
			if (this.state.sortBy !== null) {// to apply sort for filtered list if any
				FilterList = this.onSortList(this.state.sortBy === "ascending" ? true : false, FilterList);
			}
			this.props.dispatch(updateFilteredweatherList(FilterList));// to set filtered list
		}
		else if (targetState === "selected_filter_option") {
			FilterList = this.onFilterList(this.state.searchValue, value);
			this.props.dispatch(updateFilterOption(value));
			this.setState({
				filterOn: false
			});
			this.props.dispatch(updateFilteredweatherList(FilterList));
		}
		else if (targetState === "sortBy") {

			if (this.props.citiesInfo.filtered_weather_list && this.props.citiesInfo.filtered_weather_list.length > 0){
				// to apply sort to filtered list
				FilterList = this.onSortList(value === "ascending" ? true : false, this.props.citiesInfo.filtered_weather_list);
			}
			else
				{
					FilterList = this.onSortList(value === "ascending" ? true : false);// to filter the normal weather list
				}

			this.setState({
				filterOn: false
			});
			this.props.dispatch(updateFilteredweatherList(FilterList));
		}
		this.setState({
			[targetState]: value
		});

	}
	render() {
		return <WeatherRosterPage
			citiesInfo={this.props.citiesInfo}
			selected_filter_option={this.props.citiesInfo.selected_filter_option}
			onChangeHandler={this.onStateChange}
			searchValue={this.state.searchValue}
			fileteredList={this.props.citiesInfo.filtered_weather_list}
			onSortList={this.onSortList}
			filterOn={this.state.filterOn}
			onFilterToggle={this.onFilterToggle}
			sortBy={this.state.sortBy}
			onClearFilter={this.onClearFilter}
			onCloseFilterModal={this.onCloseFilterModal}
			onShowFilterModal={this.onShowFilterModal}
			showFilterModal={this.state.showFilterModal}
			onCloseCityModal={this.onCloseCityModal}
			onshowCityModal={this.onshowCityModal}
			showCityModal={this.state.showCityModal}
			currentCity={this.state.currentCity}
			onSetCurrentCity={this.onSetCurrentCity} />;
	}
}
const mapStateToProps = state => ({
	citiesInfo: state.weatherData,
});
export default connect(mapStateToProps)(WeatherRosterContainer);// linking to redux
