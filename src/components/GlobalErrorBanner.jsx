const GlobalErrorBanner = ({ message }) => {
    if (!message) return null;

    return (
        <div style={{ color: "red", marginBottom: "12px" }}>
            {message}
        </div>
    );
};

export default GlobalErrorBanner;
