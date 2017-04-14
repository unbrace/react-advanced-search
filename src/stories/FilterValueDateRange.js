// @flow
import React from 'react';
import styled from 'styled-components';
import { convertToDateIfPossible } from './utils';

const Input = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 75px;
`;

type Props = {
  value: string | Array<*>,
  onChange: (string | Array<string>) => void,
};

type FromTo = 'from' | 'to';
type State = {
  from: string,
  to: string,
};

const ENTER = 13;
const BACKSPACE = 8;
const TAB = 9;

const addZero = (d: number) => d < 10 ? `0${d}` : d;

class FilterValueDateRange extends React.Component {
  props: Props;
  state: State;

  inputFrom = null;
  inputTo = null;

  constructor(props: Props) {
    super(props);

    if (props.value instanceof Array && props.value.length === 2) {
      this.state = {
        from: props.value[0],
        to: props.value[1],
      };
    } else {
      this.state = {
        from: '',
        to: '',
      };
    }
  }

  handleChange = (fromTo: FromTo) =>
    (evt: SyntheticEvent) => {
      if (evt.target instanceof HTMLInputElement) {
        const value = evt.target.value;
        this.setState(state => ({
          [fromTo]: value,
        }));
      }
    };

  handleKeyDownFrom = (evt: SyntheticKeyboardEvent) => {
    const target = evt.target;

    if (evt.keyCode === ENTER) {
      this.inputTo && this.inputTo.focus();
    } else if (evt.keyCode === BACKSPACE && !this.state.from && !this.state.to) {
      evt.preventDefault();
      this.props.onChange('');
    }
  };

  handleKeyDownTo = (evt: SyntheticKeyboardEvent) => {
    const target = evt.target;
    const handleBlurTo = this.handleBlur('to', true);

    if (evt.keyCode === ENTER || evt.keyCode === TAB) {
      evt.preventDefault();
      handleBlurTo();
    } else if (evt.keyCode === BACKSPACE && !this.state.to) {
      this.inputFrom && this.inputFrom.focus();
    }
  };

  handleBlur = (fromTo: FromTo, submit: boolean = false) =>
    () => {
      this.setState(
        state => ({
          [fromTo]: convertToDateIfPossible(state[fromTo]) || state[fromTo],
        }),
        () => {
          if (submit) {
            if (!this.state.from || !this.state.to) {
              this.props.onChange('');
            } else {
              this.props.onChange([this.state.from, this.state.to]);
            }
          }
        }
      );
    };

  render() {
    const now = new Date();
    const placeholder = `e.g. ${addZero(now.getDate())}${addZero(now.getMonth() + 1)}`;

    return (
      <div>
        <Input
          autoFocus={true}
          innerRef={_c => this.inputFrom = _c}
          value={this.state.from}
          onChange={this.handleChange('from')}
          onBlur={this.handleBlur('from')}
          onKeyDown={this.handleKeyDownFrom}
          placeholder={placeholder}
        />
        {' - '}
        <Input
          innerRef={_c => this.inputTo = _c}
          value={this.state.to}
          onChange={this.handleChange('to')}
          onBlur={this.handleBlur('to', true)}
          onKeyDown={this.handleKeyDownTo}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default FilterValueDateRange;
