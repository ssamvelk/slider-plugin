import { sliderType, sliderDirection, sliderRangeValueType } from '../model/IModel';

interface IView {
  root: HTMLDivElement, // | HTMLBodyElement
  base: HTMLDivElement, // базовый див
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

type viewOptions = {
  root?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: sliderType;
  direction?: sliderDirection;
  tooltip?: boolean;
  scale?: boolean;
  value?: number | sliderRangeValueType;
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
  viewOptions,
};
