import FragSrc from './crt-frag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class CrtPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexCrtPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });
        
        this.warp = 0;
        this.scanStrength = 0.2;
        this.scanLineWidth=1024;
    }

    resetFromJSON(o) {
        this.setWarp(GetValue(o, 'warpX', 0.75), GetValue(o, 'warpY', 0.75));
        this.setScanStrength(GetValue(o, 'scanStrength', 0.75));
        this.setScanLineWidth(GetValue(o, 'scanLineWidth', 1024));
        return this;
    }

    onPreRender() {
        this.set2f('warp', this.warpX, this.warpY);
        this.set1f('scanStrength', this.scanStrength);
        this.set1f('scanLineWidth', this.scanLineWidth);
    }

    // warp
    setWarp(warpX, warpY) {
        this.warpX = warpX;
        this.warpY = warpY;
        return this;
    }

    // scanStrength
    setScanStrength(value) {
        this.scanStrength = value;
        return this;
    }
    
    // scanLineWidth
    setScanLineWidth(value) {
        this.scanLineWidth = value;
        return this;
    }
}

export default CrtPostFxPipeline;