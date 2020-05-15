import {
  IView, initViewOptions, defaultViewOptions, scaleType,
} from './IView';
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

  handle?: HTMLDivElement;

  handleMin?: HTMLDivElement;

  handleMax?: HTMLDivElement;

  tooltip?: HTMLDivElement;

  tooltipMin?: HTMLDivElement;

  tooltipMax?: HTMLDivElement;

  scale?: HTMLDivElement;

  private viewValues: defaultViewOptions;

  constructor(options: initViewOptions) {
    this.viewValues = {
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      type: options.type || 'single',
      value: options.value || ((options.type === 'range') ? [0, 100] : 50),
      direction: options.direction || 'horizontal',
      tooltip: options.tooltip || false,
      scale: {
        // eslint-disable-next-line no-nested-ternary
        init: ((typeof options.scale) === 'boolean')
          ? (options.scale as boolean)
          : (((options.scale instanceof Object) && options.scale !== undefined) ? options.scale.init : false),
        num: ((options.scale instanceof Object) && options.scale.num) ? (options.scale as scaleType).num : 7,
        type: (options.scale instanceof Object && options.scale.type) ? (options.scale as scaleType).type : 'usual',
      },
    };
    
    this.init(options);
    this.initStyles(options.type, options.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.addMoveListener();
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

    if (this.viewValues.scale.init) {
      this.initScale(opt.direction, this.viewValues.scale);
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

  private initScale(direction?: sliderDirection, opt?: scaleType) {
    (this.scale = document.createElement('div')).classList.add('slider__scale');
    const ul = document.createElement('ul');
    ul.classList.add('slider__scale-list');
    const dirLocalValue = direction || 'horizontal';
    if (dirLocalValue === 'horizontal') ul.classList.add('slider__scale-list_horizontal');
    else if (dirLocalValue === 'vertical') ul.classList.add('slider__scale-list_vertical');

    const localValue = (opt!.num || 7);
    for (let i = 0; i < localValue; i += 1) {
      const li = document.createElement('li');
      li.classList.add('slider__scale-item');
      li.classList.add(`slider__scale-item_${dirLocalValue}`);
      if (this.viewValues.scale.type === 'numeric') {
        li.classList.add('slider__scale-item_numeric');
        li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localValue - 1)) * i) + this.viewValues.min).toFixed().toString();
      }
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
        
        this.selectSegment.style.width = `calc(${this.invertToPersent(this.viewValues.value)}%)`;
        this.handle!.style.left = `calc(${this.invertToPersent(this.viewValues.value)}% - 15px)`;

        if (this.tooltip) this.tooltip.innerHTML = (this.viewValues.value).toString();
      } else if (type === 'range') {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.left = `calc(${this.invertToPersent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.width = `calc(${this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.left = `calc(${this.invertToPersent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.left = `calc(${this.invertToPersent(this.viewValues.value[1])}% - 15px)`;

        if (this.tooltipMin) this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
        if (this.tooltipMax) this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
      }
    } else if (this.viewValues.direction === 'vertical') {
      if (type === 'single') {
        this.viewValues.value = localValue as number;

        this.selectSegment.style.height = `calc(${this.invertToPersent(this.viewValues.value)}%)`; // `calc(${this.viewValues.value}%)`;
        this.handle!.style.top = `calc(${this.invertToPersent(this.viewValues.value)}% - 15px)`;
        
        if (this.tooltip) this.tooltip.innerHTML = (this.viewValues.value).toString();
      } else if (type === 'range') {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.top = `calc(${this.invertToPersent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.height = `calc(${this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.top = `calc(${this.invertToPersent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.top = `calc(${this.invertToPersent(this.viewValues.value[1])}% - 15px)`;

        if (this.tooltipMin) this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
        if (this.tooltipMax) this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
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
      // eslint-disable-next-line prefer-destructuring
      if (newLocal2[0] > newLocal2[1] - this.viewValues.step) {
        console.log('valueMin не может быть больше valueMax - step');
        newLocal2[0] = newLocal2[1] - this.viewValues.step;
      }
      if (newLocal2[1] > this.viewValues.max) {
        newLocal2[1] = this.viewValues.max;
        console.log('valueMax не может быть больше максимального порога значений, меняем на максимальный');
      }
      if (newLocal2[1] < newLocal2[0] + this.viewValues.step) {
        console.log('valueMax не может быть меньше valueMin + step');
        newLocal2[1] = newLocal2[0] + this.viewValues.step;
      }
      
      return newLocal2;
    }
  }

  private clearRoot() {
    // this.sliderLine.remove();
    // this.scale?.remove();
    this.wrap.remove();
  }
  
  private invertToPersent(value: number) { // перевод из значения в % от длины.ширины
    return ((value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min)) * 100;
  }

  private invertCoordinate(value: number) { // перевод координаты мыши в % (длины\ширины)
    let localPersentValue: number = 0;

    if (this.viewValues.direction === 'horizontal') {
      localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().left)
                              / this.sliderLine.getBoundingClientRect().width) * 100).toFixed(2));
    } else if (this.viewValues.direction === 'vertical') {
      localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().top)
                              / this.sliderLine.getBoundingClientRect().height) * 100).toFixed(2));
    }

    if (localPersentValue < 0) localPersentValue = 0;
    if (localPersentValue > 100) localPersentValue = 100;
    const localValue = ((Number(localPersentValue) / 100) * (this.viewValues.max - this.viewValues.min)) + this.viewValues.min;

    return {
      inPersent: Number(localPersentValue.toFixed(2)),
      inValue: Number(localValue.toFixed()),
    };
  }

  private stepСheck(value: number): number {
    if (value <= this.viewValues.min) return this.viewValues.min;
    if (value > this.viewValues.max) return this.stepСheck(this.viewValues.max);
    if (((value % this.viewValues.step) + this.viewValues.min) === 0) {
      return value + this.viewValues.min;
    }
    return (value + this.viewValues.min) - (value % this.viewValues.step);
  }

  private addMoveListener() { // handle: HTMLDivElement
    const handleShiftWidth: number = (this.handle) ? (this.handle.getBoundingClientRect().width / 2) : (this.handleMin!.getBoundingClientRect().width / 2);
    let handleMaxPositionInPersents: number = 0;
    let handleMinPositionInPersents: number = 0;
    let MousePositionInPersents: number = 0;
    let MousePositionOnSlider: number = 0;

    const onMouseMoveHandle = (e: MouseEvent) => {
      e.preventDefault();

      if (this.viewValues.direction === 'horizontal') {
        MousePositionInPersents = this.invertCoordinate(e.clientX).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        this.handle!.style.left = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        this.selectSegment.style.width = `${MousePositionInPersents}%`;

        if (this.tooltip) {
          this.tooltip.innerHTML = (MousePositionOnSlider).toString();
        }
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionInPersents = this.invertCoordinate(e.clientY).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        this.handle!.style.top = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        this.selectSegment.style.height = `${MousePositionInPersents}%`;
        
        if (this.tooltip) {
          this.tooltip.innerHTML = (MousePositionOnSlider).toString();
        }
      }
      
      this.viewValues.value = MousePositionOnSlider;
    };

    const onMouseMoveHandleMin = (e: MouseEvent) => {
      e.preventDefault();

      if (this.viewValues.direction === 'horizontal') {
        MousePositionInPersents = this.invertCoordinate(e.clientX).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
        handleMaxPositionInPersents = this.invertCoordinate(this.handleMax!.getBoundingClientRect().left).inPersent;

        if (MousePositionOnSlider > (this.viewValues.value as sliderRangeValueType)[1]) {
          this.setValue([(this.viewValues.value as sliderRangeValueType)[1], (this.viewValues.value as sliderRangeValueType)[1]], 'range');
          return;
        }

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        (this.handleMin as HTMLDivElement).style.left = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        
        this.selectSegment.style.left = `${MousePositionInPersents}%`;
        this.selectSegment.style.width = `calc(${handleMaxPositionInPersents - MousePositionInPersents}% + ${handleShiftWidth}px)`;
        
        if (this.tooltipMin) {
          this.tooltipMin.innerHTML = (MousePositionOnSlider).toString();
        }
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionInPersents = this.invertCoordinate(e.clientY).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
        handleMaxPositionInPersents = this.invertCoordinate(this.handleMax!.getBoundingClientRect().top).inPersent;

        if (MousePositionOnSlider > (this.viewValues.value as sliderRangeValueType)[1]) {
          this.setValue([(this.viewValues.value as sliderRangeValueType)[1], (this.viewValues.value as sliderRangeValueType)[1]], 'range');
          return;
        }

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        (this.handleMin as HTMLDivElement).style.top = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        
        this.selectSegment.style.top = `${MousePositionInPersents}%`;
        this.selectSegment.style.height = `calc(${handleMaxPositionInPersents - MousePositionInPersents}% + ${handleShiftWidth}px)`;
        
        if (this.tooltipMin) {
          this.tooltipMin.innerHTML = (MousePositionOnSlider).toString();
        }
      }
      (this.viewValues.value as sliderRangeValueType)[0] = MousePositionOnSlider;
    };

    const onMouseMoveHandleMax = (e: MouseEvent) => {
      e.preventDefault();

      if (this.viewValues.direction === 'horizontal') {
        MousePositionInPersents = this.invertCoordinate(e.clientX).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
        handleMinPositionInPersents = this.invertCoordinate(this.handleMin!.getBoundingClientRect().left + handleShiftWidth).inPersent;

        if (MousePositionOnSlider < (this.viewValues.value as sliderRangeValueType)[0]) {
          this.setValue([(this.viewValues.value as sliderRangeValueType)[0], (this.viewValues.value as sliderRangeValueType)[0]], 'range');
          return;
        }

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        (this.handleMax as HTMLDivElement).style.left = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        
        this.selectSegment.style.left = `calc(${handleMinPositionInPersents}%)`;
        this.selectSegment.style.width = `calc(${MousePositionInPersents - handleMinPositionInPersents}%)`;
        
        if (this.tooltipMax) {
          this.tooltipMax.innerHTML = (MousePositionOnSlider).toString();
        }
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionInPersents = this.invertCoordinate(e.clientY).inPersent;
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
        handleMinPositionInPersents = this.invertCoordinate(this.handleMin!.getBoundingClientRect().top + handleShiftWidth).inPersent;

        if (MousePositionOnSlider < (this.viewValues.value as sliderRangeValueType)[0]) {
          this.setValue([(this.viewValues.value as sliderRangeValueType)[0], (this.viewValues.value as sliderRangeValueType)[0]], 'range');
          return;
        }

        if ((MousePositionOnSlider % this.viewValues.step) !== 0) {
          return;
        }

        (this.handleMax as HTMLDivElement).style.top = `calc(${MousePositionInPersents}% - ${handleShiftWidth}px)`;
        
        this.selectSegment.style.top = `calc(${handleMinPositionInPersents}%)`;
        this.selectSegment.style.height = `calc(${MousePositionInPersents - handleMinPositionInPersents}%)`;
        
        if (this.tooltipMax) {
          this.tooltipMax.innerHTML = (MousePositionOnSlider).toString();
        }
      }
      (this.viewValues.value as sliderRangeValueType)[1] = MousePositionOnSlider!;
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMoveHandle);
      document.removeEventListener('mousemove', onMouseMoveHandleMin);
      document.removeEventListener('mousemove', onMouseMoveHandleMax);
      console.log(this.viewValues.value);
    };

    if (this.viewValues.type === 'single') {
      this.handle!.ondragstart = () => false;
      this.handle!.addEventListener('mousedown', (e: MouseEvent) => {
        // const handleCoordinateY = e.clientY;
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandle);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
    } else if (this.viewValues.type === 'range') {
      this.handleMin!.ondragstart = () => false;
      this.handleMin!.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandleMin);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
      this.handleMax!.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandleMax);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
    }
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

  changeValue(value: sliderValueType) {
    if (this.viewValues.type === 'single' && (typeof value) !== 'number') {
      return new Error('введите корректное значение, а именно number');
    }
    // eslint-disable-next-line no-mixed-operators
    if ((this.viewValues.type === 'range' && !Array.isArray(value)) || ((this.viewValues.type === 'range' && Array.isArray(value) && (value.length !== 2)))) {
      return new Error('введите корректное значение, а именно [number, number]');
    }
    this.setValue(value, this.viewValues.type);
    return this.viewValues.value;
  }

  getValues() {
    return this.viewValues;
  }
}

const v1 = new View({
  value: 510,
  min: 0,
  max: 120,
  root: 'mySlider',
  scale: { init: true, num: 31, type: 'usual' },
  tooltip: true,
  step: 12,
});

const v2 = new View({
  root: 'mySliderRange',
  direction: 'vertical',
  type: 'range',
  tooltip: true,
  scale: { init: true, num: 5, type: 'numeric' },
  min: 400,
  max: 1000,
  step: 1,
  value: [500, 1000],
});


const v3 = new View({
  step: 50, tooltip: true, scale: { init: true, type: 'numeric' }, direction: 'vertical',
});

const v4 = new View({
  step: 5, max: 100, value: [25, 75], type: 'range', tooltip: true, scale: { init: true, type: 'numeric', num: 5 },
});
// console.dir(v.getValues());

export default View;
