'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const currentTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Title: String,
  Description: String,
});

export default mongoose.model('CurrentType', currentTypeSchema);