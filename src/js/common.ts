/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/prefer-default-export
export function greeter(person: string) {
  const x: string = `Hello, ${person}`;
  return x;
}


function addMetadata(target: any) {
  // Add some metadata
  // eslint-disable-next-line no-param-reassign
  target.__customMetadata = {
    someKey: 'someValue',
  };

  // Return target
  return target;
}

@addMetadata
class Person {
  private _name: string;

  prosto: string;

  public constructor(name: string) {
    this._name = name;
    this.prosto = 'prostoSting';
  }

  public greet() {
    return this._name;
  }
}

function getMetadataFromClass(target: any) {
  return target.__customMetadata;
}

console.log(getMetadataFromClass(Person));

console.log('-----', new Person('xren'));
