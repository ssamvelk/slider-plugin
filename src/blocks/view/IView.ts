import { sliderType, sliderDirection, sliderValueType } from '../model/IModel';

interface IView {
  root: HTMLDivElement, // | HTMLBodyElement
  wrap: HTMLDivElement, // базовый див
  sliderLine: HTMLDivElement, // линия слайдера
  selectSegment?: HTMLDivElement, // выделенное расстояние
  // handle при сингле, handleMin и handleMax при рандже
  handle?: HTMLDivElement;
  handleMin?: HTMLDivElement;
  handleMax?: HTMLDivElement;
  tooltip?: HTMLDivElement; // подсказка со значением
  tooltipMin?: HTMLDivElement;
  tooltipMax?: HTMLDivElement;
  scale?: HTMLDivElement; // шкала

}

type initViewOptions = {
  root?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean;
  value?: sliderValueType;
};

type defaultViewOptions = {
  min: number;
  max: number;
  step: number;
  value: sliderValueType;
  type: sliderType;
  direction: sliderDirection;
  scale: boolean;
  tooltip: boolean;
};
// min:number;// мин значение шкалы
// max:number;// макс значение шкалы
// value: number;
// type: sliderType;
// direction: sliderDirection;
// tooltipDisplay: boolean;// опция тултипа (вкл\выкл)
// scaleDisplay: boolean;// опция шкалы (вкл\выкл)
export {
  IView,
  initViewOptions,
  defaultViewOptions,
};
