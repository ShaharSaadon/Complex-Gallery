import { useEffect, useState } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import PropTypes from 'prop-types';

export function ConfettiFeature({ isSolutionCorrect }) {
    const { width, height } = useWindowSize()
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isSolutionCorrect) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 7000);

            // Clear timeout on component unmount
            return () => clearTimeout(timer);
        }
    }, [isSolutionCorrect]);


    return (
        <div>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                />
            )}
        </div>
    )
}

ConfettiFeature.propTypes = {
    isSolutionCorrect: PropTypes.bool.isRequired,
};