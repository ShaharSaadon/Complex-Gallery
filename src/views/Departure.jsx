import { paintingImageMapping } from "../services/data.service";
import { useEffect, useState } from "react";
import { departureService } from "../services/departure.service";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left-arrow.png";
import xCircle from "../assets/images/close.png";
import rightArrow from "../assets/images/right-arrow.png";
import goBackArrow from "../assets/images/go-back.svg";
import PropTypes from "prop-types";

export function Departure({ setTitle, setIsBackgroundDark  }) {
    const navigate = useNavigate();
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
    const [isVisibleMode, setIsVisibleMode] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        setIsBackgroundDark(true)
        loadDeparture();
    }, [id]);

    useEffect(() => {
        document.title = ` ${departure.name}`;
        const departureKey = `${departure.name
            .replace("Complex ", "")
            .toLowerCase()}`;
        setMainImage(paintingImageMapping[`${departureKey}${mainImageNumber}`]);

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
        handleVisbleMode();
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
        const totalImages = departure.paintings.length;

        if (change === "+") {
            const newImageNumber =
                mainImageNumber >= totalImages ? 1 : mainImageNumber + 1;
            setMainImageNumber(newImageNumber);
        } else if (change === "-") {
            const newImageNumber =
                mainImageNumber <= 1 ? totalImages : mainImageNumber - 1;
            setMainImageNumber(newImageNumber);
        }
    };

    const handleExitViewMode = () => {
        setIsBackgroundDark(false)
            navigate('/');
    };

    const handleVisbleMode = () => {
        setIsVisibleMode(true);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setIsVisibleMode(false);
        }, 3500);

        setTimeoutId(newTimeoutId);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    if (!departure.name) return <Loader />;

    return (
        <div className={`departure-container`}>
                    <div className="overlay"></div>

            <div className="main-image-container">
                {!isViewMode?  <div className="back" onClick={handleExitViewMode}>
                    <img
                        src={goBackArrow}
                        alt="back-arrow"
                        className="go-back-arrow"
                    />
                </div> : ""}
                
               

                <div
                    className={`${isViewMode ? "exit view-mode" : "exit"} ${
                        isVisibleMode ? "visible" : ""
                    }`}
                    onClick={handleExitViewMode}
                >
                    <img src={xCircle} alt="" />
                </div>
                
                <div
                    className={`${isViewMode ? "left view-mode" : "left"} ${
                        isVisibleMode ? "visible" : ""
                    }`}
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
                        onClick={() => {
                            setViewMode(true);
                            handleVisbleMode();
                        }}
                        onContextMenu={handleContextMenu}
                    />
                )}
                <div
                    className={`${isViewMode ? "right view-mode" : "right"} ${
                        isVisibleMode ? "visible" : ""
                    }`}
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
    setIsBackgroundDark: PropTypes.func.isRequired,
};
