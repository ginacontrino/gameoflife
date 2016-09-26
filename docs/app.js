(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _MathUtils = require('./MathUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getNextGeneration: function getNextGeneration(grid) {
        var nextGenerationGrid = _Grid2.default.makeZeroMatrix(grid.length, grid[0].length);

        for (var x = 0; x < grid.length; x++) {
            for (var y = 0; y < grid[x].length; y++) {
                nextGenerationGrid[x][y] = this.getNextCellState(x, y, grid);
            }
        }

        return nextGenerationGrid;
    },
    getNextCellState: function getNextCellState(x, y, grid) {
        var cellState = grid[x][y];
        var activeNeighbours = this.getNeighbours(x, y, grid).filter(function (a) {
            return a;
        }).length;

        if (cellState && activeNeighbours < 2) return 0;

        if (cellState && activeNeighbours > 3) return 0;

        if (!cellState && activeNeighbours === 3) return 1;else return cellState;
    },


    getNeighbours: function getNeighbours(x, y, grid) {
        // to get the number of columns, just get length of the first row
        var numberOfColumns = grid[0].length;
        var numberRows = grid.length;

        var leftColumn = (0, _MathUtils.mod)(y - 1, numberOfColumns);
        var rightColumn = (0, _MathUtils.mod)(y + 1, numberOfColumns);
        var topRow = (0, _MathUtils.mod)(x - 1, numberRows);
        var bottomRow = (0, _MathUtils.mod)(x + 1, numberRows);

        var left = grid[x][leftColumn];
        var topleft = grid[topRow][leftColumn];
        var top = grid[topRow][y];
        var topright = grid[topRow][rightColumn];
        var right = grid[x][rightColumn];
        var bottomright = grid[bottomRow][rightColumn];
        var bottom = grid[bottomRow][y];
        var bottomleft = grid[bottomRow][leftColumn];

        return [left, topleft, top, topright, right, bottomright, bottom, bottomleft];
    }
};

},{"./Grid":2,"./MathUtils":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    make: function make(height, width) {
        var matrix = [];

        for (var i = 0; i < height; i++) {
            matrix[i] = [];
            for (var j = 0; j < width; j++) {
                matrix[i][j] = Math.round(Math.random());
            }
        }

        return matrix;
    },

    makeZeroMatrix: function makeZeroMatrix(rows, columns) {
        var matrix = [];
        for (var x = 0; x < rows; x++) {
            var a = [];
            for (var y = 0; y < columns; y++) {
                a[y] = 0;
            }
            matrix[x] = a;
        }
        return matrix;
    }
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mod = exports.mod = function mod(n, m) {
  return (n % m + m) % m;
};

},{}],4:[function(require,module,exports){
'use strict';

var _GameOfLife = require('./GameOfLife');

var _GameOfLife2 = _interopRequireDefault(_GameOfLife);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = document.getElementById("context");
var button = document.getElementById("button");

var matrix = [];

button.addEventListener('click', function () {
    init();
    setInterval(function () {
        return updateAndDraw(matrix);
    }, 200);
    context.style.display = 'block';
    button.style.display = 'none';
});

function init() {
    matrix = _Grid2.default.make(24, 24);

    for (var x = 0; x < matrix.length; x++) {
        var row = document.createElement("div");
        row.className = "row";
        row.classList.add('row-' + x);

        context.appendChild(row);

        for (var y = 0; y < matrix[x].length; ++y) {
            var cell = document.createElement("div");

            cell.className = 'cell';
            cell.classList.add(matrix[x][y] ? 'active' : 'inactive');
            cell.classList.add('cell-' + x + '-' + y);

            row.appendChild(cell);
        }
    }
}

function updateAndDraw(grid) {

    var newGrid = _GameOfLife2.default.getNextGeneration(grid);
    matrix = newGrid;

    for (var x = 0; x < newGrid.length; x++) {
        for (var y = 0; y < newGrid[x].length; y++) {
            var currentDiv = document.getElementsByClassName('cell-' + x + '-' + y);

            var classList = currentDiv[0].classList;
            classList.contains('active') ? classList.remove('active') : classList.remove('inactive');
            classList.add(newGrid[x][y] ? 'active' : 'inactive');
        }
    }
}

},{"./GameOfLife":1,"./Grid":2}]},{},[4]);
