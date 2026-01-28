import { useState, useEffect } from "react";

const MusicSelector = ({ objective, onChange }) => {
    const [musicType, setMusicType] = useState("existing");
    const [musicId, setMusicId] = useState("");
    const [error, setError] = useState("");

    // Inform parent whenever music state changes
    useEffect(() => {
        onChange({ musicType, musicId });
    }, [musicType, musicId]);

    // Enforce business rule: No Music not allowed for Conversions
    useEffect(() => {
        if (objective === "Conversions" && musicType === "none") {
            setError("Music is required for Conversion campaigns.");
        } else {
            setError("");
        }
    }, [objective, musicType]);

    return (
        <div>
            <h4>Music Selection</h4>

            {/* Existing Music ID */}
            <div className="radio-row">
                <input
                    type="radio"
                    name="music"
                    checked={musicType === "existing"}
                    onChange={() => setMusicType("existing")}
                />
                <label>Existing Music ID</label>
            </div>

            {musicType === "existing" && (
                <input
                    type="text"
                    placeholder="Enter Music ID"
                    value={musicId}
                    onChange={(e) => setMusicId(e.target.value)}
                />
            )}

            {/* Upload / Custom Music */}
            <div className="radio-row">
                <input
                    type="radio"
                    name="music"
                    checked={musicType === "upload"}
                    onChange={() => setMusicType("upload")}
                />
                <label>Upload / Custom Music</label>
            </div>

            {musicType === "upload" && (
                <button
                    type="button" // IMPORTANT: prevents form submit
                    onClick={() => {
                        const generatedId = "mock_music_" + Date.now();
                        setMusicId(generatedId);
                    }}
                >
                    Simulate Upload Music
                </button>
            )}

            {/* No Music */}
            <div className="radio-row">
                <input
                    type="radio"
                    name="music"
                    checked={musicType === "none"}
                    onChange={() => setMusicType("none")}
                    disabled={objective === "Conversions"}
                />
                <label>No Music</label>
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default MusicSelector;
