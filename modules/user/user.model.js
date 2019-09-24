const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      index: true
    },
    fullName: {
      type: String,
      lowercase: true
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      trim: true,
      type: String,
      enum: ['HR', 'Employee'],
      default: 'Employee'
    },
    department: { type: Schema.ObjectId, ref: 'Department' },
    position: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    address: {
      type: String
    },
    manager: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      sparse: true
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

userSchema.methods.validPassword = function(password) {
  if (!password) return false;
  return bcrypt.compareSync(password, this.password);
};
/**
 * Represents a User.
 * @constructor
 */
mongoose.model('User', userSchema);
