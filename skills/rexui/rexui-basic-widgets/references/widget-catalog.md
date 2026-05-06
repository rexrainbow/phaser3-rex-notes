# RexUI Basic Widget Catalog

Use this catalog to select a basic widget. Use component `.d.ts` files for exact config.

## Labels

| Need | Factory | Source | Notes |
|---|---|---|---|
| Compound visual unit | `label` | `templates/ui/label/Label.d.ts` | Background + icon + text + action. Default button visual. |
| Label with creators | `simpleLabel` | `templates/ui/simplelabel` | Useful when using creator callbacks. |
| Title/content composition | `titleLabel` | `templates/ui/titlelabel` | For cards and panel headers. |
| Simple title/content composition | `simpleTitleLabel` | `templates/ui/simpletitlelabel` | Creator-driven title label. |
| Name/value row | `nameValueLabel` | `templates/ui/namevaluelabel` | Settings/status rows. |
| Label with badge | `badgeLabel` | `templates/ui/badgelabel` | Notification count or status marker. |

Important `label` config:

- `background`: Phaser/RexUI game object.
- `icon`: optional game object.
- `text`: optional game object.
- `action`: optional game object.
- `align`: `'left'`, `'top'`, `'right'`, `'bottom'`, `'center'`.
- `space.left/right/top/bottom`: outer padding.
- `space.icon`: space between icon and text/action.
- `space.text`: space between text and action.
- `iconSize`, `iconWidth`, `iconHeight`, `squareFitIcon`, `iconMask`.
- `wrapText`, `adjustTextFontSize`, `expandTextWidth`, `expandTextHeight`.

## Buttons

| Need | Factory | Source | Notes |
|---|---|---|---|
| Linear button group | `buttons` | `templates/ui/buttons/Buttons.d.ts` | Extends `Sizer`. |
| Grid button group | `gridButtons` | `templates/ui/gridbuttons/GridButtons.d.ts` | Extends `GridSizer`. |
| Wrapping button group | `fixWidthButtons` | `templates/ui/fixwidthbuttons` | Use for variable-width options/chips. |

Important button-group config:

- `buttons`: array of button game objects, or 2D array for `gridButtons`.
- `orientation`: for `buttons`.
- `background`: optional background game object.
- `space.item`, `space.column`, `space.row`: spacing.
- `expand`: expand buttons in layout.
- `align`: align buttons.
- `click`: click behavior config.
- `groupName`: logical group name for emitted events.
- `buttonsType` or `type`: `'checkboxes'` or `'radio'`.
- `setValueCallback(button, value, previousValue)`: update selected visuals.

## Tabs

| Need | Factory | Source | Notes |
|---|---|---|---|
| Buttons around a central panel | `tabs` | `templates/ui/tabs/Tabs.d.ts` | Supports left/right/top/bottom button groups. |

Important config:

- `panel`: central game object.
- `leftButtons`, `rightButtons`, `topButtons`, `bottomButtons`.
- `leftButtonsBackground`, `rightButtonsBackground`, etc.
- `space.leftButton`, `space.topButton`, etc.
- `space.leftButtonsOffset`, `space.topButtonsOffset`, etc.
- `expand.panel`, `expand.leftButtons`, etc.
- `align.leftButtons`, `align.topButtons`, etc.
- `click`: click behavior config.

## Value Controls

| Need | Factory | Source | Notes |
|---|---|---|---|
| Linear value input | `slider` | `templates/ui/slider/Slider.d.ts` | Horizontal or vertical. |
| Circular value input | `knob` | `templates/ui/knob/Knob.d.ts` | Extends `OverlapSizer`. |
| Icon + slider + text | `numberBar` | `templates/ui/numberbar/NumberBar.d.ts` | Composite value row. |

Common value-control fields:

- `value`: normalized value.
- `min`, `max`: optional mapping for slider.
- `input`: `'drag'`, `'pan'`, `'click'`, `'none'`.
- `easeValue`: `{ duration, ease }`.
- `valuechangeCallback(newValue, oldValue, control)`.
- `enable`: input enabled flag.

Slider-specific fields:

- `orientation`: `'x'` or `'y'`.
- `reverseAxis`.
- `background`, `track`, `indicator`, `thumb`.
- `thumbOffsetX`, `thumbOffsetY`.
- `gap`, `tick`.

Knob-specific fields:

- `barColor`, `trackColor`, `centerColor`.
- `thickness`, `startAngle`, `anticlockwise`.
- `text`, `textFormatCallback`.
- `gap`.

NumberBar-specific fields:

- `background`, `icon`, `text`.
- `slider.background`, `slider.track`, `slider.indicator`, `slider.thumb`.
- `space.icon`, `space.slider`.

## Binary Controls

| Need | Factory | Source | Notes |
|---|---|---|---|
| Checkbox shape/control | `checkbox` | `templates/ui/checkbox/Checkbox.d.ts` | Thin wrapper over `plugins/checkbox`. |
| Toggle switch shape/control | `toggleSwitch` | `templates/ui/toggleswitch/ToggleSwitch.d.ts` | Thin wrapper over `plugins/toggleswitch`. |
| Multi-checkbox group | `buttons` | `templates/ui/buttons/Buttons.d.ts` | Use `buttonsType: 'checkboxes'`. |
| Single radio group | `buttons` | `templates/ui/buttons/Buttons.d.ts` | Use `buttonsType: 'radio'`. |

## Other Basic Controls

| Need | Factory | Source | Notes |
|---|---|---|---|
| Fullscreen action | `fullscreenButton` | `templates/ui/fullscreenbutton` | Fullscreen button behavior. |
| Property editor panel | `tweaker` | `templates/ui/tweaker` | Larger settings UI; may deserve its own skill later. |
