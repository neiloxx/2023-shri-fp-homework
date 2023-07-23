import {
  allPass, anyPass, complement,
  compose,
  countBy,
  equals,
  identity,
  lte,
  prop,
  propEq,
  values,
} from "ramda";

const R = require('ramda');

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */


const getSquare = prop('square');
const getStar = prop('star');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const isRed = equals('red');
const isGreen = equals('green');
const isWhite = equals('white');
const isOrange = equals('orange');
const isBlue = equals('blue');

const isRedSquare = compose(isRed, getSquare);
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteSquare = compose(isWhite, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);
const isBlueSquare = compose(isBlue, getSquare);

const isRedStar = compose(isRed, getStar);
const isGreenStar = compose(isGreen, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isOrangeStar = compose(isOrange, getStar);
const isBlueStar = compose(isBlue, getStar);

const isRedTriangle = compose(isRed, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isOrangeTriangle = compose(isOrange, getTriangle);
const isBlueTriangle = compose(isBlue, getTriangle);

const isRedCircle = compose(isRed, getCircle);
const isGreenCircle = compose(isGreen, getCircle);
const isWhiteCircle = compose(isWhite, getCircle);
const isOrangeCircle = compose(isOrange, getCircle);
const isBlueCircle = compose(isBlue, getCircle);

const countColors = compose(countBy(identity), values);

const isAllColorsTheSame = (color) => compose(propEq(color, 4), countColors);
const isTriangleAndSquareSameColor = ({ square, triangle }) => equals(square, triangle);
const isBlueAndRedEquals = ({ blue, red }) => equals(blue, red);
const lessThanThree = ({ white }) => lte(white, 1);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([ isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle ]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = allPass([ compose(propEq('green', 2), countColors) ]);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = allPass([ compose(isBlueAndRedEquals, countColors) ]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([ isBlueCircle, isRedStar, isOrangeSquare ]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass(
  [
    compose(lessThanThree, countColors),
    isAllColorsTheSame('green'),
    isAllColorsTheSame('red'),
    isAllColorsTheSame('blue'),
    isAllColorsTheSame('orange')
  ]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого
// доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass(
  [ compose(propEq('green', 2), countColors), isGreenTriangle, compose(propEq('red', 1), countColors) ]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = isAllColorsTheSame('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = anyPass([ isGreenStar, isOrangeStar, isBlueStar ]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = isAllColorsTheSame('green');


// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass(
  [ isTriangleAndSquareSameColor, complement(isWhiteTriangle), complement(isWhiteSquare) ]);
