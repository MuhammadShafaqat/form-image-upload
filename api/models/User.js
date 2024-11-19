const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    image: {
        type: String, // Use String for a single image
        required: true, // Add validation
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("User", UserSchema)