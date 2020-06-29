import { initViewOptions } from '../view/IView';

interface Window {
  $: JQuery;
}

interface JQuery {
  sliderPlugin: (options: initViewOptions) => object;
}
