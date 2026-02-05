// import * as Phaser from 'phaser';
import Button from '../../../../plugins/button';
import Tap from '../../../../plugins/input/gestures/tap/Tap';
import Press from '../../../../plugins/input/gestures/press/Press';
import Swipe from '../../../../plugins/input/gestures/swipe/Swipe';

export default SetChildrenInteractive;

declare namespace SetChildrenInteractive {
    /**
     * Configuration for enabling child interactivity on a parent game object.
     */
    interface IConfig {
        /** Child game objects that should receive interactive behavior. */
        targets?: Phaser.GameObjects.GameObject[],
        /** Strategy for resolving interaction targets. */
        targetMode?: 'parent' | 'direct',

        /** Set to true to enable drop zone behavior on targets. */
        dropZone?: boolean,

        /** Click behavior configuration, or true to use defaults. */
        click?: Button.IConfig | boolean,
        /** Pointer-over behavior configuration, or true to use defaults. */
        over?: {} | boolean,
        /** Tap gesture configuration, or true to use defaults. */
        tap?: Tap.IConfig | boolean,
        /** Press gesture configuration, or true to use defaults. */
        press?: Press.IConfig | boolean,
        /** Swipe gesture configuration, or true to use defaults. */
        swipe?: Swipe.IConfig | boolean,

        /** Prefix used when emitting input-related events. */
        inputEventPrefix?: string,
        /** Event emitter used to dispatch interaction events. */
        eventEmitter?: Phaser.Events.EventEmitter,
    }
}

/**
 * Enable interactive input handling on the children of a game object.
 *
 * @param gameObject - The parent game object that owns interactive children.
 * @param config - Optional configuration for target selection and gesture handlers.
 * @returns The same game object with child interactivity enabled.
 */
declare function SetChildrenInteractive(
    gameObject: Phaser.GameObjects.GameObject,
    config?: SetChildrenInteractive.IConfig
): Phaser.GameObjects.GameObject;
