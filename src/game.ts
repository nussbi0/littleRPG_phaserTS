class SimpleGame {

    private game: Phaser.Game;
    private platforms: Phaser.Group;
    private player: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private map: Phaser.Tilemap;
    private layer: Phaser.TilemapLayer;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content",
            { preload: this.preload, create: this.create, update: this.update });
    }

    private preload() {
        this.game.load.image("tiles", "assets/basictiles.png");
    }

    private create() {
        //  Create some map data dynamically
        //  Map size is 128x128 tiles
        let dataLayer1 = "";
        let dataLayer2 = "";

        for (let y = 0; y < 64; y++) {
            for (let x = 0; x < 64; x++) {
                // data += this.game.rnd.between(0, 20).toString();
                dataLayer1 += "11";

                if (x < 65) {
                    dataLayer1 += ",";
                }
            }

            if (y < 65) {
                dataLayer1 += "\n";
            }
        }

        for (let y = 0; y < 64; y++) {
            for (let x = 0; x < 64; x++) {
                const temp = this.game.rnd.between(0, 20);
                // data += this.game.rnd.between(0, 20).toString();
                if (temp === 0) {
                    dataLayer2 += "12";
                } else {
                    dataLayer2 += "11";
                }
                if (x < 65) {
                    dataLayer2 += ",";
                }
            }

            if (y < 65) {
                dataLayer2 += "\n";
            }
        }

        //  Add data to the cache
        // this.game.cache.addTilemap("dynamicMap", null, dataLayer1, Phaser.Tilemap.CSV);
        this.game.load.tilemap("ground", null, dataLayer2, Phaser.Tilemap.CSV);
        // this.game.load.tilemap("grass", null, dataLayer2, Phaser.Tilemap.CSV);

        //  Create our map (the 16x16 is the tile size)
        this.map = this.game.add.tilemap("ground", 16, 16);

        //  'tiles' = cache image key, 16x16 = tile size
        this.map.addTilesetImage("tiles", "tiles", 16, 16);

        //  0 is important
        this.map.createLayer(0).resizeWorld();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        // this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // this.game.add.sprite(0, 0, "sky");
        // this.platforms = this.game.add.group();
        // this.platforms.enableBody = true;

        // const ground = this.platforms.create(0, this.game.world.height - 64, "ground");
        // ground.scale.setTo(2, 2);
        // ground.body.immovable = true;

        // let ledge = this.platforms.create(400, 400, "ground");
        // ledge.body.immovable = true;
        // ledge = this.platforms.create(-150, 250, "ground");
        // ledge.body.immovable = true;

        // this.player = this.game.add.sprite(32, this.game.world.height - 150, "dude");
        // this.game.physics.arcade.enable(this.player);
        // this.player.body.bounce.y = 0.2;
        // this.player.body.gravity.y = 300;
        // this.player.body.collideWorldBounds = true;

        // this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        // this.player.animations.add("right", [5, 6, 7, 8], 10, true);

        // this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    private update() {
        // const hitPlatform: boolean = this.game.physics.arcade.collide(this.player, this.platforms);
        if (this.cursors.left.isDown) {
            this.game.camera.x--;
        } else if (this.cursors.right.isDown) {
            this.game.camera.x++;
        }

        if (this.cursors.up.isDown) {
            this.game.camera.y--;
        } else if (this.cursors.down.isDown) {
            this.game.camera.y++;
        }
        // this.player.body.velocity.x = 0;
        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -150;
        //     this.player.animations.play("left");
        // } else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 150;
        //     this.player.animations.play("right");
        // } else {
        //     this.player.animations.stop();
        //     this.player.frame = 4;
        // }
        // if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
        //     this.player.body.velocity.y = -350;
        // }
    }

}

window.onload = () => {

    const game = new SimpleGame();
};
