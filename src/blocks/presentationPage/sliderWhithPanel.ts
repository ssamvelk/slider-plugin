/* eslint-disable @typescript-eslint/no-unused-vars */
import $ from '../plugin/Plugin';
import Panel from '../panel/Panel';
import { initViewOptions } from '../view/IView';

// const event111 = new Event('changeValue');
// require('jquery');
// const $ = jQuery;

const factory = (root: string, options: initViewOptions, serialNumber: number) => {
  const rootWrap = document.getElementById(root);
  
  const wrapForSliderPlugin = rootWrap!.querySelector('.slider-whith-panel__slider');
  wrapForSliderPlugin?.setAttribute('id', `mySlider${serialNumber}`);
  const sliderPluginId = wrapForSliderPlugin?.getAttribute('id');
  console.log('options=', options);
  
  const wrapForPanel = rootWrap!.querySelector('.slider-whith-panel__panel');

  const sliderPlugin = $(`#${sliderPluginId}`).sliderPlugin(options);
  
  const panel = new Panel({
    root: (wrapForPanel as HTMLDivElement),
    value: sliderPlugin.getValue(),
    type: sliderPlugin.getType(),
    direction: sliderPlugin.getDirection(),
    tooltip: sliderPlugin.getTooltip(),
    step: sliderPlugin.getStep(),
    scale: sliderPlugin.getScale(),
  }, serialNumber);
  
  /** Добавляем  panel в список наблюдателей за слайдером */
  sliderPlugin.addObserver(panel);
  
  if (rootWrap) {
    /** Добавляем обработчики на нажатие Enter для инпутов */
    /** Value inputs */
    panel.valueInput1.addEventListener('keydown', (e) => {
      console.log('e.target ', e.target);
      if (e.keyCode === 13) {
        if (sliderPlugin.getType() === 'single') {
          sliderPlugin.setValue(Number(panel.valueInput1.value));
        } else if (sliderPlugin.getType() === 'range') {
          const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
          sliderPlugin.setValue(localRangeValue);
        }
        panel.setValue(sliderPlugin.getValue());
      }
    });
    
    panel.valueInput2.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        if (sliderPlugin.getType() === 'single') {
          sliderPlugin.setValue(Number(panel.valueInput1.value));
        } else if (sliderPlugin.getType() === 'range') {
          const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
          sliderPlugin.setValue(localRangeValue);
        }
        panel.setValue(sliderPlugin.getValue());
      }
    });
  
    /** Step input */
    panel.stepInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        sliderPlugin.changeStep(Number(panel.stepInput.value));
        // console.log(sliderPlugin.getStep());
        panel.stepInput.value = sliderPlugin.getStep();
        panel.setValue(sliderPlugin.getValue());
      }
    });
  
    /** Scale num input */
    panel.scaleNumInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        const localScale = sliderPlugin.getScale();
        sliderPlugin.changeScale({ init: localScale.init, type: localScale.type, num: Number(panel.scaleNumInput.value) });
        // console.log('panel types', panel.scaleTypeRadio1.value, panel.scaleTypeRadio2.value);
      }
    });
  
    /** Добавляем обработчики на событие клик для радио кнопок */
    panel.root.addEventListener('click', (e) => {
      if (e.target === panel.typeRadio1) {
        sliderPlugin.changeType(panel.typeRadio1.value);
        panel.valueInput2.value = '';
        panel.valueInput2.disabled = true;
      }
      if (e.target === panel.typeRadio2) {
        sliderPlugin.changeType(panel.typeRadio2.value);
        panel.valueInput2.disabled = false;
        panel.valueInput2.value = sliderPlugin.getValue()[1];
      }
      if (e.target === panel.directionRadio1) {
        if (sliderPlugin.getDirection() === 'vertical') {
          sliderPlugin.changeDirection();
        }
      }
      if (e.target === panel.directionRadio2) {
        if (sliderPlugin.getDirection() === 'horizontal') {
          sliderPlugin.changeDirection();
        }
      }
      if (e.target === panel.tooltipRadio1) {
        sliderPlugin.changeTooltip(true);
      }
      if (e.target === panel.tooltipRadio2) {
        sliderPlugin.changeTooltip(false);
      }
      if (e.target === panel.scaleOnRadio) {
        sliderPlugin.changeScale({ init: true });
        panel.scaleTypeRadio1.disabled = false;
        panel.scaleTypeRadio2.disabled = false;
        panel.scaleNumInput.disabled = false;
      }
      if (e.target === panel.scaleOffRadio) {
        sliderPlugin.changeScale({ init: false });
        panel.scaleTypeRadio1.disabled = true;
        panel.scaleTypeRadio2.disabled = true;
        panel.scaleNumInput.disabled = true;
      }
      if (e.target === panel.scaleTypeRadio1) {
        sliderPlugin.changeScale({ init: sliderPlugin.getScale().init, type: panel.scaleTypeRadio1.value });
      }
      if (e.target === panel.scaleTypeRadio2) {
        sliderPlugin.changeScale({ init: sliderPlugin.getScale().init, type: panel.scaleTypeRadio2.value });
      }
    });
  }
};

factory(
  'slider-whith-panel-0',
  {
    value: 50,
    scale: true,
  },
  0,
);

factory(
  'slider-whith-panel-1',
  {
    type: 'range',
    value: [250, 750],
    tooltip: true,
    min: 0,
    max: 1000,
    step: 100,
    scale: { init: true, type: 'numeric', num: 11 },
  },
  1,
);

factory(
  'slider-whith-panel-2',
  {
    min: -100,
    max: 100,
    value: 0,
    step: 10,
    tooltip: true,
    root: 'mySliderVertical',
    scale: true,
    direction: 'vertical',
  },
  2,
);

factory(
  'slider-whith-panel-3',
  {
    type: 'single',
    direction: 'vertical',
    value: 0,
    tooltip: true,
    min: 0,
    max: 1,
    step: 0.25,
    scale: { init: true, type: 'numeric', num: 5 },
  },
  3,
);
