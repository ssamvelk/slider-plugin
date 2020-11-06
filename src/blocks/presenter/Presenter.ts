import IPresenter from './IPresenter';
import View from '../view/View';
import Model from '../model/Model';
import { initViewOptions } from '../view/IView';
import { sliderType, sliderValueType, scaleType } from '../model/IModel';
import Observer from '../utils/IObserver';

class Presenter implements IPresenter {
  view: View;

  model: Model;
  
  constructor(options: initViewOptions) {
    this.view = new View(options);
    this.model = new Model(options);

    this.addObserver(this);
  }
  
  update(action: string, parameters?: sliderValueType) {
    if (action === 'userMoveSlider') this.changeValue(parameters!);
  }

  changeDirection() {
    this.model.changeDirection();
    this.view.changeDirection();
  }

  changeType(type: sliderType) {
    this.model.changeType(type);
    this.view.changeType(type);
  }

  changeValue(value: sliderValueType) {
    this.model.setValue(value, this.model.type);
    this.view.changeValue(value);
  }

  changeStep(step: number) {
    this.model.changeStep(step);
    this.view.changeStep(step);
  }

  changeScale(options: scaleType) {
    this.model.changeScale(options);
    this.view.changeScale(options);
  }

  changeTooltip(tooltip: boolean) {
    this.model.tooltip = tooltip;
    this.view.changeTooltip(this.model.tooltip);
  }
  
  getValue() {
    return this.model.value;
  }

  getType() {
    return this.model.type;
  }

  getStep() {
    return this.model.step;
  }

  getScale() {
    return this.model.scale;
  }

  getDirection() {
    return this.model.direction;
  }

  getTooltip() {
    return this.model.tooltip;
  }

  addObserver(observer: Observer) {
    this.view.addObservers(observer);
  }
}

export default Presenter;
