import { Greeting } from './module'
// import { check, string, asciiString } from "kitimat-jest";
import { property, asyncProperty, string, asciiString, integer, string16bits } from "fast-check";
import { check, given } from './jest-check';


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

  it('should take an alternative `prefix` and a name', () => {
    const greeting = new Greeting('Hi');
    const result = greeting.sayHello('Billy');

    expect(result).toBe('Hi Billy!');
  })
  

  it.each([1, 2, 3.0])('thingy', (num, str, dbl) => {
    console.log(num, str, dbl)
  })

  it.each([
    [1, 'two', 3.0]
  ])('thingy', (num, str, dbl) => {
    console.log(num, str, dbl)
  })

  it.each`
    num   | str       | dbl
    ${1}  | ${'two'}  | ${3.0}
  `('thingy2', ({num, str, dbl}) => {
    console.log(num, str, dbl)
  })

  given(string(), integer())
  .it('should detect types', (a, b) => {

    return false;
  })

  given(string(), asciiString(), integer())
  .it('should do something', (str, str2, num) => {
    
    str;
    str2;
    num;
    
  })

  given(asciiString(), asciiString()).it('should always start with a letter', (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    // Always starts with a letter
    expect(result[0]).toMatch(/[A-Za-z]/);
 })

  check('Always ends with an exclamation', property(string(), string(), (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    expect(result.slice(-1)).toBe('!');
  }));

  check('Always starts with a letter', property(asciiString(), asciiString(), (generatedPrefix, generatedName) => {
    const module: Greeting = new Greeting(generatedPrefix);
    const result = module.sayHello(generatedName);

    console.log([generatedPrefix, generatedName]);

    // Always starts with a letter
    expect(result[0]).toMatch(/[A-Za-z]/);
  }));

  check('Has four basic formats', property(string(), string(), (generatedPrefix, generatedName) => {
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
  }));

})