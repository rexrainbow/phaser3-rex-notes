var AreContinuous = function(arr?: any, property?: any, config?: any) {
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
        if (returnDetail?: any) {
            return {
                property: property,
                result: false,
                catch: [],
            }
        } else {
            return false;
        }
    }

    var wildcardItems = (!!wildcard) ? arr.filter(function(item?: any) {
        return item[property] === wildcard;
    }) : [];

    // items does not have any wildcard item now
    var items = arr.filter(function(item?: any) {
        return item[property] !== wildcard;
    });

    items.sort(function(itemA?: any, itemB?: any) {
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
            if (returnDetail?: any) {
                resultArr.push(item);
            }
            targetValue++;
            continue;
        }

        // Not continuous
        if (wildcardItems.length > 0) {
            // Use one wildcard card
            if (returnDetail?: any) {
                resultArr.push(wildcardItems.pop());
            }
            targetValue++;

            if (itemValue === targetValue) {
                if (returnDetail?: any) {
                    resultArr.push(item);
                }
                targetValue++;
                continue;
            }
        }

        if (returnDetail?: any) {
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
    if (returnDetail?: any) {
        resultArr.push(...wildcardItems);
    }

    if (returnDetail?: any) {
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