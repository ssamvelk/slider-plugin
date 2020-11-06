import {
  IView,
  initViewOptions,
  defaultViewOptions,
  scaleType,
} from './IView';

import {
  sliderType,
  sliderDirection,
  sliderValueType,
  sliderRangeValueType,
} from '../model/IModel';

import {
  checkStep,
  checkValue,
  checkScaleInit,
  SINGLE_TYPE,
  RANGE_TYPE,
  HORIZONTAL_DIRECTION,
  VERTICAL_DIRECTION,
} from '../utils/Utils';

import Observable from '../utils/Observable';
import Observer from '../utils/IObserver';

class View implements IView {
  root!: HTMLDivElement;

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
  
  private observebale: Observable;

  constructor(options: initViewOptions) {
    this.viewValues = {
      min: options.min || 0,

      max: options.max || 100,

      step: options.step || 1,

      type: options.type || SINGLE_TYPE,

      value: options.value || ((options.type === RANGE_TYPE) ? [0, 100] : 0),

      direction: options.direction || HORIZONTAL_DIRECTION,

      tooltip: options.tooltip || false,
      
      scale: {
        init: checkScaleInit(options.scale),
        num: ((options.scale instanceof Object) && options.scale.num) ? (options.scale as scaleType).num : 7,
        type: (options.scale instanceof Object && options.scale.type) ? (options.scale as scaleType).type : 'usual',
      },
    };
    this.observebale = new Observable();

    this.init(options);
    this.initStyles(options.type, options.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.bindEventListeners();
  }

  changeDirection() {
    if (this.viewValues.direction === HORIZONTAL_DIRECTION) this.viewValues.direction = VERTICAL_DIRECTION;
    else if (this.viewValues.direction === VERTICAL_DIRECTION) this.viewValues.direction = HORIZONTAL_DIRECTION;

    this.clearRoot();
    this.init(this.viewValues);
    this.initStyles(this.viewValues.type, this.viewValues.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.bindEventListeners();
  }

  changeType(type: sliderType, value?: sliderValueType): boolean {
    if (type === this.viewValues.type) {
      return false;
    }
    
    this.viewValues.type = type;
    
    let localValue: sliderValueType;

    if (value) {
      if (this.viewValues.type === SINGLE_TYPE) {
        if ((typeof value) === 'number') {
          this.viewValues.value = value;
        } else return false;
      } else if (this.viewValues.type === RANGE_TYPE) {
        if (Array.isArray(value) && value.length === 2) {
          this.viewValues.value = value;
        } else return false;
      }
    } else if (!value) {
      if (this.viewValues.type === SINGLE_TYPE) {
        [localValue] = this.viewValues.value as sliderRangeValueType;
        (this.viewValues.value as number) = localValue;
      } else if (this.viewValues.type === RANGE_TYPE) {
        localValue = [this.viewValues.value, this.viewValues.value] as sliderRangeValueType;
        (this.viewValues.value as sliderRangeValueType) = localValue;
      }
    }
    
    this.clearRoot();
    this.init(this.viewValues);
    this.initStyles(this.viewValues.type, this.viewValues.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.bindEventListeners();
    return true;
  }

  changeValue(value: sliderValueType) {
    if (this.viewValues.type === SINGLE_TYPE && (typeof value) !== 'number') {
      return new Error('введите корректное значение, а именно number');
    }

    if ((this.viewValues.type === RANGE_TYPE && !Array.isArray(value)) || ((this.viewValues.type === RANGE_TYPE && Array.isArray(value) && (value.length !== 2)))) {
      return new Error('введите корректное значение, а именно [number, number]');
    }
    this.setValue(value, this.viewValues.type);
    return this.viewValues.value;
  }

  changeStep(step: number) {
    let localStep: number = step;
    if (localStep < 0.01) localStep = 0.01;
    if (localStep > (this.viewValues.max - this.viewValues.min)) localStep = (this.viewValues.max - this.viewValues.min);
    this.viewValues.step = step;
    this.setValue(this.viewValues.value, this.viewValues.type);
  }

  changeScale(options: scaleType) {
    this.viewValues.scale.init = options.init;
    if (options.type) this.viewValues.scale.type = options.type;
    if (options.num) this.viewValues.scale.num = options.num;

    if (this.viewValues.scale.init === false) this.clearScale();
    else if (this.viewValues.scale.init === true) {
      this.clearScale();
      this.initScale(this.viewValues.scale);
    }
  }

  changeTooltip(tooltip: boolean) {
    if (this.viewValues.tooltip === tooltip) return;
    if (tooltip === false) {
      this.viewValues.tooltip = false;
      this.clearTooltip();
    } else if (tooltip === true) {
      this.viewValues.tooltip = true;
      this.initTooltip();
    }
  }

  getValues() {
    return this.viewValues;
  }

  addObservers(observer: Observer) {
    this.observebale.subscribe(observer);
  }

  private init(opt: initViewOptions) {
    if (!this.root) {
      this.root = document
        .getElementById(opt.root as string) as HTMLDivElement || document.body as HTMLDivElement;
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
    
    if (this.viewValues.type === SINGLE_TYPE) {
      this.sliderLine.appendChild(this.selectSegment);

      (this.handle = document.createElement('div')).classList.add('slider__handle');

      this.sliderLine.appendChild(this.handle);
    } else if (this.viewValues.type === RANGE_TYPE) {
      (this.handleMin = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMin);
      
      this.sliderLine.appendChild(this.selectSegment);
      
      (this.handleMax = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMax);
    }
    if (this.viewValues.tooltip) {
      this.initTooltip();
    }
    if (this.viewValues.scale.init) {
      this.initScale(this.viewValues.scale);
    }
  }

  private initStyles(type: sliderType = SINGLE_TYPE, direction: sliderDirection = HORIZONTAL_DIRECTION) {
    this.wrap.classList.add(`slider__wrp_${direction}`);
    this.sliderLine.classList.add(`slider__line_${direction}`);
    this.selectSegment.classList.add(`slider__select_${direction}`);

    if (type === SINGLE_TYPE) {
      if (this.handle) {
        this.handle.classList.add(`slider__handle_${direction}`);
        this.handle.tabIndex = 1;
      }
    } else if (type === RANGE_TYPE) {
      if (this.handleMin) {
        this.handleMin.classList.add(`slider__handle_${direction}`);
        this.handleMin.tabIndex = 1;
      }
      if (this.handleMax) {
        this.handleMax.classList.add(`slider__handle_${direction}`);
        this.handleMax.tabIndex = 1;
      }
    }
  }

  private initScale(opt?: scaleType) {
    (this.scale = document.createElement('div')).classList.add('slider__scale');
    const list = document.createElement('ul');
    list.classList.add('slider__scale-list');
    const dirLocalValue = this.viewValues.direction;
    if (dirLocalValue === HORIZONTAL_DIRECTION) list.classList.add('slider__scale-list_horizontal');
    else if (dirLocalValue === VERTICAL_DIRECTION) list.classList.add('slider__scale-list_vertical');

    const localNumValue = (opt!.num || 7);
    for (let i = 0; i < localNumValue; i += 1) {
      const item = document.createElement('li');
      item.classList.add('slider__scale-item');
      item.classList.add(`slider__scale-item_${dirLocalValue}`);
      if (this.viewValues.scale.type === 'numeric') {
        item.classList.add('slider__scale-item_numeric');
        if ((this.viewValues.step < 1) && ((this.viewValues.max - this.viewValues.min) <= 1)) {
          item.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed(2).toString();
        } else item.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed().toString();
      }
      item.id = `slider__scale-item${i + 1}`;
      
      list.appendChild(item);
    }
    this.initScaleStyles();
    this.scale.appendChild(list);
    this.wrap.appendChild(this.scale);

    if (this.viewValues.scale.init) {
      this.scale!.addEventListener('click', this.handleScaleItemClick);
    }
  }

  private initScaleStyles() {
    if (this.scale) {
      if (this.viewValues.direction === HORIZONTAL_DIRECTION) this.scale.classList.add('slider__scale_horizontal');
      if (this.viewValues.direction === VERTICAL_DIRECTION) this.scale.classList.add('slider__scale_vertical');
    }
  }

  private handleScaleItemClick = (e: MouseEvent) => {
    if ((e.target as HTMLLIElement).classList.contains('slider__scale-item')) {
      let localValue: sliderValueType;
      
      if (this.viewValues.type === SINGLE_TYPE) {
        if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
          (localValue! as number) = this.invertCoordinate(e.clientX).inValue;
        } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
          (localValue! as number) = this.invertCoordinate(e.clientY).inValue;
        }
        
        this.setValue(localValue!, SINGLE_TYPE);
      } else if (this.viewValues.type === RANGE_TYPE) {
        if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
          (localValue! as number) = this.invertCoordinate(e.clientX).inValue;
        } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
          (localValue! as number) = this.invertCoordinate(e.clientY).inValue;
        }
        
        if (localValue! <= (this.viewValues.value as sliderRangeValueType)[1]) {
          this.setValue([(localValue! as number), (this.viewValues.value as sliderRangeValueType)[1]], RANGE_TYPE);
        } else {
          this.setValue([(this.viewValues.value as sliderRangeValueType)[0], (localValue! as number)], RANGE_TYPE);
        }
      }
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
  };
  
  private initTooltip() {
    const { direction } = this.viewValues;

    if (this.viewValues.type === SINGLE_TYPE) {
      if (this.viewValues.tooltip) {
        (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
        this.handle!.appendChild(this.tooltip);
        this.tooltip.classList.add(`slider__tooltip_${direction}`);
        this.tooltip.innerHTML = (this.viewValues.value).toString();
      }
    } else if (this.viewValues.type === RANGE_TYPE) {
      if (this.viewValues.tooltip) {
        (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMin!.appendChild(this.tooltipMin);
        (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMax!.appendChild(this.tooltipMax);
        this.tooltipMin.classList.add(`slider__tooltip_${direction}`);
        this.tooltipMax.classList.add(`slider__tooltip_${direction}`);
        this.tooltipMin.innerHTML = ((this.viewValues.value as sliderRangeValueType)[0]).toString();
        this.tooltipMax.innerHTML = ((this.viewValues.value as sliderRangeValueType)[1]).toString();
      }
    }
  }

  private setValue(value: sliderValueType, type: sliderType) {
    const localValue = this.checkValue(value);
  
    if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
      if (type === SINGLE_TYPE) {
        this.viewValues.value = localValue as number;
        
        this.selectSegment.style.width = `calc(${this.invertToPercent(this.viewValues.value)}%)`;
        this.handle!.style.left = `calc(${this.invertToPercent(this.viewValues.value)}% - 15px)`;

        if (this.tooltip) this.tooltip.innerHTML = (this.viewValues.value).toString();
      } else if (type === RANGE_TYPE) {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.left = `calc(${this.invertToPercent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.width = `calc(${this.invertToPercent(this.viewValues.value[1]) - this.invertToPercent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.left = `calc(${this.invertToPercent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.left = `calc(${this.invertToPercent(this.viewValues.value[1])}% - 15px)`;

        if (this.tooltipMin) this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
        if (this.tooltipMax) this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
      }
    } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
      if (type === SINGLE_TYPE) {
        this.viewValues.value = localValue as number;

        this.selectSegment.style.height = `calc(${this.invertToPercent(this.viewValues.value)}%)`;
        this.handle!.style.top = `calc(${this.invertToPercent(this.viewValues.value)}% - 15px)`;
        
        if (this.tooltip) this.tooltip.innerHTML = (this.viewValues.value).toString();
      } else if (type === RANGE_TYPE) {
        this.viewValues.value = localValue as [number, number];
        
        this.handleMin!.style.top = `calc(${this.invertToPercent(this.viewValues.value[0])}% - 15px)`;
  
        this.selectSegment.style.height = `calc(${this.invertToPercent(this.viewValues.value[1]) - this.invertToPercent(this.viewValues.value[0])}%)`;
        this.selectSegment.style.top = `calc(${this.invertToPercent(this.viewValues.value[0])}%)`;
  
        this.handleMax!.style.top = `calc(${this.invertToPercent(this.viewValues.value[1])}% - 15px)`;

        if (this.tooltipMin) this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
        if (this.tooltipMax) this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
      }
    }
  }

  private clearRoot() {
    this.wrap.remove();
  }

  private clearScale() {
    this.scale?.remove();
  }

  private clearTooltip() {
    this.tooltip?.remove();
    this.tooltipMin?.remove();
    this.tooltipMax?.remove();
  }
  
  private invertToPercent(value: number) {
    return ((value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min)) * 100;
  }

  private invertCoordinate(value: number) {
    let localPercentValue: number = 0;

    if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
      localPercentValue = Number((((value - this.sliderLine.getBoundingClientRect().left) / this.sliderLine.getBoundingClientRect().width) * 100).toFixed(2));
    } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
      localPercentValue = Number((((value - this.sliderLine.getBoundingClientRect().top) / this.sliderLine.getBoundingClientRect().height) * 100).toFixed(2));
    }

    if (localPercentValue < 0) localPercentValue = 0;
    if (localPercentValue > 100) localPercentValue = 100;
    const localValue = ((Number(localPercentValue) / 100) * (this.viewValues.max - this.viewValues.min)) + this.viewValues.min;

    return {
      inPercent: Number(localPercentValue.toFixed()),
      inValue: Number(localValue.toFixed(2)),
    };
  }

  private checkStep(value: number): number {
    return checkStep(value, this.viewValues.min, this.viewValues.max, this.viewValues.step);
  }

  private checkValue(value: sliderValueType) {
    return checkValue(value, this.viewValues.min, this.viewValues.max, this.viewValues.step, this.viewValues.type);
  }

  private bindEventListeners() {
    if (this.viewValues.type === SINGLE_TYPE) {
      this.handle!.addEventListener('mousedown', this.handleMouseDown);
      
      this.handle!.addEventListener('focus', this.handleFocus);

      this.handle!.addEventListener('blur', this.handleBlur);
    } else if (this.viewValues.type === RANGE_TYPE) {
      this.handleMin!.addEventListener('mousedown', this.handleMinMouseDown);
      this.handleMin!.addEventListener('focus', this.handleMinFocus);
      this.handleMin!.addEventListener('blur', this.handleBlur);

      this.handleMax!.addEventListener('mousedown', this.handleMaxMouseDown);
      this.handleMax!.addEventListener('focus', this.handleMaxFocus);
      this.handleMax!.addEventListener('blur', this.handleBlur);
    }
  }

  private handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    
    let MousePositionOnSlider: number = 0;

    if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
    } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
    }

    MousePositionOnSlider = this.checkStep(MousePositionOnSlider);
    this.setValue(MousePositionOnSlider, SINGLE_TYPE);
    
    this.viewValues.value = MousePositionOnSlider;

    this.observebale.trigger('userMoveSlider', this.viewValues.value);
  };

  private handleBlur = () => {
    if (this.viewValues.type === SINGLE_TYPE) {
      this.handle?.removeEventListener('keydown', this.handleKeyDown);
    } else if (this.viewValues.type === RANGE_TYPE) {
      this.handleMin?.removeEventListener('keydown', this.handleMinKeyDown);
      this.handleMax?.removeEventListener('keydown', this.handleMaxKeyDown);
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  };

  private handleFocus = () => {
    this.handle!.addEventListener('keydown', this.handleKeyDown);
  };

  private handleMouseUp = () => {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleMinMouseMove);
    document.removeEventListener('mousemove', this.handleMaxMouseMove);
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if ((e.code === 'ArrowLeft') || (e.code === 'ArrowDown')) {
      this.setValue(((this.viewValues.value as number) - this.viewValues.step), SINGLE_TYPE);
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
    if ((e.code === 'ArrowRight') || (e.code === 'ArrowUp')) {
      this.setValue(((this.viewValues.value as number) + this.viewValues.step), SINGLE_TYPE);
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
  };

  private handleMinMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    let MousePositionOnSlider: number = 0;
    const [localMax] = [(this.viewValues.value as sliderRangeValueType)[1]];
    
    if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
      
      MousePositionOnSlider = this.checkStep(MousePositionOnSlider);
    } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;

      MousePositionOnSlider = this.checkStep(MousePositionOnSlider);
    }

    this.setValue([MousePositionOnSlider, localMax], RANGE_TYPE);
    this.observebale.trigger('userMoveSlider', this.viewValues.value);
  };

  private handleMinMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      document.addEventListener('mousemove', this.handleMinMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  };

  private handleMinKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
      this.setValue(
        [((this.viewValues.value as sliderRangeValueType)[0] + this.viewValues.step), (this.viewValues.value as sliderRangeValueType)[1]],
        RANGE_TYPE,
      );
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
    if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
      this.setValue(
        [((this.viewValues.value as sliderRangeValueType)[0] - this.viewValues.step), (this.viewValues.value as sliderRangeValueType)[1]],
        RANGE_TYPE,
      );
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
  };

  private handleMinFocus = () => {
    this.handleMin!.addEventListener('keydown', this.handleMinKeyDown);
  };

  private handleMaxMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    let MousePositionOnSlider: number = 0;
    const [localMin] = [(this.viewValues.value as sliderRangeValueType)[0]];
    if (this.viewValues.direction === HORIZONTAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
      
      MousePositionOnSlider = this.checkStep(MousePositionOnSlider);
    } else if (this.viewValues.direction === VERTICAL_DIRECTION) {
      MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
      
      MousePositionOnSlider = this.checkStep(MousePositionOnSlider);
    }
    if (MousePositionOnSlider <= localMin) {
      this.setValue([localMin - this.viewValues.step, MousePositionOnSlider], RANGE_TYPE);
    } else this.setValue([localMin, MousePositionOnSlider], RANGE_TYPE);
    this.observebale.trigger('userMoveSlider', this.viewValues.value);
  };

  private handleMaxKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
      this.setValue(
        [(this.viewValues.value as sliderRangeValueType)[0], ((this.viewValues.value as sliderRangeValueType)[1] + this.viewValues.step)],
        RANGE_TYPE,
      );
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
    if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
      if (((this.viewValues.value as sliderRangeValueType)[1] - (this.viewValues.value as sliderRangeValueType)[0]) === this.viewValues.step) {
        this.setValue(
          [(this.viewValues.value as sliderRangeValueType)[0] - this.viewValues.step, ((this.viewValues.value as sliderRangeValueType)[1] - this.viewValues.step)],
          RANGE_TYPE,
        );
        return;
      }
      this.setValue(
        [(this.viewValues.value as sliderRangeValueType)[0], ((this.viewValues.value as sliderRangeValueType)[1] - this.viewValues.step)],
        RANGE_TYPE,
      );
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    }
  };

  private handleMaxMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      document.addEventListener('mousemove', this.handleMaxMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  };

  private handleMaxFocus = () => {
    this.handleMax!.addEventListener('keydown', this.handleMaxKeyDown);
  };
}

export default View;
