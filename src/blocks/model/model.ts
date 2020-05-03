/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line object-curly-newline
import { IModel, sliderType, sliderDirection, modelOptions } from './IModel';

export default class Model implements IModel {
  min: number;

  max: number;

  step: number;

  type: sliderType;

  direction: sliderDirection;

  tooltip: boolean;

  scale: boolean;

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
      console.log('!!! min >= max !!!');
      // throw Error(' min >= max');
    }

    this.type = options.type || 'single';
    this.direction = options.direction || 'horizontal';
    
    // const sliderLength = this.max - this.min;
    this.sliderLength = this.max - this.min;
    this.value = 0;
    this.selectedLength = 0;
    this.setValue(options.value!);
    this.tooltip = options.tooltip || false;
    this.scale = options.scale || false;
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
        : [this.min + this.step, this.max - this.step];

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
}

const m2 = new Model({
  min: 10, max: 5, type: 'range', direction: 'horizontal', value: [50, 77],
});
console.log(m2);


// getValue(): number {
//   throw new Error('Method not implemented.');
// }

// getLimits(): object {
//   throw new Error('Method not implemented.');
// }

// getStep(): number {
//   throw new Error('Method not implemented.');
// }

// setType(newType: string): void {
//   throw new Error('Method not implemented.');
// }

// setLimits(): void {
//   throw new Error('Method not implemented.');
// }

// setStep(newStep: number): void {
//   throw new Error('Method not implemented.');
// }

// setAValueTo(newValue: number, mutable: boolean, isAuto: boolean): void {
//   throw new Error('Method not implemented.');
// }

// setSingleValue(newValue: number, isAuto: boolean): void {
//   throw new Error('Method not implemented.');
// }

// setRangeValue(newValues: number, isAuto: boolean): void {
//   throw new Error('Method not implemented.');
// }

// recalculateValue(): void {
//   throw new Error('Method not implemented.');
// }

// setNearestValue(value: number, viaPercents: boolean, isAuto: boolean): void {
//   throw new Error('Method not implemented.');
// }


// const a: sliderRangeValueType = [10, 22];
// const [b, c] = a;

// console.log(b);
// console.log(c);
// console.log('a =', a, typeof a, Array.isArray(a), '----instance', a instanceof Array);
