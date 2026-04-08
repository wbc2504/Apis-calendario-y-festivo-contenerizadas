const { Counter } = require("../models/counter.model");

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return counter.value;
}

async function syncSequence(name, value) {
  await Counter.findOneAndUpdate(
    { name },
    { $max: { value } },
    { upsert: true, setDefaultsOnInsert: true }
  );
}

module.exports = { getNextSequence, syncSequence };
