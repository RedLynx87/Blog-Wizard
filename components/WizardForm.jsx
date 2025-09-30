import { useState } from "react";
import { useBlog } from "../pages/context/BlogContext";
import { useRouter } from "next/router";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Card,
} from "@mui/material";
import Pagedetail from "./Blogdetail";

const steps = [
  "Blog Metadata",
  "Blog Summary & Category",
  "Blog Content",
  "Revie & Submit",
];

export default function WizardForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
    content: "",
    date: new Date().toLocaleDateString("id-ID"),
  });

  const categories = ["Tech", "Lifestyle", "Business"];
  const validateStep = (step = activeStep) => {
    if (step === 0) {
      return formData.title.trim() !== "" && formData.author.trim() !== "";
    }
    if (step === 1) {
      return formData.summary.trim() !== "" && formData.category.trim() !== "";
    }
    if (step === 2) {
      return formData.content.trim().length >= 20;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1 && validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStep = (step) => () => {
    if (step <= activeStep || validateStep(activeStep)) {
      setActiveStep(step);
    }
  };
  const { addBlog } = useBlog();
  const handleComplete = () => {
    if (validateStep()) {
      setCompleted({ ...completed, [activeStep]: true });
      setActiveStep((prev) => prev + 1);
      addBlog(formData);
      setFormData({
        title: "",
        author: "",
        summary: "",
        category: "",
        content: "",
        date: new Date().toLocaleDateString("id-ID"),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const allStepsCompleted = () => {
    return Object.keys(completed).length === steps.length;
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      title: "",
      author: "",
      summary: "",
      category: "",
      content: "",
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1024, mx: "auto", mt: 4 }}>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
        >
          Blog created successfully!
        </Alert>
      </Snackbar>
      <div className=" hidden md:block">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                disabled={index > activeStep && !validateStep(activeStep)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className=" block md:hidden">
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                disabled={index > activeStep && !validateStep(activeStep)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>

      <Box sx={{ mt: 4 }}>
        {allStepsCompleted() ? (
          <>
            <Typography variant="h6" gutterBottom>
              All steps are complete! Your blog has been successfully created.
            </Typography>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(formData, null, 2)}
            </pre>
            <Button onClick={handleReset} sx={{ mt: 2 }}>
              Add New Blog
            </Button>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Blog Title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <TextField
                  label="Author Name"
                  required
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Blog Summary"
                  required
                  multiline
                  rows={3}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
                <TextField
                  select
                  label="Blog Category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}

            {activeStep === 2 && (
              <TextField
                label="Blog Content  (min 20 character)"
                required
                multiline
                rows={6}
                fullWidth
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                helperText={
                  formData.content.length < 20
                    ? "Blog content must be at least 20 characters"
                    : ""
                }
              />
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6">Review Blog</Typography>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Pagedetail
                    author={formData.author}
                    category={formData.category}
                    date={formData.date}
                    content={formData.content}
                    title={formData.title}
                    summary={formData.summary}
                  />
                </Card>
              </Box>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep < steps.length - 1 && (
                <Button onClick={handleNext} disabled={!validateStep()}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  onClick={handleComplete}
                  color="primary"
                  variant="contained"
                  disabled={!validateStep()}
                >
                  Submit
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
