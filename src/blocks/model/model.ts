/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line object-curly-newline
import { IModel, sliderType, sliderDirection, modelOptions, scaleType, sliderValueType, sliderRangeValueType } from './IModel';
import { checkValue } from '../utils/Utils';

export default class Model implements IModel {
  min: number;

  max: number;

  step: number;

  type: sliderType;

  direction: sliderDirection;

  tooltip: boolean;

  scale: scaleType;

  value: number | sliderRangeValueType;

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
      // eslint-disable-next-line no-nested-ternary
      init: ((typeof options.scale) === 'boolean')
        ? (options.scale as boolean)
        : (((options.scale instanceof Object) && options.scale !== undefined) ? options.scale.init : false),
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
    if (type === 'single') {
      this.value = localValue as number;
    } else if (type === 'range') {
      this.value = localValue as sliderRangeValueType;
    }
  }

  changeDirection() {
    if (this.direction === 'horizontal') this.direction = 'vertical';
    else if (this.direction === 'vertical') this.direction = 'horizontal';
  }

  changeType(type: sliderType, value?: sliderValueType): boolean {
    if (type === this.type) {
      console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
      // throw new Error('Нельзя поменять тип слайдера на тот же самый, который установлен');
      return false;
    }
    
    this.type = type;
    
    let localValue: sliderValueType;

    if (value) {
      if (this.type === 'single') { // range -> single
        if ((typeof value) === 'number') {
          this.value = value;
        } else {
          console.log('Введенное значение должно быть числом');
          return false;
        }
      } else if (this.type === 'range') { // single -> range
        if (Array.isArray(value) && value.length === 2) {
          this.value = value;
        } else {
          console.log('Введенное значение должно быть массивом из 2х чисел');
          return false;
        }
      }
    } else if (!value) {
      if (this.type === 'single') { // range -> single
        [localValue] = this.value as sliderRangeValueType;
        (this.value as number) = localValue;
      } else if (this.type === 'range') { // single -> range
        localValue = [this.value, this.value] as sliderRangeValueType;
        (this.value as sliderRangeValueType) = localValue;
      }
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
    this.scale.type = options.type;
    this.scale.num = options.num;
  }
}

// const m2 = new Model({
//   step: 5, min: 0, max: 100, type: 'range', direction: 'horizontal', value: [100, 1111], scale: { init: true, type: 'numeric' },
// });

// console.log('m2=', m2.type, m2);

// m2.changeType('single');

// console.log('m2=', m2.type, m2.getValue());

// m2.changeType('range');

// console.log('m2=', m2.type, m2.getValue());
