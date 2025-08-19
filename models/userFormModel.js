import mongoose from "mongoose";

const userFormSchema = mongoose.Schema(
  {
    yourName: {
      type: String,
      required: true,
    },
    yourEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormData = mongoose.model("FormData", userFormSchema);
export default FormData;
