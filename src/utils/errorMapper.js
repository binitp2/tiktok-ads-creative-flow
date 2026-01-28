export const mapApiError = (error) => {
  switch (error.code) {
    case 401:
      return "Your TikTok session has expired. Please reconnect your account.";

    case 403:
      return "TikTok Ads API is not available in your region.";

    case "INVALID_MUSIC":
      return "Selected music is invalid or not approved.";

    default:
      return "Something went wrong. Please try again.";
  }
};
