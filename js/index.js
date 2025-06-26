import { Grid } from "./grid.js";
import { Preview } from "./preview.js";

import { Piece } from "./piece.js";

let grid = new Grid(20, 12);
grid.createMatrix();
grid.drawGrid();

let preview = new Preview(5, 5);
preview.drawGrid();

let piece = new Piece();
piece.draw(grid);
