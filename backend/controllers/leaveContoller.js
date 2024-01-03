const userModel = require("../models/user");

const applyForLeave = async (req, res, next) => {
  const { leaveDays, leaveStartDate, leaveEndDate } = req.body.leaveDate;

  const uid = req.params.uid;

  try {
    const user = await userModel.findOneAndUpdate(
      {
        _id: uid,
      },
      {
        $push: {
          leaveDate: {
            startDate: leaveStartDate,
            leaveDate: leaveEndDate,
            leave_status: "pending",
            leaveDays: leaveDays,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "Could not find the user!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const leaveEmployee = async (req, res, next) => {
  let foundUser;
  try {
    foundUser = await userModel.find({
      leaveDate: {
        $elemMatch: {
          leave_status: { $in: "pending" },
        },
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Could not find any user!", success: false });
  }
  res.status(200).send({ message: "User Found", user: foundUser });
};

const approveLeave = async (req, res, next) => {
  const { applyForLeave } = req.body;
  const permission = applyForLeave ? "approved" : "rejected";

  const leave_id = req.params.leaveId;
  try {
    const user = await userModel.findOneAndUpdate(
      {
        "leaveDate._id": leave_id,
        "leaveDate.leave_status": "pending",
      },
      {
        $set: {
          "leaveDate.$.leave_status": permission,
        },
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find the user or leave is not pending!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getLeaveData = (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = userModel.findById(uid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  applyForLeave,
  leaveEmployee,
  approveLeave,
  getLeaveData,
};
