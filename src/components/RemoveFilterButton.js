// @flow
import styled from 'styled-components';

const RemoveFilterButton = styled.button`
    background: #ccc;
    border: none;
    border-radius: 100%;
    color: #fff;
    cursor: pointer;
    line-height: 0;

    float: left;
    height: 14px;
    margin-right: 6px;
    padding: 0;
    width: 14px;

    &:hover {
      background: #aaa;
    }
    &:focus {
      outline: none;
    }
`;

RemoveFilterButton.defaultProps = {
  children: '×',
};

export default RemoveFilterButton;
