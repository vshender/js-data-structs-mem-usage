const { testCreate, testModify, testModifyAndSaveIntermediate } = require('../utils');


const results = {};


testCreate(
  results,
  'js-mutable::object',
  () => ({}),
  (obj, i) => {
    obj[`key-${i}`] = i;
    return obj;
  }
);

testModify(
  results,
  'js-mutable::object',
  () => ({}),
  (obj, i) => {
    obj[`key-${i}`] = i;
    return obj;
  },
  (obj, i) => {
    obj[`key-${i}`] = i * 2;
    return obj;
  }
);


testModifyAndSaveIntermediate(
  results,
  'js-mutable::object',
  () => ({}),
  (obj, i) => {
    obj[`key-${i}`] = i;
    return obj;
  },
  (obj, i) => {
    obj[`key-${i}`] = i * 2;
    return obj;
  }
);


console.log(results);
