import IPresenter from './IPresenter';
import View from '../view/View';
import Model from '../model/Model';
import { initViewOptions } from '../view/IView';
import { sliderType, sliderValueType, scaleType } from '../model/IModel';

class Presenter implements IPresenter {
  view: View;

  model: Model;
  
  constructor(options: initViewOptions) {
    this.view = new View(options);
    this.model = new Model(options);

    this.addObserver(this);
  }
  
  /** В зависимости от action выполняет манипуляции над View и Model */
  private update(action: string, parameters?: sliderValueType) {
    if (action === 'userMoveSlider') this.changeValue(parameters!);
  }

  /** Сменить direction */
  changeDirection() {
    this.model.changeDirection();
    this.view.changeDirection();
  }

  /** Сменить type */
  changeType(type: sliderType) {
    this.model.changeType(type);
    this.view.changeType(type);
  }

  /** Сменить значения */
  changeValue(value: sliderValueType) {
    this.model.setValue(value, this.model.type);
    this.view.changeValue(value);
  }

  /** Меняет step и меняет value в соответствии новому шагу */
  changeStep(step: number) {
    this.model.changeStep(step);
    this.view.changeStep(step);
  }

  /** Меняет scale  */
  changeScale(options: scaleType) {
    this.model.changeScale(options);
    this.view.changeScale(options);
    // console.log('modelScale:', this.model.scale, 'viewscale:', this.view.getValues().scale);
  }

  /** Меняет tooltip  */
  changeTooltip(tooltip: boolean) {
    this.model.tooltip = tooltip;
    this.view.changeTooltip(this.model.tooltip);
  }
  
  /** Получить текущее значение слайдера. */
  getValue() {
    return this.model.value;
  }

  /** Получить тип слайдера */
  getType() {
    return this.model.type;
  }

  /** Получить шаг слайдера */
  getStep() {
    return this.model.step;
  }

  /** Получить шкалу слайдера */
  getScale() {
    return this.model.scale;
  }

  /** Получить ориентацию(вертикальный\горизонтальный) слайдера */
  getDirection() {
    return this.model.direction;
  }

  /** Получить тултип слайдера */
  getTooltip() {
    return this.model.tooltip;
  }

  /** addObserver - добавляет наблюдателя за измененинием значения слайдера */
  addObserver(observer: object) {
    this.view.addObservers(observer);
  }
}

export default Presenter;
