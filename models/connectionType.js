'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const connectionTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Title: String,
  FormalName: String,
});

export default mongoose.model('ConnectionType', connectionTypeSchema);