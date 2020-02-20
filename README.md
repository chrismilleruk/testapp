
## Test App (working title)

### Kitmat-jest reporter issue

Given a simple generative test which fails:

```js
check('Always starts with a letter', 
  [string(), string()], 
  (generatedPrefix, generatedName) => {
  const module = new Greeting(generatedPrefix);
  const result = module.sayHello(generatedName);

  // Always starts with a letter
  expect(result[0]).toMatch(/[A-Za-z]/);
});
```

The reporter output doesn't provide
- the arguments which caused the failure.
- the seed used to create the arguments.

```
...
✕ Always starts with a letter (seed: undefined, source: undefined) (26ms)
✓ Has four basic formats (33ms)

● Greeting Class › Always starts with a letter (seed: undefined, source: undefined)

expect(received).toMatch(expected)

Expected pattern: /[A-Za-z]/
Received string:  " "

  37 |
  38 |     // Always starts with a letter
> 39 |     expect(result[0]).toMatch(/[A-Za-z]/);
      |                       ^
  40 |   });
...
```

![Jest screenshot demonstrating the issue](assets/Jest%20Screenshot.png)