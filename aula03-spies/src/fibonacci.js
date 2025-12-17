class Fibonacci {
    
    *execute(input, current = 0, next = 1) {
        console.count('executing!');

        if(input === 0) return 0;
        
        // yield é como retornar um valor, mas sem finalizar a função
        yield current;

        // yield com * delega a execução para outra funcao, mas não retorna o valor
        yield* this.execute(input -1, next, current + next);
    }

}

module.exports = Fibonacci;