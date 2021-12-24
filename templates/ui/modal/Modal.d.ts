import { ModalBehavoir, Modal, ModalPromise } from '../../../plugins/modal';

declare function ModalClose(
    gameObject: Phaser.GameObjects.GameObject,
    closeEventData?: unknown
): void;

export { ModalBehavoir, Modal, ModalPromise, ModalClose };