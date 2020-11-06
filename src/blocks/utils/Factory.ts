import Panel from '../panel/Panel';
import { initViewOptions } from '../view/IView';

const $ = require('jquery');

const Factory = (root: string, options: initViewOptions, serialNumber: number) => {
  const rootWrap = document.getElementById(root);
  
  const wrapForSliderPlugin = rootWrap!.querySelector('.slider-with-panel__slider');
  wrapForSliderPlugin?.setAttribute('id', `slider-plugin-${serialNumber}`);
  
  const wrapForPanel = rootWrap!.querySelector('.slider-with-panel__panel');

  const sliderPluginId = wrapForSliderPlugin?.getAttribute('id');

  const $plugin = $(`#${sliderPluginId}`).sliderPlugin(options);
  
  const panel = new Panel({
    root: (wrapForPanel as HTMLDivElement),
    value: $plugin.getValue(),
    type: $plugin.getType(),
    direction: $plugin.getDirection(),
    tooltip: $plugin.getTooltip(),
    step: $plugin.getStep(),
    scale: $plugin.getScale(),
  }, serialNumber);
  
  $plugin.addObserver(panel);
  
  if (rootWrap) {
    panel.valueInput1.addEventListener('change', () => {
      if ($plugin.getType() === 'single') {
        $plugin.setValue(Number(panel.valueInput1.value));
      } else if ($plugin.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        $plugin.setValue(localRangeValue);
      }
      panel.setValue($plugin.getValue());
    });
    
    panel.valueInput2.addEventListener('change', () => {
      if ($plugin.getType() === 'single') {
        $plugin.setValue(Number(panel.valueInput1.value));
      } else if ($plugin.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        $plugin.setValue(localRangeValue);
      }
      panel.setValue($plugin.getValue());
    });
  
    panel.stepInput.addEventListener('change', () => {
      $plugin.changeStep(Number(panel.stepInput.value));
      panel.stepInput.value = $plugin.getStep();
      panel.setValue($plugin.getValue());
    });
  
    panel.scaleNumInput.addEventListener('change', () => {
      const localScale = $plugin.getScale();
      $plugin.changeScale({ init: localScale.init, type: localScale.type, num: Number(panel.scaleNumInput.value) });
    });
  
    panel.root.addEventListener('click', (e) => {
      if (e.target === panel.typeRadio1) {
        $plugin.changeType(panel.typeRadio1.value);
        panel.valueInput2.value = '';
        panel.valueInput2.disabled = true;
      }
      if (e.target === panel.typeRadio2) {
        $plugin.changeType(panel.typeRadio2.value);
        panel.valueInput2.disabled = false;
        [, panel.valueInput2.value] = $plugin.getValue();
      }
      if (e.target === panel.directionRadio1) {
        if ($plugin.getDirection() === 'vertical') {
          $plugin.changeDirection();
        }
      }
      if (e.target === panel.directionRadio2) {
        if ($plugin.getDirection() === 'horizontal') {
          $plugin.changeDirection();
        }
      }
      if (e.target === panel.tooltipRadio1) {
        $plugin.changeTooltip(true);
      }
      if (e.target === panel.tooltipRadio2) {
        $plugin.changeTooltip(false);
      }
      if (e.target === panel.scaleOnRadio) {
        $plugin.changeScale({ init: true });
        panel.scaleTypeRadio1.disabled = false;
        panel.scaleTypeRadio2.disabled = false;
        panel.scaleNumInput.disabled = false;
      }
      if (e.target === panel.scaleOffRadio) {
        $plugin.changeScale({ init: false });
        panel.scaleTypeRadio1.disabled = true;
        panel.scaleTypeRadio2.disabled = true;
        panel.scaleNumInput.disabled = true;
      }
      if (e.target === panel.scaleTypeRadio1) {
        $plugin.changeScale({ init: $plugin.getScale().init, type: panel.scaleTypeRadio1.value });
      }
      if (e.target === panel.scaleTypeRadio2) {
        $plugin.changeScale({ init: $plugin.getScale().init, type: panel.scaleTypeRadio2.value });
      }
    });
  }
};

export default Factory;
