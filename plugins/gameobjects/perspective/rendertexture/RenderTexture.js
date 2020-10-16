import Base from './Base.js';

class RenderTexture extends Base {
    fill(rgb, alpha, x, y, width, height) {
        this.rt.fill(rgb, alpha, x, y, width, height);
        return this;
    }

    clear() {
        this.rt.clear();
        return this;
    }

    erase(entries, x, y) {
        this.rt.erase(entries, x, y);
        return this;
    }

    draw(entries, x, y, alpha, tint) {
        this.rt.draw(entries, x, y, alpha, tint);
        return this;
    }

    drawFrame(key, frame, x, y, alpha, tint) {
        this.rt.drawFrame(key, frame, x, y, alpha, tint);
        return this;
    }
}

export default RenderTexture;