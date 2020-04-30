type sliderType = 'single' | 'range';

type sliderDirection = 'horizontal' | 'vertical';

type sliderRangeValueType = [number, number];

type modelOptions = {
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean;
  value?: number | sliderRangeValueType;
};

interface IModel {
  min: number;
  max: number;
  step: number;
  type: sliderType;
  direction: sliderDirection;
  tooltip: boolean;
  scale: boolean;
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
  sliderRangeValueType,
  sliderDirection,
  modelOptions,
};
