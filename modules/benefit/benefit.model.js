const mongoose = require('mongoose');
const { Schema } = mongoose;

const benefitSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    benefitType: {
      type: String,
      enum: ['Offer', 'Medical', 'News'],
      default: 'Offer'
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
 * Represents a Benefit.
 * @constructor
 */
mongoose.model('Benefit', benefitSchema);
