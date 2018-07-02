const { default: produce, setUseProxies, setAutoFreeze } = require('immer');

const { testCreate, testModify, testModifyAndSaveIntermediate } = require('../utils');


const results = {};


setUseProxies(true);
setAutoFreeze(false);

testCreate(
  results,
  'immer.js::object',
  () => ({}),
  (obj, i) => produce(obj, draft => {
    draft[`key-${i}`] = i;
  })
);

testModify(
  results,
  'immer.js::object',
  () => ({}),
  (obj, i) => produce(obj, draft => {
    draft[`key-${i}`] = i;
  }),
  (obj, i) => produce(obj, draft => {
    draft[`key-${i}`] = i * 2;
  })
);


testModifyAndSaveIntermediate(
  results,
  'immer.js::object',
  () => ({}),
  (obj, i) => produce(obj, draft => {
    draft[`key-${i}`] = i;
  }),
  (obj, i) => produce(obj, draft => {
    draft[`key-${i}`] = i * 2;
  })
);


console.log(results);
