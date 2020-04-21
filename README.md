# Notes of Phaser3 engine

## Links

- [Phaser3](https://github.com/photonstorm/phaser)
    - [Discord channel](https://discord.gg/phaser)
    - [Forum](https://phaser.discourse.group/)
- [API](https://photonstorm.github.io/phaser3-docs/index.html)
- [Notes](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html)
    - [rexUI](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/)
    - [Discord channel](https://discord.gg/kWkuFZK)

## Demo

### Prepare

1. Install [node.js](https://nodejs.org/en/) (ver 10+, for rollup)
2. Click `install.bat`
    - `npm install`

### Run examples

1. Click `*.bat` in folder `examples`, it will open application on browser

### Export minify file of plugins

1. Click `export-plugins.bat`
    - `npm run build`

## File structure

- Folder `dist` : Plugin minify files
- Folder `plugins`, `templates` : Source code of plugins and templates
- Folder `examples` : Test code of plugins
- Folder `docs` : Some notes of phaser3, and my plugins.
    - `site\index.html` : Entry point.

## Showcase

- Webgl shader effect
    - [Swirl](https://codepen.io/rexrainbow/full/RBXQBo)
    - [Pixelation](https://codepen.io/rexrainbow/full/MqgmgE)
    - [Toonify](https://codepen.io/rexrainbow/full/ErWNXa)
- [Virtual joystick](https://codepen.io/rexrainbow/full/oyqvQY)
- Path finder
    - [Find area, get path](https://codepen.io/rexrainbow/full/qvJwjJ)
    - [Move from high to low](https://codepen.io/rexrainbow/full/NJOmQg)
    - [Energy drain](https://codepen.io/rexrainbow/pen/vMjNNm)
- [Bejeweled](https://codepen.io/rexrainbow/full/wEVYoY)
- [Kaleidoscope](https://codepen.io/rexrainbow/full/RdzvVj)
- UI
    - [Dialog](https://codepen.io/rexrainbow/pen/oQjMWE)
        - [Yes/No](https://codepen.io/rexrainbow/pen/MPZWZG)
        - [Choice](https://codepen.io/rexrainbow/pen/ePoRVz)
        - [Pop-up](https://codepen.io/rexrainbow/pen/NEpjmP)
    - [Edit](https://codepen.io/rexrainbow/pen/YbvwBw)
    - [Menu](https://codepen.io/rexrainbow/pen/PxOEBr)
    - [Text-box](https://codepen.io/rexrainbow/pen/MzGoJv)
    - [Text-area](https://codepen.io/rexrainbow/pen/JzBZzy)
    - [Number bar](https://codepen.io/rexrainbow/pen/qLZPXr)
    - [Grid table](https://codepen.io/rexrainbow/pen/XyJbWX)
    - [Tabs](https://codepen.io/rexrainbow/pen/qJeVza)
        - [Tabs-tables](https://codepen.io/rexrainbow/pen/BGKvXK)
    - [Scroll-able panel](https://codepen.io/rexrainbow/pen/YMyBom)
    - [Pages](https://codepen.io/rexrainbow/pen/vPWzBa)
    - [Fix-width sizer](https://codepen.io/rexrainbow/pen/WPJPdK)
    - [Chart](https://codepen.io/rexrainbow/pen/qwVBNy)
    - [Video](https://codepen.io/rexrainbow/pen/Gazmyz)
    - [Anchor](https://codepen.io/rexrainbow/pen/jJqXxB)
    - [Round-rectangle](https://codepen.io/rexrainbow/pen/ZqqJjG)