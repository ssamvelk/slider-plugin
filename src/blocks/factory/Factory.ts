import Panel from '../panel/Panel';
import { initViewOptions } from '../view/IView';

/** factory - функция создает слайдер и панель управления для него,
 * а также штампует им серийный номер и расставляет по своим местам.
 */
const factory = (root: string, options: initViewOptions, serialNumber: number) => {
  const rootWrap = document.getElementById(root);
  
  const wrapForSliderPlugin = rootWrap!.querySelector('.slider-with-panel__slider');
  wrapForSliderPlugin?.setAttribute('id', `slider-plugin-${serialNumber}`);
  
  const wrapForPanel = rootWrap!.querySelector('.slider-with-panel__panel');

  const sliderPluginId = wrapForSliderPlugin?.getAttribute('id');

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
    /** Добавляем обработчики на change для инпутов */
    /** Value inputs */
    panel.valueInput1.addEventListener('change', () => {
      if (sliderPlugin.getType() === 'single') {
        sliderPlugin.setValue(Number(panel.valueInput1.value));
      } else if (sliderPlugin.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        sliderPlugin.setValue(localRangeValue);
      }
      panel.setValue(sliderPlugin.getValue());
    });
    
    panel.valueInput2.addEventListener('change', () => {
      if (sliderPlugin.getType() === 'single') {
        sliderPlugin.setValue(Number(panel.valueInput1.value));
      } else if (sliderPlugin.getType() === 'range') {
        const localRangeValue = [Number(panel.valueInput1.value), Number(panel.valueInput2.value)];
        sliderPlugin.setValue(localRangeValue);
      }
      panel.setValue(sliderPlugin.getValue());
    });
  
    /** Step input */
    panel.stepInput.addEventListener('change', () => {
      sliderPlugin.changeStep(Number(panel.stepInput.value));
      panel.stepInput.value = sliderPlugin.getStep();
      panel.setValue(sliderPlugin.getValue());
    });
  
    /** Scale num input */
    panel.scaleNumInput.addEventListener('change', () => {
      const localScale = sliderPlugin.getScale();
      sliderPlugin.changeScale({ init: localScale.init, type: localScale.type, num: Number(panel.scaleNumInput.value) });
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
        [, panel.valueInput2.value] = sliderPlugin.getValue();
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

export default factory;
