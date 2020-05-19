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
  // selectedLength: number;
  // ------------------------------ metods
  getType(): sliderType;

  setValue(value: number | [number, number]): object;
  // getValue(): number;
  // getLimits(): object;
  // getStep(): number;

  // setType(newType: string): void;
  // setLimits(): void;
  // setStep(newStep: number): void;
  // setAValueTo(newValue: number, mutable: boolean, isAuto: boolean): void;
  // setSingleValue(newValue: number, isAuto: boolean): void;
  // setRangeValue(newValues: number, isAuto: boolean): void;
  // recalculateValue(): void;
  // setNearestValue(value: number, viaPercents: boolean, isAuto: boolean): void;
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
