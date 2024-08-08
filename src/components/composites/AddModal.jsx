import { useState, createContext, useContext } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

/**
 * Modal structure - button to open and the modal itself
 * Note, due to how the Material UI modal works, one of only a few
 * acceptable children is a PURE MATERIAL UI COMPONENT
 * Practically, just add a box to the child.
 */

// export const ModalContext = createContext({
//   testText: "",
//   handleClose: () => {},
// });

export default function AddModal({ buttonText, children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [testText, setTestText] = useState("test");

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {buttonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box>
          {children}
          <Button onClick={handleClose}>Button</Button>
        </Box>
      </Modal>
    </div>
  );
}
