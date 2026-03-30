import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0, direction = 'up', duration = 0.8 }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '50px'
        });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        const fallbackTimer = setTimeout(() => {
            setVisible(true);
        }, 3000);

        return () => {
            clearTimeout(fallbackTimer);
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const getInitialTransform = () => {
        switch (direction) {
            case 'left': return 'translateX(-50px)';
            case 'right': return 'translateX(50px)';
            case 'scale': return 'scale(0.9)';
            case 'up':
            default: return 'translateY(40px)';
        }
    };

    const getFinalTransform = () => {
        switch (direction) {
            case 'left':
            case 'right': return 'translateX(0)';
            case 'scale': return 'scale(1)';
            case 'up':
            default: return 'translateY(0)';
        }
    };

    return (
        <div
            ref={domRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? getFinalTransform() : getInitialTransform(),
                transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
