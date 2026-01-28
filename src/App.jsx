import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import OAuthConnect from "./components/OAuthConnect";
import GlobalErrorBanner from "./components/GlobalErrorBanner";
import AdForm from "./components/AdForm";

const App = () => {
  const { accessToken, authError, logout } =
    useContext(AuthContext);

  return (
    <div className="container">
      <h2>TikTok Ads Creative Flow</h2>

      <GlobalErrorBanner message={authError} />

      {!accessToken ? (
        <OAuthConnect />
      ) : (
        <>
          <p>✅ TikTok Ads account connected</p>
          <button onClick={logout}>Disconnect</button>
          <hr />
          <AdForm />
        </>
      )}
    </div>
  );
};

export default App;
