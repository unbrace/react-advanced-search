// @flow
import styled from 'styled-components';
import RSelect from 'react-select';
import getTheme from './getTheme';

const Select = styled(RSelect)`
  .Select-control {
    background-color: ${getTheme('backgroundColor')} !important;
    border: none;
    height: ${getTheme('select.height')};
    font-size: ${getTheme('fontSize')};

    .Select-placeholder {
      color: ${getTheme('placeHolderColor')};
    }

    .Select-input input {
      color: ${getTheme('select.color')};
    }

    .Select-value {
      background-color: ${getTheme('select.selectValue.backgroundColor')};
      border-radius: ${getTheme('select.selectValue.borderRadius')};
      border: ${getTheme('select.selectValue.border')};
      color: ${getTheme('select.selectValue.color')};
      font-size: ${getTheme('select.selectValue.fontSize')};
      font-weight: ${getTheme('select.selectValue.fontWeight')};
      margin-top: ${getTheme('select.selectValue.marginTop')};

      .Select-value-icon {
        &:hover,&:focus {
          color: ${getTheme('select.selectValue.hoverColor')};
          background-color: ${getTheme('select.selectValue.hoverBackground')};
        }
      }
    }

    & + .Select-menu-outer {
      .Select-option {
        color: ${getTheme('select.color')};
        background-color: ${getTheme('backgroundColor')};

        &.is-selected {
        		background-color: ${getTheme('select.selectOption.selectedBackground')} !important;
        	}

        	&.is-focused {
        		background-color: ${getTheme('select.selectOption.focusedBackground')} !important;
        	}

        	&.is-disabled {
        		color: ${getTheme('select.selectOption.disabledColor')};
        	}
      }

      .Select-noresults {
        background-color: ${getTheme('backgroundColor')};
      }
    }
  }

  /*.Select-arrow-zone {*/
    /*display: none;*/
  /*}*/
`;

export default Select;
