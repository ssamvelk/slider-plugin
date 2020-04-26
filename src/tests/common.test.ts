import { greeter } from '../js/common';


describe('greeter function', () => {
  test('просто тест', () => {
    expect(1 + 1).toBe(2);
  });
  test('greeter should return Hello, Samvel', () => {
    const newLocal = 'Samvel';
    expect(greeter(newLocal)).toEqual('Hello, Samvel');
  });
});
