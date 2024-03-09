const Comment = require("../models/Comment.model");
const Lead = require("../models/Lead.model");


exports.createComment = async (req, res) => {
    try {
        const { leadId } = req.params;
        const { instructorId, commentText } = req.body;

        if (!instructorId || !commentText) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const leadExists = await Lead.exists({ _id: leadId });
        if (!leadExists) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        const newComment = await Comment.create({
            lead: leadId,
            instructor: instructorId,
            comment: commentText
        });

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            { $push: { comments: newComment._id } },
            { new: true }
        ).populate("comments").exec();

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: updatedLead
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the comment"
        });
    }
};
