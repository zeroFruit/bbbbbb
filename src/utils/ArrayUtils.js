import _ from 'lodash';

export const takeFromArray = (array, n) => _.take(array, n);

export const dropFromArray = (array, n) => _.drop(array, n);

export const concatArrays = (arr1, arr2) => _.concat(arr1, arr2);

export const sliceArray = (arr, start, end) => _.slice(arr, start, end);

export const indexOfValueInArray = (arr, value) => _.sortedIndexOf(arr, value);

export const uniqWithArray = (arr, comp) => _.uniqWith(arr, comp);

export const sortByArray = (arr, comp) => _.sortBy(arr, comp);

export const differenceWith = (target, comp, fn) => _.differenceWith(target, comp, fn);

export const findIndex = (arr, predicate) => _.findIndex(arr, predicate);
