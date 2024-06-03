import FullWindowRectangle from '../../../fullwindowrectangle';

export default Cover;

declare namespace Cover {
    interface IConfig {
        color?: number,
        alpha?: number,
    }
}

declare class Cover extends FullWindowRectangle {
    constructor(
        scene: Phaser.Scene,
        config?: Cover.IConfig
    );
}
