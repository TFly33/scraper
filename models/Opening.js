// So this page needs to set the parameters for the openings as they enter the database. Then I will have a separate "notes.js" which will include the notes for each opening. 
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var OpeningSchema = new Schema({
    // `title` is required and of type String
    title: {
        type: String,
        required: true,
    },
    // `link` is required and of type String
    link: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    saved: {
        default: false,
        type: Boolean,
        require: true
    },
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
    // GOING TO ADD AN IMAGE HERE BUT WANT TO GET IT WORKING FIRST
});

// This creates our model from the above schema, using mongoose's model method
var Opening = mongoose.model("Opening", OpeningSchema);

// Export the openings model
module.exports = Opening;
