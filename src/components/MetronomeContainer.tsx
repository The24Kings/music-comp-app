import './MetronomeContainer.css';
import React, { useState, useEffect } from 'react';

interface ContainerProps {
    name: string;
}

const MetronomeContainer: React.FC<ContainerProps> = ({ name }) => {
    const imagePaths = [
        '../assets/metronome left lower.jpg',
        '../assets/metronome left upper.jpg',
        '../assets/metronome middle.jpg',
        '../assets/metronome right upper.jpg',
        '../assets/metronome right lower.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                let nextIndex = prevIndex + direction;

                if (nextIndex >= imagePaths.length) {
                    nextIndex = imagePaths.length - 2;
                    setDirection(-1); // Reverse direction
                } else if (nextIndex < 0) {
                    nextIndex = 1;
                    setDirection(1); // Reverse direction back to forward
                }

                return nextIndex;
            });
        }, 1000); // Change image every 1 second (adjust as needed)

        return () => clearInterval(interval);
    }, [direction, imagePaths.length]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
                src={`assets/${imagePaths[currentImageIndex]}`}
                alt="Metronome"
                style={{ maxWidth: '90%', maxHeight: '100%' }}
            />
        </div>
    );
};

export default MetronomeContainer;
