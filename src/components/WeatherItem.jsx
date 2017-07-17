import Inferno from 'inferno';

function WeatherItem({ day, icon, temp }) {
  return (
    <div className="weekday">
      <span className="weekday__name">
        {day}
      </span>
      <div className="weekday__icon">
        <img src={`./assets/weather/${icon}`} alt="wind" />
      </div>
      <div className="weekday__temp">
        {temp}
      </div>
    </div>
  );
}

export default WeatherItem;
