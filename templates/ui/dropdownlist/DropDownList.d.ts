import Label from '../label/Label';

export default DropDownList;

declare namespace DropDownList {
    interface IConfig {

    }
}

declare class DropDownList extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: DropDownList.IConfig
    );


}