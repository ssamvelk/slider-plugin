import Model from '../model/';
import View from '../view/View';

interface IPresenter {
  view: View;
  model: Model;
}

export default IPresenter;
