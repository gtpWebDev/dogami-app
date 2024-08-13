import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { ConsumableTooltip } from "../styledComponents/tooltip";

import { v4 as uuidv4 } from "uuid";

/**
 * Generates icons for power stones and consumables with colours from
 * skills.
 * Receives a colour array.
 * Also receives track strat _id to create a unique reference as required in the SVG path
 */

const GameItem = ({ item, type }) => {
  const skillsText = () => {
    const output =
      item.name === "Dragon"
        ? "All Skills!"
        : item.skills.length === 1
        ? item.skills[0].name
        : item.skills[0].name + " / " + item.skills[1].name;
    return output;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <ConsumableTooltip
          title={skillsText()}
          placement="top"
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <Box>
            <GameItemSVG
              item={item}
              type={type}
              uniqueId={uuidv4()}
              width={60}
              height={60}
            />
          </Box>
        </ConsumableTooltip>
      </Grid>
    </Grid>
  );
};

// Using tooltips instead currently
const GameItemText = ({ item }) => {
  const skillsText = () => {
    const output =
      item.name === "Dragon"
        ? "All"
        : item.skills.length === 1
        ? item.skills[0].name.substring(0, 3)
        : item.skills[0].name.substring(0, 3) +
          " / " +
          item.skills[1].name.substring(0, 3);
    return output;
  };

  return (
    <Typography variant="body2" color="primary.contrastText">
      {skillsText()}
    </Typography>
  );
};

export const GameItemSVG = ({ item, type, uniqueId, width, height }) => {
  const colorArray = () => {
    let array = [];
    item.skills.forEach((skill) => {
      array.push(skill.colour);
    });
    return array;
  };

  /**
   * Need to create a color array but also a % offset
   * e.g.
   *  {color: "#000000", offset: "0%"},
   *  {color: "#ffffff", offset: "50%"}
   *  {color: "#00ff00", offset: "100%"}
   */

  const svgColourArray = createSVGColourArray(colorArray());

  const pathArray = getSVGPath(type);

  return (
    <Box>
      <svg width={width} height={height} viewBox="-5 -25.0 110.0 135.0">
        <defs>
          <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
            {svgColourArray.map((item, index) => (
              <stop
                key={index}
                offset={item.offset}
                style={{
                  stopColor: item.style.stopColor,
                  stopOpacity: item.style.stopOpacity,
                }}
              />
            ))}
          </linearGradient>
        </defs>

        {pathArray.map((path, index) => (
          <path
            key={index}
            d={path}
            fill={`url(#${uniqueId})`}
            stroke="black"
            strokeWidth="2"
          />
        ))}
      </svg>
    </Box>
  );
};

/**
 * collect path for item type (powerstone / consumable)
 */
const getSVGPath = (item) => {
  let pathArray = [];
  if (item === "powerstone")
    pathArray = [
      "M33.2102127,21.244009c-0.0522156,0-0.1145821-0.0101528-0.166069-0.0210304l-7.0176659,15.833704h46.9484367   l-7.6514664-15.8127251L33.2102127,21.244009z",
      "M65.635437,19.6214485l14.7524872-7.6616783L65.635437,4.3075581H33.4181366l-14.7524929,7.6522121l14.7422848,7.6616802   L65.635437,19.6214485z",
      "M74.6393509,36.7641563L97.5,24.8921719L81.9165497,12.9984674l-15.0127716,7.7972021L74.6393509,36.7641563z",
      "M2.8326831,26.9081192l43.3320236,64.5088577L24.1450348,38.447979L2.8326831,26.9081192z",
      "M31.5987911,20.5051308L17.013195,12.9362755L2.500001,24.8815918l21.8934288,11.8625145L31.5987911,20.5051308z",
      "M53.1599083,91.5209351L96.252449,27.3666687L74.9085388,38.4591179L53.1599083,91.5209351z",
      "M25.9959431,38.6781845L49.69944,95.6924438l23.3600464-57.0142593H25.9959431z",
    ];

  if (item === "consumable")
    pathArray = [
      "m91.809 64.551c-1.1719-1.3359-3.1758-1.1328-4.8008-0.91406 0.76563 1.2148 1.2773 2.5078 1.6055 3.9648l-3.1641 0.57813c-4.7109-17.039-36.375-0.46484-50.211-14.461-10.309-8.5-9.4336-22.93-5.2656-29.969 2.3008-4.3711-4.0977-8.7852-6.5352-10.418-3.8281-2.2227-7.7617 1.8945-10.484 4.9102-1.4453 1.7656-1.3008 4.3359 0.32031 5.8438 2.9062 2.6797 3.5781 6.8242 3.6914 7.7695-18.941 19.633-10.461 39.57 7.4336 49.426 19.227 10.852 49.867 10.055 62.539-5.0234 0.96094-1.3477 2.168-2.1836 3.5781-2.5039 4.7656-1.0352 3.4141-7.3477 1.2852-9.1992zm-62.816 11.43c-0.41016 0.78516-1.4141 1.1055-2.168 0.67578-4.8789-2.5508-8.8594-6.082-11.543-10.242-3.707-5.7617-4.7188-11.672-3.0195-17.562 0.25781-0.85156 1.1406-1.3477 1.9922-1.0898 0.85156 0.24219 1.3477 1.1406 1.1094 1.9922-3.0039 9.5234 4.0508 19.578 12.938 24.062 0.78516 0.41797 1.0898 1.3789 0.69141 2.168z",
      "m33.906 47.535c6.5469 9.3633 16.805 9.543 27.723 9.293 4.7812-0.17969 10.75-0.84375 15.121 0.30469 6.3008-8.043 6.2305-21.195-0.19141-29.137-0.12891 0.25781-0.28906 0.49609-0.44922 0.73828-1.9648 3.1562-5.3516 5.2812-9.1836 5.2188-1.7539 0-3.5703-0.40234-5.3008-1.0664-0.83594-0.32031-1.2617-1.2656-0.91797-2.0938 0.003907-0.011719 0.007813-0.019531 0.011719-0.03125 0.32812-0.78906 1.2422-1.1719 2.0352-0.85938 12.59 4.957 14.09-12.398 13.707-18.152-0.015626-0.20703-0.19141-0.38672-0.41797-0.36719-9.4531 0.46484-15.297 2.793-17.387 6.9336-0.77344 1.4961-0.96094 3.3008-0.75391 4.8008 2.2578-2.7461 5.2969-4.7344 8.668-5.8828 0.82813-0.28125 1.7383 0.12109 2.0508 0.9375 0.32031 0.83984-0.11328 1.7773-0.96094 2.0742-2.0625 0.72266-4.043 1.7812-5.5977 3.207-3.7617 3.0508-5.7891 8.9453-5.8594 13.355 2.793-0.20703 5.4961 1.418 6.7578 3.9805 0.95703 1.8906-1.8281 3.3555-2.8398 1.4922-1.8477-3.5156-5.6016-2.0547-6.6133-1.5898-1.8828 1.2344-3.6836-1.5547-1.7344-2.7109 0.046874-0.03125 0.51172-0.27344 1.2344-0.53125 0.015626-2.6797 0.46484-6.7266 2.4883-10.66-0.83203-2.2031-1.3398-5.5703-0.30469-8.4609-12.617 0.94531-22.586 11.508-22.586 24.352-0.035157 1.7656 0.0625 3.4883 1.3008 4.8477z",
    ];

  return pathArray;
};

/**
 * Create a style array for corresponding color array
 * Following form for each item:
 *  {
        style: { stopColor: "#000000", stopOpacity: 1 },
        offset: "0%",
    }
    offsets of pattern 0%/100%, 0%/50%/100%, etc.
 */

const createSVGColourArray = (colorArray) => {
  let svgColourArray = [];

  const arrLength = colorArray.length;

  if (arrLength === 0) {
    // empty array, return empty item
    svgColourArray = [
      {
        style: { stopColor: "#000000", stopOpacity: 1 },
        offset: "0%",
      },
      {
        style: { stopColor: "#000000", stopOpacity: 1 },
        offset: "100%",
      },
    ];
  } else if (arrLength === 1) {
    // single colour - start and end same
    svgColourArray = [
      {
        style: { stopColor: colorArray[0], stopOpacity: 1 },
        offset: "0%",
      },
      {
        style: { stopColor: colorArray[0], stopOpacity: 1 },
        offset: "100%",
      },
    ];
  } else {
    colorArray.forEach((colour, index) => {
      const percOffset = `${Math.round(
        index * (100 / (colorArray.length - 1))
      )}%`;
      svgColourArray.push({
        style: { stopColor: colour, stopOpacity: 1 },
        offset: percOffset,
      });
    });
  }

  return svgColourArray;
};

export default GameItem;
