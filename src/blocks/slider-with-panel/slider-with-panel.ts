import Factory from '../utils/Factory';

Factory(
  'slider-with-panel-0',
  {
    value: 50,
  },
  0,
);

Factory(
  'slider-with-panel-1',
  {
    type: 'range',
    value: [250, 750],
    tooltip: true,
    min: 0,
    max: 1000,
    step: 100,
    scale: { init: true, type: 'numeric', num: 11 },
  },
  1,
);

Factory(
  'slider-with-panel-2',
  {
    min: -100,
    max: 100,
    value: 0,
    step: 10,
    tooltip: true,
    root: 'mySliderVertical',
    scale: { init: true, type: 'numeric', num: 9 },
    direction: 'vertical',
  },
  2,
);

Factory(
  'slider-with-panel-3',
  {
    type: 'range',
    direction: 'vertical',
    value: [0.25, 0.75],
    tooltip: true,
    min: 0,
    max: 1,
    step: 0.25,
    scale: { init: true, type: 'usual', num: 5 },
  },
  3,
);
