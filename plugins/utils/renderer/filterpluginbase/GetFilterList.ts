var GetFilterList = function(gameObject?: any, external?: any) {
    if (external === undefined) {
        external = false;
    }

    if (!gameObject.filters) {
        gameObject.enableFilters().focusFilters();
    }

    var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

    return filterList;
}

export default GetFilterList;