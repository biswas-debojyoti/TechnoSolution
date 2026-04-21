const Settings = require("../models/Settings");
const apiResponse = require("../utils/apiResponse");

/**
 * @desc    Get company settings
 * @route   GET /api/settings
 * @access  Private/Admin
 */
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSingleton();
    return res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching settings",
      error: error.message
    });
  }
};

/**
 * @desc    Update company settings
 * @route   PATCH /api/settings
 * @access  Private/Admin
 */
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    await settings.save();
    
    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating settings",
      error: error.message
    });
  }
};
