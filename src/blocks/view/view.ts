import { IView, viewOptions } from './IView';
import { sliderType, sliderDirection } from '../model/IModel';

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

  private DefaulValues: object;

  constructor(options: viewOptions) {
    this.DefaulValues = {
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      value: options.value || (options.type === 'single') ? 50 : [0, 100],
    };
    
    this.init(options);
    this.initStyles(options.type, options.direction);
  }

  private init(opt: viewOptions) {
    this.root = document
      .getElementById(opt.root as string) as HTMLDivElement || document.body;

    // const slider = (document.createElement('div')).classList.add('slider');

    (this.wrap = document.createElement('div')).classList.add('slider__wrp');

    if (this.root === document.body) {
      this.root.insertBefore(this.wrap, document.querySelector('script'));
    } else {
      this.root.appendChild(this.wrap);
    }

    (this.sliderLine = document.createElement('div')).classList.add('slider__line');

    this.wrap.appendChild(this.sliderLine);

    (this.selectSegment = document.createElement('div')).classList.add('slider__select');
    
    if (opt.type === 'single' || opt.type === undefined) {
      this.sliderLine.appendChild(this.selectSegment);

      (this.handle = document.createElement('div')).classList.add('slider__handle');

      this.sliderLine.appendChild(this.handle);

      if (opt.tooltip) {
        (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
        this.handle.appendChild(this.tooltip);
      }
    } else if (opt.type === 'range') {
      (this.handleMin = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMin);
      
      this.sliderLine.appendChild(this.selectSegment);
      
      (this.handleMax = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMax);

      if (opt.tooltip) {
        (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMin.appendChild(this.tooltipMin);

        (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMax.appendChild(this.tooltipMax);
      }
    }

    if (opt.scale) {
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
}

const v = new View({ type: 'single', tooltip: true, scale: true });
const v2 = new View({
  type: 'range', tooltip: true, scale: true, direction: 'horizontal',
});
const v3 = new View({ direction: 'vertical', tooltip: true, scale: true });
console.log('--------------------------- v ', v, '-------------------', v2);
console.log('-------------------v3', v3);

const v4 = new View({
  root: 'mySlider', scale: true, tooltip: true, direction: 'horizontal',
});

const v5 = new View({
  root: 'mySliderRange',
  direction: 'vertical',
  type: 'range',
  tooltip: true,
  scale: true,
  min: -100,
  max: 200,
  step: 50,
});

const v6 = new View({
  direction: 'horizontal',
  type: 'range',
  tooltip: true,
  scale: true,
  min: -100,
  max: 200,
  step: 50,
});

console.dir('v4 ---', v4);
console.dir('v5 ---', v5);
console.dir('v6 ---', v6);

export default View;
