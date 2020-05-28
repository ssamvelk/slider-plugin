import IPresenter from './IPresenter';
import View from '../view/View';
import Model from '../model/Model';
// import { modelOptions } from '../model/IModel';
import { initViewOptions } from '../view/IView';
import { sliderType, sliderValueType } from '../model/IModel';

class Presenter implements IPresenter {
  view: View;

  model: Model;
  
  constructor(options: initViewOptions) {
    this.view = new View(options);
    this.model = new Model(options);

    this.addDefaultEvents();
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

  /** Меняет step и меняет value в соответсвии новому шагу */
  changeStep(step: number) {
    this.model.changeStep(step);
    this.view.changeStep(step);
  }
  
  /** Получить значение слайдера */
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

  // ----------------------СОБЫТИЯ
  
  /** В зависимости от action выполняет манипуляции над View и Model */
  private update(action: string, parameters: sliderValueType) {
    if (action === 'userMoveSlider') this.changeValue(parameters);
  }

  /** addDefaultEvents - добавляет Presenter  в список наблюдателей за измененинием значения слайдера */
  private addDefaultEvents() {
    this.view.addObservers(this);
  }

  /** addObserver - добавляет наблюдателя за измененинием значения слайдера */
  addObserver(observer: object) {
    this.view.addObservers(observer);
  }
}

// const p = new Presenter({
//   min: 1, max: 101, value: 67, step: 3, tooltip: true, root: 'mySlider', scale: true,
// });
// console.log('p.model = ', p.model, '\np.view.getValues() = ', p.view);

// setInterval(() => {
//   console.log('p.model = ', p.model.value, '\np.view.getValues() = ', p.view.getValues().value);
// }, 5000);


// const p2 = new Presenter({
//   root: 'mySliderRange', min: 0, max: 300, value: [30, 75], step: 30, type: 'range', direction: 'vertical', tooltip: true, scale: { init: true, type: 'numeric', num: 9 },
// });
// console.log('p2 ', p2);

// p.onValueChange(15);

// p2.onValueChange([25, 150]);
// p2.onDirectionChange();
// // p2.onTypeChange('single');

export default Presenter;
