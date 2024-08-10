import Render from './render/Render.js';
import MeasureTextMargins from './textstyle/MeasureTextMargins.js';

import CheckP3Version from '../../utils/system/CheckP3Version.js';
CheckP3Version();

const GameObject = Phaser.GameObjects.GameObject;

class TextBase extends GameObject {

    setStyle(style) {
        return this.style.setStyle(style);
    }

    setFont(font) {
        return this.style.setFont(font);
    }

    setFontFamily(family) {
        return this.style.setFontFamily(family);
    }

    setFontSize(size) {
        return this.style.setFontSize(size);
    }

    setFontStyle(style) {
        return this.style.setFontStyle(style);
    }

    setTestString(string) {
        return this.style.setTestString(string);
    }

    setFixedSize(width, height) {
        return this.style.setFixedSize(width, height);
    }

    setBackgroundColor(color, color2, isHorizontalGradient) {
        return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
    }

    setBackgroundStrokeColor(color, lineWidth) {
        return this.style.setBackgroundStrokeColor(color, lineWidth);
    }

    setBackgroundCornerRadius(radius, iteration) {
        return this.style.setBackgroundCornerRadius(radius, iteration);
    }

    setFill(color) {
        return this.style.setFill(color);
    }

    setColor(color) {
        return this.style.setColor(color);
    }

    setStroke(color, thickness) {
        return this.style.setStroke(color, thickness);
    }

    setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
    }

    setShadowOffset(x, y) {
        return this.style.setShadowOffset(x, y);
    }

    setShadowColor(color) {
        return this.style.setShadowColor(color);
    }

    setShadowBlur(blur) {
        return this.style.setShadowBlur(blur);
    }

    setShadowStroke(enabled) {
        return this.style.setShadowStroke(enabled);
    }

    setShadowFill(enabled) {
        return this.style.setShadowFill(enabled);
    }

    setUnderline(color, thickness, offset) {
        return this.style.setUnderline(color, thickness, offset);
    }

    setUnderlineColor(color) {
        return this.style.setUnderlineColor(color);
    }

    setUnderlineThickness(thickness) {
        return this.style.setUnderlineThickness(thickness);
    }

    setUnderlineOffset(offset) {
        return this.style.setUnderlineOffset(offset);
    }

    setStrikethrough(color, thickness, offset) {
        return this.style.setStrikethrough(color, thickness, offset);
    }

    setStrikethroughColor(color) {
        return this.style.setStrikethroughColor(color);
    }

    setStrikethroughThickness(thickness) {
        return this.style.setStrikethroughThickness(thickness);
    }

    setStrikethroughOffset(offset) {
        return this.style.setStrikethroughOffset(offset);
    }

    setWrapMode(mode) {
        return this.style.setWrapMode(mode);
    }

    setWrapWidth(width) {
        return this.style.setWrapWidth(width);
    }

    // Align with built-in text game object
    setWordWrapWidth(width) {
        return this.style.setWrapWidth(width);
    }

    setAlign(align) {
        return this.style.setHAlign(align);
    }
    setHAlign(align) {
        return this.style.setHAlign(align);
    }
    setVAlign(align) {
        return this.style.setVAlign(align);
    }

    get lineSpacing() {
        return this.style.lineSpacing;
    }

    set lineSpacing(value) {
        this.style.lineSpacing = value;
    }

    setLineSpacing(value) {
        this.style.lineSpacing = value;
        this.updateText(true);
        return this;
    }

    setXOffset(value) {
        return this.style.setXOffset(value);
    }

    setMaxLines(max) {
        return this.style.setMaxLines(max);
    }

    setResolution(value) {
        return this.style.setResolution(value);
    }

    getTextMetrics() {
        return this.style.getTextMetrics();
    }

    setTextMetrics(metrics, font) {
        return this.style.setTextMetrics(metrics, font);
    }

    measureTextMargins(testString, out) {
        return MeasureTextMargins(this.style, testString, out);
    }

}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(TextBase,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.PostPipeline,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render
    ]
);
export default TextBase;