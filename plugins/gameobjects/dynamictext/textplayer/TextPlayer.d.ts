// import * as Phaser from 'phaser';
import DynamicText from "../dynamictext/DynamicText";
import Parser from '../../../bracketparser';

export default TextPlayer;

declare namespace TextPlayer {

    interface IConfigParser {
        delimiters?: string,
        comment?: string
    }

    interface IConfigTyping {
        speed?: number,
        onTypingStart?: (children: DynamicText.RenderChildTypes[]) => void,
        animation?: {
            duration?: number,
            yoyo?: boolean,
            onStart?: (child: DynamicText.RenderChildTypes) => void,
            onProgress: (child: DynamicText.RenderChildTypes, t: number) => void,
            onComplete: (child: DynamicText.RenderChildTypes) => void
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

    interface IConfig extends DynamicText.IConfig {
        parser?: IConfigParser,

        typing?: IConfigTyping,

        images?: IConfigImages,

        sounds?: IConfigSounds

        sprite?: IConfigSprite,

        nextPageInput?: NextPageInputTypes,

        clickTarget?: ClickTrgetTypes,

        text?: string
    }

    namespace Events {
        type TypingCompleteCallbackType = () => void;

        type TypingChildCallbackType = (
            child: DynamicText.RenderChildTypes
        ) => void

        type PageStartCallbackType = () => void;

        type PageCompleteCallbackType = () => void;

        type WaitClickCallbackType = () => void;

        type WaitKeyDownCallbackType = (keyName: string) => void;

        type WaitTimeCallbackType = (time: number) => void;

        type WaitMusicCompleteCallbackType = (
            music: Phaser.Sound.BaseSound
        ) => void;

        type WaitCameraEffectCompleteCallbackType = (effectName: string) => void;

        type WaitSpriteActionCompleteCallbackType = (name?: string, prop?: string) => void;

        type WaitCallbackType = (
            callback: () => void
        ) => void;

        type ParseCustomTagOnCallbackType = (parser: Parser, ...values: any) => void;
        type ExecuteCustomTagOnCallbackType = (...values: any) => void;
        type ParseCustomTagOffCallbackType = (parser: Parser) => void;
        type ExecuteCustomTagOffCallbackType = () => void;
    }
}

declare class TextPlayer extends DynamicText {
    constructor(
        scene: Phaser.Scene,
        config?: TextPlayer.IConfig
    );

    play(content: string): this;
    playPromise(content: string): Promise<any>;

    showPage(): this;
    typingNextPage(): this;

    pause(): this;
    pauseTyping(): this;
    resume(): this;

    setTypingSpeed(speed: number): this;
    typingSpeed: number;
    setTimeScale(timeScale: number): this;
    timeScale: number;

    readonly isPlaying: boolean;
    readonly isPageTYyping: boolean;

    addImage(config: TextPlayer.IConfigImages): this;

    ignoreNextPageInput(enable?: boolean): this;
    setClickTarget(clickTarget: TextPlayer.ClickTrgetTypes): this;
    readonly clickTarget: TextPlayer.ClickTrgetTypes;
}