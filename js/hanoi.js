
var Hanoi = function () {
    this.maxHeight = 0;
    this.towers = [];
};


Hanoi.prototype.init = function (nbDisks) {
    this.towers = [];

    for (var i = 0; i < 3; i++) {
        this.towers[i] = new Tower(nbDisks);
    }

    for (var disk = nbDisks; disk > 0; disk--) {
        this.towers[0].stack(disk);
    }
    this.maxHeight = nbDisks;
};

Hanoi.prototype.getHeight = function () {
    return this.maxHeight;
};

Hanoi.prototype.getTower = function (i) {
    return this.towers[i];
};

Hanoi.prototype.isValidTowerStartingPoint = function (start) {
    if (start < 0 || start > 2) {
        return false;
    }
    return !this.towers[start].isEmpty();
};

Hanoi.prototype.isValidTowerEndingPoint = function (start, end) {
    if (end < 0 || end > 2) {
        return false;
    }
    var start = this.towers[start].getSommet();
    return this.towers[end].canStack(start);
};

Hanoi.prototype.moveDisk = function (start, end) {
    var disk  = this.towers[start].getSommet();
    this.towers[start].unstack();
    this.towers[end].stack(disk);
};

Hanoi.prototype.isGameOver = function () {
    return this.towers[2].isFull();
};

