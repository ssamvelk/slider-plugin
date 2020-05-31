import { stepСheck, checkValue, roundValue } from '../blocks/utils/Utils';

describe('Проверка функции stepСheck, которая проверяет на соответствие значения установленному шагу', () => {
  test('stepСheck с корректными значениеми', () => {
    expect(stepСheck(10, 0, 100, 1)).toEqual(10);
    expect(stepСheck(10, 10, 20, 1)).toEqual(10);
    expect(stepСheck(10, 0, 100, 2)).toEqual(10);
    expect(stepСheck(33, 0, 100, 3)).toEqual(33);
    expect(stepСheck(45, 0, 100, 15)).toEqual(45);
    expect(stepСheck(100, 0, 100, 50)).toEqual(100);
  });

  test('stepСheck с некорректными значениеми', () => {
    expect(stepСheck(10, 0, 100, 3)).toEqual(9);
    expect(stepСheck(99, 0, 99, 3)).toEqual(99);
    expect(stepСheck(11, 0, 500, 3)).toEqual(12);
    expect(stepСheck(3, 4, 100, 2)).toEqual(4);
    expect(stepСheck(120, 0, 100, 3)).toEqual(99);
    expect(stepСheck(53, 0, 100, 15)).toEqual(60);
    expect(stepСheck(89, 0, 100, 50)).toEqual(100);
    expect(stepСheck(101, 0, 101, 50)).toEqual(100);
  });

  test('stepСheck для вещественных чисел при (max - min) <= 1', () => {
    expect(stepСheck(0.33, 0, 1, 0.25)).toEqual(0.25);
    expect(stepСheck(0.45, 0, 1, 0.25)).toEqual(0.5);
    expect(stepСheck(1.45, 0, 1, 0.25)).toEqual(1);
    expect(stepСheck(0.0001, 0, 1, 0.25)).toEqual(0);
    expect(stepСheck(-0.25, 0, 1, 0.25)).toEqual(0);
    expect(stepСheck(0.77, 0, 1, 0.25)).toEqual(0.75);
    expect(stepСheck(1, 0, 1, 0.33)).toEqual(0.99);
    expect(stepСheck(20, 0, 100, 1.33)).toEqual(19.95);
  });
});

describe('Проверка функции checkValue, которая проверяет значение на правильность(на граничные значения и соблюдение шага)', () => {
  test('checkValue с корректными значениеми', () => {
    expect(checkValue(10, 0, 100, 1, 'single')).toEqual(10);
    expect(checkValue(10, 10, 20, 1, 'single')).toEqual(10);
    expect(checkValue(10, 0, 100, 2, 'single')).toEqual(10);
    expect(checkValue(33, 0, 100, 3, 'single')).toEqual(33);
    expect(checkValue(45, 0, 100, 15, 'single')).toEqual(45);
    expect(checkValue(100, 0, 100, 50, 'single')).toEqual(100);

    expect(checkValue([10, 20], 0, 100, 1, 'range')).toEqual([10, 20]);
    expect(checkValue([10, 20], 10, 20, 1, 'range')).toEqual([10, 20]);
    expect(checkValue([10, 12], 0, 100, 2, 'range')).toEqual([10, 12]);
    expect(checkValue([33, 99], 0, 100, 3, 'range')).toEqual([33, 99]);
    expect(checkValue([45, 90], 0, 100, 15, 'range')).toEqual([45, 90]);
    expect(checkValue([0, 100], 0, 100, 50, 'range')).toEqual([0, 100]);
    expect(checkValue([99, 90], 0, 100, 1, 'range')).toEqual([99, 100]);
  });

  test('checkValue с некорректными значениеми', () => {
    expect(checkValue(10, 0, 100, 3, 'single')).toEqual(9);
    expect(checkValue(99, 0, 99, 3, 'single')).toEqual(99);
    expect(checkValue(11, 0, 500, 3, 'single')).toEqual(12);
    expect(checkValue(3, 4, 100, 2, 'single')).toEqual(4);
    expect(checkValue(120, 0, 100, 3, 'single')).toEqual(99);
    expect(checkValue(53, 0, 100, 15, 'single')).toEqual(60);
    expect(checkValue(89, 0, 100, 50, 'single')).toEqual(100);
    expect(checkValue(101, 0, 101, 50, 'single')).toEqual(100);

    expect(checkValue([-10, 20], 0, 100, 1, 'range')).toEqual([0, 20]);
    expect(checkValue([10, 2020], 10, 20, 1, 'range')).toEqual([10, 20]);
    expect(checkValue([200, 200], 0, 100, 50, 'range')).toEqual([50, 100]);
    expect(checkValue([10, 13], 0, 100, 2, 'range')).toEqual([10, 14]);
    expect(checkValue([10, 12.99], 0, 100, 2, 'range')).toEqual([10, 12]);
    expect(checkValue([-33, 999], 0, 100, 3, 'range')).toEqual([0, 99]);
    expect(checkValue([46, 90], 0, 100, 15, 'range')).toEqual([45, 90]);
    expect(checkValue([20, 100], 0, 100, 50, 'range')).toEqual([0, 100]);
    expect(checkValue([20, 19], 0, 100, 5, 'range')).toEqual([20, 25]);
    expect(checkValue([100, 90], 0, 100, 1, 'range')).toEqual([99, 100]);
  });

  test('checkValue с вещественными значениями', () => {
    expect(checkValue(20, 0, 100, 1.33, 'single')).toEqual(19.95);
    expect(checkValue(50, 10, 80, 1.333, 'single')).toEqual(49.99);
    expect(checkValue(11, 0, 500, 3.7896, 'single')).toEqual(11.37);
    expect(checkValue(3, 4, 100, 2.2506, 'single')).toEqual(4);
    expect(checkValue(-55, -100, 100, 3.88, 'single')).toEqual(-53.44);
    expect(checkValue(53, 0, 100, 0.15, 'single')).toEqual(52.95);
    expect(checkValue(89, 0, 100, 0.25, 'single')).toEqual(89);
    expect(checkValue(101, 0, 101, 0.5064, 'single')).toEqual(100.77);
    expect(checkValue(101, 200, 101, 0.5064, 'single')).toEqual(200);

    expect(checkValue([-10, 20], 0, 100, 1.25, 'range')).toEqual([0, 20]);
    expect(checkValue([10, 2020], 10, 20, 1.777, 'range')).toEqual([10, 18.88]);
    expect(checkValue([200, 200], 0, 100, 50.00123, 'range')).toEqual([0, 50]);
    expect(checkValue([10, 13], 0, 100, 2.137893, 'range')).toEqual([10.69, 12.83]);
    expect(checkValue([10, 12.99], 0, 100, 2.0001, 'range')).toEqual([10, 12]);
    expect(checkValue([-33, 999], 0, 100, 3.74, 'range')).toEqual([0, 97.24]);
    expect(checkValue([46, 90], 0, 100, 15.33, 'range')).toEqual([45.99, 91.98]);
    expect(checkValue([20, 100], 0, 100, 0.25, 'range')).toEqual([20, 100]);
    expect(checkValue([20, 19], 0, 100, 0.2545, 'range')).toEqual([20.11, 20.3645]);
    // expect(checkValue([100, 90], 0, 100, 0.471, 'range')).toEqual([99, 45]);
  });

  test('checkValue', () => {
    const localValue = checkValue(55, 0, 100, 1, 'single');
    expect(typeof localValue).toEqual('number');

    const localValue2 = checkValue([1, 90], 0, 100, 1, 'range');
    expect(localValue2 instanceof Array).toEqual(true);
  });
});

describe('roundValue - округляет значение слайдера в случаях когда оно не целое до 2знаков после запятой, чтобы исключить погрешность. ', () => {
  test('roundValue ', () => {
    expect(roundValue(1)).toEqual(1);
    expect(roundValue(1.4547657)).toEqual(1.45);
    expect(roundValue(10.00004)).toEqual(10);
    expect(roundValue(-90)).toEqual(-90);
    expect(roundValue(1.77777)).toEqual(1.78);
    expect(roundValue(0.7567564)).toEqual(0.76);
  });
});
