import React, { useRef, useEffect } from "react";

import trackTemplates from "../../constants/trackTemplates";

const TrackCanvas = ({ trackName, fullWidth = 200 }) => {
  const canvasRef = useRef(null);

  const height = 0.2 * fullWidth;
  const edgeHeightPerc = 4 / 35;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let xPosition = 0;
    let yStart = 0;
    let yTopHeight = height * edgeHeightPerc;
    let yMidHeight = height * (1 - 2 * edgeHeightPerc);
    let yBottomHeight = height * edgeHeightPerc;

    // collect colours and sizes
    const trackInfo = trackTemplates.find(
      (element) => element.track === trackName
    );

    const trackDrawArray = trackInfo ? trackInfo.drawArray : [];

    const scaler = getScalingFactor(trackDrawArray, fullWidth);

    // Iterate over the rectangles array and draw each rectangle
    trackDrawArray.forEach((rect) => {
      const originalColor = rect.color;
      const darkerColor = darkenColor(originalColor, 20);

      // bottom edge
      ctx.fillStyle = darkerColor;
      ctx.strokeRect(xPosition, yStart, scaler * rect.width, yBottomHeight);
      ctx.fillRect(xPosition, yStart, scaler * rect.width, yBottomHeight);

      // centre
      ctx.fillStyle = originalColor;
      ctx.strokeRect(xPosition, yBottomHeight, scaler * rect.width, yMidHeight);
      ctx.fillRect(xPosition, yBottomHeight, scaler * rect.width, yMidHeight);

      // top edge
      ctx.fillStyle = darkerColor;
      ctx.strokeRect(
        xPosition,
        yBottomHeight + yMidHeight,
        scaler * rect.width,
        yTopHeight
      );
      ctx.fillRect(
        xPosition,
        yBottomHeight + yMidHeight,
        scaler * rect.width,
        yTopHeight
      );

      xPosition += scaler * rect.width; // Update x position for next rectangle
    });
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={fullWidth}
        height={height}
        style={{ border: "double 2px black" }}
      >
        ffdfdf
      </canvas>
    </>
  );
};

// calculate the scale factor that will reduce the sum of rectangle widths to the target value
const getScalingFactor = (array, target) => {
  const widthSum = array.reduce((accumulator, current) => {
    return accumulator + current.width;
  }, 0);
  return widthSum !== 0 ? target / widthSum : 1;
};

function darkenColor(hex, percent) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate the darker color
  const newR = Math.max(0, r - Math.floor(r * (percent / 100)));
  const newG = Math.max(0, g - Math.floor(g * (percent / 100)));
  const newB = Math.max(0, b - Math.floor(b * (percent / 100)));

  // Convert RGB back to hex
  const newHex = `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;

  return newHex;
}

export default TrackCanvas;
