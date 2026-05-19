function getCookieOptions(overrides = {}) {
  const useCrossOriginCookies =
    process.env.NODE_ENV === "production" ||
    process.env.COOKIE_CROSS_ORIGIN === "true";

  const base = {
    httpOnly: true,
    ...(useCrossOriginCookies && {
      sameSite: "none",
      secure: true,
    }),
  };

  return { ...base, ...overrides };
}

module.exports = { getCookieOptions };
