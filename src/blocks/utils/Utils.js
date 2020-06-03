"use strict";
exports.__esModule = true;
/**
 * roundValue - округляет значение слайдера в случаях когда оно не целое до 2знаков после запятой, чтобы исключить погрешность.
 */
var roundValue = function (value) {
    var localValue = value.toString().includes('.')
        ? +value.toFixed(2)
        : value;
    return localValue;
};
exports.roundValue = roundValue;
/**
 * stepСheck - функции, которая проверяет значение на соответствие установленному шагу,
 * в случае несоответствия, корректирует его в большую или меньшую сторону(в зависимости от округления)
 * @param value Значение, которое нужно проверить
 * @param min MINIMUM
 * @param max MAXIMUM
 * @param step Шаг
 */
var stepСheck = function (value, min, max, step) {
    if (value <= min)
        return min;
    if (value > max)
        return stepСheck(max, min, max, step);
    if (((value - min) % step) !== 0) {
        return ((min + Number(((value - min) / step).toFixed()) * step) <= max)
            ? roundValue(min + Number(((value - min) / step).toFixed()) * step)
            : roundValue((min + Number(((value - min) / step).toFixed()) * step) - step);
    }
    return roundValue(value);
};
exports.stepСheck = stepСheck;
/**
 * checkValue - функция, которая проверяет значение на правильность(на граничные значения и соблюдение шага)
 * в случае несоответствия, корректирует его в большую или меньшую сторону(в зависимости от округления)
 * @param value Значение, которое нужно проверить
 * @param min MINIMUM
 * @param max MAXIMUM
 * @param step Шаг
 * @param type Тип значения number или [number, number]
 */
var checkValue = function (value, min, max, step, type) {
    var newLocal = value;
    if (type === 'single') {
        if (newLocal <= min) {
            newLocal = min;
            // console.log('value не может быть меньше минимального порога значений, меняем на минимальный');
            return newLocal;
        }
        if (newLocal > max) {
            newLocal = max;
            // console.log('value не может быть больше максимального порога значений, меняем на максимальный возможный');
        }
        newLocal = stepСheck(newLocal, min, max, step);
        return newLocal;
    }
    if (type === 'range' && (value instanceof Array === true)) {
        var newLocal2 = value;
        if (newLocal2[0] <= min) {
            newLocal2[0] = min;
            // console.log('valueMin не может быть меньше минимального порога значений, меняем на минимальный');
            if (newLocal2[1] <= min)
                newLocal2[1] = newLocal2[0] + step;
        }
        if (newLocal2[1] >= max) {
            newLocal2[1] = stepСheck(max, min, max, step);
            // console.log('valueMax не может быть больше максимального порога значений, меняем на максимальный');
            if (newLocal2[0] >= newLocal2[1])
                newLocal2[0] = newLocal2[1] - step;
        }
        newLocal2[0] = stepСheck(newLocal2[0], min, max, step);
        newLocal2[1] = stepСheck(newLocal2[1], min, max, step);
        if (newLocal2[0] >= newLocal2[1]) {
            if (newLocal2[0] <= stepСheck(max, min, max, step) - step) {
                newLocal2[1] = newLocal2[0] + step;
                // console.log(' valueMax  не может быть меньше либо равно valueMin, увеличиваем на step');
            }
            else if (newLocal2[0] > stepСheck(max, min, max, step) - step) {
                newLocal2[0] = stepСheck(max, min, max, step) - step;
                newLocal2[1] = stepСheck(max, min, max, step);
                // console.log('valueMin не может быть больше либо равно valueMax = max, уменьшаем valueMin на step');
            }
        }
        return newLocal2;
    }
};
exports.checkValue = checkValue;
