
/**
 * Example Module
 */
class Greeting {
  /**
   * Greeting prefix
   */
  greeting: string;

  /**
   * Creates an instance of module.
   */
  constructor(prefix: string = `Hello`) {
    if (!prefix) {
      this.greeting = `Hello`;
    } else {
      this.greeting = prefix;
    }
  }

  /**
   * Says hello
   * @param [name] The name to say hello to.
   * @returns  A greeting `string`
   */
  sayHello(name?: string) {
    if (name) {
      return `${this.greeting} ${name}!`;
    }

    return `${this.greeting}!`;
  }
}

export { Greeting };