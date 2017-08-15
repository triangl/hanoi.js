
var Tower = function (maxSize) {
    this.nbDisks = 0;
    this.disks = [];
    for (var i = 0; i < maxSize; i++) {
        this.disks[i] = 0;
    }
};

Tower.prototype.isEmpty = function () {
    return this.nbDisks == 0;
};

Tower.prototype.isFull = function () {
    return this.nbDisks == this.disks.length;
};

Tower.prototype.getSommet = function () {
    if (this.isEmpty()) {
        return 0;
    } else {
        return this.disks[this.nbDisks - 1];
    }
};

Tower.prototype.getNbDisks = function () {
    return this.nbDisks;
};

Tower.prototype.getDiskByFloor = function (floor) {
    if (this.isEmpty() || floor >= this.nbDisks) {
        return 0;
    } else {
        return this.disks[floor];
    }
};

Tower.prototype.canStack = function (disk) {
    if (this.isEmpty()) {
        return true;
    } else {
        return this.getSommet() > disk;
    }
};

Tower.prototype.stack = function (disk) {
    this.disks[this.nbDisks] = disk;
    this.nbDisks += 1;
};

Tower.prototype.unstack = function () {
    this.nbDisks -= 1;
    this.disks[this.nbDisks] = 0;
};