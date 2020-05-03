import View from '../blocks/view/View';

describe('', () => {
  const v = new View({ type: 'single' });

  test('Создание эксземпляра класса View', () => {
    expect(v).not.toBeUndefined();
  });
});
