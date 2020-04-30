import Model from '../blocks/model/Model';

describe('Model', () => {
  const model = new Model({});

  const model2 = new Model({
    min: 50,
    max: 70,
    step: 5,
    type: 'range',
    direction: 'vertical',
    value: [60, 61],
    tooltip: true,
    scale: true,
  });

  test('Проверка инстанс модели без параметров', () => {
    expect(model).toBeInstanceOf(Model);

    expect(model).not.toBeUndefined();
    
    expect(model).toEqual({
      min: 0,
      max: 100,
      step: 1,
      type: 'single',
      direction: 'horizontal',
      sliderLength: 100,
      value: 50,
      selectedLength: 50,
      tooltip: false,
      scale: false,
    });
  });

  test('Проверка создания инстанс модели со всеми параметрами', () => {
    expect(model2).toBeInstanceOf(Model);

    expect(model2).not.toBeUndefined();
    
    expect(model2).toEqual({
      min: 50,
      max: 70,
      step: 5,
      type: 'range',
      direction: 'vertical',
      sliderLength: 20,
      value: [60, 61],
      selectedLength: 5,
      tooltip: true,
      scale: true,
    });
  });

  test('Проверка создания инстанс модели с меньшим кол-ом параметров', () => {
    const model3 = new Model({
      max: 500,
      step: 100,
      type: 'range',
      direction: 'horizontal',
      value: [200, 300],
      tooltip: true,
    });
    
    expect(model3).toEqual({
      min: 0,
      max: 500,
      step: 100,
      type: 'range',
      direction: 'horizontal',
      sliderLength: 500,
      value: [200, 300],
      selectedLength: 20,
      tooltip: true,
      scale: false,
    });
  });

  test('Проверка создания инстанс модели с одним ед. параметром range', () => {
    const model4 = new Model({
      type: 'range',
    });
      
    expect(model4).toEqual({
      min: 0,
      max: 100,
      step: 1,
      type: 'range',
      direction: 'horizontal',
      sliderLength: 100,
      value: [1, 99],
      selectedLength: 98,
      tooltip: false,
      scale: false,
    });
  });

  test('Проверка создания инстанс модели с ошибкой в лимитах базового отрезка', () => {
    const model5 = new Model({
      min: 50,
      max: 40,
      step: 5,
      direction: 'vertical',
    });
      
    expect(model5).toEqual({
      min: 50,
      max: 55,
      step: 5,
      type: 'single',
      direction: 'vertical',
      sliderLength: 5,
      value: 50,
      selectedLength: 0,
      tooltip: false,
      scale: false,
    });
  });
  
  test('Проверка создания инстанс range модели с ошибкой (minVal > maxVal) ', () => {
    const model6 = new Model({
      value: [100, 90],
      type: 'range',
    });
      
    expect(model6).toEqual({
      min: 0,
      max: 100,
      step: 1,
      type: 'range',
      direction: 'horizontal',
      sliderLength: 100,
      value: [90, 90],
      selectedLength: 0,
      tooltip: false,
      scale: false,
    });
  });

  test('Проверка метода setValue на пограничные значения', () => {
    const model5 = new Model({
      value: 15,
    });
    // проверка значения по умолчанию
    expect(model.value).toEqual(50);
    
    expect(model5.value).toEqual(15);

    model5.setValue(-1);
    expect(model5.value).toEqual(0);

    model5.setValue(150);
    expect(model5.value).toEqual(100);

    model5.setValue(0.5);
    expect(model5.value).toEqual(0.5);

    model5.type = 'range';

    model5.setValue([80, 90]);
    expect(model5.value).toEqual([80, 90]);
    
    model5.setValue([500, 600]);
    expect(model5.value).toEqual([100, 100]);

    model5.setValue([700, 600]);
    expect(model5.value).toEqual([100, 100]);

    model5.setValue([-10, -9]);
    expect(model5.value).toEqual([0, 0]);

    model5.setValue([-10, -99]);
    expect(model5.value).toEqual([0, 0]);
  });

  test('Проверка метода getType', () => {
    expect(model.getType()).toBe('single');
    expect(model2.getType()).toBe('range');
  });

  test('Проверка метода getStep', () => {
    expect(model.getStep()).toBe(1);
    expect(model2.getStep()).toBe(5);
  });

  test('Проверка метода getValue', () => {
    expect(model.getValue()).toBe(50);
    expect(model2.getValue()).toEqual([60, 61]);
  });
});
