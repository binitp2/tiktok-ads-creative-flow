// Simulated TikTok Ads API
export const submitAd = async ({ token, adData }) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 800));

  // 1️⃣ OAuth token missing or expired
  if (!token || token.includes("expired")) {
    throw { code: 401 };
  }

  // 2️⃣ INVALID MUSIC — validate FIRST (business error)
  if (
    adData.music.musicType === "existing" &&
    adData.music.musicId &&
    adData.music.musicId.includes("invalid")
  ) {
    throw { code: "INVALID_MUSIC" };
  }

  // 3️⃣ GEO-RESTRICTION — infra-level error AFTER validation
  if (Math.random() < 0.2) {
    throw { code: 403 };
  }

  // 4️⃣ SUCCESS
  return {
    success: true,
    ad_id: "mock_ad_" + Date.now(),
  };
};
