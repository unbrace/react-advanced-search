// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const FakeInput = styled.div`
    background: #fff;
    border: ${getTheme('border')};
    border-radius: ${getTheme('borderRadius')};
    box-sizing: border-box;

    align-items: center;
    display: flex;
    height: ${getTheme('height')};
    line-height: ${getTheme('lineHeight')};
    padding: 6px 12px;
    position: relative;
    width: 100%;
    font-family: ${getTheme('fontFamily')};
`;

export default FakeInput;
