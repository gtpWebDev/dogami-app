import { StyledCentredBox } from "../primitives/boxes";
import { TitleHeader } from "../styledComponents/typography";

import backgroundImage from "../../assets/banner3.jpg";

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
      <TitleHeader>Dogami Companion</TitleHeader>
    </StyledCentredBox>
  );
};

export default TitleBar;
