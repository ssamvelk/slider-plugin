/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line object-curly-newline
import { IModel, sliderType, sliderDirection, modelOptions, scaleType, sliderValueType } from './IModel';
import { stepСheck, checkValue } from '../utils/Utils';

export default class Model implements IModel {
  min: number;

  max: number;

  step: number;

  type: sliderType;

  direction: sliderDirection;

  tooltip: boolean;

  scale: scaleType;

  value: number | [ number, number ];
  
  private sliderLength: number;
  
  private selectedLength: number;

  // setValue(value: number | [number, number]): object;

  constructor(options: modelOptions) {
    this.min = options.min || 0;
    this.max = options.max || 100;
    this.step = options.step || 1;
    // this.selectedLength = 0;
    if (this.min >= this.max) {
      this.max = this.min + this.step;
    }

    this.type = options.type || 'single';
    this.direction = options.direction || 'horizontal';
    
    // const sliderLength = this.max - this.min;
    this.sliderLength = this.max - this.min;
    this.value = options.value || ((this.type === 'range') ? [0, 100] : 0);
    this.tooltip = options.tooltip || false;
    // this.scale = options.scale || { init: false, num: 5, type: 'usual' };
    this.scale = {
      // eslint-disable-next-line no-nested-ternary
      init: ((typeof options.scale) === 'boolean')
        ? (options.scale as boolean)
        : (((options.scale instanceof Object) && options.scale !== undefined) ? options.scale.init : false),
      num: ((options.scale instanceof Object) && options.scale.num) ? (options.scale as scaleType).num : 7,
      type: (options.scale instanceof Object && options.scale.type) ? (options.scale as scaleType).type : 'usual',
    };
    this.selectedLength = 0;
    this.setValue(options.value!);
  }

  getType(): sliderType {
    return this.type;
  }

  getStep(): number {
    return this.step;
  }

  getValue(): number | [number, number] {
    return this.value;
  }

  setValue(value?: number | [number, number]): object {
    let select = 0;
    let val: number | [number, number] = 0;
    
    if (this.type === 'single') { // && typeof value === 'number'
      let singleVal = value ? value as number : this.max / 2; // let value: number = options.value;

      if (singleVal < this.min) singleVal = this.min;
      if (singleVal > this.max) singleVal = this.max;

      val = singleVal as number;
      select = ((val - this.min) / this.sliderLength) * 100;
    }
    
    if (this.type === 'range') { // && value instanceof Array && value[0] && value[1]
      // eslint-disable-next-line prefer-const
      let rangeVal = value
        ? value as [number, number]
        : [this.min, this.max];

      if (rangeVal[0] < this.min) rangeVal[0] = this.min;
      else if (rangeVal[0] > this.max) rangeVal[0] = this.max;
      
      if (rangeVal[1] > this.max) rangeVal[1] = this.max;
      else if (rangeVal[1] < this.min) rangeVal[1] = this.min;

      // eslint-disable-next-line prefer-destructuring
      if (rangeVal[0] > rangeVal[1]) rangeVal[0] = rangeVal[1];
      
      val = rangeVal as [number, number];
      select = ((val[1] - val[0]) / this.sliderLength) * 100;
    }

    this.value = val;
    this.selectedLength = select;

    return {
      value,
      select,
    };
  }

  private stepСheck(value: number): number {
    return stepСheck(value, this.min, this.max, this.step);
  }

  private checkValue(value: sliderValueType) {
    return checkValue(value, this.min, this.max, this.step, this.type);
  }
}

// const m2 = new Model({
//   step: 3, min: 0, max: 100, type: 'range', direction: 'horizontal', value: [50, 77], scale: { init: true, type: 'numeric' },
// });
// console.log('m2 ====', m2.checkValue([33, 22]));
