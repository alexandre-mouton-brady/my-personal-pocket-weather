// Stylesheets
import './styles/index.scss';

// Inferno
import Inferno, { render, linkEvent } from 'inferno';
import Component from 'inferno-component';

// Helpers
import { debounce } from './helpers/index.js';

// Components
import SearchBox from './components/SearchBox.js';

/**
 * @description The function handleInput will be triggered on every input in
 * the searchbox. It will send an HTTP request to yahoo's public API to fetch
 * the weather of the city typed and set it in the state of the app component.
 * @param {object} instance - Instance of the App component
 * @param {object} event - Event triggered by the input
 */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      currentWeather: null,
    };
  }

  handleInput(value) {
    // Create a query string based on the value
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${value}') AND u='c'`;
    // URL of the request with the final query
    const url = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`;

    // Making the HTTP request to the public API
    fetch(url).then(res => res.json()).then(weatherData => {
      if (weatherData.query.results) {
        const weather = weatherData.query.results.channel;
        const currentWeather = weather.item.forecast[0];

        this.setState({ weather, currentWeather });
      } else {
        this.setState({ weather: null, currentWeather: null });
      }
    });
  }

  render() {
    const w = this.state.weather;

    console.log(this.state);

    const content = !this.state.weather
      ? <div>Loading data...</div>
      : <div>
          <h1>
            Meteo for {w.location.city}, {w.location.country}
          </h1>
          {w.item.forecast.map(day => {
            return (
              <div className="forecast">
                <h3>
                  {day.date}
                </h3>
                <p>
                  {day.text}
                </p>
                <p>
                  <span>{day.low}</span> - <span>{day.high}</span>
                </p>
              </div>
            );
          })}
        </div>;

    return (
      <div>
        <SearchBox setWeather={debounce(this.handleInput.bind(this), 300)} />
        {content}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
