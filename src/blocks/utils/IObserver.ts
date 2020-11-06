import { sliderValueType } from '../model/IModel';

type Observer = {
  update: (action: string, parameters: sliderValueType) => void;
};

export default Observer;
