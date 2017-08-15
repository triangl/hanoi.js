var Drawing = function () {

};

Drawing.prototype.DISK_HEIGHT = 32;
Drawing.prototype.UNIT_RADIUS = 32;
Drawing.prototype.NEEDLE_RADIUS = 16;
Drawing.prototype.SPACE_BETWEEN_TOWERS = 40;
Drawing.prototype.SPACE_BETWEEN_DISKS = 8;
Drawing.prototype.MARGIN = 16;
Drawing.prototype.DISKS_COLOR = "rgb(15, 217, 0)";
Drawing.prototype.SUPPORTS_COLOR = "rgb(111, 18, 18)";
Drawing.prototype.BACKGROUND_COLOR = "rgb(255, 255, 255)";

Drawing.prototype.initGame = function (game) {
    this.game = game;
    var height = this.game.getHeight();
    this.maxRadius = this.NEEDLE_RADIUS + this.UNIT_RADIUS * (height + 1);
    this.maxHeight = height * (this.DISK_HEIGHT + this.SPACE_BETWEEN_DISKS) + 2 * this.DISK_HEIGHT;
    var imageWidth = 2 * this.MARGIN + 2 * this.SPACE_BETWEEN_TOWERS + 3 * (2 * this.maxRadius);
    var imageHeight = this.maxHeight + 2 * this.MARGIN;
    this.y = imageHeight - this.MARGIN - this.DISK_HEIGHT;
    var canvas = document.getElementById("draw");
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    this.update();
};

Drawing.prototype.middleTower = function (tower) {
    return this.MARGIN + (1 + 2 * tower) * this.maxRadius + tower * this.SPACE_BETWEEN_TOWERS;
};

Drawing.prototype.middleFloor = function (tower, floor) {
    var xMiddleTower = this.middleTower(tower);
    var yFloor = this.y - (
        (floor + 1) * this.SPACE_BETWEEN_DISKS + (floor * this.DISK_HEIGHT) + this.DISK_HEIGHT / 2
    );
    return [xMiddleTower, yFloor];
};

Drawing.prototype.update = function () {
    var canvas = document.getElementById("draw");
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    var p = canvas.getContext("2d");
    canvas.style.backgroundColor = this.BACKGROUND_COLOR;

    
    p.beginPath();
    for (var tower = 0; tower < 3; tower++) {
        var middleTowerX = this.middleTower(tower);

        // Piquet vertical
        p.rect(
            middleTowerX - this.NEEDLE_RADIUS,
            this.y + this.DISK_HEIGHT - this.maxHeight,
            2 * this.NEEDLE_RADIUS,
            this.maxHeight
        );

        // Planche du bas
        p.rect(
            middleTowerX - this.maxRadius,
            this.y,
            2 * this.maxRadius,
            this.DISK_HEIGHT
        );
        p.fillStyle = this.SUPPORTS_COLOR;
        p.fill();
        //p.stroke();
    }

    p.beginPath();
    p.fillStyle = this.DISKS_COLOR;
    // p.fill();
    for (var tower = 0; tower < 3; tower++) {
        var nbDisks = this.game.getTower(tower).getNbDisks();
        for (var floor = 0; floor < nbDisks; floor++) {
            var disk = this.game.getTower(tower).getDiskByFloor(floor);
            var center = this.middleFloor(tower, floor);
            this.drawDisk(disk, center, p);
        }
    }
    p.fill();
    //p.stroke();
};

Drawing.prototype.drawDisk = function (disk, middle, p) {
    var x = middle[0] - this.NEEDLE_RADIUS - disk * this.UNIT_RADIUS;
    var y = middle[1] - this.DISK_HEIGHT / 2;
    var width = 2 * (disk * this.UNIT_RADIUS + this.NEEDLE_RADIUS);
    p.rect(x, y, width, this.DISK_HEIGHT);
};