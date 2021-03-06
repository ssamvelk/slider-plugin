type sliderType = 'single' | 'range';

type sliderDirection = 'horizontal' | 'vertical';

type sliderValueType = number | sliderRangeValueType;
type sliderRangeValueType = [number, number];

type scaleType = {
  init: boolean;
  num?: number;
  type?: 'numeric' | 'usual';
};

type modelOptions = {
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean | scaleType;
  value?: sliderValueType;
};

interface IModel {
  min: number;
  max: number;
  step: number;
  type: sliderType;
  direction: sliderDirection;
  tooltip: boolean;
  scale: scaleType;
  value: number | [ number, number];
  setValue(value: sliderValueType, type: sliderType): void;
  changeDirection(): void;
  changeType(type: sliderType, value?: sliderValueType): boolean;
  changeStep(step: number): void;
  changeScale(options: scaleType): void;
  getType(): sliderType;
  getValue(): sliderValueType;
  getStep(): number;
}

export {
  IModel,
  sliderType,
  sliderValueType,
  sliderDirection,
  modelOptions,
  sliderRangeValueType,
  scaleType,
};
