export default ParticlesAlongBounds;

declare namespace ParticlesAlongBounds {

    /**
     * ParticlesAlongBounds configuration.
     */
    interface IConfig {
        /**
         * Texture key.
         */
        textureKey: string,
        /**
         * Texture frames or frame config.
         */
        textureFrames?: string |
        number |
        (string | number)[] |
        {
            /**
             * Frame list.
             */
            frames: (string | number)[],
            /**
             * True to cycle frames.
             */
            cycle?: boolean,
            /**
             * Quantity per emit.
             */
            quantity?: number
        },
        /**
         * Padding values.
         */
        padding?: number | { left?: number, right?: number, top?: number, bottom?: number },

        /**
         * Blend mode.
         */
        blendMode?: Phaser.BlendModes | string,
        /**
         * Particle lifespan in ms.
         */
        lifespan?: number,
        /**
         * Step rate.
         */
        stepRate?: number,
        /**
         * Spread value.
         */
        spread?: number,

        /**
         * Scale config.
         */
        scale?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        /**
         * Alpha config.
         */
        alpha?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        /**
         * Tint value.
         */
        tint?: number,

        /**
         * Repeat count.
         */
        repeat?: number,
        /**
         * Gravity x.
         */
        gravityX?: number,
        /**
         * Gravity y.
         */
        gravityY?: number,
        /**
         * Duration in ms.
         */
        duration?: number
    }
}

/**
 * Create particle emitter along a game object's bounds.
 * @param gameObject - Target game object.
 * @param config - ParticlesAlongBounds configuration.
 * @returns Particle emitter.
 */
declare function ParticlesAlongBounds(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ParticlesAlongBounds.IConfig,
): Phaser.GameObjects.Particles.ParticleEmitter;
