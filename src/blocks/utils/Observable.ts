/**
 * Observable - объект наблюдения, за которым наблюдают подписчики
 */
class Observable {
  /**
   * observers - массив подписчиков
   */
  observers: object[];

  constructor() {
    this.observers = [];
  }

  /**
 * subscribe - метод класса Observable, который добавляет посписчика observer в массив подписчиков observers
 * @param observer - подписчик
 */
  subscribe(observer: object) {
    this.observers.push(observer);
  }

  /**
   * trigger<T> - метод класса Observable, который уведомляет всех подписчиков о том, что произошло событие action, и передает парметры parameters
   * @param action событие
   * @param parameters пареметры
   */
  trigger<T>(action: string, parameters: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.observers.forEach((observer: any) => observer.update(action, parameters));
  }
}

export default Observable;
