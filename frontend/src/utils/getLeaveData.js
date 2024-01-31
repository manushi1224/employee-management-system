const getLeaveData = (leaves) => {
  return leaves.filter((leaves) => leaves.leave_status === "pending")
    .length;
};

export default getLeaveData;
