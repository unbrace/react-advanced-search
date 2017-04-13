// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const FilterColumnKey = styled.div`
    color: #ccc;
    font-size: ${getTheme('fontSize')};
    line-height: 1;
    text-transform: uppercase;
    float: left;
    margin-right: 6px;
`;

export default FilterColumnKey;
