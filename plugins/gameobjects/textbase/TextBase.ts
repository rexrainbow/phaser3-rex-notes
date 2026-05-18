import Render from './render/Render';
import MeasureTextMargins from './textstyle/MeasureTextMargins';

import CheckP3Version from '../../utils/system/CheckP3Version';
import { Class as PhaserClass, GameObjects as PhaserGameObjects } from 'phaser';
CheckP3Version();

const GameObject = PhaserGameObjects.GameObject;

class TextBase extends GameObject {
    style: any;
    updateText: any;


    setStyle(style?: any) {
        return this.style.setStyle(style);
    }

    setFont(font?: any) {
        return this.style.setFont(font);
    }

    setFontFamily(family?: any) {
        return this.style.setFontFamily(family);
    }

    setFontSize(size?: any) {
        return this.style.setFontSize(size);
    }

    setFontStyle(style?: any) {
        return this.style.setFontStyle(style);
    }

    setTestString(string?: any) {
        return this.style.setTestString(string);
    }

    setFixedSize(width?: any, height?: any) {
        return this.style.setFixedSize(width, height);
    }

    setBackgroundColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
    }

    setBackgroundStrokeColor(color?: any, lineWidth?: any) {
        return this.style.setBackgroundStrokeColor(color, lineWidth);
    }

    setBackgroundCornerRadius(radius?: any, iteration?: any) {
        return this.style.setBackgroundCornerRadius(radius, iteration);
    }

    setFill(color?: any) {
        return this.style.setFill(color);
    }

    setColor(color?: any) {
        return this.style.setColor(color);
    }

    setStroke(color?: any, thickness?: any) {
        return this.style.setStroke(color, thickness);
    }

    setShadow(x?: any, y?: any, color?: any, blur?: any, shadowStroke?: any, shadowFill?: any) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
    }

    setShadowOffset(x?: any, y?: any) {
        return this.style.setShadowOffset(x, y);
    }

    setShadowColor(color?: any) {
        return this.style.setShadowColor(color);
    }

    setShadowBlur(blur?: any) {
        return this.style.setShadowBlur(blur);
    }

    setShadowStroke(enabled?: any) {
        return this.style.setShadowStroke(enabled);
    }

    setShadowFill(enabled?: any) {
        return this.style.setShadowFill(enabled);
    }

    setUnderline(color?: any, thickness?: any, offset?: any) {
        return this.style.setUnderline(color, thickness, offset);
    }

    setUnderlineColor(color?: any) {
        return this.style.setUnderlineColor(color);
    }

    setUnderlineThickness(thickness?: any) {
        return this.style.setUnderlineThickness(thickness);
    }

    setUnderlineOffset(offset?: any) {
        return this.style.setUnderlineOffset(offset);
    }

    setStrikethrough(color?: any, thickness?: any, offset?: any) {
        return this.style.setStrikethrough(color, thickness, offset);
    }

    setStrikethroughColor(color?: any) {
        return this.style.setStrikethroughColor(color);
    }

    setStrikethroughThickness(thickness?: any) {
        return this.style.setStrikethroughThickness(thickness);
    }

    setStrikethroughOffset(offset?: any) {
        return this.style.setStrikethroughOffset(offset);
    }

    setWrapMode(mode?: any) {
        return this.style.setWrapMode(mode);
    }

    setWrapWidth(width?: any) {
        return this.style.setWrapWidth(width);
    }

    // Align with built-in text game object
    setWordWrapWidth(width?: any) {
        return this.style.setWrapWidth(width);
    }

    setAlign(align?: any) {
        return this.style.setHAlign(align);
    }
    setHAlign(align?: any) {
        return this.style.setHAlign(align);
    }
    setVAlign(align?: any) {
        return this.style.setVAlign(align);
    }

    get lineSpacing() {
        return this.style.lineSpacing;
    }

    set lineSpacing(value) {
        this.style.lineSpacing = value;
    }

    setLineSpacing(value?: any) {
        this.style.lineSpacing = value;
        this.updateText(true);
        return this;
    }

    get letterSpacing() {
        return this.style.letterSpacing;
    }

    set letterSpacing(value) {
        this.style.letterSpacing = value;
    }

    setLetterSpacing(value?: any) {
        this.style.letterSpacing = value;
        this.updateText(true);
        return this;
    }

    setXOffset(value?: any) {
        return this.style.setXOffset(value);
    }

    setMaxLines(max?: any) {
        return this.style.setMaxLines(max);
    }

    setResolution(value?: any) {
        return this.style.setResolution(value);
    }

    getTextMetrics() {
        return this.style.getTextMetrics();
    }

    setTextMetrics(metrics?: any, font?: any) {
        return this.style.setTextMetrics(metrics, font);
    }

    measureTextMargins(testString?: any, out?: any) {
        return MeasureTextMargins(this.style, testString, out);
    }

}

const Components = PhaserGameObjects.Components;
PhaserClass.mixin(TextBase,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Lighting,
        Components.Mask,
        Components.Origin,
        Components.RenderNodes,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render
    ]
);
export default TextBase;