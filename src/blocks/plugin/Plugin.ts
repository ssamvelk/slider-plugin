/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
import { initViewOptions } from '../view/IView';
import Presenter from '../presenter/Presenter';
// import * as $ from 'jquery';

const jQuery = require('jquery');

const $ = jQuery;

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
// eslint-disable-next-line no-shadow
(($) => {
  // eslint-disable-next-line no-param-reassign
  $.fn.sliderPlugin = function(options: initViewOptions) {
    let localRoot;

    if (this[0] && this[0].attributes.id) {
      localRoot = this[0].attributes.getNamedItem('id').value;
    }

    const localOptions = $.extend(options, {
      root: localRoot,
    });

    // console.log('localOptions = ', localOptions);

    const presenter = new Presenter(localOptions);
    // const event = new Event('changeValue');

    return {
      getValue: presenter.getValue.bind(presenter),
      getType: presenter.getType.bind(presenter),
      getStep: presenter.getStep.bind(presenter),
      setValue: presenter.changeValue.bind(presenter),
      changeType: presenter.changeType.bind(presenter),
      changeDirection: presenter.changeDirection.bind(presenter),
      changeStep: presenter.changeStep.bind(presenter),
      addObserver: presenter.addObserver.bind(presenter),
    };
  };
})(jQuery);

export default $;
// console.log('myPluginRange.getValue()1', myPluginRange.getValue);
// myPluginRange.getValue();
// myPluginRange.setValue([10, 15]);
// myPluginRange.getValue();
// console.log('myPluginRange.getValue()2', myPluginRange.getValue);
// console.log('myPluginRange === ', myPluginRange);
