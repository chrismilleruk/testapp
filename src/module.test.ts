import { Greeting } from './module'
import { check, string } from "kitimat-jest";

describe('Greeting Class', () => {

  it('should instantiate', () => {
    const module: Greeting = new Greeting();
    const result = module.sayHello();

    expect(result).toBe('Hello!');
  })

  it('should take a `name` argument', () => {
    const module: Greeting = new Greeting();
    const result = module.sayHello('Billy');

    expect(result).toBe('Hello Billy!');
  })

  it('should take an alternative `prefix`', () => {
    const greeting = new Greeting('Hi');
    const result = greeting.sayHello();

    expect(result).toBe('Hi!');
  })

  check('Always ends with an exclamation', [string(), string()], (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    expect(result.slice(-1)).toBe('!');
  });

  check.skip('Always starts with a letter', [string(), string()], (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    // Always starts with a letter
    expect(result[0]).toMatch(/[A-Za-z]/);
  });

  check('Has four basic formats', [string(), string()], (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    // The four different output formats.
    if (!generatedPrefix) {
      if (!generatedName) {
        expect(result).toBe('Hello!');
      } else {
        expect(result).toBe('Hello ' + generatedName + '!');
      }

    } else {
      if (!generatedName) {
        expect(result).toBe(generatedPrefix + '!');
      } else {
        expect(result).toBe(generatedPrefix + ' ' + generatedName + '!');
      }
    }

  });
})