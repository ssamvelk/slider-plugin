"use strict";
exports.__esModule = true;
/**
 * Observable - объект наблюдения, за которым наблюдают подписчики
 */
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    /**
   * subscribe - метод класса Observable, который добавляет посписчика observer в массив подписчиков observers
   * @param observer - подписчик
   */
    Observable.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    /**
     * trigger<T> - метод класса Observable, который уведомляет всех подписчиков о том, что произошло событие action, и передает парметры parameters
     * @param action событие
     * @param parameters пареметры
     */
    Observable.prototype.trigger = function (action, parameters) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.observers.forEach(function (observer) { return observer.update(action, parameters); });
    };
    return Observable;
}());
exports["default"] = Observable;
