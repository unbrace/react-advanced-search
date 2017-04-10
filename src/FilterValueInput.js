// @flow
import React from 'react';
import Input from './components/Input';

type Props = {
  value: string | Array<*>,
  onChange: (string) => void,
};

type State = {
  value: string,
};

const ENTER = 13;
const BACKSPACE = 8;
const TAB = 9;

class FilterValueInput extends React.Component {
  props: Props;

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value instanceof Array ? '' : props.value || '',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value instanceof Array ? '' : nextProps.value || '',
      });
    }
  }

  /**
   * Store input changes in this component's state
   */
  handleChange = (evt: SyntheticEvent) => {
    if (evt.target instanceof HTMLInputElement) {
      this.setState({
        value: evt.target.value,
      });
    }
  };

  /**
   * When input focus is lost, send input value to the parent
   */
  handleBlur = () => {
    this.props.onChange(this.state.value);
  };

  /**
   * Handle special keyboard inputs
   */
  handleKeyDown = (evt: SyntheticKeyboardEvent) => {
    const target = evt.target;

    if (evt.keyCode === ENTER) {
      this.props.onChange(this.state.value);
    } else if (evt.keyCode === BACKSPACE && !this.state.value) {
      this.props.onChange(this.state.value);
    } else if (evt.keyCode === TAB) {
      evt.preventDefault();
      this.props.onChange(this.state.value);
    }
  };

  render() {
    const { value } = this.props;

    return (
      <Input
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        autoFocus={true}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default FilterValueInput;
