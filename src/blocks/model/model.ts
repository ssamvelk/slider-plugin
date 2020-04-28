/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line object-curly-newline
import { IModel, sliderType, sliderDirection, modelOptions } from './interfaces';

export default class Model implements IModel {
  min: number;

  max: number;

  step: number;

  type: sliderType;

  direction: sliderDirection;

  tooltip: boolean;

  scale: boolean;

  // ----------------------------- single
  singleValue?: number;

  // singleSelected?: number;

  // ----------------------------- range
  rangeValueMin?: number;

  rangeValueMax?: number;

  // static rangeSelected?: number;

  // ----------------------------
  private sliderLength: number;
  
  selectedLength: number;

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
    let select = 0;
    // --------------single
    if (this.type === 'single') {
      let { value } = options; // let value: number = options.value;

      if (value! < this.min) value = this.min;
      if (value! > this.max) value = this.max;

      this.singleValue = value || this.max / 2;

      select = ((this.singleValue - this.min) / this.sliderLength) * 100;
    }
    // --------------range
    // eslint-disable-next-line no-empty
    if (this.type === 'range') {
      let valMin = options.rangeValueMin || this.min;
      let valMax = options.rangeValueMax || this.max;

      if (valMin! < this.min) valMin = this.min;
      if (valMax! > this.max) valMax = this.max;
      if (valMin! > valMax!) valMin = valMax;

      this.rangeValueMin = valMin;
      this.rangeValueMax = valMax;
      select = ((this.rangeValueMax! - this.rangeValueMin!) / this.sliderLength) * 100;
    }

    this.selectedLength = select;
    this.tooltip = options.tooltip || false;
    this.scale = options.scale || false;
  }

  getType(): sliderType {
    return this.type;
  }
}

const m = new Model({ });
const m2 = new Model({
  type: 'range', direction: 'horizontal', rangeValueMin: 50, rangeValueMax: 77,
});
console.log(m);
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
