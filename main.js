const Struct = eigenString => (...args) => ({ [eigenString]: [...args] });
const Reducer = (seq, eigenVal) =>
    seq.reverse().reduce((res, f) => f(res), eigenVal);
const StructReducer = (seq, eigenString) =>
    (...args) => Reducer(seq, Struct(eigenString)(...args));
const gen = () => {
    const gen = { sequence: [] };
    const seq = gen.sequence;
    gen.result = x => Reducer(seq, x);
    gen.setIntersection = StructReducer(seq,'$setIntersection');
    gen.size = () => {
        seq.push( x => ({ $size: x }) );
        return gen;
    };
    return gen;
};

console.log(
    JSON.stringify(
        gen().size().setIntersection(['a', 'b', 'c'], ['a', 'd'])
    )
)
