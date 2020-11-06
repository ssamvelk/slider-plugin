import {
  IModel,
  sliderType,
  sliderDirection,
  modelOptions,
  scaleType,
  sliderValueType,
  sliderRangeValueType,
} from './IModel';

import {
  checkValue,
  checkScaleInit,
  VERTICAL_DIRECTION,
  HORIZONTAL_DIRECTION,
  SINGLE_TYPE,
  RANGE_TYPE,
} from '../utils/Utils';

export default class Model implements IModel {
  min: number;

  max: number;

  step: number;

  type: sliderType;

  direction: sliderDirection;

  tooltip: boolean;

  scale: scaleType;

  value: sliderValueType;

  constructor(options: modelOptions) {
    this.min = options.min || 0;

    this.max = options.max || 100;
    
    this.step = options.step || 1;

    if (this.min >= this.max) {
      this.max = this.min + this.step;
    }
    
    this.type = options.type || SINGLE_TYPE;
    
    this.direction = options.direction || HORIZONTAL_DIRECTION;
    
    this.value = options.value || ((this.type === RANGE_TYPE) ? [0, 100] : 0);
    
    this.tooltip = options.tooltip || false;

    this.scale = {
      init: checkScaleInit(options.scale),
      num: ((options.scale instanceof Object) && options.scale.num) ? (options.scale as scaleType).num : 7,
      type: (options.scale instanceof Object && options.scale.type) ? (options.scale as scaleType).type : 'usual',
    };

    this.setValue(this.value, this.type);
  }

  getType(): sliderType {
    return this.type;
  }

  getStep(): number {
    return this.step;
  }

  getValue(): sliderValueType {
    return this.value;
  }

  setValue(value: sliderValueType, type: sliderType) {
    const localValue = checkValue(value, this.min, this.max, this.step, this.type);
    if (type === SINGLE_TYPE) {
      this.value = localValue as number;
    } else if (type === RANGE_TYPE) {
      this.value = localValue as sliderRangeValueType;
    }
  }

  changeDirection() {
    if (this.direction === HORIZONTAL_DIRECTION) this.direction = VERTICAL_DIRECTION;
    else if (this.direction === VERTICAL_DIRECTION) this.direction = HORIZONTAL_DIRECTION;
  }

  changeType(type: sliderType): boolean {
    if (type === this.type) {
      return false;
    }
    
    this.type = type;
    let localValue: sliderValueType;

    if (this.type === SINGLE_TYPE) {
      [localValue] = this.value as sliderRangeValueType;
      (this.value as number) = localValue;
    } else if (this.type === RANGE_TYPE) {
      localValue = [this.value, this.value] as sliderRangeValueType;
      (this.value as sliderRangeValueType) = localValue;
    }

    this.setValue(this.value, this.type);
    return true;
  }

  changeStep(step: number) {
    let localStep: number = step;
    if (localStep < 0.01) localStep = 0.01;
    if (localStep > (this.max - this.min)) localStep = (this.max - this.min);
    this.step = localStep;
    this.setValue(this.value, this.type);
  }

  changeScale(options: scaleType) {
    this.scale.init = options.init;
    if (options.type) this.scale.type = options.type;
    if (options.num) this.scale.num = options.num;
  }
}
