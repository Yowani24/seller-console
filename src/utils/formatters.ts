export const getScoreColor = (score: number): string => {
  if (score >= 90) return "text-green-600 bg-green-50";
  if (score >= 80) return "text-blue-600 bg-blue-50";
  if (score >= 70) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

export const getStatusColor = (status: string): string => {
  const colors = {
    new: "bg-gray-100 text-gray-800",
    contacted: "bg-blue-100 text-blue-800",
    qualified: "bg-green-100 text-green-800",
    unqualified: "bg-red-100 text-red-800",
    converted: "bg-purple-100 text-purple-800",
  };
  return colors[status as keyof typeof colors] || colors.new;
};
