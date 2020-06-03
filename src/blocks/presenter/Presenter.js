"use strict";
exports.__esModule = true;
var View_1 = require("../view/View");
var Model_1 = require("../model/Model");
var Presenter = /** @class */ (function () {
    function Presenter(options) {
        this.view = new View_1["default"](options);
        this.model = new Model_1["default"](options);
        this.addObserver(this);
    }
    /** В зависимости от action выполняет манипуляции над View и Model */
    Presenter.prototype.update = function (action, parameters) {
        if (action === 'userMoveSlider')
            this.changeValue(parameters);
    };
    /** Сменить direction */
    Presenter.prototype.changeDirection = function () {
        this.model.changeDirection();
        this.view.changeDirection();
    };
    /** Сменить type */
    Presenter.prototype.changeType = function (type) {
        this.model.changeType(type);
        this.view.changeType(type);
    };
    /** Сменить значения */
    Presenter.prototype.changeValue = function (value) {
        this.model.setValue(value, this.model.type);
        this.view.changeValue(value);
    };
    /** Меняет step и меняет value в соответствии новому шагу */
    Presenter.prototype.changeStep = function (step) {
        this.model.changeStep(step);
        this.view.changeStep(step);
    };
    /** Меняет scale  */
    Presenter.prototype.changeScale = function (options) {
        this.model.changeScale(options);
        this.view.changeScale(options);
        // console.log('modelScale:', this.model.scale, 'viewscale:', this.view.getValues().scale);
    };
    /** Меняет tooltip  */
    Presenter.prototype.changeTooltip = function (tooltip) {
        this.model.tooltip = tooltip;
        this.view.changeTooltip(this.model.tooltip);
    };
    /** Получить текущее значение слайдера. */
    Presenter.prototype.getValue = function () {
        return this.model.value;
    };
    /** Получить тип слайдера */
    Presenter.prototype.getType = function () {
        return this.model.type;
    };
    /** Получить шаг слайдера */
    Presenter.prototype.getStep = function () {
        return this.model.step;
    };
    /** Получить шкалу слайдера */
    Presenter.prototype.getScale = function () {
        return this.model.scale;
    };
    /** Получить ориентацию(вертикальный\горизонтальный) слайдера */
    Presenter.prototype.getDirection = function () {
        return this.model.direction;
    };
    /** Получить тултип слайдера */
    Presenter.prototype.getTooltip = function () {
        return this.model.tooltip;
    };
    /** addObserver - добавляет наблюдателя за измененинием значения слайдера */
    Presenter.prototype.addObserver = function (observer) {
        this.view.addObservers(observer);
    };
    return Presenter;
}());
exports["default"] = Presenter;
