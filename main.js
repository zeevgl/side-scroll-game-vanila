const CANVAS_ID = 'myCanvas'
const FPS = 60;
let context, hero, enemy;

function main() {
    context = initCanvas();

    hero = new Player('hero', 0, 0);
    enemy = new Enemy('enemy', 600, 0, hero);

    document.addEventListener('keydown', onKeyDown);

    setInterval(mainLoop, FPS);
}

function initCanvas() {
    const c = document.getElementById(CANVAS_ID);
    const context = c.getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight / 2;
    context.transform(1, 0, 0, -1, 0, context.canvas.height)

    return context;
}

function onKeyDown(e) {
    console.log('e.code = ', e.code);
    switch (e.code) {
        case 'ArrowRight': {
            if (hero.accV.vx <= hero.maxAcc) {
                hero.accV.vx += 0.5;
            }

            break
        }
        case 'ArrowLeft': {
            hero.accV.vx -= 0.5;
            break
        }
        case 'ArrowDown': {
            hero.accV.vx = 0;
            break
        }
        case 'Space': {
            if (hero.accV.vy === 0) {
                hero.accV.vy = 1.5;
            }
            break
        }
    }
}

function applyGravity() {
    hero.accV.vy -= 0.1;
}

function clearScreen() {
    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    context.fill();
}

function checkCollision() {
    if (hero.boxX >= enemy.x && hero.boxX <= enemy.boxX
        &&
        hero.y >= enemy.y && hero.y <= enemy.boxY
    ) {
        console.log('BOOM');
    }
}

function mainLoop() {
    clearScreen();
    applyGravity();
    checkCollision();
    hero.draw(context);
    enemy.draw(context);
}

main();