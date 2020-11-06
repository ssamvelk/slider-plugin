import {
  sliderValueType,
  sliderType,
  sliderRangeValueType,
  scaleType,
  sliderDirection,
} from '../model/IModel';

const SINGLE_TYPE:sliderType = 'single';
const RANGE_TYPE:sliderType = 'range';
const HORIZONTAL_DIRECTION: sliderDirection = 'horizontal';
const VERTICAL_DIRECTION: sliderDirection = 'vertical';

const roundValue = (value: number): number => {
  const localValue = value.toString().includes('.')
    ? +value.toFixed(2)
    : value;
  return localValue;
};

const checkStep = (value: number, min: number, max: number, step: number): number => {
  if (value <= min) return min;
  if (value > max) return checkStep(max, min, max, step);
  if (((value - min) % step) !== 0) {
    return ((min + Number(((value - min) / step).toFixed()) * step) <= max)
      ? roundValue(min + Number(((value - min) / step).toFixed()) * step)
      : roundValue((min + Number(((value - min) / step).toFixed()) * step) - step);
  }
  return roundValue(value);
};

const checkValue = (value: sliderValueType, min: number, max: number, step: number, type: sliderType) => {
  let newLocal: number = value as number;
  
  if (type === 'single') {
    if (newLocal <= min) {
      newLocal = min;
      return newLocal;
    }
    if (newLocal > max) {
      newLocal = max;
    }
    newLocal = checkStep(newLocal, min, max, step);
    return newLocal;
  }
  if (type === 'range' && (value instanceof Array === true)) {
    const newLocal2 = value as sliderRangeValueType;
    if (newLocal2[0] <= min) {
      newLocal2[0] = min;
      if (newLocal2[1] <= min) newLocal2[1] = newLocal2[0] + step;
    }
    if (newLocal2[1] >= max) {
      newLocal2[1] = checkStep(max, min, max, step);
      if (newLocal2[0] >= newLocal2[1]) newLocal2[0] = newLocal2[1] - step;
    }

    newLocal2[0] = checkStep(newLocal2[0], min, max, step);
    newLocal2[1] = checkStep(newLocal2[1], min, max, step);

    if (newLocal2[0] >= newLocal2[1]) {
      if (newLocal2[0] <= checkStep(max, min, max, step) - step) {
        newLocal2[1] = newLocal2[0] + step;
      } else if (newLocal2[0] > checkStep(max, min, max, step) - step) {
        newLocal2[0] = checkStep(max, min, max, step) - step;
        newLocal2[1] = checkStep(max, min, max, step);
      }
    }
    return newLocal2;
  }
};

const checkScaleInit = (scale: (boolean | scaleType | undefined)): boolean => {
  if (scale && (typeof scale) === 'boolean') {
    return scale as boolean;
  }
  if (scale && (scale instanceof Object)) {
    if (scale.init) {
      return scale.init;
    }
    return false;
  }
  return false;
};

export {
  checkStep, checkValue, roundValue, checkScaleInit, SINGLE_TYPE, RANGE_TYPE, HORIZONTAL_DIRECTION, VERTICAL_DIRECTION,
};
