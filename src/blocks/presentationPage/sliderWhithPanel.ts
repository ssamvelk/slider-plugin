import $ from '../plugin/Plugin';
import Panel from '../panel/Panel';

// const event111 = new Event('changeValue');
// require('jquery');
// const $ = jQuery;

const pluginSlider1 = $('').sliderPlugin({
  type: 'range',
  value: [55, 78],
  min: 1,
  max: 101,
  step: 3,
  tooltip: true,
  root: 'mySlider',
  scale: { init: true, type: 'numeric', num: 11 },
  // direction: 'vertical',
});

const wrapForSlider1 = document.getElementById('slider-whith-panel-0');
const wrapForPanel1 = wrapForSlider1!.querySelector('.slider-whith-panel__panel');

const panel = new Panel({
  root: (wrapForPanel1 as HTMLDivElement),
  value: pluginSlider1.getValue(),
  type: pluginSlider1.getType(),
  direction: pluginSlider1.getDirection(),
  tooltip: pluginSlider1.getTooltip(),
  step: pluginSlider1.getStep(),
  scale: pluginSlider1.getScale(),
});

/** Добавляем  panel в список наблюдателей за слайдером */
pluginSlider1.addObserver(panel);


if (wrapForSlider1) {
  /** Добавляем обработчики на нажатие Enter для инпутов */
  /** Value inputs */
  panel.valueInput1.addEventListener('keydown', (e) => {
    console.log('e.target ', e.target);
    if (e.keyCode === 13) {
      if (pluginSlider1.getType() === 'single') {
        pluginSlider1.setValue(Number(panel.valueInput1.value));
      } else if (pluginSlider1.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        pluginSlider1.setValue(localRangeValue);
      }
      panel.setValue(pluginSlider1.getValue());
    }
  });
  
  panel.valueInput2.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (pluginSlider1.getType() === 'single') {
        pluginSlider1.setValue(Number(panel.valueInput1.value));
      } else if (pluginSlider1.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        pluginSlider1.setValue(localRangeValue);
      }
      panel.setValue(pluginSlider1.getValue());
    }
  });

  /** Step input */
  panel.stepInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginSlider1.changeStep(Number(panel.stepInput.value));
      // console.log(pluginSlider1.getStep());
      panel.stepInput.value = pluginSlider1.getStep();
      panel.setValue(pluginSlider1.getValue());
    }
  });

  /** Scale num input */
  panel.scaleNumInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      const localScale = pluginSlider1.getScale();
      pluginSlider1.changeScale({ init: localScale.init, type: localScale.type, num: Number(panel.scaleNumInput.value) });
      // console.log('panel types', panel.scaleTypeRadio1.value, panel.scaleTypeRadio2.value);
    }
  });

  /** Добавляем обработчики на событие клик для радио кнопок */
  panel.root.addEventListener('click', (e) => {
    if (e.target === panel.typeRadio1) {
      pluginSlider1.changeType(panel.typeRadio1.value);
      panel.valueInput2.value = '';
      panel.valueInput2.disabled = true;
    }
    if (e.target === panel.typeRadio2) {
      pluginSlider1.changeType(panel.typeRadio2.value);
      panel.valueInput2.disabled = false;
      panel.valueInput2.value = pluginSlider1.getValue()[1];
    }
    if (e.target === panel.directionRadio1) {
      if (pluginSlider1.getDirection() === 'vertical') {
        pluginSlider1.changeDirection();
      }
    }
    if (e.target === panel.directionRadio2) {
      if (pluginSlider1.getDirection() === 'horizontal') {
        pluginSlider1.changeDirection();
      }
    }
    if (e.target === panel.tooltipRadio1) {
      pluginSlider1.changeTooltip(true);
    }
    if (e.target === panel.tooltipRadio2) {
      pluginSlider1.changeTooltip(false);
    }
    if (e.target === panel.scaleOnRadio) {
      pluginSlider1.changeScale({ init: true });
      panel.scaleTypeRadio1.disabled = false;
      panel.scaleTypeRadio2.disabled = false;
      panel.scaleNumInput.disabled = false;
    }
    if (e.target === panel.scaleOffRadio) {
      pluginSlider1.changeScale({ init: false });
      panel.scaleTypeRadio1.disabled = true;
      panel.scaleTypeRadio2.disabled = true;
      panel.scaleNumInput.disabled = true;
    }
    if (e.target === panel.scaleTypeRadio1) {
      pluginSlider1.changeScale({ init: pluginSlider1.getScale().init, type: panel.scaleTypeRadio1.value });
    }
    if (e.target === panel.scaleTypeRadio2) {
      pluginSlider1.changeScale({ init: pluginSlider1.getScale().init, type: panel.scaleTypeRadio2.value });
    }
  });
}

// --------------------------------------------------------------------
// $('#mySliderRange').sliderPlugin({
//   root: 'xxx', min: 1, max: 101, value: [70, 78], step: 3, tooltip: true, type: 'range', scale: { init: true, type: 'numeric', num: 9 },
// });

// $('').sliderPlugin({
//   min: 0, max: 500, value: 250, step: 10, tooltip: true, root: 'mySliderVertical', scale: true, direction: 'vertical',
// });

// $('#mySliderRangeVertical').sliderPlugin({
//   root: 'xxx', min: -100, max: 100, value: [-200, 50], step: 50, tooltip: true, type: 'range', direction: 'vertical', scale: { init: true, type: 'numeric', num: 5 },
// });
