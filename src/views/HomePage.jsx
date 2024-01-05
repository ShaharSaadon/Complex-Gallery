import { useSelector, useDispatch } from "react-redux";
import { loadDepartures } from "../store/actions/departure.actions";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";

import { departureImageMapping } from "../services/data.service";
import PropTypes from "prop-types";

export function HomePage({ setTitle }) {
    const dispatch = useDispatch();

    const departures = useSelector(
        (storeState) => storeState.departureModule.departures
    );

    useEffect(() => {
        document.title = "Complex Paintings";
        dispatch(loadDepartures());
        setTitle("Complex Paintings");
    }, []);

    if (!departures || departures.length === 0) return <Loader />;
    return (
        <div className="cards-container">
            {Array.isArray(departures) &&
                departures.map((departure, index) => (
                    <div
                        className={`departure-card ${
                            index === 2 ? "complex-nature" : ""
                        }`}
                        key={departure._id}
                    >
                        <Link to={`/departure/${departure._id}`}>
                            <img
                                src={departureImageMapping[departure.picture]}
                                alt={departure.name}
                                className="departure-background"
                            />
                            <div className="overlay"></div>

                            <div className="title-container">
                                <h1 className="departure-title">
                                    {departure.name}
                                </h1>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
}

HomePage.propTypes = {
    setTitle: PropTypes.func.isRequired,
};
