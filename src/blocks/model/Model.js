"use strict";
exports.__esModule = true;
var Utils_1 = require("../utils/Utils");
var Model = /** @class */ (function () {
    function Model(options) {
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.step = options.step || 1;
        if (this.min >= this.max) {
            this.max = this.min + this.step;
        }
        this.type = options.type || 'single';
        this.direction = options.direction || 'horizontal';
        this.value = options.value || ((this.type === 'range') ? [0, 100] : 0);
        this.tooltip = options.tooltip || false;
        this.scale = {
            // eslint-disable-next-line no-nested-ternary
            init: ((typeof options.scale) === 'boolean')
                ? options.scale
                : (((options.scale instanceof Object) && options.scale !== undefined) ? options.scale.init : false),
            num: ((options.scale instanceof Object) && options.scale.num) ? options.scale.num : 7,
            type: (options.scale instanceof Object && options.scale.type) ? options.scale.type : 'usual'
        };
        this.setValue(this.value, this.type);
    }
    /** Получить тип слайдера */
    Model.prototype.getType = function () {
        return this.type;
    };
    /** Получить шаг слайдера */
    Model.prototype.getStep = function () {
        return this.step;
    };
    /** Получить текущее значение слайдера.  */
    Model.prototype.getValue = function () {
        return this.value;
    };
    /** Установить текущее значение слайдера.  */
    Model.prototype.setValue = function (value, type) {
        var localValue = Utils_1.checkValue(value, this.min, this.max, this.step, this.type);
        if (type === 'single') {
            this.value = localValue;
        }
        else if (type === 'range') {
            this.value = localValue;
        }
    };
    /** Сменить ориентацию слайдера */
    Model.prototype.changeDirection = function () {
        if (this.direction === 'horizontal')
            this.direction = 'vertical';
        else if (this.direction === 'vertical')
            this.direction = 'horizontal';
    };
    /** Сменить type */
    Model.prototype.changeType = function (type) {
        if (type === this.type) {
            // console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
            // throw new Error('Нельзя поменять тип слайдера на тот же самый, который установлен');
            return false;
        }
        this.type = type;
        var localValue;
        if (this.type === 'single') { // range -> single
            localValue = this.value[0];
            this.value = localValue;
        }
        else if (this.type === 'range') { // single -> range
            localValue = [this.value, this.value];
            this.value = localValue;
        }
        this.setValue(this.value, this.type);
        return true;
    };
    /** Меняет step и меняет value в соответсвии новому шагу */
    Model.prototype.changeStep = function (step) {
        var localStep = step;
        if (localStep < 0.01)
            localStep = 0.01;
        if (localStep > (this.max - this.min))
            localStep = (this.max - this.min);
        this.step = localStep;
        this.setValue(this.value, this.type);
    };
    /** Меняет scale  */
    Model.prototype.changeScale = function (options) {
        this.scale.init = options.init;
        if (options.type)
            this.scale.type = options.type;
        if (options.num)
            this.scale.num = options.num;
        // console.log('modelScale:', this.scale);
    };
    return Model;
}());
exports["default"] = Model;
