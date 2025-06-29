import { gridCtx } from "./grid.js";

export class Piece {
    // 偏移
    offset = {
        x: 5,
        y: 0,
    };
    constructor() {
        this.matrix = {
            T: [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
        };
    }
    // 在指定位置繪製方塊後重新繪製格線
    draw(grid) {
        const cellSize = grid.cellSize;
        this.matrix["T"].forEach((rows, y) => {
            rows.forEach((value, x) => {
                if (value !== 0) {
                    gridCtx.fillStyle = "red";
                    gridCtx.fillRect(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize,
                        cellSize,
                        cellSize
                    );
                    grid.redrawGrid(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize
                    );
                }
            });
        });
    }
    // 清除指定位置的方塊後重新繪製格線
    clear(grid) {
        const cellSize = grid.cellSize;
        this.matrix["T"].forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    gridCtx.clearRect(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize,
                        cellSize,
                        cellSize
                    );
                    grid.redrawGrid(
                        x * cellSize + this.offset.x * cellSize,
                        y * cellSize + this.offset.y * cellSize
                    );
                }
            });
        });
    }
    // 移動
    move(dir, grid) {
        switch (dir) {
            case "down": {
                // 清除方塊
                this.clear(grid);
                // 向下偏移 1 格
                this.offset.y += 1;
                // 每次移動方塊就進行碰撞判斷
                if (grid.checkCollision(this)) {
                    // 發生碰撞，將位置復原回原來的位置
                    this.offset.y -= 1;
                    // 發生碰撞才merge gridMatrix 與 pieceMatrix
                    grid.merge(this);
                    // 重製 offset位置，顯示
                    // 下一個方塊
                    this.offset.y = 0;
                }
                this.draw(grid);
                break;
            }
            case "up": {
                this.clear(grid);
                this.offset.y -= 1;
                this.draw(grid);
                break;
            }
            case "left": {
                this.clear(grid);
                this.offset.x -= 1;
                if (grid.checkCollision(this)) {
                    this.offset.x += 1;
                }
                this.draw(grid);
                break;
            }
            case "right": {
                this.clear(grid);
                this.offset.x += 1;
                if (grid.checkCollision(this)) {
                    this.offset.x -= 1;
                }
                this.draw(grid);
                break;
            }
        }
        grid.drawPiece();
    }
}
