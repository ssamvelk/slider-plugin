import Presenter from '../blocks/presenter/Presenter';

describe('Presenter', () => {
  let presenter: Presenter;

  let presenter2: Presenter;

  beforeEach(() => {
    presenter = new Presenter({});
    // presenter.model.changeDirection = jest.fn();

    presenter2 = new Presenter({
      root: 'boxForSlider',
      min: 50,
      max: 70,
      step: 5,
      type: 'range',
      direction: 'vertical',
      value: [60, 61],
      tooltip: true,
      scale: { init: true, num: 7, type: 'numeric' },
    });
    
    // fn = jest.fn(x => x ** 2)// fn - мок функция возв. в квадрат
  });

  // jest.mock('Presenter'); // происходит автоматически при авто-мокинге

  test('should create a new instance of the Presenter', () => {
    expect(presenter).toBeTruthy();
    expect(presenter instanceof Presenter).toBeTruthy();
    expect(presenter).toBeInstanceOf(Presenter);

    expect(presenter2).toBeTruthy();
    expect(presenter2 instanceof Presenter).toBeTruthy();
  });
  
  test('should check all the properties', () => {
    expect(presenter).toHaveProperty('model');
    expect(presenter).toHaveProperty('view');
  });

  test('onDirectionChange - metod change direction', () => {
    presenter.onDirectionChange();
    expect(presenter.view.getValues().direction).toEqual('vertical');
    expect(presenter.model.direction).toEqual('vertical');
    
    presenter2.onDirectionChange();
    expect(presenter2.view.getValues().direction).toEqual('horizontal');
    expect(presenter2.model.direction).toEqual('horizontal');

    // presenter.model.changeDirection = jest.fn();
    // presenter.view.changeDirection = jest.fn();
    // presenter.onDirectionChange();
    // expect(presenter.model.changeDirection).toBeCalled();
    // expect(presenter.view.changeDirection).toBeCalled();
  });

  test('onTypeChange - metod change slider type', () => {
    expect(presenter.model.type).toEqual('single');
    expect(presenter.view.getValues().type).toEqual('single');

    expect(presenter2.model.type).toEqual('range');
    expect(presenter2.view.getValues().type).toEqual('range');

    presenter.onTypeChange('range');
    expect(presenter.model.type).toEqual('range');
    expect(presenter.view.getValues().type).toEqual('range');

    presenter2.onTypeChange('single');
    expect(presenter2.model.type).toEqual('single');
    expect(presenter2.view.getValues().type).toEqual('single');
  });

  test('onValueChange - metod change slider value', () => {
    expect(presenter.model.value).toEqual(0);
    expect(presenter.view.getValues().value).toEqual(0);
    presenter.onValueChange(75);
    expect(presenter.model.value).toEqual(75);
    expect(presenter.view.getValues().value).toEqual(75);

    expect(presenter2.model.value).toEqual([60, 65]);
    expect(presenter2.view.getValues().value).toEqual([60, 65]);
    presenter2.onValueChange([10, 94]);
    expect(presenter2.model.value).toEqual([50, 70]);
    expect(presenter2.view.getValues().value).toEqual([50, 70]);
  });
});
