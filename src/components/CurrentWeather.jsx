import Inferno from 'inferno';

function CurrentWeather({ day, temp, icon, text }) {
  const weatherIcon = icon ? icon : '017-rainbow.svg';

  return (
    <div className="today">
      <div className="today__left">
        <span className="today__temp">
          {temp}°c
        </span>
        <span className="today__date">
          {day}
        </span>
      </div>
      <div className="today__right">
        <span className="today__icon">
          <img src={`./assets/weather/${weatherIcon}`} alt="rain" />
        </span>
        <span className="today__condition">
          {text}
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
