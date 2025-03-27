var AddFilterListMethod = function (name, callback) {
    var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
    if (FilterListComponent[name]) {
        console.warn(`FilterList method: ${name} is already defined`);
        return;
    }

    FilterListComponent[name] = callback;
}

export default AddFilterListMethod;