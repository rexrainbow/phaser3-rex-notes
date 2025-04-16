import CircleController from '../circle/CircleController';

declare module 'phaser' {
    namespace GameObjects.Components {
        interface FilterList {
            addP3Circle: (thickness?: number, color?: number, backgroundColor?: number, scale?: number, feather?: number) => CircleController,
        }
    }
}

declare function InstallCircleFX(scene: Phaser.Scene | Phaser.Game): boolean;

export default InstallCircleFX;

export { CircleController };