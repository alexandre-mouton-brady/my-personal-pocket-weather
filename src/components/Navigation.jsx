import Inferno from 'inferno';

function Navigation() {
  return (
    <nav className="navigation">
      <a className="navigation__link" href="#0">
        <img src="./assets/weather/011-sun-1.svg" alt="weather" />
        <span>Weather</span>
      </a>
    </nav>
  );
}

export default Navigation;
