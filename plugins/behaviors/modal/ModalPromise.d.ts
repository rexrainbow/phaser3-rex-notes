import ModalBehavior from './Modal';

/**
 * Create and open a modal.
 * @param gameObject - Target game object.
 * @param config - Modal configuration.
 * @returns Modal behavior instance.
 */
export function Modal(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ModalBehavior.IConfig
): ModalBehavior;

/**
 * Create and open a modal, returning a promise.
 * @param gameObject - Target game object.
 * @param config - Modal configuration.
 * @returns Promise resolved on close.
 */
export function ModalPromise(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ModalBehavior.IConfig
): Promise<any>;

/**
 * Request to close a modal.
 * @param gameObject - Target game object.
 * @param closeEventData - Event data for closing.
 */
export function ModalClose(
    gameObject: Phaser.GameObjects.GameObject,
    closeEventData?: unknown
): void;

export { ModalBehavior };
