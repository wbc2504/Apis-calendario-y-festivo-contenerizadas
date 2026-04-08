const { getNextSequence } = require("./counter.service");

class BaseCrudService {
  constructor({ model, sequenceName, searchField }) {
    this.model = model;
    this.sequenceName = sequenceName;
    this.searchField = searchField;
  }

  async list(sortField = this.searchField) {
    return this.model.find().sort({ [sortField]: 1 }).lean();
  }

  async get(id) {
    return this.model.findOne({ id: Number(id) }).lean();
  }

  async search(term) {
    return this.model
      .find({ [this.searchField]: { $regex: term, $options: "i" } })
      .sort({ [this.searchField]: 1 })
      .lean();
  }

  async create(payload) {
    const id = await getNextSequence(this.sequenceName);
    const created = await this.model.create({ ...payload, id });
    return created.toObject();
  }

  async update(payload) {
    if (!payload.id) {
      return null;
    }

    return this.model
      .findOneAndUpdate({ id: Number(payload.id) }, payload, { new: true })
      .lean();
  }

  async remove(id) {
    try {
      const result = await this.model.deleteOne({ id: Number(id) });
      return result.deletedCount > 0;
    } catch (_error) {
      return false;
    }
  }
}

module.exports = { BaseCrudService };
