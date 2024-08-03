import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

/**
 * This link component has been created to deal in a single location
 * with the clash of Link imports from both material UI and
 * react-router-dom
 *
 * The component prop in a Material UI Link component allows you to
 * render the Link as a different React component.
 * This is especially useful when you want to integrate with
 * routing libraries like react-router-dom, which provide their own
 * Link component for navigation.
 */

const CompositeLink = ({ children, linkLoc }) => {
  return (
    <Link underline="none" component={RouterLink} to={linkLoc}>
      {children}
    </Link>
  );
};

export default CompositeLink;
