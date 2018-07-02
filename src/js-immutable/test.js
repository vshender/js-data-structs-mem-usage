const { testCreate, testModify, testModifyAndSaveIntermediate } = require('../utils');


const results = {};


testCreate(
  results,
  'js-immutable::object',
  () => ({}),
  (obj, i) => ({
    ...obj,
    [`key-${i}`]: i
  })
);

testModify(
  results,
  'js-immutable::object',
  () => ({}),
  (obj, i) => ({
    ...obj,
    [`key-${i}`]: i
  }),
  (obj, i) => ({
    ...obj,
    [`key-${i}`]: i * 2
  })
);


testModifyAndSaveIntermediate(
  results,
  'js-immutable::object',
  () => ({}),
  (obj, i) => ({
    ...obj,
    [`key-${i}`]: i
  }),
  (obj, i) => ({
    ...obj,
    [`key-${i}`]: i * 2
  })
);


console.log(results);
