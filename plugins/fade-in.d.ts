import Fade from './behaviors/fade/Fade';

export default function FadeIn(
    gameObject: Phaser.GameObjects.GameObject,
    duration: number,
    alpha?: number |
    { start: number, end: number },
    fade?: Fade
): Fade;