// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const SelectWrapper = styled.div`
    align-self: baseline;
    margin-top: -5px;
    position: relative;
    min-width: ${getTheme('select.minWidth')};
`;

export default SelectWrapper;
