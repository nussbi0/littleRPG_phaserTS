class SimpleGame {

    private game: Phaser.Game;
    private platforms: Phaser.Group;
    private player: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content",
            { preload: this.preload, create: this.create, update: this.update });
    }

    private preload() {
        this.game.load.image("sky", "assets/sky.png");
        this.game.load.image("ground", "assets/platform.png");
        this.game.load.image("star", "assets/star.png");
        this.game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    }

    private create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, "sky");
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        let ledge = this.platforms.create(400, 400, "ground");
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, "ground");
        ledge.body.immovable = true;

        // this.game.add.sprite(0, 0, "star");
        this.player = this.game.add.sprite(32, this.game.world.height - 150, "dude");
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        this.player.animations.add("right", [5, 6, 7, 8], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    private update() {
        const hitPlatform: boolean = this.game.physics.arcade.collide(this.player, this.platforms);

        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        } else {
            this.player.animations.stop();
            this.player.frame = 4;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
            this.player.body.velocity.y = -350;
        }
    }

}

window.onload = () => {

    const game = new SimpleGame();
};
