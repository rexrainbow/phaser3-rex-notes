export const Union = function (a, b) {
    return new Set([...a, ...b]);
}

export const Intersection = function (a, b) {
    if (a.size > b.size) {
        [a, b] = [b, a];
    }
    return new Set([...a].filter(x => b.has(x)));
}

export const Difference = function (a, b) {
    return new Set([...a].filter(x => !b.has(x)));
}

export const SymmetricDifference = function (a, b) {
    const diffAB = Difference(a, b);
    const diffBA = Difference(b, a);
    return Union(diffAB, diffBA);
}

export const IsEqual = function (a, b) {
    if (a.size !== b.size) {
        return false;
    }
    for (const x of a) {
        if (!b.has(x)) {
            return false;
        }
    }
    return true;
}