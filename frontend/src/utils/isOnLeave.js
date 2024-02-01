const isOnLeave = (D1, D3) => {
  D3 = new Date(D3);
  let isOnLeave = false;
  let startDate = Date.now();
  let endDate = Date.now();
  for (const d in D1) {
    startDate = new Date(D1[d].startDate);
    endDate = new Date(D1[d].leaveDate);
    if (
      D3.getTime() <= endDate.getTime() &&
      D3.getTime() >= startDate.getTime()
    ) {
      isOnLeave = true;
      break;
    }
  }
  return { isOnLeave, startDate, endDate };
};

const userOnLeave = (employee) => {
  const user = employee.map((emp) => {
    const leaveData = isOnLeave(emp.leaveDate, Date.now());
    if (leaveData.isOnLeave) {
      return {
        name: emp.name,
        image: emp.image,
        startDate: leaveData.startDate.toISOString().split("T")[0],
        endDate: leaveData.endDate.toISOString().split("T")[0],
      };
    }
    return null;
  });

  return user.filter((user) => user !== null);
};

export default userOnLeave;
