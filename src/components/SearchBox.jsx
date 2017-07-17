import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

function handleSearch(instance, e) {
  const value = e.target.value;
  instance.setState({ value });
  instance.props.handleInput(value);
}

function handleCompletion(instance, e) {
  if (!instance.props.suggest) return;

  if (e.key === 'Enter') {
    instance.setState({ value: instance.props.suggest });
    instance.props.handleEnter(instance.props.suggest);
    instance.props.setImage(instance.props.country);

    e.target.blur();
  }
}

function handleFocus(instance, e) {
  instance.setState({ suggest: '' });
}

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      search: false,
    };
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="search-box" data-placeholder={this.props.suggest}>
        <input
          className="search-box__input"
          value={this.state.value}
          onInput={linkEvent(this, handleSearch)}
          onKeyPress={linkEvent(this, handleCompletion)}
          defaultValue={this.props.suggest}
        />
      </div>
    );
  }
}

export default SearchBox;
