'use client'
import { motion, useAnimation } from 'framer-motion';

interface WorkInProgressProps {
    pageTitle: string;
}

function WorkInProgress({ pageTitle }: WorkInProgressProps) {
    const controls = useAnimation();

    const handleDragEnd = async () => {
        await controls.start({
            x: 0,
            y: 0,
            transition: { type: 'spring', stiffness: 300 }
        });
    };

    return (
        <>
            <div className="bg-gradient-to-br from-orange-300 via-purple-500 to-blue-400 w-full min-w-[100vw] min-h-[100vh] h-full items-center justify-center flex align-middle">
                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    whileDrag={{ scale: 1.5 }}
                    onDragEnd={handleDragEnd}
                    whileHover={{scale:1.05}}
                    animate={controls}
                    className="w-48 h-48 text-black bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 flex flex-col items-center justify-center">
                    <h1 className="font-bold">Page: {pageTitle}</h1>
                    <h2>Work In Progress</h2>
                </motion.div>
            </div>
        </>
    );
}

export default WorkInProgress;