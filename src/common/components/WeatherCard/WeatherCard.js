import React from 'react';
import './WeatherCard.css';
import PropTypes from 'prop-types';

const weatherCard = (props) => {
    const { cardDetails: {
        weather_img,
        CityName = "City Name",
        CountryName = "Country Name",
        weather_condition = "Weather Condition",temp = "NA" } } = props;
    return (
        <React.Fragment>
            {/* card is for desktop view */}
            <div className="card">
                <img src={weather_img} alt="weather_img" />
                <h1>{"City:" + CityName}</h1>
                <h1>{"Country:" + CountryName}</h1>
                <p className="title">{weather_condition+"/"+temp+"c"}</p>
                <p><button onClick={props.onSetCurrentCity.bind(this,props.cardDetails)}>Learn More</button></p>
            </div>
            {/* list id for mobile view */}
            <div className="list">
                <li onClick={props.onSetCurrentCity.bind(this,props.cardDetails)}>
                    <img src={weather_img} alt="weather_img" />
                    <h3>{"City:" + CityName}</h3>
                    <h3>{"Country:" + CountryName}</h3>
                    <p className="title">{weather_condition+"/"+temp+"c"}</p>
                </li>
            </div>
        </React.Fragment>
    );
}

weatherCard.propTypes = {
    cardDetails: PropTypes.object.isRequired
};

weatherCard.defaultProps = {
    cardDetails: {}
}

export default weatherCard;

