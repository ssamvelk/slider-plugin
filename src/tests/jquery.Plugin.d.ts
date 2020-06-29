import { initViewOptions } from '../blocks/view/IView';

interface Window {
  $: JQuery;
}

interface JQuery {
  sliderPlugin: (options: initViewOptions) => object;
}
