import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FromScratchToolBox } from "../Wrappers";

function FromScratchToolBar({ addBox, addElementImage, handleButtonClick, fileInputRef }) {
  return (
    <FromScratchToolBox>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => addBox("title")}
      >
        Add Title
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => addBox("body")}
      >
        Add Text
      </Button>


      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleButtonClick}
      >
        Add Image
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={addElementImage}
          accept="image/*"
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addBox}
      >
        Add Box
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addBox}
      >
        Add Arrow
      </Button>
    </FromScratchToolBox>
  );
}

export default FromScratchToolBar;
