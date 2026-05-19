const JWT_SECRET =
  process.env.JWT_SECRET || "DEV@Tinder$790";

if (
  process.env.NODE_ENV === "production" &&
  (!process.env.JWT_SECRET || process.env.JWT_SECRET === "DEV@Tinder$790")
) {
  console.warn(
    "Warning: Set a strong JWT_SECRET in production environment variables."
  );
}

module.exports = JWT_SECRET;
