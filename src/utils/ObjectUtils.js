import _ from 'lodash';

export const isEmpty = obj => {
  return (
    obj === undefined ||
    _.isEmpty(obj)
  );
};

export const isObjectHasProperty = (obj, key) => {
  if (isEmpty(obj)) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const assignObjects = (obj1, obj2) => {
  return _.merge(obj1, obj2);
};

export const pickByKey = (obj, keyArr) => _.pick(obj, keyArr);

export const hasPath = (obj, path) => _.has(obj, path);
