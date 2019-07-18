import GridTable from './GridTable.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config) {
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var gameObject = new GridTable(this.scene, 0, 0, width, height, config);

    // set properties wo modify children
    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config);
    // sync properties of children
    gameObject.syncChildrenEnable = true;
    gameObject.syncPosition().syncVisible().syncAlpha();

    return gameObject;
}