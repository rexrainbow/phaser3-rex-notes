// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import OpenCloseTransition from '../../../plugins/behaviors/openclosetransition/OpenCloseTransition';

export default Folder;

declare namespace Folder {
    /**
     * Transition configuration for expand and collapse actions.
     */
    interface ITransitionConfig {
        /**
         * Transition duration in milliseconds.
         */
        duration?: number,
        /**
         * Callback used for expand transition.
         */
        expandCallback?: OpenCloseTransition.TransitCallbackType,
        /**
         * Callback used for collapse transition.
         */
        collapseCallback?: OpenCloseTransition.TransitCallbackType,
    }

    /**
     * Alignment configuration of title and child sections.
     */
    interface IAlignConfig {
        /**
         * Title section alignment.
         */
        title?: Sizer.AlignTypes,
        /**
         * Child section alignment.
         */
        child?: Sizer.AlignTypes,
    }

    /**
     * Expand behavior configuration of title and child sections.
     */
    interface IExpandConfig {
        /**
         * Set to true to expand title section.
         */
        title?: boolean,
        /**
         * Set to true to expand child section.
         */
        child?: boolean,
    }

    /**
     * Spacing configuration of folder sections.
     */
    interface ISpaceConfig {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
        item?: number,

        titleLeft?: number,
        titleRight?: number,
        titleTop?: number,
        titleBottom?: number,
        childLeft?: number,
        childRight?: number,
        childTop?: number,
        childBottom?: number,
    }

    /**
     * Callback invoked during folder expand/collapse state changes.
     */
    type StateChangeCallbackType = (
        /**
         * Folder instance.
         */
        folder: Folder
    ) => void;

    /**
     * Configuration options for creating a folder component.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Title game object.
         */
        title: Phaser.GameObjects.GameObject,

        /**
         * Child game object shown in expanded state.
         */
        child: Phaser.GameObjects.GameObject,
        /**
         * Set to true if child uses custom origin handling.
         */
        customChildOrigin?: boolean,

        /**
         * Game object that receives toggle input events.
         */
        toggleByTarget?: Phaser.GameObjects.GameObject,
        toggleClickConfig?: {
            /**
             * Click trigger mode.
             */
            mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
            /**
             * Minimum interval between clicks in milliseconds.
             */
            clickInterval?: number,
            /**
             * Drag threshold before canceling click.
             */
            threshold?: number,
        },

        align?: IAlignConfig,

        expand?: IExpandConfig,

        space?: ISpaceConfig,

        transition?: ITransitionConfig,

        reLayoutTarget?: Phaser.GameObjects.GameObject,

        /**
         * Callback invoked when expand starts.
         */
        onExpandStart?: StateChangeCallbackType,
        /**
         * Callback invoked when expand completes.
         */
        onExpandComplete?: StateChangeCallbackType,
        /**
         * Callback invoked when collapse starts.
         */
        onCollapseStart?: StateChangeCallbackType,
        /**
         * Callback invoked when collapse completes.
         */
        onCollapseComplete?: StateChangeCallbackType,
    }
}

/**
 * Collapsible folder container with title and child sections.
 */
declare class Folder extends Sizer {
    /**
     * Create a folder component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional folder configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Folder.IConfig
    );

    /**
     * Set transition duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This folder instance.
     */
    setTransitionDuration(duration?: number): this;
    /**
     * Current transition duration in milliseconds.
     */
    transitionDuration: number;

    /**
     * Set callback used for expand transition.
     *
     * @param callback - Expand transition callback.
     * @returns This folder instance.
     */
    setExpandCallback(callback?: OpenCloseTransition.TransitCallbackType): this;
    /**
     * Set callback used for collapse transition.
     *
     * @param callback - Collapse transition callback.
     * @returns This folder instance.
     */
    setCollapseCallback(callback?: OpenCloseTransition.TransitCallbackType): this;

    /**
     * Expand child section.
     *
     * @param duration - Optional transition duration override.
     * @returns This folder instance.
     */
    expand(duration?: number): this;
    /**
     * Collapse child section.
     *
     * @param duration - Optional transition duration override.
     * @returns This folder instance.
     */
    collapse(duration?: number): this;
    /**
     * Toggle between expanded and collapsed states.
     *
     * @param duration - Optional transition duration override.
     * @returns This folder instance.
     */
    toggle(duration?: number): this;
    /**
     * True when folder is currently expanded.
     */
    readonly expanded: boolean;

    /**
     * Set expanded state directly.
     *
     * @param expanded - Target expanded state.
     * @returns This folder instance.
     */
    setExpandedState(expanded?: boolean): this;
}
