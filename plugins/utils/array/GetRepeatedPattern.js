var GetRepeatedPattern = function (arr, property, config) {
    if (typeof (config) === 'boolean') {
        config = {
            returnDetail: config
        }
    }

    var {
        secondProperty,
        returnDetail = false
    } = config;

    var symbolCount = {};
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        var item = arr[i];
        var itemValue = item[property];
        if (!symbolCount.hasOwnProperty(itemValue)) {
            symbolCount[itemValue] = 1;
        } else {
            symbolCount[itemValue]++;
        }
    }

    var arrCopy = [...arr];
    arrCopy.sort(function (itemA, itemB) {
        var valueA = itemA[property];
        var valueB = itemB[property];
        var symbolCountValueA = symbolCount[valueA];
        var symbolCountValueB = symbolCount[valueB];

        if (symbolCountValueA > symbolCountValueB) {
            return -1;
        }
        if (symbolCountValueA < symbolCountValueB) {
            return 1;
        }

        // The same symbolCount
        if (valueA > valueB) {
            return -1;
        }
        if (valueA < valueB) {
            return 1;
        }

        // The same value
        if (secondProperty) {
            var valueA = itemA[secondProperty];
            var valueB = itemB[secondProperty];
            if (valueA > valueB) {
                return 1;
            }
            if (valueA < valueB) {
                return -1;
            }
        }

        return 0;
    });

    var prevPattern = 'A';
    var prevValue = arrCopy[0][property];
    var patterns = [prevPattern];
    for (var i = 1, cnt = arrCopy.length; i < cnt; i++) {
        var item = arrCopy[i];
        var itemValue = item[property];

        if (itemValue !== prevValue) {
            prevPattern = String.fromCharCode(prevPattern.charCodeAt(0) + 1);
            prevValue = itemValue;
        }

        patterns.push(prevPattern);
    }

    var pattern = patterns.join('');

    if (returnDetail) {
        return {
            property: property,
            pattern: pattern,
            resultArray: arrCopy
        }
    } else {
        return pattern;
    }
}

export default GetRepeatedPattern;