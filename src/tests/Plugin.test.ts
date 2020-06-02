import $ from '../blocks/plugin/Plugin';
import '@testing-library/jest-dom';

describe('Plugin', () => {
  const divForSlider: HTMLElement = document.createElement('div');
  divForSlider.id = 'sliderWrapId';
  const sliderPlugin = $('#sliderWrapId').sliderPlugin({});

  const sliderWrap = document.querySelector('.slider__wrp');
  const sliderBaseLine = document.querySelector('.slider__line');
  const sliderSelect = document.querySelector('.slider__select');
  const sliderHandle = document.querySelector('.slider__handle');
  test('should to be in the DOM', () => {
    expect(sliderWrap).toBeInTheDOM();
    expect(sliderBaseLine).toBeInTheDOM();
    expect(sliderSelect).toBeInTheDOM();
    expect(sliderHandle).toBeInTheDOM();
  });

  test('Plugin API', () => {
    expect(sliderPlugin.getValue()).toEqual(0);
    expect(sliderPlugin.getType()).toEqual('single');
    expect(sliderPlugin.getStep()).toEqual(1);
    expect(sliderPlugin.getScale()).toEqual({ init: false, type: 'usual', num: 7 });
    expect(sliderPlugin.getDirection()).toEqual('horizontal');
    expect(sliderPlugin.getTooltip()).toEqual(false);

    sliderPlugin.setValue(95);
    expect(sliderPlugin.getValue()).toEqual(95);

    sliderPlugin.changeType('range');
    expect(sliderPlugin.getType()).toEqual('range');

    sliderPlugin.changeTooltip(true);
    expect(sliderPlugin.getTooltip()).toEqual(true);

    sliderPlugin.changeDirection('vertical');
    expect(sliderPlugin.getDirection()).toEqual('vertical');

    sliderPlugin.changeStep(7);
    expect(sliderPlugin.getStep()).toEqual(7);

    sliderPlugin.changeScale({ init: true, num: 19, type: 'numeric' });
    expect(sliderPlugin.getScale()).toEqual({ init: true, num: 19, type: 'numeric' });

    // const spy = jest.spyOn(sliderPlugin.presenter, 'addObserver');
    sliderPlugin.addObserver = jest.fn();
    sliderPlugin.addObserver({ name: 'objName' });

    expect(sliderPlugin.addObserver).toBeCalled();
  });
});
