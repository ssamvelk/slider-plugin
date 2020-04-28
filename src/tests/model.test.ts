
describe('Model', () => {
  
  test('роверка инстанс модели без параметров', () => {
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
      singleValue: 50,
      selectedLength: 50,
      tooltip: false,
      scale: false,
    });
  });

  test('проверка инстанс модели с параметрами', () => {
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
      singleValue: 60,
      selectedLength: 50,
      tooltip: true,
      scale: true,
    });
  });
});
