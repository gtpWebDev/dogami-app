import { StyledCentredBox } from "../primitives/boxes";
import { StyledTitleHeader } from "../styledComponents/typography";

import backgroundImage from "../../assets/dogami-header.jpg";

/**
 * This TitleBar component sits above the actual App Bar
 * It scrolls off the screen, whereas the app bar does not.
 *
 */

export const TitleBar = () => {
  return (
    <StyledCentredBox
      minHeight="200px"
      // alignItems="center"
      container="header"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "primary.main",
      }}
    >
      <StyledTitleHeader>Dogami App</StyledTitleHeader>
    </StyledCentredBox>
  );
};

export default TitleBar;
