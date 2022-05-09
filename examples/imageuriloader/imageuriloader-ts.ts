import 'phaser';
import ImageURILoader from '../../plugins/imageuriloader';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        ImageURILoader.call(this.load, 'img', imageURI);
    }

    create() {
        this.add.image(400, 300, 'img');
    }

    update() {
    }
}

var imageURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAFP0lEQVR4nO2bX0gcRxzHP3uRNKJwAYuGCimREsFWaRNiFNp9qHnrEmmwpMlDaSCPDZFCHtqElpaaFgLlQktfmlAo1EYUQmQfqw/bghIsDTEVlNYQwaCCkAOPs0HZPvz2vDvd82Znd/2T9gOHujcz+/s6O7+Z+c1vDWLActxK4CjwOvAqcND7JIFqr9gSkAZmgIfAOPAbcNc2jadR22RE1ZDluEngbaALeBOo1GwqCwwDA8CAbRpLUdgXWqjluE3AJeA0+uJKkQV6gWu2aUyGaUhbqOW4LwFfIr24J4wRCqwiPXzFNo2/dBoILNRy3L1ID34C7NW5aQiWgB7g66DjOJBQy3EbgVuIg9lO7gKdtmnMqVZIqBa0HLcLGGP7RQK0AmOW4x5VraAk1HLcD4B+8lPDTqAe+NVy3NMqhcsKtRz3M+CbsFbFRCVwy3Lcy+UKbjpGLce9CKSisipmLtim8W2pL0sK9cZkfywmxccp2zRu+33hK9TzrmPsrDGpwhLwmt9cu2GMevPkj+w+kSA2/+RpKMLPGX2IuO/dSiuioYiiR9db1v3B7uzNQrJAS+EjXLGuwBdssciqCuish45aqN2Xvz6dgcFZGJrfWKejzv96AZWIlndzF9Z61HNAf6K4QG9OimFlbrgpDVVwtUXElmI6Az0T8nt7DZx8Aeb/gY/vl21+FXg5t+spvMUlAuxCOurkA3piVUTmyt08VnwtNaV0iz2IpvPgOSPLcauBs0EMbU7Kz+7DecFBuNhYXqQfqSmpd75BqfhZT9ua1+0i4Ka5cDx1H1a+MQBtNdJTQcmsyL0uN8GDtFKVSkRbkdBQdNbD9SP5nt6Mthq9e+SegNQUjC4qV+sCMLzJ9QkBe/T6kdK9MjQPvTOwsOz//dUWtX+IH6mpwD4hC+yvQCbYwLGe8SelheYc1XhajBpPlxYdhJ9ntBxfJdBagYQkAzP4GE7Ube5QmpP5nltYlqniYQbqntO5I/Q+0qsHtCeAZt3a30+rl63dJ2PzzMFiR7ZFNCaAQzo1bx4Tw6czEZsUD00VSAQ9MJkVfe+5DRxIIMcEgQng3ncCyQSai/jemYhNKUPIIVKtHO5cz8KyuPutYjjE5gFkZaR9iNP7aOvEjoQbKksJ5OhOmzuzsmWKc8yOLoZecKQrkPPJet0WTtQFW9DrMDgbuom5BCJUm1/mZaqJi9wSMiSTCeBemBYyK8obYa22g6y+NmEigRynh2J0UcIdUfdsaiqyNkcML99gkQhOq3OBruOaG+tCbkyLo4uALFCTsE0jlzMQmsyKTDk3/g7nJYfmIxMJMGybRja3yRoA3grbYnMSzryov6mGSHsyxwDko4C3ge9QfHwLhTRUw6GqfPhTl8yKjPMIPGwhWQqF2qaRthy3D3hfpXbzfomv6kTx/LgzKyusGKapvlz6TmEAuwm4j2Jst1SEXZXMiszBg4+jCbP4sIocS0zAxrOXfjQigg1V0PY8vJKUMImf8IVlibA/SEu8KeJH1I8B2zTeyf2x/uH7CDhJwLSa6cyOizQ8RbSsUbRN806fPt9Ki2KiZ/1hsN9+9Bohl4XbzD3gq/UX/7tH+wDeUdu5uK2KgfdK5QqWDKXYpjEAdMdmUvRcKJWRAmUSqmzTuM7ucE5XNssxAsWkxx2cWJUFztmm0VeuoHJ2p5dg9QM7x0HNIhmev6sU3s1prKds01De5wSK63re+DjwKbL62GqyyIrnjSAi4f9Uc3We+ZcH1uNlf3TxrL4O4kfBCz7tQBPQCBzA/wWfOWACmARGiOkFn38BgOuneB3q8JUAAAAASUVORK5CYII='

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);