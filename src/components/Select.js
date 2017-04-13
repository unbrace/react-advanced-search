// @flow
import styled from 'styled-components';
import RSelect from 'react-select';
import getTheme from './getTheme';

const Select = styled(RSelect)`
  .Select-control {
    background-color: none;
    border: none;
    height: 34px;
    font-size: ${getTheme('fontSize')};

    .Select-input input {
      color: ${getTheme('select.color')};
    }

    .Select-value {
      background-color: ${getTheme('select.selectValue.backgroundColor')};
      border-radius: ${getTheme('select.selectValue.borderRadius')};
      border: ${getTheme('select.selectValue.border')};
      color: ${getTheme('select.selectValue.color')};
      font-size: ${getTheme('select.selectValue.fontSize')};
      font-weight: ${getTheme('select.selectValue.fontWeight')};
      margin-top: ${getTheme('select.selectValue.marginTop')};
    }
  }

  /*.Select-arrow-zone {*/
    /*display: none;*/
  /*}*/
`;

export default Select;
