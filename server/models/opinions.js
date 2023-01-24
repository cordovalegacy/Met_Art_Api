const mongoose = require('mongoose')

const OpinionSchema = new mongoose.Schema(
    {
        title:{
            type: String,
        },

        artistDisplayName:{
            type: String, 
        },

        objectBeginDate:{
                type: String, 
        },

        objectEndDate:{
            type: String, 
        },

        objectName:{
            type: String, 
        },

        culture:{
            type: String, 
        },

        artistNationality:{
            type: String, 
        },

        creditLine:{
            type: String, 
        },

        primaryImage:{
            type: String, 
        },

        author:{
            type: String, 
            required: [true, "Please enter your name"],
            minLength: [3, "Must contain at least three characters"],
            maxLength: [25, "Cannot exceed twenty-five characters"]
        },

        email:{
            type: String, 
            required : [true, "Email Address is required"],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(v);
            },
            message: "Please enter a valid email address",
        }
        },

        opinionContent:{
            type: String, 
            required: [true, "Tell us what you think!"],
            minLength: [10, "Must contain at least ten characters"],
            maxLength: [300, "Cannot exceed three-hundred characters"]
        },

        rating:{
            type: Number, 
            min: [0, "Minimum rating is a zero"],
            max: [10, "Max rating is a ten"],
            required: [true, "Rate this piece"]
        },

    },
    {timestamps: true}
);

const Opinion = mongoose.model('Opinion', OpinionSchema)

module.exports = Opinion;