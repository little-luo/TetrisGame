import { gridCtx } from "./grid.js";
export const COLOR = {
    1: "aqua",
    2: "blue",
    3: "orange",
    4: "yellow",
    5: "green",
    6: "red",
    7: "pink",
};

export const SHAPE = ["I", "J", "L", "O", "S", "Z", "T"];

export const MATRIX = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    J: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
    ],
    L: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
    ],
    O: [
        [4, 4],
        [4, 4],
    ],
    S: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ],
    Z: [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0],
    ],
    T: [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
    ],
};

export class Piece {
    // 偏移
    offset = {
        x: 5,
        y: 0,
    };
    constructor() {
        this.matrix = MATRIX;
        // 淺拷貝
        // this.currentMatrix =
        //     this.matrix[SHAPE[Math.floor(Math.random() * SHAPE.length)]];
        // 淺拷貝
        // this.nextMatrix =
        //     this.matrix[SHAPE[Math.floor(Math.random() * SHAPE.length)]];
        // 用 JSON 方式深拷貝
        this.currentMatrix = JSON.parse(
            JSON.stringify(
                this.matrix[SHAPE[Math.floor(Math.random() * SHAPE.length)]]
            )
        );
        this.nextMatrix = JSON.parse(
            JSON.stringify(
                this.matrix[SHAPE[Math.floor(Math.random() * SHAPE.length)]]
            )
        );
    }
    // 在指定位置繪製方塊後重新繪製格線
    draw(grid) {
        let gridMatrix = grid.matrix;
        const cellSize = grid.cellSize;

        this.currentMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                while (
                    value !== 0 &&
                    gridMatrix[y + this.offset.y][x + this.offset.x] > 0
                ) {
                    this.offset.y -= 1;
                    console.log(this.offset.y);
                    if (gridMatrix[0 + this.offset.y] === undefined) {
                        window.location.reload();
                        return;
                    }
                }
            });
        });

        this.currentMatrix.forEach((rows, y) => {
            rows.forEach((value, x) => {
                if (value !== 0) {
                    gridCtx.fillStyle = COLOR[value];
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
        this.currentMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                // if (value !== 0) {
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
                // }
            });
        });
        grid.drawOutLine();
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
                    grid.clearLine();
                    // 重製 offset位置，顯示
                    // 下一個方塊
                    this.offset.x = 5;
                    this.offset.y = 0;
                    this.update();
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
        grid.drawOutLine();
    }

    changeCurrentMatrix(nextMatrix) {
        // 淺拷貝
        // this.currentMatrix = nextMatrix;
        // 深拷貝，避免 reference
        this.currentMatrix = JSON.parse(JSON.stringify(nextMatrix));
    }

    init(preview, grid) {
        this.preview = preview;
        this.draw(grid);
    }
    // 產生下一個新的方塊
    update() {
        this.changeCurrentMatrix(this.preview.nextMatrix);
        this.preview.update();
    }
    // 旋轉方塊
    rotate(dir, grid) {
        this.clear(grid);
        let currentMatrix = this.currentMatrix;
        let temp = undefined;
        // 轉置矩陣
        currentMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (y < x) {
                    temp = currentMatrix[y][x];
                    currentMatrix[y][x] = currentMatrix[x][y];
                    currentMatrix[x][y] = temp;
                }
            });
        });
        // 順時針，row reverse
        if (dir > 0) {
            currentMatrix.forEach((row, y) => {
                currentMatrix[y] = row.reverse();
            });
        }

        // 逆時針，column reverse
        if (dir < 0) {
            let temp = undefined;
            let length = currentMatrix.length;
            for (let x = 0; x < length; x++) {
                let start = 0;
                let end = length - 1;
                while (start < end) {
                    temp = currentMatrix[start][x];
                    currentMatrix[start][x] = currentMatrix[end][x];
                    currentMatrix[end][x] = temp;
                    start++;
                    end--;
                }
            }
        }
        this.draw(grid);
        // console.table(currentMatrix);
    }

    // Wall Kick
    playerRotate(dir, grid) {
        let oldOffsetX = this.offset.x;
        let displacement = 1;
        this.rotate(dir, grid);
        while (grid.checkCollision(this)) {
            this.offset.x += displacement;
            displacement = -(displacement + (displacement > 0 ? 1 : -1));
            if (displacement > this.currentMatrix[0].length) {
                this.rotate(-dir, grid);
                this.offset.x = oldOffsetX;
                return;
            }
        }
        // 繪製旋轉後的方塊
        this.draw(grid);
    }
}
