// @flow
import styled from 'styled-components';
import RSelect from 'react-select';
import getTheme from './getTheme';

const Select = styled(RSelect)`
  .Select-control {
    background-color: none
    border: none;
    height: 34px;
    font-size: ${getTheme('fontSize')};
  }
  /*.Select-arrow-zone {*/
    /*display: none;*/
  /*}*/
`;

export default Select;
