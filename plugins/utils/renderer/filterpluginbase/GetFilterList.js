var GetControllerManager = function (gameObject, external) {
    if (external === undefined) {
        external = false;
    }

    // TODO
    var box = gameObject.scene.add.renderFilters(gameObject);
    var filterList = (!external) ? box.filters.internal : box.filters.external;

    return filterList;
}

export default GetControllerManager;