import { Schema, model } from "mongoose";

const RecordSchema = Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

RecordSchema.pre("save", function (next) {
  let docs = this;
  model("Record", RecordSchema).countDocuments(function (error, counter) {
    if (error) return next(error);
    docs.id = counter + 1;
    next();
  });
});

export default model("Record", RecordSchema);
