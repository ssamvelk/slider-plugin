// eslint-disable-next-line import/no-named-as-default-member
import View from '../blocks/view/View';
import '@testing-library/jest-dom';
// import 'jest-dom/extend-expect';

describe('Тестирование View', () => {
  const v = new View({});

  const divForSlider: HTMLElement = document.createElement('div');
  divForSlider.id = 'divForSlider';
  document.body.appendChild(divForSlider);

  const v2 = new View({
    root: 'divForSlider',
    type: 'range',
    direction: 'vertical',
    scale: true,
    tooltip: true,
    min: 100,
    max: 200,
  });
  

  test('Создание эксземпляра класса View без параметров', () => {
    expect(v).not.toBeUndefined();

    expect(v).toHaveProperty('root');
    expect(v).toHaveProperty('wrap');
    expect(v).toHaveProperty('selectSegment');
    expect(v).toHaveProperty('sliderLine');
    expect(v).toHaveProperty('handle');
    expect(v).toHaveProperty('viewValues');
  });

  test('Создание эксземпляра класса View с параметром root', () => {
    expect(v2).not.toBeUndefined();

    expect(v2).toHaveProperty('root');
    expect(v2).toHaveProperty('wrap');
    expect(v2).toHaveProperty('selectSegment');
    expect(v2).toHaveProperty('sliderLine');
    expect(v2).toHaveProperty('handleMin');
    expect(v2).toHaveProperty('handleMax');
    expect(v2).toHaveProperty('tooltipMin');
    expect(v2).toHaveProperty('tooltipMax');
    expect(v2).toHaveProperty('scale');
    expect(v2).toHaveProperty('viewValues');
  });

  test('Проверка DOM элементов эксземпляров класса View', () => {
    expect(v2).not.toBeUndefined();
    
    expect(document.body).toContainElement(divForSlider);
    expect(document.body).toContainElement(v.wrap);
    expect(document.body).toContainElement(v2.wrap);

    expect(v.root).toContainElement(v.wrap);
    expect(v.root).toBe(document.body);
    expect(v.wrap).toContainElement(v.sliderLine);
    expect(v.wrap).toContainElement(v.selectSegment);
    expect(v.wrap).toContainElement(v.handle as HTMLDivElement);
    expect(v.sliderLine).toContainElement(v.handle as HTMLDivElement);
    expect(v.sliderLine).toContainElement(v.selectSegment as HTMLDivElement);

    expect(v2.root).toContainElement(v2.wrap);
    expect(v2.root).toBe(divForSlider);
    expect(v2.wrap).toContainElement(v2.sliderLine);
    expect(v2.wrap).toContainElement(v2.selectSegment);
    expect(v2.sliderLine).toContainElement(v2.handleMin as HTMLDivElement);
    expect(v2.sliderLine).toContainElement(v2.handleMax as HTMLDivElement);
    expect(v2.sliderLine).toContainElement(v2.selectSegment as HTMLDivElement);
    expect(v2.wrap).toContainElement(v2.tooltipMin as HTMLDivElement);
    expect(v2.wrap).toContainElement(v2.tooltipMin as HTMLDivElement);
    expect(v2.handleMin).toContainElement(v2.tooltipMin as HTMLDivElement);
    expect(v2.handleMax).toContainElement(v2.tooltipMax as HTMLDivElement);
    expect(v2.wrap).toContainElement(v2.scale as HTMLDivElement);
  });

  test('проверка classlist', () => {
    expect(v.wrap.classList).toContain('slider__wrp');
    expect(v.wrap.classList).toContain('slider__wrp_horizontal');
    expect(v.sliderLine.classList).toContain('slider__line');
    expect(v.sliderLine.classList).toContain('slider__line_horizontal');
    expect(v.selectSegment.classList).toContain('slider__select');
    expect(v.selectSegment.classList).toContain('slider__select_horizontal');
    expect(v.handle!.classList).toContain('slider__handle');
    expect(v.handle!.classList).toContain('slider__handle_horizontal');
    expect(v.handle!.classList).toContain('slider__handle');
    expect(v.handle!.classList).toContain('slider__handle_horizontal');

    expect(v2.wrap.classList).toContain('slider__wrp');
    expect(v2.wrap.classList).toContain('slider__wrp_vertical');
    expect(v2.sliderLine.classList).toContain('slider__line');
    expect(v2.sliderLine.classList).toContain('slider__line_vertical');
    expect(v2.selectSegment.classList).toContain('slider__select');
    expect(v2.selectSegment.classList).toContain('slider__select_vertical');
    expect(v2.handleMin!.classList).toContain('slider__handle');
    expect(v2.handleMin!.classList).toContain('slider__handle_vertical');
    expect(v2.handleMax!.classList).toContain('slider__handle');
    expect(v2.handleMax!.classList).toContain('slider__handle_vertical');
    expect(v2.tooltipMin!.classList).toContain('slider__tooltip');
    expect(v2.tooltipMin!.classList).toContain('slider__tooltip_vertical');
    expect(v2.tooltipMax!.classList).toContain('slider__tooltip');
    expect(v2.tooltipMax!.classList).toContain('slider__tooltip_vertical');
    expect(v2.scale!.classList).toContain('slider__scale');
    expect(v2.scale!.classList).toContain('slider__scale_vertical');
  });

  test('Тестирование метода checkValue', () => {
    const v3 = new View({
      value: -50,
    });
    const v4 = new View({
      value: 1500,
    });
    expect(v3.getValues().value).toEqual(0);
    expect(v4.getValues().value).toEqual(100);

    const v5 = new View({
      value: [-50, 70],
      type: 'range',
    });
    const v6 = new View({
      value: [45, 700],
      type: 'range',
    });
    const v7 = new View({
      value: [45, 10],
      type: 'range',
    });
    const v8 = new View({
      value: [-45, 110],
      type: 'range',
    });

    expect(v5.getValues().value).toEqual([0, 70]);
    expect(v6.getValues().value).toEqual([45, 100]);
    expect(v7.getValues().value).toEqual([45, 45]);
    expect(v8.getValues().value).toEqual([0, 100]);
  });

  test('Тестирование метода changeDirection', () => {
    v.changeDirection();
    v2.changeDirection();
    expect(v.getValues().direction).toEqual('vertical');
    expect(v2.getValues().direction).toEqual('horizontal');
    
    v.changeDirection();
    v2.changeDirection();
    expect(v.getValues().direction).toEqual('horizontal');
    expect(v2.getValues().direction).toEqual('vertical');
  });

  test('Тестирование метода changeType', () => {
    v.changeType('range');

    expect(v.getValues().type).toEqual('range');
    expect(v.getValues().value).toEqual([50, 50]);

    v.changeType('single');
    expect(v.getValues().type).toEqual('single');
    expect(v.getValues().value).toEqual(50);
  });
});
