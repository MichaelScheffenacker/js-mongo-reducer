const Struct = eigenVal => (...args) => ({ [eigenVal]: [...args] });
const Reducer = (seq, eigenVal) => seq.reverse().reduce(
    (res, f) => f(res),
    eigenVal
);
const gen = () => {
    const gen = { sequence: [] };
    gen.result = x => gen.sequence.reverse().reduce( (res, f) => f(res), x);
    gen.setIntersection = (x, y) => Reducer(
        gen.sequence,
        Struct('$setIntersection')(x, y)
    );
    gen.size = () => {
        gen.sequence.push( x => ({ $size: x }) );
        return gen;
    };
    return gen;
};

console.log(
    JSON.stringify(
        gen().size().setIntersection(['a', 'b', 'c'], ['a', 'd'])
    )
)
