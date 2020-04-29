import Model from '../blocks/model/model';

describe('Model', () => {
  test('Проверка инстанс модели без параметров', () => {
    const model = new Model({});

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
    const model2 = new Model({
      min: 50,
      max: 70,
      step: 5,
      type: 'single',
      direction: 'vertical',
      value: 60,
      tooltip: true,
      scale: true,
    });

    expect(model2).toBeInstanceOf(Model);

    expect(model2).not.toBeUndefined();
    
    expect(model2).toEqual({
      min: 50,
      max: 70,
      step: 5,
      type: 'single',
      direction: 'vertical',
      sliderLength: 20,
      value: 60,
      selectedLength: 50,
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
});
