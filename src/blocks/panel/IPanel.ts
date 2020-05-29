import {
  sliderValueType, scaleType, sliderType, sliderDirection,
} from '../model/IModel';

interface IPanel {
  // value: sliderValueType;
  
  root: HTMLDivElement;
  
  // valueWrap: HTMLDivElement;
  valueInput1: HTMLInputElement;
  valueInput2: HTMLInputElement;

  // typeWrap: HTMLDivElement;
  typeRadio1: HTMLInputElement;
  typeRadio2: HTMLInputElement;

  // directionWrap: HTMLDivElement;
  directionRadio1: HTMLInputElement;
  directionRadio2: HTMLInputElement;

  // tooltipWrap: HTMLDivElement;
  tooltipRadio1: HTMLInputElement;
  tooltipRadio2: HTMLInputElement;

  // stepWrap: HTMLDivElement;
  stepInput: HTMLInputElement;

  // scaleWrap: HTMLDivElement;
  // scaleOnOffWrap: HTMLDivElement;
  scaleOnRadio: HTMLInputElement;
  scaleOffRadio: HTMLInputElement;
  // scaleTypeWrap: HTMLDivElement;
  scaleTypeRadio1: HTMLInputElement;
  scaleTypeRadio2: HTMLInputElement;
  // scaleNumWrap: HTMLDivElement;
  scaleNumInput: HTMLInputElement;

  // update(action: string): void;
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
