import { IView, initViewOptions, defaultViewOptions } from './IView';
import {
  sliderType, sliderDirection, sliderValueType, sliderRangeValueType,
} from '../model/IModel';

/* eslint-disable @typescript-eslint/no-unused-vars */
class View implements IView {
  root!: HTMLDivElement; // | HTMLBodyElement
  // | HTMLBodyElement

  wrap!: HTMLDivElement;

  sliderLine!: HTMLDivElement;

  selectSegment!: HTMLDivElement;

  handle?: HTMLDivElement | undefined;

  handleMin?: HTMLDivElement | undefined;

  handleMax?: HTMLDivElement | undefined;

  tooltip?: HTMLDivElement;

  tooltipMin?: HTMLDivElement | undefined;

  tooltipMax?: HTMLDivElement | undefined;

  scale?: HTMLDivElement | undefined;

  private viewValues: defaultViewOptions;

  constructor(options: initViewOptions) {
    this.viewValues = {
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      type: options.type || 'single',
      value: options.value || ((options.type === 'range') ? [0, 100] : 50),
      direction: options.direction || 'horizontal',
      scale: options.scale || false,
      tooltip: options.tooltip || false,
    };
    
    this.init(options);
    this.initStyles(options.type, options.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
  }

  private init(opt: initViewOptions) {
    if (!this.root) {
      this.root = document
        .getElementById(opt.root as string) as HTMLDivElement || document.body;
    }

    (this.wrap = document.createElement('div')).classList.add('slider__wrp');

    if (this.root === document.body) {
      this.root.insertBefore(this.wrap, document.querySelector('script'));
    } else {
      this.root.appendChild(this.wrap);
    }

    (this.sliderLine = document.createElement('div')).classList.add('slider__line');

    this.wrap.appendChild(this.sliderLine);

    (this.selectSegment = document.createElement('div')).classList.add('slider__select');
    
    if (this.viewValues.type === 'single') {
      this.sliderLine.appendChild(this.selectSegment);

      (this.handle = document.createElement('div')).classList.add('slider__handle');

      this.sliderLine.appendChild(this.handle);

      if (this.viewValues.tooltip) {
        (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
        this.handle.appendChild(this.tooltip);
      }
    } else if (this.viewValues.type === 'range') {
      (this.handleMin = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMin);
      
      this.sliderLine.appendChild(this.selectSegment);
      
      (this.handleMax = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMax);

      if (this.viewValues.tooltip) {
        (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMin.appendChild(this.tooltipMin);

        (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMax.appendChild(this.tooltipMax);
      }
    }

    if (this.viewValues.scale) {
      this.initScale(opt.direction);
    }
  }

  private initStyles(type: sliderType = 'single', direction: sliderDirection = 'horizontal') {
    if (direction === 'horizontal') {
      this.wrap.classList.add('slider__wrp_horizontal');
      this.sliderLine.classList.add('slider__line_horizontal');
      this.selectSegment.classList.add('slider__select_horizontal');

      if (type === 'single') {
        if (this.handle) this.handle.classList.add('slider__handle_horizontal');
        if (this.tooltip) this.tooltip.classList.add('slider__tooltip_horizontal');
      } else if (type === 'range') {
        if (this.handleMin) this.handleMin.classList.add('slider__handle_horizontal');
        if (this.handleMax) this.handleMax.classList.add('slider__handle_horizontal');
        if (this.tooltipMin) this.tooltipMin.classList.add('slider__tooltip_horizontal');
        if (this.tooltipMax) this.tooltipMax.classList.add('slider__tooltip_horizontal');
      }
      
      if (this.scale) this.scale.classList.add('slider__scale_horizontal');
    } else if (direction === 'vertical') {
      this.wrap.classList.add('slider__wrp_vertical');
      this.sliderLine.classList.add('slider__line_vertical');
      this.selectSegment.classList.add('slider__select_vertical');

      if (type === 'single') {
        if (this.handle) this.handle.classList.add('slider__handle_vertical');
        if (this.tooltip) this.tooltip.classList.add('slider__tooltip_vertical');
      } else if (type === 'range') {
        if (this.handleMin) this.handleMin.classList.add('slider__handle_vertical');
        if (this.handleMax) this.handleMax.classList.add('slider__handle_vertical');
        if (this.tooltipMin) this.tooltipMin.classList.add('slider__tooltip_vertical');
        if (this.tooltipMax) this.tooltipMax.classList.add('slider__tooltip_vertical');
      }
      if (this.scale) this.scale.classList.add('slider__scale_vertical');
    }
  }

  private initScale(direction?: sliderDirection) {
    (this.scale = document.createElement('div')).classList.add('slider__scale');
    const ul = document.createElement('ul');
    ul.classList.add('slider__scale-list');
    const dirLocalValue = direction || 'horizontal';
    if (dirLocalValue === 'horizontal') ul.classList.add('slider__scale-list_horizontal');
    else if (dirLocalValue === 'vertical') ul.classList.add('slider__scale-list_vertical');

    for (let i = 0; i < 5; i += 1) {
      const li = document.createElement('li');
      li.classList.add('slider__scale-item');
      li.classList.add(`slider__scale-item_${dirLocalValue}`);
      li.id = `slider__scale-item${i + 1}`;
      ul.appendChild(li);
    }
    this.scale.appendChild(ul);
    this.wrap.appendChild(this.scale);
  }

  private setValue(value: sliderValueType, type: sliderType) {
    const localValue = this.checkValue(value);
    if (this.viewValues.direction === 'horizontal') {
      if (type === 'single') {
        this.viewValues.value = localValue as number;
        this.selectSegment.style.width = `calc(${this.invertToPersent(this.viewValues.value)}%)`; // `calc(${this.viewValues.value}%)`;
        this.handle!.style.left = `calc(${this.invertToPersent(this.viewValues.value)}% - 15px)`;
      } else if (type === 'range') {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.left = `calc(${this.invertToPersent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.width = `calc(${this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.left = `calc(${this.invertToPersent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.left = `calc(${this.invertToPersent(this.viewValues.value[1])}% - 15px)`;
      }
    } else if (this.viewValues.direction === 'vertical') {
      if (type === 'single') {
        this.viewValues.value = localValue as number;
        this.selectSegment.style.height = `calc(${this.invertToPersent(this.viewValues.value)}%)`; // `calc(${this.viewValues.value}%)`;
        this.handle!.style.top = `calc(${this.invertToPersent(this.viewValues.value)}% - 15px)`;
      } else if (type === 'range') {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.top = `calc(${this.invertToPersent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.height = `calc(${this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.top = `calc(${this.invertToPersent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.top = `calc(${this.invertToPersent(this.viewValues.value[1])}% - 15px)`;
      }
    }
  }

  private checkValue(value: sliderValueType) {
    let newLocal = value as number;
    if (this.viewValues.type === 'single') {
      if (newLocal < this.viewValues.min) {
        newLocal = this.viewValues.min;
        console.log('value не может быть меньше минимального порога значений, меняем на минимальный');
      }
      if (newLocal > this.viewValues.max) {
        newLocal = this.viewValues.max;
        console.log('value не может быть больше максимального порога значений, меняем на максимальный');
      }
      return newLocal;
    } if (this.viewValues.type === 'range' && (value instanceof Array === true)) {
      const newLocal2 = value as [number, number];
      if (newLocal2[0] < this.viewValues.min) {
        newLocal2[0] = this.viewValues.min;
        console.log('valueMin не может быть меньше минимального порога значений, меняем на минимальный');
      }
      if (newLocal2[0] > this.viewValues.max) {
        newLocal2[0] = this.viewValues.max;
        console.log('valueMin не может быть больше максимального порога значений, меняем на максимальный');
      }
      if (newLocal2[1] > this.viewValues.max) {
        newLocal2[1] = this.viewValues.max;
        console.log('valueMax не может быть больше максимального порога значений, меняем на максимальный');
      }
      if (newLocal2[1] < newLocal2[0]) {
        console.log('valueMax не может быть меньше valueMin, уравниваем их');
        newLocal2[1] = newLocal2[0];
      }
      // eslint-disable-next-line prefer-destructuring
      if (newLocal2[0] > newLocal2[1]) {
        console.log('valueMin не может быть больше valueMax, уравниваем их');
        newLocal2[0] = newLocal2[1];
      }
      return newLocal2;
    }
  }

  private invertToPersent(value: number) {
    return ((value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min)) * 100;
  }

  private clearRoot() {
    // this.sliderLine.remove();
    // this.scale?.remove();
    this.wrap.remove();
  }

  changeDirection() {
    if (this.viewValues.direction === 'horizontal') this.viewValues.direction = 'vertical';
    else if (this.viewValues.direction === 'vertical') this.viewValues.direction = 'horizontal';

    this.clearRoot();
    this.init(this.viewValues);
    this.initStyles(this.viewValues.type, this.viewValues.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
  }
  
  changeType(type: sliderType, value?: sliderValueType): boolean {
    if (type === this.viewValues.type) {
      console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
      // throw new Error('Нельзя поменять тип слайдера на тот же самый, который установлен');
      return false;
    }
    
    this.viewValues.type = type;
    
    let localValue: sliderValueType;

    if (value) {
      if (this.viewValues.type === 'single') { // range -> single
        if ((typeof value) === 'number') {
          this.viewValues.value = value;
        } else {
          console.log('Введенное значение должно быть числом');
          return false;
        }
      } else if (this.viewValues.type === 'range') { // single -> range
        if (Array.isArray(value) && value.length === 2) {
          this.viewValues.value = value;
        } else {
          console.log('Введенное значение должно быть массивом из 2х чисел');
          return false;
        }
      }
    } else if (!value) {
      if (this.viewValues.type === 'single') { // range -> single
        [localValue] = this.viewValues.value as sliderRangeValueType;
        (this.viewValues.value as number) = localValue;
      } else if (this.viewValues.type === 'range') { // single -> range
        localValue = [this.viewValues.value, this.viewValues.value] as sliderRangeValueType;
        (this.viewValues.value as sliderRangeValueType) = localValue;
      }
    }
    
    this.clearRoot();
    this.init(this.viewValues);
    this.initStyles(this.viewValues.type, this.viewValues.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    return true;
  }

  getValues() {
    return this.viewValues;
  }
}

const v = new View({});
// console.dir(v.getValues());
// console.log(v.getValues().value);
v.changeType('range', [77, 72]);
console.log(v.getValues().value);
v.changeType('single', 11);
console.log(v.getValues().value);
// v.changeType('single');
// console.log(v.getValues().value);
// v.changeType('range');
// console.log(v.getValues().value);
// v.changeType('single', 77);
// console.log(v.getValues().value);
// v.changeType('range');
// console.log(v.getValues().value);
// console.dir(v.getValues());
// v.changeType('range', [110, 123]);
// console.dir(v.getValues());
// const v4 = new View({
//   value: 500, min: 0, max: 1000, root: 'mySlider', scale: true, tooltip: true, direction: 'vertical',
// });

// v4.changeType('range', [150, 750]);
// v4.changeType('single', 700);
// v4.changeType('range', [250, 750]);
// v4.changeDirection();
// console.dir('v4 ---', v4.getValues());

// const v5 = new View({
//   root: 'mySliderRange',
//   direction: 'vertical',
//   type: 'range',
//   tooltip: true,
//   scale: true,
//   min: 0,
//   max: 1000,
//   step: 50,
//   value: [250, 750],
// });

export default View;
