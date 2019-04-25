import React from 'react';
import './WeatherInfoModal.css'
import PropTypes from 'prop-types';

const weatherInfoModal = (props) => {
    const {cityInfo:{  weather_img,
        CityName = "City Name",
        CountryName = "Country Name",
        weather_condition = "Weather Condition",
        temp, cityInfo = "Bio data",
        weatherDate}}=props;
    return (
        <div className="weather-detail" >
        <div className="left-info">
            <img src={weather_img}  alt="weather_img" />
            <h3>{"Tempurature: "+temp+"c"}</h3>
        </div>
        <div className="right-info">
                <h1>{CityName+" "+CountryName}</h1>
                <hr/>
                <h2>{"Weather Condition:"+weather_condition}</h2>
                <h2>{'" '+cityInfo+' "'}</h2>
                <h2>{"Date: "+weatherDate.split('T')[0]}</h2>
        </div>
    </div>
    );
}

weatherInfoModal.propTypes = {
    text: PropTypes.string.isRequired,
    isCross: PropTypes.bool,
    label: PropTypes.string
};

weatherInfoModal.defaultProps = {
    text: "Badge Text"
}
export default weatherInfoModal;