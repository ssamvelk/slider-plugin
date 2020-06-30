# sliderPlugin
  jQuery плагин, который реализует функционал «бегунка». 
  Кастомизируемый плагин-бегунок для JQuery с множеством опций для настрйоки внешнего вида и поведения.

# GitHub Pages 
  [GitHub Pages](https://ssamvelk.github.io/slider-plugin/).

# Развертывание 
  $ git clone https://github.com/ssamvelk/slider-plugin <br>
  $ npm install

# Все используемые библиотеки и зависимости описаны в файле package.json
  $ npm run dev - разработка проекта <br>
  $ npm run build - собрать готовый продукт <br>
  $ npm run test - тестирование проекта

# Использование
  ```js
    $(`#box-id`).sliderPlugin({[options]})

    $().sliderPlugin({ root: 'box-id' })
  ```
  ## Слайдер без параметров
    ```js
    const slider = $(`#box-id`).sliderPlugin({});
    ```

  ## Слайдер с параметрами
    ```js
    const simpleSlider = $(`#box-id`).sliderPlugin({
      min: 10,
      max: 190,
      step: 10,
      tooltip: true,
      scale: true,
      type: 'single',
      direction: 'horizontal',
      value: 70
    });

    const rangeSlider = $().sliderPlugin({
      root: 'box-id',
      min: -1000,
      max: 1000,
      step: 100,
      type: 'range',
      direction: 'vertical',
      tooltip: false,
      scale: { init: true, num: 15, type: 'numeric'},
      value: [-500, 900];
    });
    ```  

# Параметры слайдера - {options}
```js
  {
    root?: string; // контейнер для слайдера (id контейнера)
    min?: number; // минимально-возможное значение слайдера
    max?: number; // максимально-возможное значение слайдера
    step?: number; // шаг
    type?: 'single' | 'range'; // тип 
    direction?: 'vertical' | 'horizontal'; // ориентация
    tooltip?: boolean; // подсказка со значением
    scale?: boolean | { init: boolean, num?: number, type?: 'numeric' | 'usual'}; // шкала
    value?: number | [number, number]; // значение
  }
```
# Архитектура
  При проектировании приложения использовалась архитектура MVP - Model-View-Presenter. Для связи между модулями использовался поведенческий паттерн проектирование "Наблюдатель". Для наглядного примера управления слайдером через API используется конфигурационная панель. Для подключения нескольких слайдеров на демо-странице, использовался порождающий паттерн проектирования "Фабричный метод". Так же велось модульное тестирование. Подробное API описано в файле ![API](https://github.com/ssamvelk/slider-plugin/master/src/assets/MVP-API.doc)

# UML
  ![UML Diagram](https://github.com/ssamvelk/slider-plugin/master/src/assets/MVP.jpg)

# API
```js
  getValue() - получить значение;
  getType() - получить тип
  getStep() - получить шаг
  getScale() - получить шкалу
  getDirection() - получить ориентацию
  getTooltip() - получить подсказку со значением
  setValue() - установить значение
  changeType() - поменять тип
  changeTooltip() - включить или отключить подсказку со значением
  changeDirection() - поменять ориентацию
  changeStep() - поменять шаг
  changeScale() - изменить шкалу
  addObserver() - добавить наблюдателя за изменением значения
```
