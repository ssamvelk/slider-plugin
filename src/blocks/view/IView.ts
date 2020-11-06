import { sliderType, sliderDirection, sliderValueType } from '../model/IModel';

interface IView {
  root: HTMLDivElement,
  wrap: HTMLDivElement,
  sliderLine: HTMLDivElement,
  selectSegment?: HTMLDivElement,
  handle?: HTMLDivElement;
  handleMin?: HTMLDivElement;
  handleMax?: HTMLDivElement;
  tooltip?: HTMLDivElement;
  tooltipMin?: HTMLDivElement;
  tooltipMax?: HTMLDivElement;
  scale?: HTMLDivElement;
}

type initViewOptions = {
  root?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean | scaleType;
  value?: sliderValueType;
};

type defaultViewOptions = {
  min: number;
  max: number;
  step: number;
  value: sliderValueType;
  type: sliderType;
  direction: sliderDirection;
  scale: scaleType;
  tooltip: boolean;
};

type scaleType = {
  init: boolean;
  num?: number;
  type?: 'numeric' | 'usual';
};

export {
  IView,
  initViewOptions,
  defaultViewOptions,
  scaleType,
};
