const { List, Map } = require('immutable');

const { testCreate, testModify, testModifyAndSaveIntermediate } = require('../utils');


const results = {};


testCreate(
  results,
  'immutable.js::map',
  () => Map(),
  (map, i) => map.set(`key-${i}`, i)
);

testModify(
  results,
  'immutable.js::map',
  () => Map(),
  (map, i) => map.set(`key-${i}`, i),
  (map, i) => map.set(`key-${i}`, i * 2)
);

testModifyAndSaveIntermediate(
  results,
  'immutable.js::map',
  () => Map(),
  (map, i) => map.set(`key-${i}`, i),
  (map, i) => map.set(`key-${i}`, i * 2)
);


console.log(results);
