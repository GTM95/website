import React, { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children }) => {
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

        // Fallback: If IntersectionObserver fails to trigger within 2 seconds
        // (e.g. due to CSS layout issues on mount), force it to be visible.
        const fallbackTimer = setTimeout(() => {
            setVisible(true);
        }, 2000);

        return () => {
            clearTimeout(fallbackTimer);
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={domRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
