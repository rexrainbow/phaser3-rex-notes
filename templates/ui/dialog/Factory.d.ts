import * as Phaser from 'phaser';
import Dialog from './Dialog';

declare type DialogFactory = (
    config?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,
            content?: number,
            contentLeft?: number,
            contentRight?: number,
            description?: number,
            descriptionLeft?: number,
            descriptionRight?: number,
            choices?: number,
            choicesLeft?: number,
            choicesRight?: number,
            actionsLeft?: number,
            actionsRight?: number,

            toolbarItem?: number,
            leftToolbarItem?: number,
            choice?: number,
            action?: number,
        };

        anchor?: {
            left?: string, right?: string, centerX?: string, x?: string,
            top?: string, bottom?: string, centerY?: string, y?: string
        },

        draggable?: boolean | string | Phaser.GameObjects.GameObject,

        name?: string,

        background?: Phaser.GameObjects.GameObject,

        title?: Phaser.GameObjects.GameObject,

        toolbar?: Phaser.GameObjects.GameObject[],

        toolbarBackground?: Phaser.GameObjects.GameObject,

        leftToolbar?: Phaser.GameObjects.GameObject[],

        leftToolbarBackground?: Phaser.GameObjects.GameObject,

        content?: Phaser.GameObjects.GameObject,

        description?: Phaser.GameObjects.GameObject,

        choices?: Phaser.GameObjects.GameObject[],

        choicesBackground?: Phaser.GameObjects.GameObject,

        actions?: Phaser.GameObjects.GameObject[],

        actionsBackground?: Phaser.GameObjects.GameObject,

        expand?: {
            title?: boolean,
            content?: boolean,
            description?: boolean,
            choices?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: number | 'left' | 'center' | 'right',
            content?: number | 'left' | 'center' | 'right',
            description?: number | 'left' | 'center' | 'right',
            choices?: number | 'left' | 'center' | 'right',
            actions?: number | 'left' | 'center' | 'right',
        },

        click?: {
            mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
            clickInterval?: number
        }
    }

) => Dialog;

export default DialogFactory;