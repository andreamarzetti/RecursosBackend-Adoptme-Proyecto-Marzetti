import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  documents: [documentSchema], // <--- NUEVO
  last_connection: { type: Date } // <--- NUEVO
});

export default mongoose.model("User", userSchema);