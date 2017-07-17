import Inferno from 'inferno';
import Component from 'inferno-component';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toLocaleTimeString(),
      intervalId: null,
    };
  }

  componentDidMount() {
    let time = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() }), 1000;
    });

    this.setState({ intervalId: time });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div className="location">
        <div className="location__icon">
          <img src="./assets/location.svg" alt="location" />
        </div>
        <div className="location__container">
          <p className="location__city">
            {this.props.location}
          </p>
        </div>
        <time className="location__time">
          {this.state.time}
        </time>
      </div>
    );
  }
}

export default Location;
