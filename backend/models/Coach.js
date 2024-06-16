const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    name : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
    age : {
        type : Number,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    rating : {
        type : Number,
        require : true
    },
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'Club'
    }
})

const Coach = mongoose.model("Coach",CoachSchema);
module.exports = Coach;