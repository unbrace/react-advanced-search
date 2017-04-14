// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const FilterColumnValue = styled.div`
    color: ${getTheme('filterColumn.value.color')};
    font-size: ${getTheme('fontSize')};
    line-height: 1;
    text-decoration: underline;

    ${/* float: left; */ ''}
    margin-right: 18px;
`;

export default FilterColumnValue;
