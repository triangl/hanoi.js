var HanoiGui = function () {
    this.nbMovements = 0;
    this.startTower = -1;
    this.game = new Hanoi();
    var column = document.getElementById("column");

    var self = this;

    this.towerButton1 = document.getElementById("towerButton1");
    this.towerButton1.innerText = "Tour 1";
    this.towerButton1.addEventListener("click", function (event) {
        self.towerButton(event);
    });

    this.towerButton2 = document.getElementById("towerButton2");
    this.towerButton2.innerText = "Tour 2";
    this.towerButton2.addEventListener("click", function (event) {
        self.towerButton(event);
    });

    this.towerButton3 = document.getElementById("towerButton3");
    this.towerButton3.innerText = "Tour 3";
    this.towerButton3.addEventListener("click", function (event) {
        self.towerButton(event);
    });

    var canvas = document.getElementById("draw");
    this.draw = new Drawing();

    column.style.display = "block";
};

HanoiGui.prototype.solution = function () {

};

HanoiGui.prototype.initGame = function(game) {
    this.game = game;
    this.draw.initGame(this.game);
    this.draw.update();
};

HanoiGui.prototype.towerButton = function(event) {
    var tower = -1;
    var button = event.target;
    if (button == this.towerButton1) {
        tower = 0;
    } else if (button == this.towerButton2) {
        tower = 1;
    } else if (button == this.towerButton3) {
        tower = 2;
    }
    if (tower < 0) {
        return;
    }
    if (this.startTower < 0) {
        this.chooseStart(tower);
    } else {
        this.chooseEnd(tower);
    }
};

HanoiGui.prototype.chooseStart = function(tower) {
    if (tower < 0) {
        return;
    }
    var game = this.game;
    if (game.isValidTowerStartingPoint(tower)) {
        if (tower != 0) {
            this.towerButton1.disabled = !game.isValidTowerEndingPoint(tower, 0);
        }
        if (tower != 1) {
            this.towerButton2.disabled = !game.isValidTowerEndingPoint(tower, 1);
        }
        if (tower != 2) {
            this.towerButton3.disabled = !game.isValidTowerEndingPoint(tower, 2);
        }
        this.startTower = tower;
    } else {
        alert("Tour de départ invalide !");
    }
};

HanoiGui.prototype.chooseEnd = function(tower) {
    if (tower == this.startTower) {
        this.towerButton1.disabled = false;
        this.towerButton2.disabled = false;
        this.towerButton3.disabled = false;
        this.startTower = -1;
        return;
    }
    var game = this.game;
    if (game.isValidTowerEndingPoint(this.startTower, tower)) {
        game.moveDisk(this.startTower, tower);
        this.nbMovements += 1;
        this.draw.update();
        this.startTower = -1;
        this.towerButton1.disabled = false;
        this.towerButton2.disabled = false;
        this.towerButton3.disabled = false;
        this.isGameOver();
    } else {
        alert("Tour d'arrivée invalide !");
    }
};

HanoiGui.prototype.isGameOver = function() {
    if (this.game.isGameOver()) {
        this.towerButton1.disabled = true;
        this.towerButton2.disabled = true;
        this.towerButton3.disabled = true;
        alert("Bravo !\nRésolu en " + this.nbMovements + " mouvements !");
    }
};