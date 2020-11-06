import { sliderValueType } from '../model/IModel';
import Observer from './IObserver';

class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  trigger(action: string, parameters: sliderValueType) {
    this.observers.forEach((observer: Observer) => observer.update(action, parameters));
  }
}

export default Observable;
