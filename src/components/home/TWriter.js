import React from "react";
import Typewriter from 'typewriter-effect'


const TWriter = ({text}) => (
    <Typewriter
    options={{
        strings: text,
        loop: true,
        autoStart: true
    }} />
)

export default TWriter;





