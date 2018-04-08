## Introduction

[Matter](http://brm.io/matter-js/) physics engine in phaser.

- Author: Richard Davey

## Usage

### Configuration

```javascript
var config = {
    // ...
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false
        }
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Add physics object

#### Image object

Static object

```javascript
var image = scene.matter.add.imag(x, y, key, frame, { isStatic: true });
```

Dynamic object

```javascript
var image = scene.matter.add.imag(x, y, key, frame);
```

#### Sprite object

Static object

```javascript
var image = scene.matter.add.sprite(x, y, key, frame, { isStatic: true });
```

Dynamic object

```javascript
var image = scene.matter.add.sprite(x, y, key, frame);
```

### Methods of game object

#### Size

```javascript
gameobject.setRectangle(width, height, options);
```

```javascript
gameobject.setCircle(radius, options);
```

```javascript
gameobject.setPolygon(radius, sides, options);
```

```javascript
gameobject.setTrapezoid(width, height, slope, options);
```

#### Velocity

```javascript
gameobject.setVelocity(x, y);
```

```javascript
gameobject.setVelocityX(x);
```

```javascript
gameobject.setVelocityY(x);
```

#### Mass

```javascript
gameobject.setMass(v);
```

```javascript
gameobject.setDensity(v);
```

#### Acceleration

#### Gravity

```javascript
gameobject.setGravity(x, y);
```

#### Friction

```javascript
gameobject.setFriction(value, air, fstatic);
```

```javascript
gameobject.setFrictionAir(v);
```

```javascript
gameobject.setFrictionStatic(v);
```

#### Angular

```javascript
gameobject.setAngularVelocity(v);
```

#### Bounce

```javascript
gameobject.setBounce(v);
```