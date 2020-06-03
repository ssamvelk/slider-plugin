import {
  sliderValueType, scaleType, sliderType, sliderDirection,
} from '../model/IModel';

interface IPanel {
  
  root: HTMLDivElement;
  
  valueInput1: HTMLInputElement;
  valueInput2: HTMLInputElement;

  typeRadio1: HTMLInputElement;
  typeRadio2: HTMLInputElement;

  directionRadio1: HTMLInputElement;
  directionRadio2: HTMLInputElement;

  tooltipRadio1: HTMLInputElement;
  tooltipRadio2: HTMLInputElement;

  stepInput: HTMLInputElement;

  scaleOnRadio: HTMLInputElement;
  scaleOffRadio: HTMLInputElement;

  scaleTypeRadio1: HTMLInputElement;
  scaleTypeRadio2: HTMLInputElement;

  scaleNumInput: HTMLInputElement;

  init(serialNumber: number): void;
  setValue(value: sliderValueType): void;
  setType(type: sliderType): void;
  setDirection(direction: sliderDirection): void;
  setTooltip(tooltip: boolean): void;
  setStep(value: number): void;
  setScale(scale: scaleType): void;
  update(action: string, parameters: sliderValueType): void;
}

type panelOptions = {
  step: number;
  type: sliderType;
  direction: sliderDirection;
  tooltip: boolean;
  scale: scaleType;
  root: HTMLDivElement;
  value: sliderValueType;
};

export {
  IPanel,
  panelOptions,
};
