class Shape {
    speedV;
    accV;

    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

class Actor extends Shape {
    width = 50;
    height = 100;
    maxAcc = 2;

    constructor(name, x, y) {
        super(name, x, y)
        this.speedV = new Vector([10, 20]);
        this.accV = new Vector([0, 0]);
    }

    calcPosition() {
        this.x += this.speedV.vx * this.accV.vx;
        this.y += this.speedV.vy * this.accV.vy;

        if (this.x < 0) {
            this.x = 0;
            this.accV.vx = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.accV.vy = 0;
        }
    }

    get boxX() {
        return this.x + this.width;
    }

    get boxY() {
        return this.y + this.width;
    }

    draw(context) {
        //
        this.calcPosition();
    }
}


class Player extends Actor {
    width = 50;
    height = 100;
    maxAcc = 2;

    constructor(name, x, y) {
        super(name, x, y)
        this.speedV = new Vector([10, 20]);
        this.accV = new Vector([0, 0]);
    }

    draw(context) {
        this.calcPosition();

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }
}


class Enemy extends Actor {
    width = 60;
    height = 50;
    maxAcc = 2;

    constructor(name, x, y, player) {
        super(name, x, y)
        this.speedV = new Vector([3, 0]);
        this.accV = new Vector([0.1, 0]);
        this.player = player;
    }

    draw(context) {
        this.accV.vx += this.x > this.player.x ? -0.1 : 0.1;
        this.calcPosition();

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "red";
        context.fill();
    }
}