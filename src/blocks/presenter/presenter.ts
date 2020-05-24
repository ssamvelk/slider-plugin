import IPresenter from './IPresenter';
import View from '../view/View';
import Model from '../model/Model';
// import { modelOptions } from '../model/IModel';
import { initViewOptions } from '../view/IView';
import { sliderType, sliderValueType } from '../model/IModel';

class Presenter implements IPresenter {
  view: View;

  model: Model;
  
  constructor(options: initViewOptions) {
    this.view = new View(options);
    this.model = new Model(options);
  }
  
  /** Смена direction */
  onDirectionChange() {
    this.model.changeDirection();
    this.view.changeDirection();
    if (this.model.direction === this.view.getValues().direction) {
      console.log('direction currect!');
      console.log(`${this.model.direction} === ${this.view.getValues().direction}`);
    } else throw new Error('direction non-currect');
  }

  /** Смена type */
  onTypeChange(type: sliderType) {
    this.model.changeType(type);
    this.view.changeType(type);
  }

  /** Смена значения */
  onValueChange(value: sliderValueType) {
    this.model.setValue(value, this.model.type);
    this.view.changeValue(value);
  }
}

const p = new Presenter({
  min: 1, max: 101, value: 67, step: 3, tooltip: true, root: 'mySlider', scale: true,
});
console.log('p.model = ', p.model, '\np.view.getValues() = ', p.view);

setInterval(() => {
  console.log('p.model = ', p.model.value, '\np.view.getValues() = ', p.view.getValues().value);
}, 5000);


const p2 = new Presenter({
  root: 'mySliderRange', min: 0, max: 300, value: [30, 75], step: 30, type: 'range', direction: 'vertical', tooltip: true, scale: { init: true, type: 'numeric', num: 9 },
});
console.log('p2 ', p2);

p.onValueChange(15);

p2.onValueChange([25, 150]);
p2.onDirectionChange();
p2.onTypeChange('single');

export default Presenter;
