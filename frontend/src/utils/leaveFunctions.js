export function getLeaveData (leaves) {
  return leaves.filter((leaves) => leaves.leave_status === "pending").length;
};

export function calculateTotalDaysSelected(start, end) {
  const startDate = start;
  const endDate = end;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = Math.abs(end.getTime() - start.getTime());
    const totalDaysSelected = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return totalDaysSelected;
  } else {
    return 0;
  }
};
