import Model from '../model/Model';
import View from '../view/View';

interface IPresenter {
  view: View;
  model: Model
}

export default IPresenter;
