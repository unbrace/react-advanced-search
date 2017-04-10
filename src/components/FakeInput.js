// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const FakeInput = styled.div`
    background: #fff;
    border: 1px solid #ccc;
    border-radius: ${getTheme('borderRadius')};
    box-sizing: border-box;

    align-items: center;
    display: flex;
    height: 36px;
    line-height: ${36 - 12}px;
    padding: 6px 12px;
    position: relative;
    width: 100%;
`;

export default FakeInput;
