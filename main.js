const SingleStruct = eigenString => x => ({ [eigenString]: x });
const MultiStruct = eigenString => (...args) => ({ [eigenString]: [...args] });
const Reducer = (seq, eigenVal) =>
    seq.reverse().reduce((res, f) => f(res), eigenVal);
const StructReducer = (seq, eigenString) =>
    (...args) => Reducer(seq, MultiStruct(eigenString)(...args));
const Pusher = (gen, seq, eigenString) =>
    () => {
        seq.push(x => SingleStruct(eigenString)(x));
        return gen;
    }
const gen = () => {
    const gen = { sequence: [] };
    const seq = gen.sequence;

    gen.result = x => Reducer(seq, x);
    gen.$concat = StructReducer(seq, '$concat');
    gen.$setIntersection = StructReducer(seq,'$setIntersection');

    gen.$addFields = Pusher(gen, seq, '$addFields');
    gen.score = Pusher(gen, seq, 'score');
    gen.$size = Pusher(gen, seq, '$size');
    gen.$toString = Pusher(gen, seq, '$toString');

    return gen;
};

console.log(
    JSON.stringify(
        gen().$addFields().score().$concat(
            gen().$toString().$size().$setIntersection(['a', 'b', 'c'], ['a', 'd']),
            gen().$toString().result('$createdAt')
        )
    )
)
