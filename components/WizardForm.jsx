import { useState } from "react";
import { useBlog } from "../context/BlogContext";
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
  "Review & Submit",
];

export default function WizardForm() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    category: "",
    content: "",
    date: new Date().toLocaleDateString("en-US"),
  });

  const { addBlog } = useBlog();
  const categories = ["Tech", "Lifestyle", "Business"];

  const validateStep = (step = activeStep) => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      } else if (formData.title.trim().length < 5) {
        newErrors.title = "Title must be at least 5 characters";
      }

      if (!formData.author.trim()) {
        newErrors.author = "Author is required";
      } else if (/\d/.test(formData.author)) {
        newErrors.author = "Author cannot contain numbers";
      } else if (formData.author.trim().length < 3) {
        newErrors.author = "Author must be at least 3 characters";
      }
    }
    if (step === 1) {
      if (!formData.summary.trim()) {
        newErrors.summary = "Summary is required";
      } else if (formData.summary.trim().length < 10) {
        newErrors.summary = "Summary must be at least 10 characters";
      }
      if (!formData.category.trim())
        newErrors.category = "Category is required";
    }
    if (step === 2) {
      if (formData.content.trim().length < 20) {
        newErrors.content = "Content must be at least 20 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStep = (step) => () => {
    if (step <= activeStep && validateStep()) {
      setActiveStep(step);
    }
  };

  const handleComplete = () => {
    if (validateStep()) {
      setCompleted({ ...completed, [activeStep]: true });
      addBlog(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const allStepsCompleted = () =>
    Object.keys(completed).length === steps.length;

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
          Blog has been created successfully!
        </Alert>
      </Snackbar>

      <div className="hidden md:block">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="block md:hidden">
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
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
              All steps completed! Blog has been created.
            </Typography>
            <Button onClick={() => setActiveStep(0)} sx={{ mt: 2 }}>
              Add Another Blog
            </Button>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Blog Title"
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <TextField
                  label="Author Name"
                  required
                  error={!!errors.author}
                  helperText={errors.author}
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
                  error={!!errors.summary}
                  helperText={errors.summary}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
                <TextField
                  select
                  label="Blog Category"
                  required
                  error={!!errors.category}
                  helperText={errors.category}
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
                label="Blog Content (min 20 characters)"
                required
                multiline
                rows={6}
                fullWidth
                error={!!errors.content}
                helperText={errors.content}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
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
                <Button onClick={handleNext}>Next</Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  onClick={handleComplete}
                  color="primary"
                  variant="contained"
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
