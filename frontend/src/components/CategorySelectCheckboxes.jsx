import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";

function CategorySelectCheckboxes({ handleCategoryChange }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} style={{ width: "40%" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Self-Care"
            onChange={(e) =>
              handleCategoryChange("Self-Care", e.target.checked)
            }
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Routines"
            onChange={(e) => handleCategoryChange("Routines", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="School"
            onChange={(e) => handleCategoryChange("School", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Work"
            onChange={(e) => handleCategoryChange("Work", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Fun Activities"
            onChange={(e) =>
              handleCategoryChange("Fun Activities", e.target.checked)
            }
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Emotional Regulation"
            onChange={(e) =>
              handleCategoryChange("Emotional Regulation", e.target.checked)
            }
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6} style={{ width: "40%" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Beliefs and Practices"
            onChange={(e) =>
              handleCategoryChange("Beliefs and Practices", e.target.checked)
            }
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Health and Wellbeing"
            onChange={(e) =>
              handleCategoryChange("Health and Wellbeing", e.target.checked)
            }
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Transport"
            onChange={(e) =>
              handleCategoryChange("Transport", e.target.checked)
            }
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Events"
            onChange={(e) => handleCategoryChange("Events", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Places"
            onChange={(e) => handleCategoryChange("Places", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "#000CA4" }} />}
            label="Other"
            onChange={(e) => handleCategoryChange("Other", e.target.checked)}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default CategorySelectCheckboxes;
