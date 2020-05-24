
class Observeble {
  observers: Array<object>;

  constructor() {
    this.observers = [];
  }

  subscribe(observer: object) {
    this.observers.push(observer);
  }

  trigger(action: string) {
    this.observers.forEach((observer):void => observer.update(action));
  }
}

export default Observeble;
