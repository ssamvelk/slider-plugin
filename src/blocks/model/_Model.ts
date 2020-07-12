import {
  IModel, sliderType, sliderDirection, modelOptions, scaleType, sliderValueType, sliderRangeValueType,
} from './IModel';
import { checkValue, chechScaleInit } from '../utils/Utils';

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
    
    this.type = options.type || 'single';
    
    this.direction = options.direction || 'horizontal';
    
    this.value = options.value || ((this.type === 'range') ? [0, 100] : 0);
    
    this.tooltip = options.tooltip || false;

    this.scale = {
      init: chechScaleInit(options.scale),
      num: ((options.scale instanceof Object) && options.scale.num) ? (options.scale as scaleType).num : 7,
      type: (options.scale instanceof Object && options.scale.type) ? (options.scale as scaleType).type : 'usual',
    };

    this.setValue(this.value, this.type);
  }

  /** Получить тип слайдера */
  getType(): sliderType {
    return this.type;
  }

  /** Получить шаг слайдера */
  getStep(): number {
    return this.step;
  }

  /** Получить текущее значение слайдера.  */
  getValue(): sliderValueType {
    return this.value;
  }

  /** Установить текущее значение слайдера.  */
  setValue(value: sliderValueType, type: sliderType) {
    const localValue = checkValue(value, this.min, this.max, this.step, this.type);
    if (type === 'single') {
      this.value = localValue as number;
    } else if (type === 'range') {
      this.value = localValue as sliderRangeValueType;
    }
  }

  /** Сменить ориентацию слайдера */
  changeDirection() {
    if (this.direction === 'horizontal') this.direction = 'vertical';
    else if (this.direction === 'vertical') this.direction = 'horizontal';
  }

  /** Сменить type */
  changeType(type: sliderType): boolean {
    if (type === this.type) {
      // console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
      // throw new Error('Нельзя поменять тип слайдера на тот же самый, который установлен');
      return false;
    }
    
    this.type = type;
    let localValue: sliderValueType;

    if (this.type === 'single') { // range -> single
      [localValue] = this.value as sliderRangeValueType;
      (this.value as number) = localValue;
    } else if (this.type === 'range') { // single -> range
      localValue = [this.value, this.value] as sliderRangeValueType;
      (this.value as sliderRangeValueType) = localValue;
    }

    this.setValue(this.value, this.type);
    return true;
  }

  /** Меняет step и меняет value в соответсвии новому шагу */
  changeStep(step: number) {
    let localStep: number = step;
    if (localStep < 0.01) localStep = 0.01;
    if (localStep > (this.max - this.min)) localStep = (this.max - this.min);
    this.step = localStep;
    this.setValue(this.value, this.type);
  }

  /** Меняет scale  */
  changeScale(options: scaleType) {
    this.scale.init = options.init;
    if (options.type) this.scale.type = options.type;
    if (options.num) this.scale.num = options.num;
  }
}
