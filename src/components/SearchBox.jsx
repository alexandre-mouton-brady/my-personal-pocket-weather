import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

function handleSearch(instance, e) {
  const value = e.target.value.replace(/\b\w/g, l => l.toUpperCase());
  instance.setState({ value });
  instance.props.handleInput(value);
}

function handleCompletion(instance, e) {
  if (!instance.props.suggest) return;

  if (e.key === 'Enter') {
    const initial = instance.props.suggest.split(',')[2];
    const country = instance.props.country(initial);
    const search = instance.props.suggest.split(',')[0];

    instance.setState({ value: instance.props.suggest });
    instance.props.handleEnter(search);
    instance.props.setImage(country);

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
        <svg
          className="search-box__icon"
          x="0px"
          y="0px"
          viewBox="0 0 26 26"
          style="enable-background:new 0 0 26 26;"
          width="26px"
          height="26px"
        >
          <path
            d="M25,2H9C8.449,2,8,2.449,8,3c0,0,0,7,0,9s-2,2-2,2H1c-0.551,0-1,0.449-1,1v8c0,0.551,0.449,1,1,1h24   c0.551,0,1-0.449,1-1V3C26,2.449,25.551,2,25,2z M22,14c0,1.436-1.336,4-4,4h-3.586l1.793,1.793c0.391,0.391,0.391,1.023,0,1.414   C16.012,21.402,15.756,21.5,15.5,21.5s-0.512-0.098-0.707-0.293l-3.5-3.5c-0.391-0.391-0.391-1.023,0-1.414l3.5-3.5   c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L14.414,16H18c1.398,0,2-1.518,2-2v-2c0-0.553,0.447-1,1-1s1,0.447,1,1V14z"
            fill="#333333"
          />
        </svg>
      </div>
    );
  }
}

export default SearchBox;
