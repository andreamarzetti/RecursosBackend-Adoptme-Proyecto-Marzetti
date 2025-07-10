import adoptionModel from "../dao/models/Adoption.js";

export default class Adoption {
  constructor() {
    this.model = adoptionModel;
  }

  get(params) {
    return this.model.find(params).lean();
  }

  getBy(params) {
    return this.model.findOne(params).lean();
  }

  getById(id) {
    return this.model.findById(id).lean();
  }

  save(doc) {
    const newDoc = new this.model(doc);
    return newDoc.save();
  }

  update(id, doc) {
    return this.model.findByIdAndUpdate(id, doc, { new: true }).lean();
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}
