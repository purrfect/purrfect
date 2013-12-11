/*global _li, PIXI, jQuery*/

(function (module, PIXI, $) {
    'use strict';

    var moduleName = module.get('name'),
        canvas,
        container,
        stage,
        renderer,
        loop,
        prepare,
        startGame,
        background,
        init;

    init = function () {
        module.publish('purrfect.view.game.assets');
    };

    startGame = function () {
        loop();
    };

    prepare = function () {
        canvas();
        renderer();
        container();
        stage();
        background();
        module.publish('purrfect.view.game.player');
        module.publish('purrfect.view.game.ledge');
        module.publish('purrfect.view.game.powerups');
        module.publish('purrfect.view.game.rainbow');
        loop();
    };

    background = function () {
        module.publish('purrfect.view.game.background');
    };

    canvas = function () {
        var canvas = document.querySelector('#canvas');
        module.publish('purrfect.cache.set', {key: 'gameCanvas', value: canvas});

    };

    container = function () {
        var container = new PIXI.DisplayObjectContainer();
        module.publish('purrfect.cache.set', {key: 'gameContainer', value: container});

    };

    renderer = function () {
        var canvas = module.publish('purrfect.cache.get', 'gameCanvas'),
            renderer = PIXI.autoDetectRenderer(800, 600, canvas);
        module.publish('purrfect.cache.set', {key: 'gameRenderer', value: renderer});
    };

    stage = function () {
        var stage = new PIXI.Stage(0x000000, false),
            container = module.publish('purrfect.cache.get', 'gameContainer');

        stage.addChild(container);

        module.publish('purrfect.cache.set', {key: 'gameStage', value: stage});
    };

    loop = function () {
        module.publish('purrfect.view.game.loop');
    };


    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.prepare', 'main', prepare);
    module.subscribe(moduleName + '.startGame', 'main', startGame);

}(_li.define('purrfect.view.game.render'), PIXI, jQuery));