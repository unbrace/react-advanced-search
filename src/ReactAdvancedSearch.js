// @flow
import React from 'react';
import update from 'react-addons-update';
import find from 'lodash/find';

import FilterValueInput from './FilterValueInput';
import FilterValueSelect from './FilterValueSelect';

import Select from './components/Select';
import SelectWrapper from './components/SelectWrapper';
import Placeholder from './components/Placeholder';
import FakeInput from './components/FakeInput';
import FakeInputBackground from './components/FakeInputBackground';
import FilterColumnValue from './components/FilterColumnValue';
import FilterColumnKey from './components/FilterColumnKey';
import FilterColumn from './components/FilterColumn';
import RemoveFilterButton from './components/RemoveFilterButton';
import Prefix from './components/Prefix';

import type { ReactSelectOption } from './types';

import 'react-select/dist/react-select.css';

type Option = {
  columnField: string,
  type: 'text' | 'select' | 'multiselect' | 'custom',
  columnDisplay?: string | ReactClass<*>,
  customValueComponent?: ReactClass<*>,
  data?: Array<{ value: string, label: string }>,
  formatValueDisplay?: (string | Array<string>) => string | React$Element<*> | Array<string>,
  columnInputOptions?: {},
};

type Filter = {
  column: string,
  value: string | Array<string>,
};

type Props = {
  /**
   * Array of option to fill the column field select
   */
  options: Array<Option>,
  /**
   * Field placeholder, displayed when there's no value
   */
  placeholder?: string,
  /**
   * Filters to show
   */
  filters?: Array<Filter>,
  /**
   * Options to pass to react-select, which is used as column field select.
   * See also: https://github.com/JedWatson/react-select#further-options
   */
  filterColumnSelectOptions?: {},
  /**
   *
   */
  onChange?: () => Array<Filter>,
  /**
   *
   */
  prefix?: React$Element<*>,
};

type State = {
  activeFilterIdx: number,
  activeFilterValueIdx: number,
  filters: Array<Filter>,
};

const buildOptionsForSelect = options => {
  return options.map((option): ReactSelectOption => ({
    value: option.columnField,
    label: option.columnDisplay || option.columnField,
  }));
};

const removeFilterFromState = (idx: number) => (state: State): State => {
  const filters = update(state.filters, { $splice: [[idx, 1]] });
  return {
    activeFilterIdx: -1,
    activeFilterValueIdx: -1,
    filters,
  };
};

class ReactFilterInput extends React.Component {
  defaultProps = {
    placeholder: '',
  };

  props: Props;

  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      activeFilterIdx: -1,
      activeFilterValueIdx: -1,
      filters: props.filters || [],
    };
  }

  handleEnableFilter = (idx: number) => () => {
    this.setState((state: State) => {
      const filters = state.filters.length === idx
        ? update(state.filters, { $push: [{ column: '', value: '' }] })
        : state.filters;
      return {
        activeFilterIdx: idx,
        activeFilterValueIdx: -1,
        filters,
      };
    });
  };

  handleRemoveFilter = (idx: number) => () => {
    this.setState(removeFilterFromState(idx), () => {
      this.props.onChange && this.props.onChange(this.state.filters);
    });
  };

  handleEnableFilterValue = (idx: number) => () => {
    this.setState({
      activeFilterIdx: -1,
      activeFilterValueIdx: idx,
    });
  };

  handleBlur = (idx: number) => () => {
    setTimeout(() =>
      this.setState((state: State) => {
        if (state.filters[idx] && state.filters[idx].column === '') {
          return removeFilterFromState(idx)(state);
        }
        return {
          activeFilterIdx: -1,
        };
      })
    );
  };

  handleFilterColumnChange = (idx: number) => (data: ReactSelectOption) => {
    this.setState((state: State) => ({
      filters: update(state.filters, { [idx]: { column: { $set: data.value } } }),
      activeFilterIdx: -1,
      activeFilterValueIdx: idx,
    }));
  };

  handleFilterValueChange = (idx: number) => (value: string | Array<string>) => {
    this.setState(
      state => ({
        filters: update(state.filters, { [idx]: { value: { $set: value } } }),
        activeFilterValueIdx: -1,
      }),
      () => {
        this.props.onChange && this.props.onChange(this.state.filters);
      }
    );

    if (value) {
      this.handleEnableFilter(idx + 1)();
    } else {
      this.handleRemoveFilter(idx)();
    }
  };

  handleSelectRef = (select: ReactClass<*>) => {
    if (!select) {
      return;
    }
    select.focus();
  };

  renderValueInput(filter: Filter, idx: number) {
    const config: Option = find(this.props.options, { columnField: filter.column });
    const value = filter.value;
    const columnInputOptions = config.columnInputOptions || {};
    let errMsg = '';

    if (config.type === 'text') {
      return (
        <FilterValueInput
          value={value}
          onChange={this.handleFilterValueChange(idx)}
          {...columnInputOptions}
        />
      );
    }

    if (config.type === 'select' || config.type === 'multiselect') {
      if (config.data) {
        return (
          <FilterValueSelect
            options={config.data}
            value={value}
            onChange={this.handleFilterValueChange(idx)}
            multi={config.type === 'multiselect'}
            {...columnInputOptions}
          />
        );
      } else {
        errMsg = `Options is missing 'data' property.`;
      }
    }

    if (config.type === 'custom') {
      if (config.customValueComponent) {
        const Component = config.customValueComponent;
        return (
          <Component
            onChange={this.handleFilterValueChange(idx)}
            value={value}
            {...columnInputOptions}
          />
        );
      } else {
        errMsg = `Option is missing 'customValueComponent' property.`;
      }
    }

    throw new Error(`Could not render value input for type '${config.type}'. ${errMsg}`);
  }

  renderValue(filter: Filter, idx: number): string | React$Element<*> | Array<string> {
    const config: Option = find(this.props.options, { columnField: filter.column });

    if (config && config.formatValueDisplay) {
      return config.formatValueDisplay(filter.value);
    }

    return filter.value instanceof Array ? filter.value.join(', ') : filter.value;
  }

  render() {
    const { options, placeholder, filterColumnSelectOptions, prefix } = this.props;

    const noFiltersActive =
      this.state.activeFilterIdx === -1 && this.state.activeFilterValueIdx === -1;

    return (
      <FakeInput>

        <FakeInputBackground
          onClick={noFiltersActive && this.handleEnableFilter(this.state.filters.length)}
        />

        {prefix &&
          <Prefix>
            {prefix}
          </Prefix>}

        {this.state.filters.map((filter, idx) => (
          <FilterColumn key={idx}>

            <RemoveFilterButton onClick={this.handleRemoveFilter(idx)} />

            {this.state.activeFilterIdx === idx
              ? <SelectWrapper>
                  <Select
                    innerRef={this.handleSelectRef}
                    value={filter.column}
                    options={buildOptionsForSelect(options)}
                    onBlur={this.handleBlur(idx)}
                    autoFocus={true}
                    autoBlur={true}
                    openOnFocus={true}
                    openAfterFocus={true}
                    clearable={false}
                    onChange={this.handleFilterColumnChange(idx)}
                    arrowRenderer={() => {}}
                    {...filterColumnSelectOptions}
                  />
                </SelectWrapper>
              : <FilterColumnKey onClick={this.handleEnableFilter(idx)}>
                  {filter.column}
                </FilterColumnKey>}

            {this.state.activeFilterValueIdx === idx
              ? this.renderValueInput(filter, idx)
              : <FilterColumnValue onClick={this.handleEnableFilterValue(idx)}>
                  {this.renderValue(filter, idx)}
                </FilterColumnValue>}

          </FilterColumn>
        ))}

        {this.state.filters.length === 0 &&
          placeholder &&
          <Placeholder>
            {placeholder}
          </Placeholder>}

        {/* TODO: <Suffix>{suffix}</Suffix> */}

      </FakeInput>
    );
  }
}

export default ReactFilterInput;
