// Stylesheets
import './styles/index.scss';

// Inferno
import Inferno, { render, linkEvent } from 'inferno';
import Component from 'inferno-component';

// Helpers
import debounce from './helpers/index.js';
import getCountryByFullname from './helpers/country.js';
import iconFinder from './helpers/icon-finder.js';
import Unsplash from 'unsplash-js';

// Components
import SearchBox from './components/SearchBox.jsx';
import Location from './components/Location.jsx';
import Navigation from './components/Navigation.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import WeatherItem from './components/WeatherItem.jsx';
import Background from './components/Background.jsx';

/**
 * @description 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    const unsplash = new Unsplash({
      applicationId:
        '922fe1e0451f81ea4e20394ef96fde83087fd0557409bdb2f838ef93faabeac1',
      secret:
        '70ebaabb07e2514d698915e4555b6a019a29a795647594ec51401c70666b5b07',
      callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
    });

    this.state = {
      forecast: null,
      currentWeather: null,
      unsplash,
      photo: './assets/bg.jpg',
      suggest: null,
      currentLocation: null,
      country: null,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const url = `https://geocode.xyz/${pos.coords.latitude},${pos.coords
        .longitude}?json=1 `;

      fetch(url).then(data => data.json()).then(city => {
        this.setWeather(city.city);
        this.handleInput(city.city);
      });
    });
  }

  /**
   * @description The function handleInput will be triggered on every input in
   * the searchbox. It will send an HTTP request to yahoo's public API to fetch
   * the weather of the city typed and set it in the state of the app component.
   * @param {object} instance - Instance of the App component
   * @param {object} event - Event triggered by the input
   */
  handleInput(value) {
    if (value === '') {
      this.setState({ suggest: null });
      return;
    }

    // Create a query string based on the value
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${value}') AND u='c'`;
    // URL of the request with the final query
    const url = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`;

    // Making the HTTP request to the public API
    fetch(url).then(res => res.json()).then(weatherData => {
      if (weatherData.query.results) {
        const weather = weatherData.query.results.channel;
        const pos = weather.title.indexOf(value);
        const suggest = pos < 0 ? null : weather.title.slice(pos);

        this.setState({ suggest });
      } else {
        this.setState({ suggest: null });
      }
    });
  }

  setWeather(value) {
    if (value === '') {
      this.setState({
        forecast: null,
        currentWeather: null,
        currentLocation: null,
        country: null,
      });
      return;
    }

    // Create a query string based on the value
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${value}') AND u='c'`;
    // URL of the request with the final query
    const url = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`;

    // Making the HTTP request to the public API
    fetch(url).then(res => res.json()).then(weatherData => {
      if (weatherData.query.results) {
        const weather = weatherData.query.results.channel;
        const forecast = weather.item.forecast.slice(1, 7);

        const pos = weather.title.indexOf(value);
        let currentLocation = pos < 0 ? null : weather.title.slice(pos);

        const country = getCountryByFullname(currentLocation.split(',')[2]);

        currentLocation = `${currentLocation.split(',')[0]}, ${country}`;

        const currentWeather = weather.item.condition;

        this.setState({ forecast, currentWeather, currentLocation, country });
      } else {
        this.setState({
          forecast: null,
          currentWeather: null,
          currentLocation: null,
          country: null,
        });
      }
    });
  }

  setIcon(code) {
    return iconFinder(code);
  }

  getImage(country) {
    this.state.unsplash.photos
      .searchPhotos(country, undefined, 1, 1)
      .then(res => res.json())
      .then(json => {
        this.setState({ photo: json[0].links.download });
      });
  }

  render() {
    const f = this.state.forecast;
    const c = this.state.currentWeather;

    const day =
      c && `${c.date.split(' ')[0].replace(/,/g, '')} ${c.date.split(' ')[1]}`;

    return (
      <div className="container">
        <div className="hero">
          <Background isShowing={true} src={this.state.photo} />

          <header className="header">
            <SearchBox
              handleInput={debounce(this.handleInput.bind(this), 100)}
              handleEnter={this.setWeather.bind(this)}
              setImage={this.getImage.bind(this)}
              country={getCountryByFullname}
              suggest={this.state.suggest}
            />
            <Location location={this.state.currentLocation} />
          </header>
          <Navigation />
        </div>
        <div className="weather">
          <CurrentWeather
            temp={c && c.temp}
            day={c && day}
            icon={c && this.setIcon(c.code)}
            text={c && c.text}
          />
          <div className="weather__right">
            {f &&
              f.map((day, i) =>
                <WeatherItem
                  key={i}
                  day={day.day}
                  icon={this.setIcon(day.code)}
                  temp={`${day.low}°c - ${day.high}°c`}
                />,
              )}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
