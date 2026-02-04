/**
 * Fade out a sound volume.
 *
 * @param sound - Sound instance to fade out.
 * @param duration - Fade duration in milliseconds.
 * @param destroy - Set to true to destroy the sound after fade completes.
 * @returns Sound instance used by this fade operation.
 */
export default function FadeOut(
    sound: Phaser.Sound.BaseSound,
    duration: number,
    destroy?: boolean
): Phaser.Sound.BaseSound;

/**
 * Fade out a sound volume with a scene context.
 *
 * @param scene - Scene used for fade task ownership.
 * @param sound - Sound instance to fade out.
 * @param duration - Fade duration in milliseconds.
 * @param destroy - Set to true to destroy the sound after fade completes.
 * @returns Sound instance used by this fade operation.
 */
export default function FadeOut(
    scene: Phaser.Scene,
    sound: Phaser.Sound.BaseSound,
    duration: number,
    destroy?: boolean
): Phaser.Sound.BaseSound;
