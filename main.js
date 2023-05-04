const makeGen = () => {
    const gen = { sequence: [] };
    gen.result = x => {
        const result = gen.sequence.reverse().reduce( (res, f) => f(res), x);
        gen.sequence = [];
        return  result;
    };
    gen.setIntersection = (x, y) => {
        const result = gen.sequence.reverse().reduce( (res, f) => f(res), ({ $setIntersection: [x, y] }));
        gen.sequence = [];
        return  result;
    };
    gen.size = () => {
        gen.sequence.push( x => ({ $size: x }) );
        return gen
    };
    return gen
};

g = makeGen();

console.log(
    JSON.stringify(
        g.size().setIntersection(['a', 'b', 'c'], ['a', 'd'])
    )
)
