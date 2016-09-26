(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MatrixHelpers = require('./MatrixHelpers');

var matrix = [];

exports.default = {
    init: function init(rows, columns) {
        matrix = (0, _MatrixHelpers.create)(rows, columns, true);
    },
    getMatrix: function getMatrix() {
        return matrix;
    },
    getNextGeneration: function getNextGeneration() {
        matrix = (0, _MatrixHelpers.nextGenerationMatrix)(matrix);

        return matrix;
    }
};

},{"./MatrixHelpers":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    init: function init(matrix) {
        for (var row = 0; row < matrix.length; row++) {
            var rowElement = document.createElement('div');
            document.querySelector('.GameOfLife-canvas').appendChild(rowElement);

            for (var column = 0; column < matrix[row].length; column++) {
                var cellElement = document.createElement('div');
                cellElement.className = 'GameOfLife-cell';
                cellElement.classList.add('GameOfLife-cell-' + row + '-' + column);

                if (matrix[row][column]) cellElement.classList.add('is-active');

                rowElement.appendChild(cellElement);
            }
        }
    },
    update: function update(matrix) {
        document.querySelector('.GameOfLife').classList.add('has-started');

        for (var x = 0; x < matrix.length; x++) {
            for (var y = 0; y < matrix[x].length; y++) {
                var currentDiv = document.querySelector('.GameOfLife-cell-' + x + '-' + y);

                var classList = currentDiv.classList;
                matrix[x][y] ? classList.add('is-active') : classList.remove('is-active');
            }
        }
    }
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// implementation of real mod operator
var mod = function mod(n, m) {
    return (n % m + m) % m;
};

// creates a new matrix, optionally randomizes cell values to 0 or 1
var create = exports.create = function create(rows, columns) {
    var randomize = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var matrix = [];

    for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
        var row = [];

        for (var columnIndex = 0; columnIndex < columns; columnIndex++) {
            row[columnIndex] = randomize ? Math.round(Math.random()) : 0;
        }

        matrix[rowIndex] = row;
    }

    return matrix;
};

// calculate the next generation of a matrix according to game of life rules
var nextGenerationMatrix = exports.nextGenerationMatrix = function nextGenerationMatrix(matrix) {
    var nextGeneration = create(matrix.length, matrix[0].length);

    for (var row = 0; row < matrix.length; row++) {
        for (var column = 0; column < matrix[row].length; column++) {
            nextGeneration[row][column] = nextGenerationCell(row, column, matrix);
        }
    }

    return nextGeneration;
};

// calculate the next generation of a single cell according to game of life rules
function nextGenerationCell(row, column, matrix) {
    var activeNeighbours = getCellNeighbours(row, column, matrix).filter(function (a) {
        return a;
    }).length;

    if (matrix[row][column] && activeNeighbours < 2) return 0;

    if (matrix[row][column] && activeNeighbours > 3) return 0;

    if (!matrix[row][column] && activeNeighbours === 3) return 1;

    return matrix[row][column];
}

// get all the neighbour cells of a given cell assuming "infinite" grid
function getCellNeighbours(x, y, matrix) {
    // to get the number of columns, just get length of the first row
    var numberOfColumns = matrix[0].length;
    var numberRows = matrix.length;

    var leftColumn = mod(y - 1, numberOfColumns);
    var rightColumn = mod(y + 1, numberOfColumns);
    var topRow = mod(x - 1, numberRows);
    var bottomRow = mod(x + 1, numberRows);

    var left = matrix[x][leftColumn];
    var topleft = matrix[topRow][leftColumn];
    var top = matrix[topRow][y];
    var topright = matrix[topRow][rightColumn];
    var right = matrix[x][rightColumn];
    var bottomright = matrix[bottomRow][rightColumn];
    var bottom = matrix[bottomRow][y];
    var bottomleft = matrix[bottomRow][leftColumn];

    return [left, topleft, top, topright, right, bottomright, bottom, bottomleft];
}

},{}],4:[function(require,module,exports){
'use strict';

var _GameOfLifeModel = require('./GameOfLifeModel');

var _GameOfLifeModel2 = _interopRequireDefault(_GameOfLifeModel);

var _GameOfLifeView = require('./GameOfLifeView');

var _GameOfLifeView2 = _interopRequireDefault(_GameOfLifeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameOfLifeElement = document.querySelector('.GameOfLife');
var rows = gameOfLifeElement.getAttribute('rows');
var columns = gameOfLifeElement.getAttribute('columns');

// Initialize the game to a random 30x30 matrix
_GameOfLifeModel2.default.init(rows, columns);

// Draw the initial game matrix in the browser
_GameOfLifeView2.default.init(_GameOfLifeModel2.default.getMatrix());

// When the start button is clicked, play the game every 200 milliseconds
document.querySelector('.GameOfLife-startButton').addEventListener('click', function () {
    return setInterval(function () {
        _GameOfLifeView2.default.update(_GameOfLifeModel2.default.getNextGeneration());
    }, 200);
});

},{"./GameOfLifeModel":1,"./GameOfLifeView":2}]},{},[4]);
