const Reducer = (seq, eigen) =>
    (...args) => seq.reverse().reduce(
        (res, f) => f(res), ({ [eigen]: [...args] })
    );
const makeGen = () => {
    const gen = { sequence: [] };
    gen.result = x => {
        const result = gen.sequence.reverse().reduce( (res, f) => f(res), x);
        gen.sequence = [];
        return  result;
    };
    gen.setIntersection = (x, y) => {
        const result = Reducer(gen.sequence, '$setIntersection')(x, y);
        gen.sequence = [];
        return  result;
    };
    gen.size = () => {
        gen.sequence.push( x => ({ $size: x }) );
        return gen
    };
    return gen
};

console.log(
    JSON.stringify(
        makeGen().size().setIntersection(['a', 'b', 'c'], ['a', 'd'])
    )
)
