var ReshapeArray1DTo2D = function(array?: any, columns?: any) {
    return array.reduce(function(acc?: any, curr?: any, index?: any) {
        if (index % columns === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);
}

export default ReshapeArray1DTo2D;