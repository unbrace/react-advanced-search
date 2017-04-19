// @flow
import styled from 'styled-components';
import getTheme from '../utils/getTheme';

const FilterColumnKey = styled.div`
    color: ${getTheme('filterColumn.key.color')};
    font-size: ${getTheme('fontSize')};
    line-height: 1;
    text-transform: uppercase;
    float: left;
    margin-right: 6px;
`;

export default FilterColumnKey;
