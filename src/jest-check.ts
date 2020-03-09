import { Arbitrary, IRawProperty, check as fcCheck, assert, property, asyncProperty, string, asciiString } from "fast-check";

export function check<Ts>(name: string, property?: IRawProperty<Ts>, timeout?: number) {
  it(name, () => {
    return assert(property);
  }, timeout);
}

class Given<Ts extends ReadonlyArray<any>> {
  // export class Given<Ts extends ReadonlyArray<any>> implements It<Ts> {
  arbs: Arbitrary<Ts>[];

  constructor(arbs: Arbitrary<any>[]) {
    this.arbs = arbs;
  }

  it(name: string, fn: (...args: ExtractEachCallbackArgs<Ts>) => any, timeout?: number) : void {
    it(name, () => {
      return assert(property(...this.arbs, fn));
    }, timeout);
  }
}

function given<T0>(arb0: Arbitrary<T0>): Given<[T0]>;
function given<T0, T1>(arb0: Arbitrary<T0>, arb1: Arbitrary<T1>): Given<[T0, T1]>;
function given<T0, T1, T2>(arb0: Arbitrary<T0>, arb1: Arbitrary<T1>, arb2: Arbitrary<T2>): Given<[T0, T1, T2]>;

// declare function given<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21>(arb0: Arbitrary<T0>, arb1: Arbitrary<T1>, arb2: Arbitrary<T2>, arb3: Arbitrary<T3>, arb4: Arbitrary<T4>, arb5: Arbitrary<T5>, arb6: Arbitrary<T6>, arb7: Arbitrary<T7>, arb8: Arbitrary<T8>, arb9: Arbitrary<T9>, arb10: Arbitrary<T10>, arb11: Arbitrary<T11>, arb12: Arbitrary<T12>, arb13: Arbitrary<T13>, arb14: Arbitrary<T14>, arb15: Arbitrary<T15>, arb16: Arbitrary<T16>, arb17: Arbitrary<T17>, arb18: Arbitrary<T18>, arb19: Arbitrary<T19>, arb20: Arbitrary<T20>, arb21: Arbitrary<T21>): Given<[T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21]>;

function given(...arbs: Arbitrary<any>[]) {
  return new Given(arbs);
}

export { given }


// function tit<Ts>(name: string, fn: (...args: ExtractEachCallbackArgs<Ts>) => any, timeout?: number) : void {
//   it(name, () => {
//     return assert(property(...this.arbs, fn));
//   }, timeout);
// }


// class It<Ts> {
//   arbs: Arbitrary<Ts>[];

//   constructor(arbs: Arbitrary<any>[]) {
//     this.arbs = arbs;
//   }


//   <Ts extends ReadonlyArray<any>>(name: string, fn: (...args: ExtractEachCallbackArgs<Ts>) => any, timeout?: number) : void {
//     it(name, () => {
//       return assert(property(...this.arbs, fn));
//     }, timeout);
//   }
// }

/**
 * Creates a test closure
 */
interface It<Ts> {
  /**
   * Creates a test closure.
   *
   * @param name The name of your test
   * @param fn The function for your test
   * @param timeout The timeout for an async function test
   */
  <Ts extends ReadonlyArray<any>>(name: string, fn: (...args: ExtractEachCallbackArgs<Ts>) => any, timeout?: number): void;
  /**
   * Only runs this test in the current file.
   */
  only: It<Ts>;
  /**
   * Skips running this test in the current file.
   */
  skip: It<Ts>;
  /**
   * Sketch out which tests to write in the future.
   */
  todo: It<Ts>;
  /**
   * Experimental and should be avoided.
   */
  concurrent: It<Ts>;
}

interface Given<Ts extends ReadonlyArray<any>> {
  it: It<Ts>;
}

class Foo<Ts extends ReadonlyArray<any>> implements Given<Ts> {
  constructor(...args : Ts) {
    this.it = new FooIt(args)
  }

  it: It<Ts>;
}

class FooIt<Ts extends ReadonlyArray<any>> implements It<Ts> {
  [x: string]: Arbitrary<any>[];

  constructor(arbs: Arbitrary<any>[]) {
    this.arbs = arbs;
    
  }

  it(name: string, fn: (...args: ExtractEachCallbackArgs<Ts>) => any, timeout?: number) : void {
    it(name, () => {
      return assert(property(...this.arbs, fn));
    }, timeout);
  }

  only: It<any>;
  skip: It<any>;
  todo: It<any>;
  concurrent: It<any>;


}

new Foo(1, 2, 3).it

interface Each {
  // Exclusively arrays.
  <T extends any[] | [any]>(cases: ReadonlyArray<T>): (
    name: string, 
    fn: (...args: T) => any, 
    timeout?: number
  ) => void;
  
  <T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): (
    name: string, 
    fn: (...args: ExtractEachCallbackArgs<T>) => any, 
    timeout?: number
  ) => void;

  // Not arrays.
  <T>(cases: ReadonlyArray<T>): (
    name: string, 
    fn: (...args: T[]) => any, 
    timeout?: number
  ) => void;
  
  (cases: ReadonlyArray<ReadonlyArray<any>>): (
      name: string,
      fn: (...args: any[]) => any,
      timeout?: number
  ) => void;

  (strings: TemplateStringsArray, ...placeholders: any[]): (
      name: string,
      fn: (arg: any) => any,
      timeout?: number
  ) => void;
}

 

type ExtractEachCallbackArgs<T extends ReadonlyArray<any>> = {
  1: [T[0]],
  2: [T[0], T[1]],
  3: [T[0], T[1], T[2]],
  4: [T[0], T[1], T[2], T[3]],
  5: [T[0], T[1], T[2], T[3], T[4]],
  6: [T[0], T[1], T[2], T[3], T[4], T[5]],
  7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6]],
  8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]],
  9: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]],
  10: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]],
  'fallback': Array<(T extends ReadonlyArray<infer U>? U: any)>
}[
  T extends Readonly<[any]> ? 1
      : T extends Readonly<[any, any]> ? 2
      : T extends Readonly<[any, any, any]> ? 3
      : T extends Readonly<[any, any, any, any]> ? 4
      : T extends Readonly<[any, any, any, any, any]> ? 5
      : T extends Readonly<[any, any, any, any, any, any]> ? 6
      : T extends Readonly<[any, any, any, any, any, any, any]> ? 7
      : T extends Readonly<[any, any, any, any, any, any, any, any]> ? 8
      : T extends Readonly<[any, any, any, any, any, any, any, any, any]> ? 9
      : T extends Readonly<[any, any, any, any, any, any, any, any, any, any]> ? 10
      : 'fallback'
];
