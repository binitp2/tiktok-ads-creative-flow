import { useState } from "react";
import MusicSelector from "./MusicSelector";
import { submitAd } from "../api/tiktokAds";
import { mapApiError } from "../utils/errorMapper";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdForm = () => {
    const { accessToken, logout } = useContext(AuthContext);
    const [systemError, setSystemError] = useState("");
    const [loading, setLoading] = useState(false);

    const [music, setMusic] = useState({});
    const [form, setForm] = useState({
        campaignName: "",
        objective: "Traffic",
        adText: "",
        cta: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const validate = () => {
        const newErrors = {};

        if (!form.campaignName || form.campaignName.length < 3) {
            newErrors.campaignName =
                "Campaign name must be at least 3 characters.";
        }

        if (!form.adText) {
            newErrors.adText = "Ad text is required.";
        }

        if (!form.cta) {
            newErrors.cta = "CTA is required.";
        }

        if (
            music.musicType === "none" &&
            form.objective === "Conversions"
        ) {
            newErrors.music =
                "Music is required for Conversion campaigns.";
        }

        if (
            music.musicType === "existing" &&
            !music.musicId
        ) {
            newErrors.music = "Music ID is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSystemError("");

        if (!validate()) return;

        setLoading(true);

        try {
            const payload = {
                ...form,
                music,
            };

            await submitAd({
                token: accessToken,
                adData: payload,
            });

            alert("Ad submitted successfully!");
        } catch (err) {
            const readableMessage = mapApiError(err);
            setSystemError(readableMessage);

            if (err.code === 401) {
                logout(); // force re-auth
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Create Ad</h3>

            <form onSubmit={handleSubmit}>
                <label>Campaign Name</label>
                <input
                    type="text"
                    name="campaignName"
                    value={form.campaignName}
                    onChange={handleChange}
                />
                {errors.campaignName && (
                    <p className="error">{errors.campaignName}</p>
                )}

                <label>Objective</label>
                <select
                    name="objective"
                    value={form.objective}
                    onChange={handleChange}
                >
                    <option value="Traffic">Traffic</option>
                    <option value="Conversions">Conversions</option>
                </select>

                <label>Ad Text</label>
                <textarea
                    name="adText"
                    value={form.adText}
                    onChange={handleChange}
                    maxLength={100}
                />
                {errors.adText && (
                    <p className="error">{errors.adText}</p>
                )}

                <label>CTA</label>
                <input
                    type="text"
                    name="cta"
                    value={form.cta}
                    onChange={handleChange}
                />
                {errors.cta && (
                    <p className="error">{errors.cta}</p>
                )}

                <MusicSelector
                    objective={form.objective}
                    onChange={setMusic}
                />

                {errors.music && (
                    <p className="error">{errors.music}</p>
                )}

                {systemError && (
                    <p className="error">{systemError}</p>
                )}
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Ad"}
                </button>

                {/* <button type="submit">Submit Ad</button> */}
            </form>
        </div>
    );
};

export default AdForm;