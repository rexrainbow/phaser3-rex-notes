var AddFilterListMethod = function (name, callback) {
    var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
    if (FilterListComponent[name]) {
        return;
    }

    FilterListComponent[name] = callback;
}

export default AddFilterListMethod;