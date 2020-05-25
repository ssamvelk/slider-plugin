/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
import { initViewOptions } from '../view/IView';
import Presenter from '../presenter/Presenter';
// import * as $ from 'jquery';

const jQuery = require('jquery');

const $ = <any>jQuery;

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
// eslint-disable-next-line no-shadow
(($) => {
  // eslint-disable-next-line no-param-reassign
  $.fn.sliderPlugin = (options: initViewOptions) => {
    new Presenter(options);
    // console.log(presenter);
  };
})(jQuery);

const myPlugin = $('').sliderPlugin({
  min: 1, max: 101, value: 67, step: 3, tooltip: true, root: 'mySlider', scale: true,
});
