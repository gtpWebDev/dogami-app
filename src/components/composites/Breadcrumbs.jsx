import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import { NavBarLink } from "../styledComponents/links";

/**
 * Desired breadcrumbs behaviour:
 * Not logged in / home page:
 * - Nothing
 * Logged in, Dashboard:
 * - "Dashboard (inactive)"
 * Dogami page:
 * - "Dashboard / Henry (inactive)"
 * Dogami track page:
 * - "Dashboard / Henry / Track C3 (inactive)"
 *
 * Another time, consider how to set this up so that breadcrumb
 * construction is straight-forward.
 * For now, just deal with the above logic
 */

const constructBreadcrumbArray = (pathArray) => {
  /**
   * Adjust array to the above logic, then it can be mapped into the
   * Mui breadcrumb component
   */

  try {
    if (pathArray[2] === "track" && pathArray[0] === "dogami") {
      return [
        {
          path: "/dashboard",
          text: "DASHBOARD",
          active: true,
        },
        {
          path: `dogami/${pathArray[1]}`,
          text: "DOGAMI",
          active: true,
        },
        {
          path: `dogami/${pathArray[1]}/track/${pathArray[3]}`,
          text: "TRACK",
          active: false,
        },
      ];
    } else if (pathArray[0] === "dogami") {
      return [
        {
          path: "/dashboard",
          text: "DASHBOARD",
          active: true,
        },
        {
          path: `dogami/${pathArray[1]}`,
          text: "DOGAMI",
          active: false,
        },
      ];
    } else if (pathArray[0] === "dashboard") {
      return [
        {
          path: "/dashboard",
          text: "DASHBOARD",
          active: false,
        },
      ];
    } else {
      return [];
    }
  } catch (error) {
    // not a recognised pattern, return no breadcrumb
    return [];
  }
};

const NavBarBreadcrumbs = () => {
  // generate an array of pathname elements
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((x) => x);
  const constructedArray = constructBreadcrumbArray(pathArray);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator=">"
      sx={{
        "& .MuiBreadcrumbs-separator": {
          color: "primary.contrastText",
        },
      }}
    >
      {constructedArray.map((element) => {
        if (!element.active) {
          return (
            <Typography color="primary.unfocused" key={element.path}>
              {element.text}
            </Typography>
          );
        }

        return (
          <NavBarLink linkLoc={element.path} key={element.path}>
            {element.text}
          </NavBarLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavBarBreadcrumbs;
