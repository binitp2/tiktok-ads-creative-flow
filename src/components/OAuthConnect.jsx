import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OAuthConnect = () => {
    const { login, setAuthError } = useContext(AuthContext);

    const handleMockOAuth = () => {
        // Simulate geo-restricted OAuth failure
        setAuthError(
            "TikTok Ads OAuth is not available in your region. Using mock authentication."
        );

        // Simulate successful OAuth login
        const mockToken = "mock_access_token_" + Date.now();
        login(mockToken);
    };

    return (
        <button onClick={handleMockOAuth}>
            Connect TikTok Ads Account
        </button>
    );
};

export default OAuthConnect;
