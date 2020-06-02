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
    scale: { init: true, num: 7, type: 'numeric' },
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
      value: 0,
      tooltip: false,
      scale: { init: false, num: 7, type: 'usual' },
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
      value: [60, 65],
      tooltip: true,
      scale: { init: true, num: 7, type: 'numeric' },
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
      value: [200, 300],
      tooltip: true,
      scale: { init: false, num: 7, type: 'usual' },
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
      value: [0, 100],
      tooltip: false,
      scale: { init: false, num: 7, type: 'usual' },
    });
  });

  test('Проверка создания инстанс модели с ошибкой в лимитах базового отрезка', () => {
    const model5 = new Model({
      min: 50,
      max: 40,
      step: 5,
      direction: 'vertical',
    });
    expect(model5.max).toEqual(model5.min + model5.step);
    expect(model5).toEqual({
      min: 50,
      max: 55,
      step: 5,
      type: 'single',
      direction: 'vertical',
      value: 50,
      tooltip: false,
      scale: { init: false, num: 7, type: 'usual' },
    });
  });
  
  test('Проверка создания инстанс range модели с ошибкой (minVal > maxVal) ', () => {
    const model6 = new Model({
      value: [100, 90],
      type: 'range',
      scale: true,
    });
      
    expect(model6).toEqual({
      min: 0,
      max: 100,
      step: 1,
      type: 'range',
      direction: 'horizontal',
      value: [99, 100],
      tooltip: false,
      scale: { init: true, num: 7, type: 'usual' },
    });
  });

  test('Проверка метода setValue на пограничные значения', () => {
    const model5 = new Model({
      value: 15,
      step: 1,
    });

    expect(model5.value).toEqual(15);

    model5.setValue(-1, 'single');
    expect(model5.value).toEqual(0);

    model5.setValue(150, 'single');
    expect(model5.value).toEqual(100);

    model5.setValue(0.5, 'single');
    expect(model5.value).toEqual(1);

    model5.type = 'range';

    model5.setValue([80, 90], 'range');
    expect(model5.value).toEqual([80, 90]);
    
    model5.setValue([500, 600], 'range');
    expect(model5.value).toEqual([99, 100]);

    model5.setValue([700, 600], 'range');
    expect(model5.value).toEqual([99, 100]);

    model5.setValue([-10, -9], 'range');
    expect(model5.value).toEqual([0, 1]);

    model5.setValue([-10, -99], 'range');
    expect(model5.value).toEqual([0, 1]);

    expect((Array.isArray(model5.value))).toEqual(true);
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
    expect(model.getValue()).toBe(0);
    expect(model2.getValue()).toEqual([60, 65]);
  });

  // --------------------
  test('changeDirection', () => {
    const localModel = new Model({});

    expect(localModel.direction).toEqual('horizontal');
    localModel.changeDirection();
    expect(localModel.direction).toEqual('vertical');
    localModel.changeDirection();
    expect(localModel.direction).toEqual('horizontal');
  });


  test('changeType', () => {
    const localModel = new Model({ value: 50, step: 10 });

    expect(localModel.changeType('single')).toEqual(false);
    
    expect(localModel.changeType('range')).toEqual(true);
    expect(localModel.type).toEqual('range');
    expect(localModel.value).toEqual([50, 60]);
    expect(localModel.changeType('range')).toEqual(false);

    expect(localModel.changeType('single')).toEqual(true);
    expect(localModel.type).toEqual('single');
    expect(localModel.value).toEqual(50);
    expect(localModel.changeType('single')).toEqual(false);
  });

  test('changeStep', () => {
    model.changeStep(10);
    expect(model.step).toEqual(10);
    model.changeStep(-10);
    expect(model.step).toEqual(0.01);
    model.changeStep(2.5);
    expect(model.step).toEqual(2.5);
    model.changeStep(10000);
    expect(model.step).toEqual(100);
    model2.changeStep(5);
    expect(model2.step).toEqual(5);
  });

  test('changeScale', () => {
    model.changeScale({ init: false });
    expect(model.scale.init).toEqual(false);
    expect(model.scale.num).toEqual(7);
    expect(model.scale.type).toEqual('usual');

    model.changeScale({ init: true });
    expect(model.scale.init).toEqual(true);

    model.changeScale({ init: true, num: 15 });
    expect(model.scale.init).toEqual(true);
    expect(model.scale.num).toEqual(15);

    model.changeScale({ init: true, num: 22, type: 'numeric' });
    expect(model.scale.init).toEqual(true);
    expect(model.scale.num).toEqual(22);
    expect(model.scale.type).toEqual('numeric');
  });
});

// expect().toEqual();
