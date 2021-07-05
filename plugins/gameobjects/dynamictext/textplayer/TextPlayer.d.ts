// import * as Phaser from 'phaser';
import DynamicText from "../dynamictext/DynamicText";
import {
    IConfig as IConfigBase,
    RenderChildTypes as ChildTypes
} from '../dynamictext/DynamicText';

interface IConfigParser {
    delimiters?: string,
    comment?: string
}

interface IConfigTyping {
    speed?: number,
    onTypingStart?: (children: ChildTypes[]) => void,
    animation?: {
        duration?: number,
        yoyo?: boolean,
        onStart?: (child: ChildTypes) => void,
        onProgress: (child: ChildTypes, t: number) => void,
        onComplete: (child: ChildTypes) => void
    }
}

interface IConfigImages {
    [name: string]: {
        width?: number,
        height?: number,
        key?: string,
        frame?: string
    }
}

interface IConfigSounds {
    bgm?: {
        initial?: string,
        loop?: boolean,
        fade?: number
    }
}

interface IConfigSprite {
    fade?: number
}

type NextPageInputTypes = string | ((callback: Function) => void) | null;

type ClickTrgetTypes = Phaser.GameObjects.GameObject | Phaser.Scene;

export interface IConfig extends IConfigBase {
    parser?: IConfigParser,

    typing?: IConfigTyping,

    images?: IConfigImages,

    sounds?: IConfigSounds

    sprite?: IConfigSprite,

    nextPageInput?: NextPageInputTypes,

    clickTarget?: ClickTrgetTypes,

    text?: string
}

export default class TextPlayer extends DynamicText {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    play(content: string): this;
    playPromise(content: string): Promise<any>;

    showPage(): this;
    typingNextPage(): this;

    readonly isPlaying: boolean;
    readonly isPageTYyping: boolean;

    addImage(config: IConfigImages): this;
}