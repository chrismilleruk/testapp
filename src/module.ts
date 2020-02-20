
class Module {
  __init: boolean;

  constructor() {
    this.__init = true;
  }

  sayHello(name?: string) {
    if (this.__init) {
      return `Hello!`;
    }

    return false;
  }
}

export { Module };