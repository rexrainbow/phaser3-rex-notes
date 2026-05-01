import { Utils as PhaserUtils } from 'phaser';
const GetAll = PhaserUtils.Array.GetAll;

var GetActiveChildren = function () {
    return GetAll(this.children, 'active', true);
}

export default GetActiveChildren;