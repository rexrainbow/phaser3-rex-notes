import { GameObjects as PhaserGameObjects } from 'phaser';
var AddFilterListMethod = function(name?: any, callback?: any) {
    var FilterListComponent = PhaserGameObjects.Components.FilterList.prototype;
    if (FilterListComponent[name]) {
        return;
    }

    FilterListComponent[name] = callback;
}

export default AddFilterListMethod;