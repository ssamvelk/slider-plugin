import Model from '../model/_Model';
import View from '../view/View';

interface IPresenter {
  view: View;
  model: Model;
}

export default IPresenter;
