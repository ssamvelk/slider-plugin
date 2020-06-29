# sliderPlugin
  jQuery плагин, который реализует функционал «бегунка». 
  Кастомизируемый плагин-бегунок для JQuery с множеством опций для настрйоки внешнего видаи поведения.

# GitHub Pages 
  [GitHub Pages](https://ssamvelk.github.io/slider-plugin/).

# Развертывание 
  $ git clone https://github.com/ssamvelk/slider-plugin <br>
  $ npm install

# Использование
  $(`#id`).sliderPlugin([{options}])

# {options}
```ts
  root?: string
  min?: number
  max?: number
  step?: number
  type?: "single" | "range"
  direction?: "vertical" | "horizontal"
  tooltip?: boolean
  scale?: boolean | { init: boolean, num?: number, type?: 'numeric' | 'usual'}
  value?: number | [number, number]
```
# Архитектура
  При проектировании приложения использовалась архитектура MVP - Model-View-Presenter

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
# Example
