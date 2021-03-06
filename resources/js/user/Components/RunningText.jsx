import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const RunningText = ({ text }) => {
    const [key, setKey] = useState(1);

    const scrolling = useSpring({
        from: { transform: "translate(100%,0)" },
        to: { transform: "translate(0%,0)" },
        config: { duration: 10000 },
        reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
            setKey(key + 1);
        },
    });

    return (
        <div className="table-responsive scrollable-hidden font-weight-bold">
            <div key={key}>
                <animated.div style={scrolling}>{text}</animated.div>
            </div>
        </div>
    );
};

export default RunningText;
