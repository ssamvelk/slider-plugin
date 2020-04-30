import { IView, viewOptions } from './IView';

/* eslint-disable @typescript-eslint/no-unused-vars */
class View implements IView {
  root: HTMLDivElement; // | HTMLBodyElement

  base: HTMLDivElement;

  sliderLine: HTMLDivElement;

  selectSegment?: HTMLDivElement | undefined;

  handle?: HTMLDivElement | undefined;

  handleMin?: HTMLDivElement | undefined;

  handleMax?: HTMLDivElement | undefined;

  tooltip?: HTMLDivElement | undefined;

  tooltipMin?: HTMLDivElement | undefined;

  tooltipMax?: HTMLDivElement | undefined;

  scale?: HTMLDivElement | undefined;

  
  constructor(options: viewOptions) {
    this.root = document.getElementById(options.root as string) as HTMLDivElement || document.body;

    this.base = document.createElement('div');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.base.classList.add('slider-wrp') as unknown as HTMLDivElement;
    this.root.appendChild(this.base);

    this.sliderLine = document.createElement('div');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.sliderLine.classList.add('slider-line') as unknown as HTMLDivElement;
    this.base.appendChild(this.sliderLine);
  }
}

const v = new View({});
console.log('--------------------------- v ', v);
export default View;
