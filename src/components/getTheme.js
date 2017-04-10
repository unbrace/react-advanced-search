// @flow
import get from 'lodash/get';
import defaultTheme from './defaultTheme';

type Props = {
  theme: {},
};

export default (path: string) =>
  (props: Props): string => {
    return get(
      props.theme,
      'reactFilterInput.' + path,
      get(defaultTheme, 'reactFilterInput.' + path)
    );
  };
