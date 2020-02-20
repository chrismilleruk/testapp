import { Module } from './module'

describe('Money App Module', () => {
  it('should exist', () => {
    let module: Module = new Module();
    let result = module.sayHello();

    expect(result).toBe('Hello!');
  })

})