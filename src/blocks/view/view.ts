import {
  IView, initViewOptions, defaultViewOptions, scaleType,
} from './IView';
import {
  sliderType, sliderDirection, sliderValueType, sliderRangeValueType,
} from '../model/IModel';
import { stepСheck, checkValue } from '../utils/Utils';
import Observable from '../utils/Observable';

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
  
  /** Объект наблюдения(observebale) - хранит в себе список всех наблюдателей
   *  за событием пользователя(движение мыши)
   * */
  private observebale: Observable;

  constructor(options: initViewOptions) {
    this.viewValues = {
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      type: options.type || 'single',
      value: options.value || ((options.type === 'range') ? [0, 100] : 0),
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
    this.observebale = new Observable();

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

      // if (this.viewValues.tooltip) {
      //   (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
      //   this.handle.appendChild(this.tooltip);
      // }
    } else if (this.viewValues.type === 'range') {
      (this.handleMin = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMin);
      
      this.sliderLine.appendChild(this.selectSegment);
      
      (this.handleMax = document.createElement('div')).classList.add('slider__handle');
      
      this.sliderLine.appendChild(this.handleMax);

      // if (this.viewValues.tooltip) {
      //   (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
      //   this.handleMin.appendChild(this.tooltipMin);

      //   (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
      //   this.handleMax.appendChild(this.tooltipMax);
      // }
    }
    if (this.viewValues.tooltip) {
      this.initTooltip();
    }
    if (this.viewValues.scale.init) {
      this.initScale(this.viewValues.scale); // opt.direction,
    }
  }

  private initStyles(type: sliderType = 'single', direction: sliderDirection = 'horizontal') {
    if (direction === 'horizontal') {
      this.wrap.classList.add('slider__wrp_horizontal');
      this.sliderLine.classList.add('slider__line_horizontal');
      this.selectSegment.classList.add('slider__select_horizontal');

      if (type === 'single') {
        if (this.handle) {
          this.handle.classList.add('slider__handle_horizontal');
          this.handle.tabIndex = 1;
        }
        // if (this.tooltip) this.tooltip.classList.add('slider__tooltip_horizontal');
      } else if (type === 'range') {
        if (this.handleMin) {
          this.handleMin.classList.add('slider__handle_horizontal');
          this.handleMin.tabIndex = 1;
        }
        if (this.handleMax) {
          this.handleMax.classList.add('slider__handle_horizontal');
          this.handleMax.tabIndex = 1;
        }
        // if (this.tooltipMin) this.tooltipMin.classList.add('slider__tooltip_horizontal');
        // if (this.tooltipMax) this.tooltipMax.classList.add('slider__tooltip_horizontal');
      }
      
      // if (this.scale) this.scale.classList.add('slider__scale_horizontal');
    } else if (direction === 'vertical') {
      this.wrap.classList.add('slider__wrp_vertical');
      this.sliderLine.classList.add('slider__line_vertical');
      this.selectSegment.classList.add('slider__select_vertical');

      if (type === 'single') {
        if (this.handle) {
          this.handle.classList.add('slider__handle_vertical');
          this.handle.tabIndex = 1;
        }
        // if (this.tooltip) this.tooltip.classList.add('slider__tooltip_vertical');
      } else if (type === 'range') {
        if (this.handleMin) {
          this.handleMin.classList.add('slider__handle_vertical');
          this.handleMin.tabIndex = 1;
        }
        if (this.handleMax) {
          this.handleMax.classList.add('slider__handle_vertical');
          this.handleMax.tabIndex = 1;
        }
        // if (this.tooltipMin) this.tooltipMin.classList.add('slider__tooltip_vertical');
        // if (this.tooltipMax) this.tooltipMax.classList.add('slider__tooltip_vertical');
      }
      // if (this.scale) this.scale.classList.add('slider__scale_vertical');
    }
  }

  /** Создает scale + стили + обработчик на нажатие пользователем */
  private initScale(opt?: scaleType) { // direction?: sliderDirection,
    (this.scale = document.createElement('div')).classList.add('slider__scale');
    const ul = document.createElement('ul');
    ul.classList.add('slider__scale-list');
    const dirLocalValue = this.viewValues.direction; // direction || 'horizontal';
    if (dirLocalValue === 'horizontal') ul.classList.add('slider__scale-list_horizontal');
    else if (dirLocalValue === 'vertical') ul.classList.add('slider__scale-list_vertical');

    const localNumValue = (opt!.num || 7);
    for (let i = 0; i < localNumValue; i += 1) {
      const li = document.createElement('li');
      li.classList.add('slider__scale-item');
      li.classList.add(`slider__scale-item_${dirLocalValue}`);
      if (this.viewValues.scale.type === 'numeric') {
        li.classList.add('slider__scale-item_numeric');
        // li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed().toString();
        if ((this.viewValues.step < 1) && ((this.viewValues.max - this.viewValues.min) <= 1)) {
          li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed(2).toString();
        } else li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed().toString();
      }
      li.id = `slider__scale-item${i + 1}`;
      
      ul.appendChild(li);
    }
    this.initScaleStyles();
    this.scale.appendChild(ul);
    this.wrap.appendChild(this.scale);

    if (this.viewValues.scale.init) {
      this.scale!.addEventListener('mousedown', (e: MouseEvent) => {
        if ((e.target as HTMLLIElement).classList.contains('slider__scale-item')) {
          let localValue: sliderValueType;
          
          if (this.viewValues.type === 'single') {
            if (this.viewValues.direction === 'horizontal') {
              (localValue! as number) = this.invertCoordinate(e.clientX).inValue;
            } else if (this.viewValues.direction === 'vertical') {
              (localValue! as number) = this.invertCoordinate(e.clientY).inValue;
            }
            
            this.setValue(localValue!, 'single');
          } else if (this.viewValues.type === 'range') {
            if (this.viewValues.direction === 'horizontal') {
              (localValue! as number) = this.invertCoordinate(e.clientX).inValue;
            } else if (this.viewValues.direction === 'vertical') {
              (localValue! as number) = this.invertCoordinate(e.clientY).inValue;
            }
            
            if (localValue! <= (this.viewValues.value as sliderRangeValueType)[1]) {
              this.setValue([(localValue! as number), (this.viewValues.value as sliderRangeValueType)[1]], 'range');
            } else {
              this.setValue([(this.viewValues.value as sliderRangeValueType)[0], (localValue! as number)], 'range');
            }
          }
          this.observebale.trigger('userMoveSlider', this.viewValues.value);
        }
      });
    }
  }

  /** Создает tooltip + стили */
  private initTooltip() {
    if (this.viewValues.type === 'single') {
      if (this.viewValues.tooltip) {
        (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
        this.handle!.appendChild(this.tooltip);
        
        if (this.viewValues.direction === 'horizontal') {
          this.tooltip.classList.add('slider__tooltip_horizontal');
        } else if (this.viewValues.direction === 'vertical') {
          this.tooltip.classList.add('slider__tooltip_vertical');
        }
        this.tooltip.innerHTML = (this.viewValues.value).toString();
      }
    } else if (this.viewValues.type === 'range') {
      if (this.viewValues.tooltip) {
        (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMin!.appendChild(this.tooltipMin);

        (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
        this.handleMax!.appendChild(this.tooltipMax);

        if (this.viewValues.direction === 'horizontal') {
          this.tooltipMin.classList.add('slider__tooltip_horizontal');
          this.tooltipMax.classList.add('slider__tooltip_horizontal');
        } else if (this.viewValues.direction === 'vertical') {
          this.tooltipMin.classList.add('slider__tooltip_vertical');
          this.tooltipMax.classList.add('slider__tooltip_vertical');
        }
        
        this.tooltipMin.innerHTML = ((this.viewValues.value as sliderRangeValueType)[0]).toString();
        this.tooltipMax.innerHTML = ((this.viewValues.value as sliderRangeValueType)[1]).toString();
      }
    }
  }

  /** Добавляем стили scale */
  private initScaleStyles() {
    if (this.scale) {
      if (this.viewValues.direction === 'horizontal') this.scale.classList.add('slider__scale_horizontal');
      if (this.viewValues.direction === 'vertical') this.scale.classList.add('slider__scale_vertical');
    }
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

  private clearRoot() {
    this.wrap.remove();
  }

  /** Удаляет scale из DOM */
  private clearScale() {
    this.scale?.remove();
  }

  /** Удаляет tooltip из DOM */
  private clearTooltip() {
    this.tooltip?.remove();
    this.tooltipMin?.remove();
    this.tooltipMax?.remove();
  }
  
  private invertToPersent(value: number) { // перевод из значения в % от длины.ширины
    return ((value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min)) * 100;
  }

  /**
   * Переводит координаты мыши в % - .inPersent или в корректное значение .inValue
   * @param value Значение
   */
  private invertCoordinate(value: number) {
    let localPersentValue: number = 0;

    if (this.viewValues.direction === 'horizontal') {
      localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().left) / this.sliderLine.getBoundingClientRect().width) * 100).toFixed(2));
    } else if (this.viewValues.direction === 'vertical') {
      localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().top) / this.sliderLine.getBoundingClientRect().height) * 100).toFixed(2));
    }

    if (localPersentValue < 0) localPersentValue = 0;
    if (localPersentValue > 100) localPersentValue = 100;
    const localValue = ((Number(localPersentValue) / 100) * (this.viewValues.max - this.viewValues.min)) + this.viewValues.min;

    return {
      inPersent: Number(localPersentValue.toFixed()),
      inValue: Number(localValue.toFixed(2)),
    };
  }

  private stepСheck(value: number): number {
    return stepСheck(value, this.viewValues.min, this.viewValues.max, this.viewValues.step);
  }

  private checkValue(value: sliderValueType) {
    return checkValue(value, this.viewValues.min, this.viewValues.max, this.viewValues.step, this.viewValues.type);
  }

  private addMoveListener() {
    let MousePositionOnSlider: number = 0;

    const onMouseMoveHandle = (e: MouseEvent) => {
      e.preventDefault();
      
      if (this.viewValues.direction === 'horizontal') {
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
      }

      MousePositionOnSlider = this.stepСheck(MousePositionOnSlider);
      this.setValue(MousePositionOnSlider, 'single');
      
      this.viewValues.value = MousePositionOnSlider;
    };

    const onMouseMoveHandleMin = (e: MouseEvent) => {
      e.preventDefault();
      // const localMax = (this.viewValues.value as sliderRangeValueType)[1];
      const [localMax] = [(this.viewValues.value as sliderRangeValueType)[1]];
      
      if (this.viewValues.direction === 'horizontal') {
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
        
        MousePositionOnSlider = this.stepСheck(MousePositionOnSlider);
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;

        MousePositionOnSlider = this.stepСheck(MousePositionOnSlider);
      }

      this.setValue([MousePositionOnSlider, localMax], 'range');
    };

    const onMouseMoveHandleMax = (e: MouseEvent) => {
      e.preventDefault();
      // const localMin = (this.viewValues.value as sliderRangeValueType)[0];
      const [localMin] = [(this.viewValues.value as sliderRangeValueType)[0]];
      if (this.viewValues.direction === 'horizontal') {
        MousePositionOnSlider = this.invertCoordinate(e.clientX).inValue;
        
        MousePositionOnSlider = this.stepСheck(MousePositionOnSlider);
      } else if (this.viewValues.direction === 'vertical') {
        MousePositionOnSlider = this.invertCoordinate(e.clientY).inValue;
        
        MousePositionOnSlider = this.stepСheck(MousePositionOnSlider);
      }
      if (MousePositionOnSlider <= localMin) {
        this.setValue([localMin - this.viewValues.step, MousePositionOnSlider], 'range');
      } else this.setValue([localMin, MousePositionOnSlider], 'range');
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMoveHandle);
      document.removeEventListener('mousemove', onMouseMoveHandleMin);
      document.removeEventListener('mousemove', onMouseMoveHandleMax);
      console.log(this.viewValues.value);
      this.observebale.trigger('userMoveSlider', this.viewValues.value);
    };

    const onFocusHandle = (e: KeyboardEvent) => {
      e.preventDefault();
      if ((e.code === 'ArrowLeft') || (e.code === 'ArrowDown')) {
        this.setValue(((this.viewValues.value as number) - this.viewValues.step), 'single');
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
      if ((e.code === 'ArrowRight') || (e.code === 'ArrowUp')) {
        this.setValue(((this.viewValues.value as number) + this.viewValues.step), 'single');
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
    };

    const onFocusHandleMin = (e: KeyboardEvent) => {
      e.preventDefault();
      if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
        this.setValue(
          [((this.viewValues.value as sliderRangeValueType)[0] + this.viewValues.step), (this.viewValues.value as sliderRangeValueType)[1]],
          'range',
        );
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
      if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
        this.setValue(
          [((this.viewValues.value as sliderRangeValueType)[0] - this.viewValues.step), (this.viewValues.value as sliderRangeValueType)[1]],
          'range',
        );
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
    };
    const onFocusHandleMax = (e: KeyboardEvent) => {
      e.preventDefault();
      if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
        this.setValue(
          [(this.viewValues.value as sliderRangeValueType)[0], ((this.viewValues.value as sliderRangeValueType)[1] + this.viewValues.step)],
          'range',
        );
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
      if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
        if (((this.viewValues.value as sliderRangeValueType)[1] - (this.viewValues.value as sliderRangeValueType)[0]) === this.viewValues.step) {
          this.setValue(
            [(this.viewValues.value as sliderRangeValueType)[0] - this.viewValues.step, ((this.viewValues.value as sliderRangeValueType)[1] - this.viewValues.step)],
            'range',
          );
          return;
        }
        this.setValue(
          [(this.viewValues.value as sliderRangeValueType)[0], ((this.viewValues.value as sliderRangeValueType)[1] - this.viewValues.step)],
          'range',
        );
        this.observebale.trigger('userMoveSlider', this.viewValues.value);
      }
    };

    const onBlurHandle = () => {
      if (this.viewValues.type === 'single') {
        this.handle?.removeEventListener('keydown', onFocusHandle);
      } else if (this.viewValues.type === 'range') {
        this.handleMin?.removeEventListener('keydown', onFocusHandleMin);
        this.handleMax?.removeEventListener('keydown', onFocusHandleMax);
      }
    };

    if (this.viewValues.type === 'single') {
      this.handle!.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandle);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
      // --
      this.handle!.addEventListener('focus', () => {
        this.handle!.addEventListener('keydown', onFocusHandle);
      });

      this.handle!.addEventListener('blur', onBlurHandle);
      // --
    } else if (this.viewValues.type === 'range') {
      this.handleMin!.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandleMin);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
      // --
      this.handleMin!.addEventListener('focus', () => {
        this.handleMin!.addEventListener('keydown', onFocusHandleMin);
      });

      this.handleMin!.addEventListener('blur', onBlurHandle);
      // --
      this.handleMax!.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 0) {
          document.addEventListener('mousemove', onMouseMoveHandleMax);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
      // --
      this.handleMax!.addEventListener('focus', () => {
        this.handleMax!.addEventListener('keydown', onFocusHandleMax);
      });

      this.handleMax!.addEventListener('blur', onBlurHandle);
      // --onFocusHandleMax
    }
  }

  changeDirection() {
    if (this.viewValues.direction === 'horizontal') this.viewValues.direction = 'vertical';
    else if (this.viewValues.direction === 'vertical') this.viewValues.direction = 'horizontal';

    this.clearRoot();
    this.init(this.viewValues);
    this.initStyles(this.viewValues.type, this.viewValues.direction);
    this.setValue(this.viewValues.value, this.viewValues.type);
    this.addMoveListener();
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
    this.addMoveListener();
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

  /** Меняет step и меняет value в соответсвии новому шагу */
  changeStep(step: number) {
    let localStep: number = step;
    if (localStep < 0.01) localStep = 0.01;
    if (localStep > (this.viewValues.max - this.viewValues.min)) localStep = (this.viewValues.max - this.viewValues.min);
    this.viewValues.step = step;
    this.setValue(this.viewValues.value, this.viewValues.type);
  }

  /** Меняет scale  */
  changeScale(options: scaleType) {
    // if (this.viewValues.scale.init === options.init) return;

    this.viewValues.scale.init = options.init;
    if (options.type) this.viewValues.scale.type = options.type;
    if (options.num) this.viewValues.scale.num = options.num;

    if (this.viewValues.scale.init === false) this.clearScale();
    else if (this.viewValues.scale.init === true) {
      this.clearScale();
      this.initScale(this.viewValues.scale);
    }
  }

  /** Меняет tooltip (добавляет/удаляет) */
  changeTooltip(tooltip: boolean) {
    if (this.viewValues.tooltip === tooltip) return;
    if (tooltip === false) {
      this.viewValues.tooltip = false;
      this.clearTooltip();
      // this.viewValues.tooltip = tooltip;
      // this.tooltip?.setAttribute('display', 'none');
    } else if (tooltip === true) {
      this.viewValues.tooltip = true;
      this.initTooltip();
    }
  }

  getValues() {
    return this.viewValues;
  }

  /** addObservers - добавляет подписчика на событие */
  addObservers(observer: object) {
    this.observebale.subscribe(observer);
  }
}

// const v1 = new View({
//   min: 1,
//   max: 100,
//   step: 1,
//   // value: [961, 96],
//   tooltip: true,
//   root: 'mySlider',
//   scale: { init: true, type: 'usual', num: 15 },
//   type: 'range',
// });

// const v2 = new View({
//   root: 'mySliderRange',
//   direction: 'horizontal',
//   type: 'range',
//   tooltip: true,
//   scale: { init: true, num: 5, type: 'numeric' },
//   // min: 400,
//   // max: 1000,
//   step: 1,
//   value: [1001, 90],
// });
// console.log('v2', v2.getValues().value);

// const v3 = new View({
//   type: 'range',
//   step: 3,
// });

// const v4 = new View({
//   step: 5, max: 1000, value: [2000, 5000], type: 'range', tooltip: true, scale: { init: true, type: 'numeric', num: 5 },
// });
// setInterval(() => {
// console.log(v2.getValues().value);
// }, 3000);

export default View;
