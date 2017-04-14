// @flow
import styled from 'styled-components';
import getTheme from './getTheme';

const RemoveFilterButton = styled.button`
    background: ${getTheme('filterColumn.remove.backgroundColor')};
    border: none;
    border-radius: ${getTheme('filterColumn.remove.borderRadius')};
    color: ${getTheme('filterColumn.remove.color')};
    cursor: pointer;
    line-height: 0;

    float: left;
    height: 14px;
    margin-right: 6px;
    padding: 0;
    width: 14px;

    &:hover {
      background: ${getTheme('filterColumn.remove.hoverBackground')};
    }
    &:focus {
      outline: none;
    }
`;

RemoveFilterButton.defaultProps = {
  children: '×',
};

export default RemoveFilterButton;
