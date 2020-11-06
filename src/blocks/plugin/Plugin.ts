import { initViewOptions } from '../view/IView';
import Presenter from '../presenter/Presenter';

const jQuery = require('jquery');

const $ = jQuery;

$.fn.sliderPlugin = function (options: initViewOptions) {
  let localRoot;

  if (this[0] && (this as JQuery)[0].id) {
    localRoot = (this as JQuery)[0].attributes.getNamedItem('id')!.value;
  }

  const localOptions = $.extend(options, {
    root: localRoot,
  });

  const presenter = new Presenter(localOptions);

  return {
    getValue: presenter.getValue.bind(presenter),
    getType: presenter.getType.bind(presenter),
    getStep: presenter.getStep.bind(presenter),
    getScale: presenter.getScale.bind(presenter),
    getDirection: presenter.getDirection.bind(presenter),
    getTooltip: presenter.getTooltip.bind(presenter),
    setValue: presenter.changeValue.bind(presenter),
    changeType: presenter.changeType.bind(presenter),
    changeTooltip: presenter.changeTooltip.bind(presenter),
    changeDirection: presenter.changeDirection.bind(presenter),
    changeStep: presenter.changeStep.bind(presenter),
    changeScale: presenter.changeScale.bind(presenter),
    addObserver: presenter.addObserver.bind(presenter),
  };
};

export default $;
