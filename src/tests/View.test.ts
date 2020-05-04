import View from '../blocks/view/View';

describe('', () => {
  const v = new View({});

  test('Создание эксземпляра класса View', () => {
    expect(v).not.toBeUndefined();
    
    expect(v).toHaveProperty('root');
    expect(v).toHaveProperty('base');
    expect(v).toHaveProperty('selectSegment');
    expect(v).toHaveProperty('sliderLine');
    expect(v).toHaveProperty('handle');
  });
});
