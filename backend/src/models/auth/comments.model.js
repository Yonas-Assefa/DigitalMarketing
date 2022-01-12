const { mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const commentSchema = mongoose.Schema({
    // _id: { type: String, default: uuidv4().replace(/\-/g, "") },
    comment:{type: String, required:true},
    training: {type: mongoose.Schema.Types.ObjectId, ref:"Training", required:true},
    commentedBy: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true,},
},{
    // toJSON:{virtuals:true},
    timestamps: true,
})


const CommentModel = mongoose.model("Comment", commentSchema)

module.exports = CommentModel