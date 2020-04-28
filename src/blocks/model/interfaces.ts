type sliderType = 'single' | 'range';

type sliderDirection = 'horizontal' | 'vertical';

type modelOptions = {
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean;
  value?: number;
  rangeValueMin?: number;
  rangeValueMax?: number;
};

interface IModel {
  min: number;
  max: number;
  step: number;
  type: sliderType;
  direction: sliderDirection;
  // sliderLength: number;
  tooltip: boolean;
  scale: boolean;
  selectedLength: number;
  // ----------------------------- single
  singleValue?: number;
  // singleSelected?: number;
  // ----------------------------- range
  rangeValueMin?: number;
  rangeValueMax?: number;
  // rangeSelected?: number;
  // ------------------------------ metods
  getType(): sliderType;
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
  sliderDirection,
  modelOptions,
};
