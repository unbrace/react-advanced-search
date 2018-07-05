// @flow
import styled from 'styled-components';
import getTheme from '../utils/getTheme';

const Placeholder = styled.div`
    font-size: ${getTheme('fontSize')};
    color: ${getTheme('placeHolderColor')};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export default Placeholder;
