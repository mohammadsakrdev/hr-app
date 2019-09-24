const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    location: {
      type: String
    },
    manager: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: { type: Schema.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);
/**
 * Represents a Department.
 * @constructor
 */
mongoose.model('Department', departmentSchema);
