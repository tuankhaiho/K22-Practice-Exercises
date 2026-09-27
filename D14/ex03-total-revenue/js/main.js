const salesReport = {
  branch: "Hà Nội",
  revenue: 500,
  subBranches: [
    {
      branch: "Cầu Giấy",
      revenue: 200,
      subBranches: [{ branch: "Cầu Giấy 1", revenue: 50, subBranches: [] }],
    },
    {
      branch: "Đống Đa",
      revenue: 150,
      subBranches: [],
    },
  ],
};

const calculateTotalRevenue = function (report) {
  if (report.subBranches.length === 0) {
    return report.revenue;
  }
  let total = report.revenue;
  for (const subBranch of report.subBranches) {
    total += calculateTotalRevenue(subBranch);
  }
  return total;
};

console.log(calculateTotalRevenue(salesReport));
console.log(
  calculateTotalRevenue({
    branch: "Hải Phòng",
    revenue: 100,
    subBranches: [],
  }),
);