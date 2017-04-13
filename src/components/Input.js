// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const Input = styled.input`
    background: none;
    border: none;
    box-sizing: border-box;
    font-size: ${getTheme('fontSize')};
    outline: none;
    line-height: 1;
`;

export default Input;
