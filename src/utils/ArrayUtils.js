import _ from 'lodash';

export const takeFromArray = (array, n) => _.take(array, n);

export const dropFromArray = (array, n) => _.drop(array, n);

export const concatArrays = (arr1, arr2) => _.concat(arr1, arr2);

export const sliceArray = (arr, start, end) => _.slice(arr, start, end);

export const indexOfValueInArray = (arr, value) => _.sortedIndexOf(arr, value);
