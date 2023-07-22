var AreContinuous = function (arr, property, config) {
    if (typeof (config) === 'boolean') {
        config = {
            returnDetail: config
        }
    }

    var {
        wildcard = undefined,
        returnDetail = false
    } = config;

    if (arr.length === 0) {
        if (returnDetail) {
            return {
                property: property,
                result: false,
                catch: [],
            }
        } else {
            return false;
        }
    }

    var wildcardItems = (!!wildcard) ? arr.filter(function (item) {
        return item[property] === wildcard;
    }) : [];

    // items does not have any wildcard item now
    var items = arr.filter(function (item) {
        return item[property] !== wildcard;
    });

    items.sort(function (itemA, itemB) {
        var valueA = itemA[property];
        var valueB = itemB[property];

        if (valueA > valueB) {
            return 1;
        }
        if (valueA < valueB) {
            return -1;
        }
        return 0;
    });

    var resultArr = (returnDetail) ? [items[0]] : undefined;
    var targetValue = items[0][property] + 1;
    for (var i = 1, cnt = items.length; i < cnt; i++) {
        var item = items[i];
        var itemValue = item[property];

        if (itemValue === targetValue) {
            if (returnDetail) {
                resultArr.push(item);
            }
            targetValue++;
            continue;
        }

        // Not continuous
        if (wildcardItems.length > 0) {
            // Use one wildcard card
            if (returnDetail) {
                resultArr.push(wildcardItems.pop());
            }
            targetValue++;

            if (itemValue === targetValue) {
                if (returnDetail) {
                    resultArr.push(item);
                }
                targetValue++;
                continue;
            }
        }

        if (returnDetail) {
            return {
                property: property,
                result: false,
                catch: [item],
            }
        } else {
            return false;
        }
    }

    // Push remainder wildcardItems to
    if (returnDetail) {
        resultArr.push(...wildcardItems);
    }

    if (returnDetail) {
        return {
            property: property,
            result: true,
            resultArray: resultArr,
        }
    } else {
        return true;
    }
}

export default AreContinuous;