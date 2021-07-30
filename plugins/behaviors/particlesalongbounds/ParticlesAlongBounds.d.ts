export default ParticlesAlongBounds;

declare namespace ParticlesAlongBounds {

    interface IConfig {
        textureKey: string,
        textureFrames?: string |
        number |
        (string | number)[] |
        {
            frames: (string | number)[],
            cycle?: boolean,
            quantity?: number
        },
        padding?: number | { left?: number, right?: number, top?: number, bottom?: number },

        blendMode?: Phaser.BlendModes | string,
        lifespan?: number,
        stepRate?: number,
        spread?: number,

        scale?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        alpha?: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType | Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType
        tint?: number,

        repeat?: number,
        reuse?: boolean,
        gravityX?: number,
        gravityY?: number,
        duration?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            particles: Phaser.GameObjects.Particles.ParticleEmitterManager,           
        ) => void;
    }
}

declare function ParticlesAlongBounds(
    gameObject: Phaser.GameObjects.GameObject,
    config?: ParticlesAlongBounds.IConfig,
    particles?: Phaser.GameObjects.Particles.ParticleEmitterManager
): Phaser.GameObjects.Particles.ParticleEmitterManager;