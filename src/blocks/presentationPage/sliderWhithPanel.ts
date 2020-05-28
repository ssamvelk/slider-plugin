import $ from '../plugin/Plugin';
import Panel from '../panel/Panel';

// const event111 = new Event('changeValue');
// require('jquery');
// const $ = jQuery;

const pluginSlider1 = $('').sliderPlugin({
  type: 'range', value: [55, 78], min: 1, max: 101, step: 3, tooltip: true, root: 'mySlider', scale: true,
});

// console.log('pluginSlider1', pluginSlider1.getValue());

const wrapForSlider1 = document.getElementById('slider-whith-panel-0');
const wrapForPanel1 = wrapForSlider1!.querySelector('.slider-whith-panel__panel');
// console.log('wrapForPanel1 ', wrapForPanel1);

const panel = new Panel({
  root: (wrapForPanel1 as HTMLDivElement),
  value: pluginSlider1.getValue(),
  step: pluginSlider1.getStep(),
});
// console.log('panel = ', panel);

/** Добавляем  panel в список наблюдателей */
pluginSlider1.addObserver(panel);

/** Добавляем обработчики на нажатие Enter */
if (wrapForSlider1) {
  panel.valueInput1.addEventListener('keydown', (e) => {
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

  panel.stepInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginSlider1.changeStep(Number(panel.stepInput.value));
      // console.log(pluginSlider1.getStep());
      panel.stepInput.value = pluginSlider1.getStep();
    }
  });
}

// --------------------------------------------------------------------
$('#mySliderRange').sliderPlugin({
  root: 'xxx', min: 1, max: 101, value: [70, 78], step: 3, tooltip: true, type: 'range', scale: { init: true, type: 'numeric', num: 9 },
});

$('').sliderPlugin({
  min: 0, max: 500, value: 250, step: 10, tooltip: true, root: 'mySliderVertical', scale: true, direction: 'vertical',
});

$('#mySliderRangeVertical').sliderPlugin({
  root: 'xxx', min: -100, max: 100, value: [-200, 50], step: 50, tooltip: true, type: 'range', direction: 'vertical', scale: { init: true, type: 'numeric', num: 5 },
});
