// @flow
import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import { ReactAdvancedSearch } from '../';
import * as utils from './utils';
import FilterValueDateRange from './FilterValueDateRange';

const data = [
  {
    value: 'SF',
    label: 'Science fiction',
  },
  {
    value: 'ACTION',
    label: 'Action',
  },
  {
    value: 'DRAMA',
    label: 'Drama',
  },
  {
    value: 'HUMOR',
    label: 'Humor',
  },
];

const actors = [
  {
    value: 'ARNOLD',
    label: 'Arnold Schwarzenegger',
  },
  {
    value: 'CHUCK',
    label: 'Chuck Norris',
  },
];

const options = [
  {
    columnField: 'name',
    type: 'text',
  },
  {
    columnField: 'genre',
    type: 'multiselect',
    data: data,
    formatValueDisplay: utils.formatDisplayForMultiSelect(data),
  },
  {
    columnField: 'actor',
    type: 'select',
    data: actors,
    formatValueDisplay: utils.formatValueDisplay(actors),
  },
];

// eslint-disable-next-line
injectGlobal`
  body {
    font-family: sans-serif;
    font-size: 16px;
  }
`;

storiesOf('ReactAdvancedSearch', module)
  .add('basic input', () => <ReactAdvancedSearch options={[options[0]]} />)
  .add('placeholder', () => (
    <ReactAdvancedSearch options={[options[0], options[2]]} placeholder="Filter by name or actor" />
  ))
  .add('prefix', () => (
    <ReactAdvancedSearch options={[options[0]]} placeholder="Search" prefix={<i>ಠ_ಠ</i>} />
  ))
  .add('multiselect', () => (
    <ReactAdvancedSearch options={options} placeholder="Filter by name, genre or actor" />
  ))
  .add('initial filters', () => (
    <ReactAdvancedSearch
      options={options}
      placeholder="Filter by name or genre"
      filters={[{ column: 'name', value: 'alien' }, { column: 'genre', value: 'SF' }]}
    />
  ))
  .add('custom filter', () => (
    <ReactAdvancedSearch
      options={[
        {
          columnField: 'dateRange',
          type: 'custom',
          customValueComponent: FilterValueDateRange,
        },
      ]}
      placeholder="Search"
    />
  ))
  .add('many filters', () => {
    const theme = {
      reactFilterInput: {
        value: {
          color: '#555',
        },
      },
    };

    const dataScenario = [
      { value: 'AURUBIS INTERN', label: 'Interne flow - Goederen van,naar.' },
      { value: 'AURUBIS OUTBOUND', label: 'Aurubis Finished Goods!' },
      { value: 'AURUBIS WASTE', label: 'Aurubis Waste Weighing' },
      { value: 'AURUBIS WH', label: 'Aurubis Warehouse No weighing' },
      { value: 'AURUBIS WH WEIGHING', label: 'Aurubis Warehouse Weighing' },
      { value: 'FINAL PRODUCT', label: 'Aurubis End Products' },
      { value: 'OTHER NON SCRAP', label: 'Aurubis Other Waste' },
      { value: 'Return Goods ', label: 'Return Goods - Reload' },
      { value: 'RM NON SCRAP', label: 'Aurubis Raw Material Non Scrap' },
      { value: 'SCRAP', label: 'Aurubis Scrap' },
      { value: 'TEST WEIGHING', label: 'Test Weighing (Calibrate)' },
      { value: 'TEST WEIGHING  1STEP', label: 'Test weighing in 1 step' },
      { value: 'TEST WEIGHING 1 SC', label: 'Test Weighing 1 Scenario' },
      { value: 'UMICORE', label: 'Umicore Magazijn met weging' },
      { value: 'UMICORE AFVAL', label: 'Umicore Magazijn zonder weging' },
    ];
    const dataProcessStep = [
      { label: 'ARRIVAL', value: 'ARRIVAL' },
      { label: 'LOGISTICSWEIGHINGIN', value: 'LOGISTICSWEIGHINGIN' },
      { label: 'LOGISTICSWEIGHINGOUT', value: 'LOGISTICSWEIGHINGOUT' },
      { label: 'PGR', value: 'PGR' },
      { label: 'PREPAREARRIVAL', value: 'PREPAREARRIVAL' },
      { label: 'SAMPLINGWEIGHINGIN', value: 'SAMPLINGWEIGHINGIN' },
      { label: 'SAMPLINGWEIGHINGOUT', value: 'SAMPLINGWEIGHINGOUT' },
      { label: 'UNLOADREADY', value: 'UNLOADREADY' },
    ];
    const dataStatus = [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'BLOCKED', value: 'BLOCKED' },
      { label: 'FINAL', value: 'FINAL' },
      { label: 'INACTIVE', value: 'INACTIVE' },
      { label: 'PROVISIONAL', value: 'PROVISIONAL' },
      { label: 'RELOAD', value: 'RELOAD' },
      { label: 'TO BE RELOADED', value: 'TO BE RELOADED' },
    ];

    return (
      <ThemeProvider theme={theme}>
        <ReactAdvancedSearch
          options={[
            { columnField: 'All', type: 'text' },
            {
              columnField: 'Date',
              type: 'text',
              formatValueDisplay: value => {
                return utils.convertToDateIfPossible(value) || value;
              },
            },
            { columnField: 'Parcel', type: 'text' },
            { columnField: 'Delivery', type: 'text' },
            { columnField: 'Shipment', type: 'text' },
            { columnField: 'Material', type: 'text' },
            { columnField: 'ID', type: 'text' },
            { columnField: 'Vendor', type: 'text' },
            { columnField: 'Container nr', type: 'text' },
            { columnField: 'License plate', type: 'text' },
            {
              columnField: 'Scenario',
              type: 'multiselect',
              data: dataScenario,
              formatValueDisplay: utils.formatDisplayForMultiSelect(dataScenario),
            },
            {
              columnField: 'Process step',
              type: 'multiselect',
              data: dataProcessStep,
              formatValueDisplay: utils.formatDisplayForMultiSelect(dataProcessStep),
            },
            {
              columnField: 'Status',
              type: 'multiselect',
              data: dataStatus,
              formatValueDisplay: utils.formatDisplayForMultiSelect(dataStatus),
            },
          ]}
          placeholder="Date, Parcel, Delivery, Shipment, Material, ID, Vendor, Container nr, License plate, Scenario, Process step, Status"
        />
      </ThemeProvider>
    );
  })
  .add('themed', () => {
    const theme = {
      reactFilterInput: {
        borderRadius: '0',
        height: '50px',
        lineHeight: '16.666px',
        fontFamily: 'Trebuchet MS',
        fontSize: '16px',
        backgroundColor: '#f3f3f3',
        placeHolderColor: 'rgba(28, 29, 39, 0.5)',
        filterColumn: {
          value: {
            color: '#1C1D25',
          },
          key: {
            color: '#1fa67a',
          },
          remove: {
            color: '#f3f3f3',
            backgroundColor: '#1fa67a',
            hoverBackground: '#024047',
            borderRadius: '0',
          },
        },
        select: {
          minWidth: '300px',
          color: '#1C1D25',
          height: '41px',
          selectValue: {
            backgroundColor: '#1fa67a',
            borderRadius: '0',
            border: 'none',
            color: '#f3f3f3',
            fontSize: '16px',
            marginTop: '4px',
            fontWeight: 'bold',
            hoverBackground: '#024047',
            hoverColor: '#f3f3f3',
          },
          selectOption: {
            menuTopMargin: '5px',
            menuLeft: '-33px',
            padding: '10px 20px',
            focusedBackground: 'rgba(28, 29, 39, 0.1)',
            selectedBackground: 'rgba(28, 29, 39, 0.2)',
            disabledColor: '#eee',
          },
        },
      },
    };

    return (
      <ThemeProvider theme={theme}>
        <ReactAdvancedSearch
          options={options}
          // filterColumnSelectOptions={{
          // optionComponent: MyCustomOptionComponent,
          // }}
          placeholder="Search..."
          filters={[{ column: 'name', value: 'alien' }]}
        />
      </ThemeProvider>
    );
  })
  .add('Action: onChange', () => {
    return (
      <ReactAdvancedSearch
        onChange={action('changed')}
        options={options}
        placeholder="Filter by name, genre or actor"
      />
    );
  });
