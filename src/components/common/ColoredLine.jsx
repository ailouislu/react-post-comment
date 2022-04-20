import React from 'react'

function ColoredLine(props) {
    const color = props.color === undefined ? "black" : props.color;
    const height = props.height === undefined ? 1 : Number(props.height);
    return (
            <hr
                style={{
                    color: color,
                    backgroundColor: props.color,
                    height: height
                }}
            />
    )
}


export default ColoredLine
