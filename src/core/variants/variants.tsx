// Differents Motion Variants

// variant For incomming movement of cards this help to...
export const incoming = {
    hidden: { y: 100, opacity: 0 },
    visible: (index: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: index * 0.1, 
            duration: 0.3,
            ease: 'easeOut',
        },
    }),
};

