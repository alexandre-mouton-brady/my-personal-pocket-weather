import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

function handleSearch(instance, e) {
  const value = e.target.value;
  instance.setState({ value });
  instance.props.setWeather(value);
}

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <input value={this.state.value} onInput={linkEvent(this, handleSearch)} />
    );
  }
}

export default SearchBox;
