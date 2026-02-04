/**
 * Play or reuse a sound, then fade its volume in.
 *
 * @param sound - Sound key or sound instance to fade in.
 * @param duration - Fade duration in milliseconds.
 * @param endVolume - Target volume at fade end.
 * @param startVolume - Starting volume at fade start.
 * @returns Sound instance used by this fade operation.
 */
export default function FadeIn(
    sound: string | Phaser.Sound.BaseSound,
    duration: number,
    endVolume?: number,
    startVolume?: number
): Phaser.Sound.BaseSound;

/**
 * Play or reuse a sound from a scene, then fade its volume in.
 *
 * @param scene - Scene used to resolve and create sounds.
 * @param sound - Sound key or sound instance to fade in.
 * @param duration - Fade duration in milliseconds.
 * @param endVolume - Target volume at fade end.
 * @param startVolume - Starting volume at fade start.
 * @returns Sound instance used by this fade operation.
 */
export default function FadeIn(
    scene: Phaser.Scene,
    sound: string | Phaser.Sound.BaseSound,
    duration: number,
    endVolume?: number,
    startVolume?: number
): Phaser.Sound.BaseSound;
