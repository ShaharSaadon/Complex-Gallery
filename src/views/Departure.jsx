import { paintingImageMapping } from "../services/data.service";
import { useEffect, useState } from "react";
import { departureService } from "../services/departure.service";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";

import leftArrow from "../assets/images/left-arrow.svg";
import xCircle from "../assets/images/x-circle.svg";
import circle180 from "../assets/images/180-circle.svg";
import rightArrow from "../assets/images/right-arrow.svg";
import PropTypes from "prop-types";

export function Departure({ setTitle }) {
    const { id } = useParams();
    const [departure, setDeparture] = useState({
        id: "",
        name: "",
        paintings: [],
    });
    const [mainImageNumber, setMainImageNumber] = useState(1);
    const [otherImages, setOtherImages] = useState([]);
    const [mainImageSrc, setMainImage] = useState([]);
    const [isViewMode, setViewMode] = useState(true);
    const [is180degMode, setIs180degMode] = useState(false);
    useEffect(() => {
        loadDeparture();
    }, [id]);

    useEffect(() => {
        console.log("isviewmode", isViewMode);
        document.title = ` ${departure.name}`;
        const departureKey = `${departure.name
            .replace("Complex ", "")
            .toLowerCase()}`;
        setMainImage(paintingImageMapping[`${departureKey}${mainImageNumber}`]);
        const mainImageKey = `${departureKey}${mainImageNumber}`;

        const calculatedOtherImages = Object.entries(departure.paintings)
            .filter(([key, _]) => key !== (mainImageNumber - 1).toString())
            .map(([key, src]) => {
                const namePart = key.replace(/[0-9]/g, "");
                const numberPart = parseInt(key.replace(/\D/g, ""), 10);
                const incrementedNumber = numberPart + 1;
                const newKey = `${departureKey}${namePart}${incrementedNumber}`;

                return (
                    <div key={key} className="image-container">
                        <img
                            src={paintingImageMapping[newKey]}
                            alt={key}
                            className="departure-background-other"
                            style={{ opacity: 1 }}
                            onClick={() =>
                                setMainImageNumber(incrementedNumber)
                            }
                        />
                    </div>
                );
            });

        setOtherImages(calculatedOtherImages);
    }, [departure, mainImageNumber]);

    async function loadDeparture() {
        try {
            const departure = await departureService.getById(id);
            setDeparture(departure);
            setTitle(departure.name);
        } catch (error) {
            "error:", error;
        }
    }

    const updateMainImageNumber = (change) => {
        if (change === "+" && mainImageNumber < departure.paintings.length) {
            setMainImageNumber(mainImageNumber + 1);
        } else if (change === "-" && mainImageNumber > 1) {
            setMainImageNumber(mainImageNumber - 1);
        }
    };

    if (!departure.name) return <Loader />;

    return (
        <div className={`departure-container`}>
            <div className="main-image-container">
                <div
                    className={
                        isViewMode ? "flip-button view-mode" : "flip-button"
                    }
                    onClick={() => setIs180degMode(true)}
                >
                    <img src={circle180} alt="" />
                </div>
                <div
                    className={isViewMode ? "exit view-mode" : "exit"}
                    onClick={() => setViewMode(false)}
                >
                    <img src={xCircle} alt="" />
                </div>
                <div
                    className={isViewMode ? "left view-mode" : "left"}
                    onClick={() => updateMainImageNumber("-")}
                    hidden={mainImageNumber === 1}
                >
                    <img src={leftArrow} alt="" />
                </div>
                {mainImageSrc && (
                    <img
                        src={mainImageSrc}
                        alt={departure.name}
                        className={
                            isViewMode
                                ? "departure-background-main view-mode"
                                : "departure-background-main"
                        }
                        onClick={() => setViewMode(true)}
                    />
                )}
                <div
                    className={isViewMode ? "right view-mode" : "right"}
                    onClick={() => updateMainImageNumber("+")}
                    hidden={mainImageNumber === otherImages.length + 1}
                >
                    <img src={rightArrow} alt="" />
                </div>
            </div>
            <div
                className={
                    isViewMode
                        ? "other-images-container view-mode"
                        : "other-images-container"
                }
            >
                {otherImages}
            </div>
        </div>
    );
}

Departure.propTypes = {
    setTitle: PropTypes.func.isRequired,
};
