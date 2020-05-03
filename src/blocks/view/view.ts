import { IView, viewOptions } from './IView';
import { sliderType, sliderDirection } from '../model/IModel';

/* eslint-disable @typescript-eslint/no-unused-vars */
class View implements IView {
  root!: HTMLDivElement; // | HTMLBodyElement
  // | HTMLBodyElement

  base!: HTMLDivElement;

  sliderLine!: HTMLDivElement;

  selectSegment!: HTMLDivElement;

  handle?: HTMLDivElement | undefined;

  handleMin?: HTMLDivElement | undefined;

  handleMax?: HTMLDivElement | undefined;

  tooltip?: HTMLDivElement | undefined;

  tooltipMin?: HTMLDivElement | undefined;

  tooltipMax?: HTMLDivElement | undefined;

  scale?: HTMLDivElement | undefined;

  
  constructor(options: viewOptions) {
    this.init(options);
    this.initStyles(options.type, options.direction);
  }

  private init(opt: viewOptions) {
    console.log('init start work');
    this.root = document
      .getElementById(opt.root as string) as HTMLDivElement || document.body;
    
    (this.base = document.createElement('div')).classList.add('slider__wrp');

    if (document.querySelector('script')) {
      this.root.insertBefore(this.base, document.querySelector('script'));
    } else this.root.appendChild(this.base);

    this.sliderLine = document.createElement('div');
    this.sliderLine.classList.add('slider__line');

    this.base.appendChild(this.sliderLine);

    (this.selectSegment = document.createElement('div')).classList.add('slider__select');
    
    if (opt.type === 'single' || opt.type === undefined) {
      this.sliderLine.appendChild(this.selectSegment);

      (this.handle = document.createElement('div')).classList.add('slider__handle');

      this.sliderLine.appendChild(this.handle);
    } else if (opt.type === 'range') {
      (this.handleMin = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMin);
      
      this.sliderLine.appendChild(this.selectSegment);
      
      (this.handleMax = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMax);
    }
    console.log('init end work');
  }

  private initStyles(type: sliderType = 'single', direction: sliderDirection = 'horizontal') {
    console.log('initStyles');
    
    if (direction === 'horizontal') {
      this.base.classList.add('slider__wrp_horizontal');
      this.sliderLine.classList.add('slider__line_horizontal');
      this.selectSegment.classList.add('slider__select_horizontal');
    } else if (direction === 'vertical') {
      this.base.classList.add('slider-wrp_vertical');
      this.sliderLine.classList.add('slider__line_vertical');
      this.selectSegment.classList.add('slider__select_vertical');
    }
  }
}

const v = new View({ type: 'single' });
const v2 = new View({ type: 'range' });
const v3 = new View({ direction: 'vertical' });
console.log('--------------------------- v ', v, '-------------------', v2);
console.log('-------------------v3', v3);
export default View;
