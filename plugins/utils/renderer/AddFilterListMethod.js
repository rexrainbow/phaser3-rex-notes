import { GameObjects as PhaserGameObjects } from 'phaser';
var AddFilterListMethod = function (name, callback) {
    var FilterListComponent = PhaserGameObjects.Components.FilterList.prototype;
    if (FilterListComponent[name]) {
        return;
    }

    FilterListComponent[name] = callback;
}

export default AddFilterListMethod;