"use strict";
exports.__esModule = true;
var Utils_1 = require("../utils/Utils");
var Observable_1 = require("../utils/Observable");
var View = /** @class */ (function () {
    function View(options) {
        this.viewValues = {
            min: options.min || 0,
            max: options.max || 100,
            step: options.step || 1,
            type: options.type || 'single',
            value: options.value || ((options.type === 'range') ? [0, 100] : 0),
            direction: options.direction || 'horizontal',
            tooltip: options.tooltip || false,
            scale: {
                // eslint-disable-next-line no-nested-ternary
                init: ((typeof options.scale) === 'boolean')
                    ? options.scale
                    : (((options.scale instanceof Object) && options.scale !== undefined) ? options.scale.init : false),
                num: ((options.scale instanceof Object) && options.scale.num) ? options.scale.num : 7,
                type: (options.scale instanceof Object && options.scale.type) ? options.scale.type : 'usual'
            }
        };
        this.observebale = new Observable_1["default"]();
        this.init(options);
        this.initStyles(options.type, options.direction);
        this.setValue(this.viewValues.value, this.viewValues.type);
        this.addMoveListener();
    }
    /** Первоначальная инициализация слайдера */
    View.prototype.init = function (opt) {
        if (!this.root) {
            this.root = document
                .getElementById(opt.root) || document.body;
        }
        (this.wrap = document.createElement('div')).classList.add('slider__wrp');
        if (this.root === document.body) {
            this.root.insertBefore(this.wrap, document.querySelector('script'));
        }
        else {
            this.root.appendChild(this.wrap);
        }
        (this.sliderLine = document.createElement('div')).classList.add('slider__line');
        this.wrap.appendChild(this.sliderLine);
        (this.selectSegment = document.createElement('div')).classList.add('slider__select');
        if (this.viewValues.type === 'single') {
            this.sliderLine.appendChild(this.selectSegment);
            (this.handle = document.createElement('div')).classList.add('slider__handle');
            this.sliderLine.appendChild(this.handle);
        }
        else if (this.viewValues.type === 'range') {
            (this.handleMin = document.createElement('div')).classList.add('slider__handle');
            this.sliderLine.appendChild(this.handleMin);
            this.sliderLine.appendChild(this.selectSegment);
            (this.handleMax = document.createElement('div')).classList.add('slider__handle');
            this.sliderLine.appendChild(this.handleMax);
        }
        if (this.viewValues.tooltip) {
            this.initTooltip();
        }
        if (this.viewValues.scale.init) {
            this.initScale(this.viewValues.scale);
        }
    };
    /** Добавляет стили */
    View.prototype.initStyles = function (type, direction) {
        if (type === void 0) { type = 'single'; }
        if (direction === void 0) { direction = 'horizontal'; }
        if (direction === 'horizontal') {
            this.wrap.classList.add('slider__wrp_horizontal');
            this.sliderLine.classList.add('slider__line_horizontal');
            this.selectSegment.classList.add('slider__select_horizontal');
            if (type === 'single') {
                if (this.handle) {
                    this.handle.classList.add('slider__handle_horizontal');
                    this.handle.tabIndex = 1;
                }
            }
            else if (type === 'range') {
                if (this.handleMin) {
                    this.handleMin.classList.add('slider__handle_horizontal');
                    this.handleMin.tabIndex = 1;
                }
                if (this.handleMax) {
                    this.handleMax.classList.add('slider__handle_horizontal');
                    this.handleMax.tabIndex = 1;
                }
            }
        }
        else if (direction === 'vertical') {
            this.wrap.classList.add('slider__wrp_vertical');
            this.sliderLine.classList.add('slider__line_vertical');
            this.selectSegment.classList.add('slider__select_vertical');
            if (type === 'single') {
                if (this.handle) {
                    this.handle.classList.add('slider__handle_vertical');
                    this.handle.tabIndex = 1;
                }
            }
            else if (type === 'range') {
                if (this.handleMin) {
                    this.handleMin.classList.add('slider__handle_vertical');
                    this.handleMin.tabIndex = 1;
                }
                if (this.handleMax) {
                    this.handleMax.classList.add('slider__handle_vertical');
                    this.handleMax.tabIndex = 1;
                }
            }
        }
    };
    /** Создает scale + стили + обработчик на нажатие пользователем */
    View.prototype.initScale = function (opt) {
        var _this = this;
        (this.scale = document.createElement('div')).classList.add('slider__scale');
        var ul = document.createElement('ul');
        ul.classList.add('slider__scale-list');
        var dirLocalValue = this.viewValues.direction;
        if (dirLocalValue === 'horizontal')
            ul.classList.add('slider__scale-list_horizontal');
        else if (dirLocalValue === 'vertical')
            ul.classList.add('slider__scale-list_vertical');
        var localNumValue = (opt.num || 7);
        for (var i = 0; i < localNumValue; i += 1) {
            var li = document.createElement('li');
            li.classList.add('slider__scale-item');
            li.classList.add("slider__scale-item_" + dirLocalValue);
            if (this.viewValues.scale.type === 'numeric') {
                li.classList.add('slider__scale-item_numeric');
                if ((this.viewValues.step < 1) && ((this.viewValues.max - this.viewValues.min) <= 1)) {
                    li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed(2).toString();
                }
                else
                    li.innerHTML = ((((this.viewValues.max - this.viewValues.min) / (localNumValue - 1)) * i) + this.viewValues.min).toFixed().toString();
            }
            li.id = "slider__scale-item" + (i + 1);
            ul.appendChild(li);
        }
        this.initScaleStyles();
        this.scale.appendChild(ul);
        this.wrap.appendChild(this.scale);
        if (this.viewValues.scale.init) {
            this.scale.addEventListener('mousedown', function (e) {
                if (e.target.classList.contains('slider__scale-item')) {
                    var localValue = void 0;
                    if (_this.viewValues.type === 'single') {
                        if (_this.viewValues.direction === 'horizontal') {
                            localValue = _this.invertCoordinate(e.clientX).inValue;
                        }
                        else if (_this.viewValues.direction === 'vertical') {
                            localValue = _this.invertCoordinate(e.clientY).inValue;
                        }
                        _this.setValue(localValue, 'single');
                    }
                    else if (_this.viewValues.type === 'range') {
                        if (_this.viewValues.direction === 'horizontal') {
                            localValue = _this.invertCoordinate(e.clientX).inValue;
                        }
                        else if (_this.viewValues.direction === 'vertical') {
                            localValue = _this.invertCoordinate(e.clientY).inValue;
                        }
                        if (localValue <= _this.viewValues.value[1]) {
                            _this.setValue([localValue, _this.viewValues.value[1]], 'range');
                        }
                        else {
                            _this.setValue([_this.viewValues.value[0], localValue], 'range');
                        }
                    }
                    _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
                }
            });
        }
    };
    /** Создает tooltip + стили */
    View.prototype.initTooltip = function () {
        if (this.viewValues.type === 'single') {
            if (this.viewValues.tooltip) {
                (this.tooltip = document.createElement('div')).classList.add('slider__tooltip');
                this.handle.appendChild(this.tooltip);
                if (this.viewValues.direction === 'horizontal') {
                    this.tooltip.classList.add('slider__tooltip_horizontal');
                }
                else if (this.viewValues.direction === 'vertical') {
                    this.tooltip.classList.add('slider__tooltip_vertical');
                }
                this.tooltip.innerHTML = (this.viewValues.value).toString();
            }
        }
        else if (this.viewValues.type === 'range') {
            if (this.viewValues.tooltip) {
                (this.tooltipMin = document.createElement('div')).classList.add('slider__tooltip');
                this.handleMin.appendChild(this.tooltipMin);
                (this.tooltipMax = document.createElement('div')).classList.add('slider__tooltip');
                this.handleMax.appendChild(this.tooltipMax);
                if (this.viewValues.direction === 'horizontal') {
                    this.tooltipMin.classList.add('slider__tooltip_horizontal');
                    this.tooltipMax.classList.add('slider__tooltip_horizontal');
                }
                else if (this.viewValues.direction === 'vertical') {
                    this.tooltipMin.classList.add('slider__tooltip_vertical');
                    this.tooltipMax.classList.add('slider__tooltip_vertical');
                }
                this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
                this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
            }
        }
    };
    /** Добавляем стили scale */
    View.prototype.initScaleStyles = function () {
        if (this.scale) {
            if (this.viewValues.direction === 'horizontal')
                this.scale.classList.add('slider__scale_horizontal');
            if (this.viewValues.direction === 'vertical')
                this.scale.classList.add('slider__scale_vertical');
        }
    };
    /** setValue - устанавливает заданное значение, в соответствии типу слайдера */
    View.prototype.setValue = function (value, type) {
        var localValue = this.checkValue(value);
        if (this.viewValues.direction === 'horizontal') {
            if (type === 'single') {
                this.viewValues.value = localValue;
                this.selectSegment.style.width = "calc(" + this.invertToPersent(this.viewValues.value) + "%)";
                this.handle.style.left = "calc(" + this.invertToPersent(this.viewValues.value) + "% - 15px)";
                if (this.tooltip)
                    this.tooltip.innerHTML = (this.viewValues.value).toString();
            }
            else if (type === 'range') {
                this.viewValues.value = localValue;
                this.handleMin.style.left = "calc(" + this.invertToPersent(this.viewValues.value[0]) + "% - 15px)";
                this.selectSegment.style.width = "calc(" + (this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])) + "%)";
                this.selectSegment.style.left = "calc(" + this.invertToPersent(this.viewValues.value[0]) + "%)";
                this.handleMax.style.left = "calc(" + this.invertToPersent(this.viewValues.value[1]) + "% - 15px)";
                if (this.tooltipMin)
                    this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
                if (this.tooltipMax)
                    this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
            }
        }
        else if (this.viewValues.direction === 'vertical') {
            if (type === 'single') {
                this.viewValues.value = localValue;
                this.selectSegment.style.height = "calc(" + this.invertToPersent(this.viewValues.value) + "%)";
                this.handle.style.top = "calc(" + this.invertToPersent(this.viewValues.value) + "% - 15px)";
                if (this.tooltip)
                    this.tooltip.innerHTML = (this.viewValues.value).toString();
            }
            else if (type === 'range') {
                this.viewValues.value = localValue;
                this.handleMin.style.top = "calc(" + this.invertToPersent(this.viewValues.value[0]) + "% - 15px)";
                this.selectSegment.style.height = "calc(" + (this.invertToPersent(this.viewValues.value[1]) - this.invertToPersent(this.viewValues.value[0])) + "%)";
                this.selectSegment.style.top = "calc(" + this.invertToPersent(this.viewValues.value[0]) + "%)";
                this.handleMax.style.top = "calc(" + this.invertToPersent(this.viewValues.value[1]) + "% - 15px)";
                if (this.tooltipMin)
                    this.tooltipMin.innerHTML = (this.viewValues.value[0]).toString();
                if (this.tooltipMax)
                    this.tooltipMax.innerHTML = (this.viewValues.value[1]).toString();
            }
        }
    };
    /** Удаляет слайдер из DOM */
    View.prototype.clearRoot = function () {
        this.wrap.remove();
    };
    /** Удаляет scale из DOM */
    View.prototype.clearScale = function () {
        var _a;
        (_a = this.scale) === null || _a === void 0 ? void 0 : _a.remove();
    };
    /** clearTooltip удаляет tooltip из DOM */
    View.prototype.clearTooltip = function () {
        var _a, _b, _c;
        (_a = this.tooltip) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this.tooltipMin) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this.tooltipMax) === null || _c === void 0 ? void 0 : _c.remove();
    };
    /** invertToPersent переводит значения в % от длины/ширины */
    View.prototype.invertToPersent = function (value) {
        return ((value - this.viewValues.min) / (this.viewValues.max - this.viewValues.min)) * 100;
    };
    /** invertCoordinate - переводит координаты мыши в % - .inPersent или в корректное значение .inValue */
    View.prototype.invertCoordinate = function (value) {
        var localPersentValue = 0;
        if (this.viewValues.direction === 'horizontal') {
            localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().left) / this.sliderLine.getBoundingClientRect().width) * 100).toFixed(2));
        }
        else if (this.viewValues.direction === 'vertical') {
            localPersentValue = Number((((value - this.sliderLine.getBoundingClientRect().top) / this.sliderLine.getBoundingClientRect().height) * 100).toFixed(2));
        }
        if (localPersentValue < 0)
            localPersentValue = 0;
        if (localPersentValue > 100)
            localPersentValue = 100;
        var localValue = ((Number(localPersentValue) / 100) * (this.viewValues.max - this.viewValues.min)) + this.viewValues.min;
        return {
            inPersent: Number(localPersentValue.toFixed()),
            inValue: Number(localValue.toFixed(2))
        };
    };
    /** stepСheck - функция проверки значения на шаг */
    View.prototype.stepСheck = function (value) {
        return Utils_1.stepСheck(value, this.viewValues.min, this.viewValues.max, this.viewValues.step);
    };
    /** checkValue - функция проверки значения */
    View.prototype.checkValue = function (value) {
        return Utils_1.checkValue(value, this.viewValues.min, this.viewValues.max, this.viewValues.step, this.viewValues.type);
    };
    /** addMoveListener - добавляет обработчики событий для изменения значений слайдера ( перемещение ползунка мышью и нажатием клавиш стрелок) */
    View.prototype.addMoveListener = function () {
        var _this = this;
        var MousePositionOnSlider = 0;
        var onMouseMoveHandle = function (e) {
            e.preventDefault();
            if (_this.viewValues.direction === 'horizontal') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientX).inValue;
            }
            else if (_this.viewValues.direction === 'vertical') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientY).inValue;
            }
            MousePositionOnSlider = _this.stepСheck(MousePositionOnSlider);
            _this.setValue(MousePositionOnSlider, 'single');
            _this.viewValues.value = MousePositionOnSlider;
            _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
        };
        var onMouseMoveHandleMin = function (e) {
            e.preventDefault();
            // const localMax = (this.viewValues.value as sliderRangeValueType)[1];
            var localMax = [_this.viewValues.value[1]][0];
            if (_this.viewValues.direction === 'horizontal') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientX).inValue;
                MousePositionOnSlider = _this.stepСheck(MousePositionOnSlider);
            }
            else if (_this.viewValues.direction === 'vertical') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientY).inValue;
                MousePositionOnSlider = _this.stepСheck(MousePositionOnSlider);
            }
            _this.setValue([MousePositionOnSlider, localMax], 'range');
            _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
        };
        var onMouseMoveHandleMax = function (e) {
            e.preventDefault();
            // const localMin = (this.viewValues.value as sliderRangeValueType)[0];
            var localMin = [_this.viewValues.value[0]][0];
            if (_this.viewValues.direction === 'horizontal') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientX).inValue;
                MousePositionOnSlider = _this.stepСheck(MousePositionOnSlider);
            }
            else if (_this.viewValues.direction === 'vertical') {
                MousePositionOnSlider = _this.invertCoordinate(e.clientY).inValue;
                MousePositionOnSlider = _this.stepСheck(MousePositionOnSlider);
            }
            if (MousePositionOnSlider <= localMin) {
                _this.setValue([localMin - _this.viewValues.step, MousePositionOnSlider], 'range');
            }
            else
                _this.setValue([localMin, MousePositionOnSlider], 'range');
            _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
        };
        var onMouseUp = function () {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMoveHandle);
            document.removeEventListener('mousemove', onMouseMoveHandleMin);
            document.removeEventListener('mousemove', onMouseMoveHandleMax);
            // console.log(this.viewValues.value);
            // this.observebale.trigger('userMoveSlider', this.viewValues.value);
        };
        var onFocusHandle = function (e) {
            e.preventDefault();
            if ((e.code === 'ArrowLeft') || (e.code === 'ArrowDown')) {
                _this.setValue((_this.viewValues.value - _this.viewValues.step), 'single');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
            if ((e.code === 'ArrowRight') || (e.code === 'ArrowUp')) {
                _this.setValue((_this.viewValues.value + _this.viewValues.step), 'single');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
        };
        var onFocusHandleMin = function (e) {
            e.preventDefault();
            if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
                _this.setValue([(_this.viewValues.value[0] + _this.viewValues.step), _this.viewValues.value[1]], 'range');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
            if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
                _this.setValue([(_this.viewValues.value[0] - _this.viewValues.step), _this.viewValues.value[1]], 'range');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
        };
        var onFocusHandleMax = function (e) {
            e.preventDefault();
            if ((e.code === 'ArrowRight') || (e.code === 'ArrowDown')) {
                _this.setValue([_this.viewValues.value[0], (_this.viewValues.value[1] + _this.viewValues.step)], 'range');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
            if ((e.code === 'ArrowLeft') || (e.code === 'ArrowUp')) {
                if ((_this.viewValues.value[1] - _this.viewValues.value[0]) === _this.viewValues.step) {
                    _this.setValue([_this.viewValues.value[0] - _this.viewValues.step, (_this.viewValues.value[1] - _this.viewValues.step)], 'range');
                    return;
                }
                _this.setValue([_this.viewValues.value[0], (_this.viewValues.value[1] - _this.viewValues.step)], 'range');
                _this.observebale.trigger('userMoveSlider', _this.viewValues.value);
            }
        };
        var onBlurHandle = function () {
            var _a, _b, _c;
            if (_this.viewValues.type === 'single') {
                (_a = _this.handle) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', onFocusHandle);
            }
            else if (_this.viewValues.type === 'range') {
                (_b = _this.handleMin) === null || _b === void 0 ? void 0 : _b.removeEventListener('keydown', onFocusHandleMin);
                (_c = _this.handleMax) === null || _c === void 0 ? void 0 : _c.removeEventListener('keydown', onFocusHandleMax);
            }
        };
        if (this.viewValues.type === 'single') {
            this.handle.addEventListener('mousedown', function (e) {
                if (e.button === 0) {
                    document.addEventListener('mousemove', onMouseMoveHandle);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });
            // --
            this.handle.addEventListener('focus', function () {
                _this.handle.addEventListener('keydown', onFocusHandle);
            });
            this.handle.addEventListener('blur', onBlurHandle);
            // --
        }
        else if (this.viewValues.type === 'range') {
            this.handleMin.addEventListener('mousedown', function (e) {
                if (e.button === 0) {
                    document.addEventListener('mousemove', onMouseMoveHandleMin);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });
            // --
            this.handleMin.addEventListener('focus', function () {
                _this.handleMin.addEventListener('keydown', onFocusHandleMin);
            });
            this.handleMin.addEventListener('blur', onBlurHandle);
            // --
            this.handleMax.addEventListener('mousedown', function (e) {
                if (e.button === 0) {
                    document.addEventListener('mousemove', onMouseMoveHandleMax);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });
            // --
            this.handleMax.addEventListener('focus', function () {
                _this.handleMax.addEventListener('keydown', onFocusHandleMax);
            });
            this.handleMax.addEventListener('blur', onBlurHandle);
        }
    };
    /** changeDirection - меняет вид слайдера(вертикальный, горизонтальный) */
    View.prototype.changeDirection = function () {
        if (this.viewValues.direction === 'horizontal')
            this.viewValues.direction = 'vertical';
        else if (this.viewValues.direction === 'vertical')
            this.viewValues.direction = 'horizontal';
        this.clearRoot();
        this.init(this.viewValues);
        this.initStyles(this.viewValues.type, this.viewValues.direction);
        this.setValue(this.viewValues.value, this.viewValues.type);
        this.addMoveListener();
    };
    /** changeType - меняет тип слайдера */
    View.prototype.changeType = function (type, value) {
        if (type === this.viewValues.type) {
            console.log('Нельзя поменять тип слайдера на тот же самый, который установлен');
            // throw new Error('Нельзя поменять тип слайдера на тот же самый, который установлен');
            return false;
        }
        this.viewValues.type = type;
        var localValue;
        if (value) {
            if (this.viewValues.type === 'single') { // range -> single
                if ((typeof value) === 'number') {
                    this.viewValues.value = value;
                }
                else {
                    console.log('Введенное значение должно быть числом');
                    return false;
                }
            }
            else if (this.viewValues.type === 'range') { // single -> range
                if (Array.isArray(value) && value.length === 2) {
                    this.viewValues.value = value;
                }
                else {
                    console.log('Введенное значение должно быть массивом из 2х чисел');
                    return false;
                }
            }
        }
        else if (!value) {
            if (this.viewValues.type === 'single') { // range -> single
                localValue = this.viewValues.value[0];
                this.viewValues.value = localValue;
            }
            else if (this.viewValues.type === 'range') { // single -> range
                localValue = [this.viewValues.value, this.viewValues.value];
                this.viewValues.value = localValue;
            }
        }
        this.clearRoot();
        this.init(this.viewValues);
        this.initStyles(this.viewValues.type, this.viewValues.direction);
        this.setValue(this.viewValues.value, this.viewValues.type);
        this.addMoveListener();
        return true;
    };
    /** changeValue - меняет значение слайдера */
    View.prototype.changeValue = function (value) {
        if (this.viewValues.type === 'single' && (typeof value) !== 'number') {
            return new Error('введите корректное значение, а именно number');
        }
        // eslint-disable-next-line no-mixed-operators
        if ((this.viewValues.type === 'range' && !Array.isArray(value)) || ((this.viewValues.type === 'range' && Array.isArray(value) && (value.length !== 2)))) {
            return new Error('введите корректное значение, а именно [number, number]');
        }
        this.setValue(value, this.viewValues.type);
        return this.viewValues.value;
    };
    /** Меняет шаг слайдера */
    View.prototype.changeStep = function (step) {
        var localStep = step;
        if (localStep < 0.01)
            localStep = 0.01;
        if (localStep > (this.viewValues.max - this.viewValues.min))
            localStep = (this.viewValues.max - this.viewValues.min);
        this.viewValues.step = step;
        this.setValue(this.viewValues.value, this.viewValues.type);
    };
    /** Меняет шкалу  */
    View.prototype.changeScale = function (options) {
        // if (this.viewValues.scale.init === options.init) return;
        this.viewValues.scale.init = options.init;
        if (options.type)
            this.viewValues.scale.type = options.type;
        if (options.num)
            this.viewValues.scale.num = options.num;
        if (this.viewValues.scale.init === false)
            this.clearScale();
        else if (this.viewValues.scale.init === true) {
            this.clearScale();
            this.initScale(this.viewValues.scale);
        }
    };
    /** Меняет tooltip (добавляет/удаляет) */
    View.prototype.changeTooltip = function (tooltip) {
        if (this.viewValues.tooltip === tooltip)
            return;
        if (tooltip === false) {
            this.viewValues.tooltip = false;
            this.clearTooltip();
        }
        else if (tooltip === true) {
            this.viewValues.tooltip = true;
            this.initTooltip();
        }
    };
    /** Возвращает все параметры слайдера */
    View.prototype.getValues = function () {
        return this.viewValues;
    };
    /** addObservers - добавляет подписчика на событие */
    View.prototype.addObservers = function (observer) {
        this.observebale.subscribe(observer);
    };
    return View;
}());
exports["default"] = View;
