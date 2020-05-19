import { stepСheck, checkValue } from '../blocks/utils/Utils';

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
});

describe('Проверка функции checkValue, которая проверяет значение на правильность(на граничные значения и соблюдение шага)', () => {
  test('stepСheck с корректными значениеми', () => {
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
  });
});
