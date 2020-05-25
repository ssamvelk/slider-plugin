/* eslint-disable @typescript-eslint/no-explicit-any */

// import { sliderValueType } from '../model/IModel';

class Observable {
  observers: Array<object>;

  constructor() {
    this.observers = [];
  }

  subscribe(observer: any) {
    this.observers.push(observer);
  }

  trigger(action: string, parameters: any) {
    this.observers.forEach((observer: any) => observer.update(action, parameters));
    // console.log(`Стригерил событие ${action}, передал параметры ${parameters}`);
  }
}

export default Observable;
