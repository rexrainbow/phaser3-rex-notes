import Base from '../base/Base';
import { IConfig as IConfigBase } from '../base/Base';

type NameTypes = string | string[] | number;

export interface IConfig extends IConfigBase {
    create?: {
        arc?: NameTypes,
        circle?: NameTypes,
        ellipse?: NameTypes,
        line?: NameTypes,
        lines?: NameTypes,
        rectangle?: NameTypes,
        triangle?: NameTypes,
    } | ((this: Custom) => void);

    update?: (this: Custom) => void;

    type?: string,
}

export default class Custom extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    )
}