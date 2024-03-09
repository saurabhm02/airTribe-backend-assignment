module.exports = mongoose.model("Lead", leadSchema);

const Lead = require("../models/Lead.model");

exports.registerLead = async(req, res) => {
    try{
        const { courseId, name, email, phone, linkedInProfile } = req.body;

        if( !courseId || !name || !email || !phone || !linkedInProfile){
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields."
            });
        }

        const lead = Lead.create({
            course: courseId,
            name,
            email,
            phone,
            linkedInProfile
        });

        return res.status(200).json({
            success: true,
            message: "Lead created successfully.",
            lead,
        });
    }
    catch(error){
        console.log("error in registerLead: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Some error occurred while creating the Lead."
        });
    }
};


exports.updateLeadStatus = async(req, res) => {
    try{
        const { leadId, status } = req.body;
        
        if(!leadId ||!status){
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields."
            });
        }

        const updatedlead = await Lead.findByIdAndUpdate(leadId, {
            status
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Lead status updated successfully.",
            updatedlead
        });
    }
    catch(error){
        console.log("error in updateLeadStatus: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Some error occurred while updating the Lead status."
        });
    }
}

exports.searchLeads = async(req, res) => {
    try{
        const { query } = req.query;

        const searchedLead = await Lead.find({
            $or: [
                {name: { $regex: query, $options: 'i'}},
                {email: {$regex: query, $options: 'i'}}
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Leads searched successfully.",
            searchedLead
        });
    }
    catch(error){
        console.log("error in searchLeads: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Some error occurred while searching the Leads."
        });
    }
};
