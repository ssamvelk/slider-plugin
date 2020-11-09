import Presenter from '../blocks/presenter/Presenter';

describe('Presenter', () => {
  let presenter: Presenter;

  let presenter2: Presenter;

  beforeEach(() => {
    presenter = new Presenter({});

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
  });

  test('should create a new instance of the Presenter', () => {
    expect(presenter).toBeTruthy();
    expect(presenter instanceof Presenter).toBeTruthy();
    expect(presenter).toBeInstanceOf(Presenter);

    expect(presenter2).toBeTruthy();
    expect(presenter2 instanceof Presenter).toBeTruthy();
  });
  
  test('should check all the properties of the Presenter', () => {
    expect(presenter).toHaveProperty('model');
    expect(presenter).toHaveProperty('view');
  });

  test('changeDirection - method changes orientation of the slider', () => {
    presenter.changeDirection();
    expect(presenter.view.getValues().direction).toEqual('vertical');
    expect(presenter.model.direction).toEqual('vertical');
    
    presenter.model.changeDirection = jest.fn();
    presenter.view.changeDirection = jest.fn();
    presenter.changeDirection();
    expect(presenter.model.changeDirection).toHaveBeenCalled();
    expect(presenter.view.changeDirection).toBeCalled();

    presenter2.changeDirection();
    expect(presenter2.view.getValues().direction).toEqual('horizontal');
    expect(presenter2.model.direction).toEqual('horizontal');
    
    const spy = jest.spyOn(presenter2.model, 'changeDirection');
    const spy2 = jest.spyOn(presenter2.view, 'changeDirection');
    
    presenter2.changeDirection();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    spy.mockRestore();
    spy2.mockRestore();
  });

  test('changeType - method changes type of the slider', () => {
    expect(presenter.model.type).toEqual('single');
    expect(presenter.view.getValues().type).toEqual('single');

    expect(presenter2.model.type).toEqual('range');
    expect(presenter2.view.getValues().type).toEqual('range');

    presenter.changeType('range');
    expect(presenter.model.type).toEqual('range');
    expect(presenter.view.getValues().type).toEqual('range');

    presenter2.changeType('single');
    expect(presenter2.model.type).toEqual('single');
    expect(presenter2.view.getValues().type).toEqual('single');
  });

  test('changeValue - method changes value of the slider', () => {
    expect(presenter.model.value).toEqual(0);
    expect(presenter.view.getValues().value).toEqual(0);
    presenter.changeValue(75);
    expect(presenter.model.value).toEqual(75);
    expect(presenter.view.getValues().value).toEqual(75);

    expect(presenter2.model.value).toEqual([60, 65]);
    expect(presenter2.view.getValues().value).toEqual([60, 65]);
    presenter2.changeValue([10, 94]);
    expect(presenter2.model.value).toEqual([50, 70]);
    expect(presenter2.view.getValues().value).toEqual([50, 70]);
  });

  test('changeStep - method changes step of the slider', () => {
    const step = presenter.getStep.bind(presenter);
    expect(step()).toEqual(1);
    presenter.changeStep(5);
    expect(step()).toEqual(5);
  });

  test('changeScale - method changes scale of the slider', () => {
    const scale = presenter.getScale.bind(presenter);

    expect(scale()).toEqual({ init: false, type: 'usual', num: 7 });

    presenter.changeScale({ init: true });
    expect(scale()).toEqual({ init: true, type: 'usual', num: 7 });

    presenter.changeScale({ init: true, type: 'numeric' });
    expect(scale()).toEqual({ init: true, type: 'numeric', num: 7 });

    presenter.changeScale({ init: true, type: 'numeric', num: 70 });
    expect(scale()).toEqual({ init: true, type: 'numeric', num: 70 });
  });

  test('changeTooltip - method changes tooltip of the slider', () => {
    const tooltip = presenter.getTooltip.bind(presenter);
    expect(tooltip()).toEqual(false);

    presenter.changeTooltip(true);
    expect(tooltip()).toEqual(true);

    presenter.changeTooltip(true);
    expect(tooltip()).toEqual(true);
  });

  test('getters must return appropriate values', () => {
    expect(presenter.getValue()).toEqual(0);
    expect(presenter.getType()).toEqual('single');
    expect(presenter.getStep()).toEqual(1);
    expect(presenter.getScale()).toEqual({ init: false, type: 'usual', num: 7 });
    expect(presenter.getDirection()).toEqual('horizontal');
    expect(presenter.getTooltip()).toEqual(false);

    expect(presenter2.getValue()).toEqual([60, 65]);
    expect(presenter2.getType()).toEqual('range');
    expect(presenter2.getStep()).toEqual(5);
    expect(presenter2.getScale()).toEqual({ init: true, type: 'numeric', num: 7 });
    expect(presenter2.getDirection()).toEqual('vertical');
    expect(presenter2.getTooltip()).toEqual(true);
  });

  test('addObservers', () => {
    const fakeObj = {
      name: 'fakeObj',
      update: () => { console.log('update'); },
    };
    const spy = jest.spyOn(presenter.view, 'addObservers');
    presenter.addObserver(fakeObj);
    expect(spy).toBeCalled();
  });

  test('update should trigger changeValue', () => {
    const spy = jest.spyOn(presenter, 'update');
    const spyValue = jest.spyOn(presenter, 'changeValue');
    presenter.update('userMoveSlider', 100);
    expect(spy).toBeCalled();
    expect(spyValue).toBeCalled();
  });
});
