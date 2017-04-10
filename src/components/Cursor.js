// @flow
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
`;

const Cursor = styled.div`
  position: relative;
  color: #2E3D48;
  font-weight: 100;
  font-size: 1.5em;
  animation: 1s ${blink} step-end infinite;
`;

Cursor.defaultProps = {
  children: '|',
};

export default Cursor;
