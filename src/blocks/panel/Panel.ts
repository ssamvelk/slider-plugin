import {
  sliderValueType, scaleType, sliderType, sliderDirection,
} from '../model/IModel';
import { panelOptions, IPanel } from './IPanel';

class Panel implements IPanel { // implements IPanel
  // value: sliderValueType;
  
  root: HTMLDivElement;
  
  // private valueWrap!: HTMLDivElement;

  valueInput1!: HTMLInputElement;

  valueInput2!: HTMLInputElement;

  // private typeWrap!: HTMLDivElement;

  typeRadio1!: HTMLInputElement;

  typeRadio2!: HTMLInputElement;

  // private directionWrap!: HTMLDivElement;

  directionRadio1!: HTMLInputElement;

  directionRadio2!: HTMLInputElement;

  // private tooltipWrap!: HTMLDivElement;

  tooltipRadio1!: HTMLInputElement;

  tooltipRadio2!: HTMLInputElement;

  // private scaleWrap!: HTMLDivElement;

  // private scaleOnOffWrap!: HTMLDivElement;

  scaleOnRadio!: HTMLInputElement;

  scaleOffRadio!: HTMLInputElement;

  // private scaleTypeWrap!: HTMLDivElement;

  scaleTypeRadio1!: HTMLInputElement;

  scaleTypeRadio2!: HTMLInputElement;

  // private scaleNumWrap!: HTMLDivElement;

  scaleNumInput!: HTMLInputElement;

  // private stepWrap!: HTMLDivElement;

  stepInput!: HTMLInputElement;

  constructor(options: panelOptions, serialNumber: number) {
    const localValue = options.value || 0;
    const localType = options.type || 'single';
    const localDirection = options.direction || 'horizontal';
    const localTooltip = options.tooltip || false;
    const localStep = options.step || 1;
    const localScale = options.scale || { init: true, type: 'usual', num: 7 };
    this.root = options.root;
    
    this.init(serialNumber);
    this.setValue(localValue);
    this.setType(localType);
    this.setDirection(localDirection);
    this.setTooltip(localTooltip);
    this.setStep(localStep);
    this.setScale(localScale);
  }

  /** Инициализация панели и отрисовка DOM */
  init(serialNumber: number) {
    const valueWrap = document.createElement('div');
    const typeWrap = document.createElement('div');
    const directionWrap = document.createElement('div');
    const tooltipWrap = document.createElement('div');
    const stepWrap = document.createElement('div');
    const scaleWrap = document.createElement('div');
    const scaleOnOffWrap = document.createElement('div');
    const scaleTypeWrap = document.createElement('div');
    const scaleNumWrap = document.createElement('div');

    /**  valueWrap - div для value */
    this.valueInput1 = document.createElement('input');
    this.valueInput1.setAttribute('type', 'number');
    this.valueInput1.setAttribute('step', 'any');
    this.valueInput1.classList.add('panel__value');
    this.valueInput2 = document.createElement('input');
    this.valueInput2.setAttribute('type', 'number');
    this.valueInput2.setAttribute('step', 'any');
    this.valueInput2.classList.add('panel__value');
    valueWrap.textContent = 'Value: ';
    valueWrap.appendChild(this.valueInput1);
    valueWrap.appendChild(this.valueInput2);
    valueWrap.classList.add('panel__value-wrap');

    /**  typeWrap - div для type */
    
    this.typeRadio1 = document.createElement('input');
    this.typeRadio1.setAttribute('type', 'radio');
    this.typeRadio1.setAttribute('name', `sliderType${serialNumber}`);
    this.typeRadio1.setAttribute('id', `sliderType1${serialNumber}`);
    this.typeRadio1.setAttribute('checked', 'checked');
    this.typeRadio1.setAttribute('value', 'single');
    this.typeRadio1.classList.add('panel__type');
    this.typeRadio2 = document.createElement('input');
    this.typeRadio2.setAttribute('type', 'radio');
    this.typeRadio2.setAttribute('name', `sliderType${serialNumber}`);
    this.typeRadio2.setAttribute('id', `sliderType2${serialNumber}`);
    this.typeRadio2.setAttribute('value', 'range');
    this.typeRadio2.classList.add('panel__type');
    typeWrap.textContent = 'Type: ';
    let label = document.createElement('label');
    label.setAttribute('for', `sliderType1${serialNumber}`);
    label.textContent = 'SINGLE';
    typeWrap.appendChild(label);
    typeWrap.appendChild(this.typeRadio1);
    label = document.createElement('label');
    label.setAttribute('for', `sliderType2${serialNumber}`);
    label.textContent = 'RANGE';
    typeWrap.appendChild(label);
    typeWrap.appendChild(this.typeRadio2);
    typeWrap.classList.add('panel__type-wrap');

    /**  directionWrap - div для direction */
    
    this.directionRadio1 = document.createElement('input');
    this.directionRadio1.setAttribute('type', 'radio');
    this.directionRadio1.setAttribute('name', `sliderDirection${serialNumber}`);
    this.directionRadio1.setAttribute('id', `sliderDirectionHor${serialNumber}`);
    this.directionRadio1.setAttribute('checked', 'checked');
    this.directionRadio1.setAttribute('value', 'horizontal');
    this.directionRadio1.classList.add('panel__direction');
    this.directionRadio2 = document.createElement('input');
    this.directionRadio2.setAttribute('type', 'radio');
    this.directionRadio2.setAttribute('name', `sliderDirection${serialNumber}`);
    this.directionRadio2.setAttribute('id', `sliderDirectionVer${serialNumber}`);
    this.directionRadio2.setAttribute('value', 'vertical');
    this.directionRadio2.classList.add('panel__direction');
    directionWrap.textContent = 'Direction: ';
    label = document.createElement('label');
    label.setAttribute('for', `sliderDirectionHor${serialNumber}`);
    label.textContent = 'HORIZONTAL';
    directionWrap.appendChild(label);
    directionWrap.appendChild(this.directionRadio1);
    label = document.createElement('label');
    label.setAttribute('for', `sliderDirectionVer${serialNumber}`);
    label.textContent = 'VERTICAL';
    directionWrap.appendChild(label);
    directionWrap.appendChild(this.directionRadio2);
    directionWrap.classList.add('panel__direction-wrap');

    /**  tooltipWrap - div для tooltip */
    
    this.tooltipRadio1 = document.createElement('input');
    this.tooltipRadio1.setAttribute('type', 'radio');
    this.tooltipRadio1.setAttribute('name', `sliderTooltip${serialNumber}`);
    this.tooltipRadio1.setAttribute('id', `sliderTooltipOn${serialNumber}`);
    this.tooltipRadio1.setAttribute('checked', 'checked');
    this.tooltipRadio1.setAttribute('value', 'on');
    this.tooltipRadio1.classList.add('panel__tooltip');
    this.tooltipRadio2 = document.createElement('input');
    this.tooltipRadio2.setAttribute('type', 'radio');
    this.tooltipRadio2.setAttribute('name', `sliderTooltip${serialNumber}`);
    this.tooltipRadio2.setAttribute('id', `sliderTooltipOff${serialNumber}`);
    this.tooltipRadio2.setAttribute('value', 'off');
    this.tooltipRadio2.classList.add('panel__tooltip');
    tooltipWrap.textContent = 'Tooltip: ';
    label = document.createElement('label');
    label.setAttribute('for', `sliderTooltipOn${serialNumber}`);
    label.textContent = 'ON';
    tooltipWrap.appendChild(label);
    tooltipWrap.appendChild(this.tooltipRadio1);
    label = document.createElement('label');
    label.setAttribute('for', `sliderTooltipOff${serialNumber}`);
    label.textContent = 'OFF';
    tooltipWrap.appendChild(label);
    tooltipWrap.appendChild(this.tooltipRadio2);
    tooltipWrap.classList.add('panel__tooltip-wrap');

    /** stepWrap - div для step */
    
    this.stepInput = document.createElement('input');
    this.stepInput.setAttribute('type', 'number');
    this.stepInput.setAttribute('step', 'any');
    this.stepInput.classList.add('panel__step');
    stepWrap.textContent = 'Step: ';
    stepWrap.appendChild(this.stepInput);
    stepWrap.classList.add('panel__step-wrap');

    /** scaleWrap - div для scale */
    
    scaleOnOffWrap.textContent = 'Scale: ';
    scaleOnOffWrap.classList.add('panel__scale-init-wrap');
    this.scaleOnRadio = document.createElement('input');
    this.scaleOnRadio.setAttribute('type', 'radio');
    this.scaleOnRadio.setAttribute('name', `sliderScale${serialNumber}`);
    this.scaleOnRadio.setAttribute('id', `sliderScaleOn${serialNumber}`);
    this.scaleOnRadio.setAttribute('checked', 'checked');
    this.scaleOnRadio.setAttribute('value', 'on');
    this.scaleOffRadio = document.createElement('input');
    this.scaleOffRadio.setAttribute('type', 'radio');
    this.scaleOffRadio.setAttribute('name', `sliderScale${serialNumber}`);
    this.scaleOffRadio.setAttribute('id', `sliderScaleOff${serialNumber}`);
    this.scaleOffRadio.setAttribute('value', 'off');
    label = document.createElement('label');
    label.setAttribute('for', `sliderScaleOn${serialNumber}`);
    label.textContent = 'ON';
    scaleOnOffWrap.appendChild(label);
    scaleOnOffWrap.appendChild(this.scaleOnRadio);
    label = document.createElement('label');
    label.setAttribute('for', `sliderScaleOff${serialNumber}`);
    label.textContent = 'OFF';
    scaleOnOffWrap.appendChild(label);
    scaleOnOffWrap.appendChild(this.scaleOffRadio);
    scaleTypeWrap.textContent = 'Scale type: ';
    scaleTypeWrap.classList.add('panel__scale-type-wrap');
    this.scaleTypeRadio1 = document.createElement('input');
    this.scaleTypeRadio1.setAttribute('type', 'radio');
    this.scaleTypeRadio1.setAttribute('name', `sliderScaleType${serialNumber}`);
    this.scaleTypeRadio1.setAttribute('id', `sliderScaleTypeUsual${serialNumber}`);
    this.scaleTypeRadio1.setAttribute('checked', 'checked');
    this.scaleTypeRadio1.setAttribute('value', 'usual');
    this.scaleTypeRadio2 = document.createElement('input');
    this.scaleTypeRadio2.setAttribute('type', 'radio');
    this.scaleTypeRadio2.setAttribute('name', `sliderScaleType${serialNumber}`);
    this.scaleTypeRadio2.setAttribute('id', `sliderScaleTypeNumeric${serialNumber}`);
    this.scaleTypeRadio2.setAttribute('value', 'numeric');
    label = document.createElement('label');
    label.setAttribute('for', `sliderScaleTypeUsual${serialNumber}`);
    label.textContent = 'USUAL';
    scaleTypeWrap.appendChild(label);
    scaleTypeWrap.appendChild(this.scaleTypeRadio1);
    label = document.createElement('label');
    label.setAttribute('for', `sliderScaleTypeNumeric${serialNumber}`);
    label.textContent = 'NUMERIC';
    scaleTypeWrap.appendChild(label);
    scaleTypeWrap.appendChild(this.scaleTypeRadio2);
    scaleNumWrap.textContent = 'Number of divisions: ';
    scaleNumWrap.classList.add('panel__scale-num-wrap');
    this.scaleNumInput = document.createElement('input');
    this.scaleNumInput.setAttribute('type', 'number');
    
    scaleNumWrap.appendChild(this.scaleNumInput);
    scaleWrap.appendChild(scaleOnOffWrap);
    scaleWrap.appendChild(scaleTypeWrap);
    scaleWrap.appendChild(scaleNumWrap);
    scaleWrap.classList.add('panel__scale-wrap');

    this.root.appendChild(valueWrap);
    this.root.appendChild(typeWrap);
    this.root.appendChild(directionWrap);
    this.root.appendChild(tooltipWrap);
    this.root.appendChild(stepWrap);
    this.root.appendChild(scaleWrap);
  }

  /** setValue - установка значений в инпуты value */
  setValue(value: sliderValueType) {
    if (typeof value === 'number') {
      this.valueInput1.value = value.toString();
    }
    if ((value instanceof Array) && (value.length === 2)) {
      this.valueInput1.value = value[0].toString();
      this.valueInput2.value = value[1].toString();
    }
  }

  setType(type: sliderType) {
    if (type === 'single') {
      this.typeRadio1.setAttribute('checked', 'checked');
      this.typeRadio2.removeAttribute('checked');
      this.valueInput2.disabled = true;
      this.valueInput2.value = '';
    } else if (type === 'range') {
      this.typeRadio1.removeAttribute('checked');
      this.typeRadio2.setAttribute('checked', 'checked');
      this.valueInput2.disabled = false;
    }
  }

  setDirection(direction: sliderDirection) {
    if (direction === 'horizontal') {
      this.directionRadio1.setAttribute('checked', 'checked');
      this.directionRadio2.removeAttribute('checked');
    } else if (direction === 'vertical') {
      this.directionRadio1.removeAttribute('checked');
      this.directionRadio2.setAttribute('checked', 'checked');
    }
  }

  setTooltip(tooltip: boolean) {
    if (tooltip) {
      this.tooltipRadio1.setAttribute('checked', 'checked');
      this.tooltipRadio2.removeAttribute('checked');
    } else if (tooltip === false) {
      this.tooltipRadio1.removeAttribute('checked');
      this.tooltipRadio2.setAttribute('checked', 'checked');
    }
  }

  setStep(value: number) {
    this.stepInput.value = value.toString();
  }

  setScale(scale: scaleType) {
    if (scale.init === true) {
      this.scaleOnRadio.setAttribute('checked', 'checked');
      this.scaleTypeRadio1.disabled = false;
      this.scaleTypeRadio2.disabled = false;
      this.scaleNumInput.disabled = false;
      this.scaleNumInput.value = (scale.num)!.toString();
    } else if (scale.init === false) {
      this.scaleOnRadio.removeAttribute('checked');
      this.scaleOffRadio.setAttribute('checked', 'checked');
      this.scaleTypeRadio1.disabled = true;
      this.scaleTypeRadio2.disabled = true;
      this.scaleNumInput.value = '';
      this.scaleNumInput.disabled = true;
      this.scaleNumInput.value = (scale.num)!.toString();
    }
    if (scale.type === 'usual') {
      this.scaleTypeRadio1.setAttribute('checked', 'checked');
      this.scaleTypeRadio2.removeAttribute('checked');
    } else if (scale.type === 'numeric') {
      this.scaleTypeRadio1.removeAttribute('checked');
      this.scaleTypeRadio2.setAttribute('checked', 'checked');
    }
  }

  /** Добавляет обработчики на события радиокнопок */
  addControlsEvents() {

  }

  /** update обработчик событий от observable */
  update(action: string, parameters: sliderValueType) {
    if (action === 'userMoveSlider') {
      this.setValue(parameters);
    }
  }
}

export default Panel;

// this.type = options.type || 'single';
// this.direction = options.direction || 'horizontal';
// this.step = options.step || 1;
// this.tooltip = options.tooltip || false;
// this.scale = {
//   init: options.scale?.init || false,
//   num: options.scale?.num || 7,
//   type: options.scale?.type || 'usual',
// };
// DOM
// this.inputValue1
// this.inputValue2
//
