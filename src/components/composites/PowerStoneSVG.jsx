import React from "react";

export const PowerStoneSVG = (props) => {
  // can't get props to work currently!
  // const red = "#cc0000";
  // const purple = "#6600cc";
  // console.log("red", red);
  // console.log("props.colorTwo", props.colorTwo);

  const startColour = { stopColor: props.colorOne, stopOpacity: 1 };
  const endColour = { stopColor: props.colorTwo, stopOpacity: 1 };

  return (
    <div>
      <svg width="50" height="50" viewBox="-5.0 -25.0 110.0 135.0">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={startColour} />
            <stop offset="45%" style={startColour} />
            <stop offset="55%" style={endColour} />
            <stop offset="100%" style={endColour} />
          </linearGradient>
        </defs>

        <path
          d="M33.2102127,21.244009c-0.0522156,0-0.1145821-0.0101528-0.166069-0.0210304l-7.0176659,15.833704h46.9484367   l-7.6514664-15.8127251L33.2102127,21.244009z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M65.635437,19.6214485l14.7524872-7.6616783L65.635437,4.3075581H33.4181366l-14.7524929,7.6522121l14.7422848,7.6616802   L65.635437,19.6214485z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M74.6393509,36.7641563L97.5,24.8921719L81.9165497,12.9984674l-15.0127716,7.7972021L74.6393509,36.7641563z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M2.8326831,26.9081192l43.3320236,64.5088577L24.1450348,38.447979L2.8326831,26.9081192z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M31.5987911,20.5051308L17.013195,12.9362755L2.500001,24.8815918l21.8934288,11.8625145L31.5987911,20.5051308z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M53.1599083,91.5209351L96.252449,27.3666687L74.9085388,38.4591179L53.1599083,91.5209351z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
        <path
          d="M25.9959431,38.6781845L49.69944,95.6924438l23.3600464-57.0142593H25.9959431z"
          fill="url(#gradient1)"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    </div>
  );
};
export default PowerStoneSVG;
