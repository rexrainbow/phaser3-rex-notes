var GetFilterList = function (gameObject, external) {
    if (external === undefined) {
        external = false;
    }

    gameObject.enableFilters(); // Do nothing if filters feature is enabled.

    var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

    return filterList;
}

export default GetFilterList;