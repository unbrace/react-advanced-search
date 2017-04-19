// @flow
import styled from 'styled-components';
import getTheme from '../utils/getTheme';

const FakeInputBackground = styled.div`
    background: none;

    height: ${getTheme('height')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`;

export default FakeInputBackground;
