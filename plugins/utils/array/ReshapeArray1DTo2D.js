var ReshapeArray1DTo2D = function (array, columns) {
    return array.reduce(function (acc, curr, index) {
        if (index % columns === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);
}

export default ReshapeArray1DTo2D;