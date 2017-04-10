import find from 'lodash/find';
import moment from 'moment';

export const convertToDateIfPossible = maybeDate => {
  const FORMAT = 'DD/MM/YYYY';
  if (!maybeDate || maybeDate.length < 3 || maybeDate.length > 10) {
    return false;
  }
  const addZero = d => d.length === 1 ? `0${d}` : d;
  const currentYear = moment().year() + '';

  if (maybeDate.match(/^\d+$/)) {
    if (maybeDate.length === 4) {
      // Match 1609, 0609, ...
      const mMiniDate = moment.utc(
        currentYear + '-' + maybeDate[2] + maybeDate[3] + '-' + maybeDate[0] + maybeDate[1]
      );
      if (mMiniDate.isValid()) {
        return mMiniDate.format(FORMAT);
      }
    } else if (maybeDate.length === 6) {
      // Match 160916
      const mMiniDateWithShortYear = moment.utc(
        currentYear[0] +
          currentYear[1] +
          maybeDate[4] +
          maybeDate[5] +
          '-' +
          maybeDate[2] +
          maybeDate[3] +
          '-' +
          maybeDate[0] +
          maybeDate[1]
      );
      if (mMiniDateWithShortYear.isValid()) {
        return mMiniDateWithShortYear.format(FORMAT);
      }
    } else if (maybeDate.length === 8) {
      // Match 16092016, ...
      const mMiniDateWithYear = moment.utc(
        maybeDate[4] +
          maybeDate[5] +
          maybeDate[6] +
          maybeDate[7] +
          '-' +
          maybeDate[2] +
          maybeDate[3] +
          '-' +
          maybeDate[0] +
          maybeDate[1]
      );
      if (mMiniDateWithYear.isValid()) {
        return mMiniDateWithYear.format(FORMAT);
      }
    }
  }

  // Match 16/09/2016, 6/9/2016, 6-9-2016, ...
  const matchFullDate = maybeDate.match(
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{4})$/
  );

  if (matchFullDate) {
    const mFullDate = moment.utc(
      matchFullDate[3] + '-' + addZero(matchFullDate[2]) + '-' + addZero(matchFullDate[1])
    );
    if (mFullDate.isValid()) {
      return mFullDate.format(FORMAT);
    }
  }

  // Match 16/09, 6/9, 6-9
  const matchWithoutYear = maybeDate.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/);
  if (matchWithoutYear) {
    const mWithoutYear = moment.utc(
      currentYear + '-' + addZero(matchWithoutYear[2]) + '-' + addZero(matchWithoutYear[1])
    );
    if (mWithoutYear.isValid()) {
      return mWithoutYear.format(FORMAT);
    }
  }
  return false;
  // console.log(m, moment(m[3]+'/'+m[2]+'/'+m[1]));
  // return new Date(m[3]+'/'+m[2]+'/'+m[1]);
};

export const formatDisplayForMultiSelect = data =>
  value => {
    let display = [];
    const values = value instanceof Array ? value : [value];
    values.forEach(v => {
      const item = find(data, { value: v });
      item && display.push(item.label); // += item ? item.label + ', ' : '';
    });
    return display.length ? display.join(', ') : value; //display.replace(/, $/, '') || value;
  };

export const formatValueDisplay = data =>
  value => {
    const item = find(data, { value });
    return item ? item.label : value;
  };
