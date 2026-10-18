export const firstImageUrl = (value: unknown): string => {
  if (Array.isArray(value)) {
    return String(value.find((image) => String(image || "").trim()) || "/images/default.jpg");
  }

  return String(value || "")
    .split(",")
    .map((image) => image.trim())
    .find(Boolean) || "/images/default.jpg";
};
