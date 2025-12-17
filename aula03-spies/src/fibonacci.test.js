const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

// Fibonnaci: o proximo valor corresponde a soma dos dois anteriores
(async () => {

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        // generator retornam iterators, (.next() para acessar o proximo valor)
        // existem 3 formas de ler os dados
        // usando as funções .next(), spread operator [...] e for await...of
        for await (const i of fibonacci.execute(3)){};

        // nosso algoritmo vai começar do zero!
        const expectedCallCount = 4;

        deepStrictEqual(spy.callCount, expectedCallCount);
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        const [...results] = fibonacci.execute(5);
        // [0] input = 5, current = 0, next = 1
        // [1] input = 4, current = 1, next = 1
        // [2] input = 3, current = 1, next = 2
        // [3] input = 2, current = 2, next = 3
        // [4] input = 1, current = 3, next = 5
        // [5] input = 0, current = 5, next = 8 (condição de parada)

        const { args } = spy.getCall(0);
        console.log({ args });
        // const expectedResult = [0, 1, 1, 2, 3];
        // const expectedParams = Object.values({ input: 3, current: 1, next: 2 });

        // deepStrictEqual(args, expectedParams);
        // deepStrictEqual(results, expectedResult);
    }

})()

