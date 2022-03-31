'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const levelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Title: String,
  Comments: String,
  IsFastChargeCable: Boolean
});

export default mongoose.model('Level', levelSchema);