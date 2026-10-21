export const inr = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;

export const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good Morning," : h < 17 ? "Good Afternoon," : "Good Evening,";
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();