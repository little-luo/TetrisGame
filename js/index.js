import { Grid } from "./grid.js";
import { Preview } from "./preview.js";

import { Piece } from "./piece.js";

let grid = new Grid(20, 12);
window.grid = grid;
let preview = new Preview(5, 5);

let piece = new Piece();
window.piece = piece;
// 初始化
(function () {
    grid.init();
    piece.init(preview, grid);
    preview.init();
    // 綁定 keydown 事件
    window.addEventListener("keydown", function (e) {
        switch (e.code) {
            case "ArrowDown": {
                piece.move("down", grid);
                break;
            }
            case "ArrowLeft": {
                piece.move("left", grid);
                break;
            }
            case "ArrowRight": {
                piece.move("right", grid);
                break;
            }
            case "KeyZ": {
                // piece.rotate(-1, grid);
                piece.playerRotate(-1, grid);
                break;
            }
            case "KeyX": {
                // piece.rotate(1, grid);
                piece.playerRotate(1, grid);
                break;
            }
            case "ShiftLeft": {
                piece.swap(grid);
                break;
            }
        }
        return;
    });
})();

let lastTime = 0;
let deltaTimeSum = 0;
function render(time = 0) {
    let deltaTime = time - lastTime;
    lastTime = time;
    deltaTimeSum += deltaTime;
    // console.log(deltaTimeSum);
    if (deltaTimeSum >= 1000) {
        piece.move("down", grid);
        deltaTimeSum = 0;
    }
    requestAnimationFrame(render);
}
render();
