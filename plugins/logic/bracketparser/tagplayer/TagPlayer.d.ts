export default TagPlayer;

declare namespace TagPlayer {
    interface IConfigParser {
        delimiters?: string,
        comment?: string
    }

    interface IConfigSounds {
        bgm?: {
            initial?: string,
            loop?: boolean,
            fade?: number
        }
    }

    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject

    interface IGameObjectConfig {
        createGameObject: CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface ISpriteGameObjectConfig {
        createGameObject?: 'sprite' | 'image' | CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface ITextGameObjectConfig {
        createGameObject?: CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    type NextPageInputTypes = string | ((callback: Function) => void) | null;

    type ClickTrgetTypes = Phaser.GameObjects.GameObject | Phaser.Scene;

    interface IConfig {
        parser?: IConfigParser,

        sounds?: IConfigSounds

        sprites?: ISpriteGameObjectConfig | false,

        texts?: ITextGameObjectConfig | false,

        nextPageInput?: NextPageInputTypes,

        clickTarget?: ClickTrgetTypes,
    }
}

declare class TagPlayer extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: TagPlayer.IConfig
    );

    addGameObjectManager(config: TagPlayer.IGameObjectConfig): this;

    play(commands: string): this;
    pause(): this;
    pauseUntilEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;
    resume(): this;
    isPlaying: boolean;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setClickTarget(clickTarget: TagPlayer.ClickTrgetTypes): this;
    readonly clickTarget: TagPlayer.ClickTrgetTypes;

    getGameObject(
        goType: string,
        name: string
    ): Phaser.GameObjects.GameObject;
    getGameObject(
        goType: string,
    ): { [name: string]: Phaser.GameObjects.GameObject }
    addGameObject(
        goType: string,
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    setDataEnabled(): this;
    setData(key: string | object, data?: any): this;
    incData(key: string | object, data?: any): this;
    toggleData(key: string | object): this;
    getData(key: string | string[]): any;

}