const { HeapDiff } = require('node-memwatch');

/**
 *
 */
const fillByFunc = (obj, fn, count) => {
  let out = obj;
  for (let i = 0; i < count; i++) {
    out = fn(out, i);
  }
  return out;
};

/**
 *
 */
const fillByFuncAndSaveIntermediate = (obj, fn, count, step) => {
  let out = obj;
  let intermediates = new Array();
  for (let i = 0; i < count; i++) {
    out = fn(out, i);
    if (count % step === 0) {
      intermediates.push(out);
    }
  }
  return {
    obj,
    intermediates
  };
};

/**
 *
 */
const record = (count, fn) => {
  global.gc();
  // const hd = new HeapDiff();
  const memBefore = process.memoryUsage().heapUsed;

  const data = new Array();
  for (let i = 0; i < count; ++i)
    data.push(fn());

  global.gc();
  // const diff = hd.end();
  // return diff.change.size_bytes / count;
  const memAfter = process.memoryUsage().heapUsed;

  return (memAfter - memBefore) / count;
};


const NUMBER_OF_EXPERIMENTS = 50;
const EXPERIMENT_SIZES = [10, 100, 1000];


const testCreate = (results, prefix, initFunc, setFunc) => {
  for (const count of EXPERIMENT_SIZES) {
    results[`${prefix}::create::${count} items`] = record(
      NUMBER_OF_EXPERIMENTS,
      () => fillByFunc(
        initFunc(),
        setFunc,
        count,
      ));
  }
};

const testModify = (results, prefix, initFunc, setFunc, modifyFunc) => {
  for (const count of EXPERIMENT_SIZES) {
    results[`${prefix}::modify::${count} items`] = record(
      NUMBER_OF_EXPERIMENTS,
      () => {
        const obj = fillByFunc(
          initFunc(),
          setFunc,
          count,
        );

        return fillByFunc(
          obj,
          modifyFunc,
          count,
        );
      },
    );
  }
};

const testModifyAndSaveIntermediate = (results, prefix, initFunc, setFunc, modifyFunc) => {
  for (const count of EXPERIMENT_SIZES) {
    results[`${prefix}::modify-and-save-intermediate-every-10th::${count} items`] = record(
      NUMBER_OF_EXPERIMENTS,
      () => {
        const obj = fillByFunc(
          initFunc(),
          setFunc,
          count,
        );

        return fillByFuncAndSaveIntermediate(
          obj,
          modifyFunc,
          count,
          10,
        );
      },
    );
  }
};



module.exports = {
  testCreate,
  testModify,
  testModifyAndSaveIntermediate
};
