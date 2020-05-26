import $ from '../plugin/Plugin';
// require('jquery');

// const $ = jQuery;

const pluginSlider1 = $('').sliderPlugin({
  min: 1, max: 101, value: 67, step: 3, tooltip: true, root: 'mySlider', scale: true,
});
const slider1 = document.getElementById('slider-whith-panel-0');
// let slider1Value: HTMLInputElement;
if (slider1) {
  const slider1Value = slider1!.querySelector('#value1');
  (slider1Value as HTMLInputElement)!.value = pluginSlider1.getValue();

  
  // setInterval(() => {
  //   console.log('slider1Value! =====> ', (slider1Value as HTMLInputElement)!.value);
  // }, 5000);
}
// slider1Value!.innerHTML = '111';

$('#mySliderRange').sliderPlugin({
  root: 'xxx', min: 1, max: 101, value: [70, 78], step: 3, tooltip: true, type: 'range', scale: { init: true, type: 'numeric', num: 9 },
});

$('').sliderPlugin({
  min: 0, max: 500, value: 250, step: 10, tooltip: true, root: 'mySliderVertical', scale: true, direction: 'vertical',
});

$('#mySliderRangeVertical').sliderPlugin({
  root: 'xxx', min: -100, max: 100, value: [-200, 50], step: 50, tooltip: true, type: 'range', direction: 'vertical', scale: { init: true, type: 'numeric', num: 5 },
});
