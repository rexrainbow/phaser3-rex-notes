import Image from '../image/Image';

export default Sprite;

declare namespace Sprite {
}

declare class Sprite extends Image {
    anims: Phaser.Animations.AnimationState;
    play(key: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig, ignoreIfPlaying?: boolean): this;
    playReverse(key: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig, ignoreIfPlaying?: boolean): this;
    playAfterDelay(key: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig, delay: number): this;
    playAfterRepeat(key: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig, repeatCount?: number): this;
    chain(key?: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig | string[] | Phaser.Animations.Animation[] | Phaser.Types.Animations.PlayAnimationConfig[]): this;
    stop(): this;
    stopAfterDelay(delay: number): this;
    stopAfterRepeat(repeatCount?: number): this;
    stopOnFrame(frame: Phaser.Animations.AnimationFrame): this;

}