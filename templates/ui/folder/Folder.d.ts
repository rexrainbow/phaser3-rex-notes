// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import OpenCloseTransition from '../../../plugins/behaviors/openclosetransition/OpenCloseTransition';

export default Folder;

declare namespace Folder {
    interface ITransitionConfig {
        duration?: number,
        expandCallback?: OpenCloseTransition.TransitCallbackType,
        collapseCallback?: OpenCloseTransition.TransitCallbackType,
    }

    interface IAlignConfig {
        title?: Sizer.AlignTypes,
        child?: Sizer.AlignTypes,
    }

    interface IExpandConfig {
        title?: boolean,
        child?: boolean,
    }

    interface ISpaceConfig {
        left?: number, right?: number, top?: number, bottom?: number,
        item?: number,

        titleLeft?: number, titleRight?: number, titleTop?: number, titleBottom?: number,
        childLeft?: number, childRight?: number, childTop?: number, childBottom?: number,
    }

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        title: Phaser.GameObjects.GameObject,

        child: Phaser.GameObjects.GameObject,
        customChildOrigin?: boolean,

        toggleByTarget?: Phaser.GameObjects.GameObject,
        toggleClickConfig?: {
            mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
            clickInterval?: number,
            threshold?: number,
        },

        align?: IAlignConfig,

        expand?: IExpandConfig,

        space?: ISpaceConfig,

        transition?: ITransitionConfig,

        reLayoutTarget?: Phaser.GameObjects.GameObject,

        onExpandStart?: (folder: this) => void,
        onExpandComplete?: (folder: this) => void,
        onCollapseStart?: (folder: this) => void,
        onCollapseComplete?: (folder: this) => void,
    }
}

declare class Folder extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Folder.IConfig
    );

    setTransitionDuration(duration?: number): this;
    transitionDuration: number;

    setExpandCallback(callback?: OpenCloseTransition.TransitCallbackType): this;
    setCollapseCallback(callback?: OpenCloseTransition.TransitCallbackType): this;

    expand(duration?: number): this;
    collapse(duration?: number): this;
    toggle(duration?: number): this;
    readonly expanded: boolean;

    setExpandedState(expanded?: boolean): this;
}