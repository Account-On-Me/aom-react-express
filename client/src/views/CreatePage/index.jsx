import { useContext, useEffect, useState } from "react";
import { AlertManagerContext } from "../../components/AlertManager";
import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { BillTypeTab } from "./BillTypeTab";
import { OrderContext, OrderProvider } from "../../contexts/orderContext";
import { PayerTab } from "./PayerTab";
import { fetchPeopleList } from "../../api/people";
import { CandidateTab } from "./CandidateTab";

const STEPS = [
  {
    label: "Bill Type",
    component: <BillTypeTab />,
  },
  {
    label: "Payer",
    component: <PayerTab />,
  },
  {
    label: "Candidates",
    component: <CandidateTab />,
  },
  {
    label: "Bill Details",
    component: <div>Bill Details Tab</div>,
  }
]

export const CreatePage = () => {
  const { setAlert } = useContext(AlertManagerContext);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <OrderProvider>
      <Paper elevation={0} sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>
        <Box sx={{
          width: "100%",
          mt: '3%',
          boxSizing: "border-box",
        }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map(({ label }, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{
          width: "80%",
          mt: '50px',
          boxSizing: "border-box",
        }}>
          {STEPS[activeStep].component}
        </Box>
        <Box sx={{
          mt: '50px',
          width: "60%",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-start",
        }}>
          {activeStep > 0 && <Button variant="contained" sx={{ mr: 'auto' }} onClick={() => setActiveStep(activeStep - 1)}>Back</Button>}
          {activeStep < STEPS.length - 1 && <Button variant="contained" sx={{ ml: 'auto' }} onClick={() => setActiveStep(activeStep + 1)}>Next</Button>}
        </Box>

      </Paper>
    </OrderProvider>
  )
}