import PropTypes from "prop-types";

export function AppHeader({ title }) {
    return (
        <div className="app-header full">
            <h1 className="title">{title}</h1>
        </div>
    );
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired,
};
