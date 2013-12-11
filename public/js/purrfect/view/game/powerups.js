/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        powerups,
        place,
        renderedPowerups = [],
        textures = [new PIXI.Texture.fromImage('/img/nyan.png')],
        init;

    init = function () {
        powerups = module.publish('purrfect.generators.powerups').powerupMap;
        load();
    };

    load = function () {
        var i = 0,
            j = 0,
            position,
            lastPosition = 320,
            apart = 300,
            powerup,
            ground,
            powerupsLength;

        powerupsLength = powerups.length;
        for (i; i < powerupsLength; i += 1) {
            position = lastPosition - apart;
            lastPosition = position;
            j = 0;
            powerup = powerups[i];
            for (j; j < powerup.length; j += 1) {
                ground = powerup[j];
                place(i, position, j, ground);
            }
        }
        module.publish('purrfect.cache.set', {key: 'gamePowerups', value: renderedPowerups});
    };

    place = function (i, position, column, render) {
        if (render) {
            var powerup = new PIXI.Sprite(textures[0]),
                powerItem = {},
                blend = PIXI.Sprite.fromImage('img/lighto.png'),
                container = module.publish('purrfect.cache.get', 'gameContainer');

            powerup.position.x = 80 * column;
            powerup.position.y = position;
            powerup.originalPosition = {
                x: 80 * column,
                y: position
            };

            powerup.anchor.x = 0.5;
            powerup.anchor.y = 0.5;
            powerup.blendMode = 'w';

            blend.blendMode = 'hxx';
            blend.anchor.x = 0.5;
            blend.anchor.y = 0.5;
            blend.alpha = 0.3;
            blend.scale.x = 1;

            powerItem.powerup = powerup;
            powerItem.type = render;
            powerItem.blend = powerup;
            powerItem.scaleTo = 1;
            powerItem.position = 80 * column;
            powerItem.width = powerup.width;
            powerItem.height = powerup.height;

            renderedPowerups.push(powerItem);

            powerup.addChild(blend);
            container.addChildAt(powerup, 0);
        }
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.powerups'), PIXI));