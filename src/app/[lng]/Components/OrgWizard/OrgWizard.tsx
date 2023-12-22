import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Dialog, SelectChangeEvent, DialogContent, Stepper, Step, StepLabel, DialogActions } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {addresses, questions} from "./res";
import RadioStep from "./RadioStep";
import SelectStep from "./SelectStep";

export interface Question {
  id: string;
  text: string;
  filtering: boolean;
  options: string[];
  followUpsTrue?: Question[];
  followUpsFalse?: Question[];
}   

interface OrgWizardProps {
  open: boolean;
  onClose: () => void;
}

interface Data {
  name: string;
  phone: string;
  website: string;
  relevant_population: string[];
  notes: string;
  original_home: string;
  current_home: string;
  bituh_leumi: string;
  traume: string[];
  family_injured: string;
  macabi: string;
  destress: string;
  leng: string;
}
interface DataObj {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
}

function OrgWizard({open, onClose}: OrgWizardProps) {

  const [activeFollowUp, setActiveFollowUp] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [currentAddress, setCurrentAddress] = useState(addresses[0]);
  const [originAddress, setOriginAddress] = useState(addresses[0]);
  const [isHomless, setIsHomless] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [results, setResults] = useState<Data[]>([]);
  const [dataObj, setDataObj] = useState<DataObj>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const [q5, setQ5] = useState<string>("");
  const [q6, setQ6] = useState<string>("");
  const [q7, setQ7] = useState<string>("");
  const [q8, setQ8] = useState<string>("");
  const [q9, setQ9] = useState<string>("");
  const [q10, setQ10] = useState<string>("");
  const [q11, setQ11] = useState<string>("");

  const { t } = useTrans();

  useEffect(() => {
    if (q2 === "כן") {
      setIsHomless(true);
    } else if (q2 === "לא") {
      setIsHomless(false);
    }
  }, [q2])

  const filterQ1 = () => {
    let dataFromQ1: string = "";
      switch (dataObj?.q1) {
        case "מתחת לגיל 18":
          dataFromQ1 = "ילד"
          break;
        case "מעל גיל 18":
          dataFromQ1 = "מבוגר"
          break;
        case "חייל/משרת כרגע במילואים":
          dataFromQ1 = "חייל"
          break;
      }
    return dataFromQ1;
  }

  const filterQ2 = () => {
    let dataFromQ2: boolean = false;
      switch (dataObj?.q2) {
        case "כן":
          dataFromQ2 = true
          break;
        case "לא":
          dataFromQ2 = false
          break;
      }
    return dataFromQ2;
  }

  const filterQ3 = () => {
    let dataFromQ3: string = "";
      switch (dataObj?.q3) {
        case "פוניתי על ידי המדינה":
          dataFromQ3 = "מדינה"
          break;
        case "התפניתי עצמאית":
          dataFromQ3 = "עצמאית"
          break;
      }
    return dataFromQ3;
  }

  const filterQ4 = () => {
    let dataFromQ4: string = "";
      switch (dataObj?.q4) {
        case "לא":
          dataFromQ4 = "לא"
          break;
        case "כן, בשניהם":
          dataFromQ4 = "שניהם"
          break;
        case "כן, בביטוח לאומי":
          dataFromQ4 = "ביטוח לאומי"
          break;
        case "כן, ברווחה":
          dataFromQ4 = "רווחה"
          break;
      }
    return dataFromQ4;
  }

  

  useEffect(() => {
    const answers = {
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      q11,
    }
    setDataObj(answers)
  }, [isSubmit])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("url");
      const data = await res.json();
      setData(data);
    }
    getData();
  }, [])

  const handleNext = () => {
    if (activeStep === 2) {
      setActiveFollowUp((prevActiveFollowUp) => prevActiveFollowUp + 1);
    }
    if (activeStep !== 2 || (isHomless && activeFollowUp >= 2) || (!isHomless && activeFollowUp >= 0)) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 4) {
      setActiveFollowUp(0);
    }
  };
}

  const handleCurrentAddress = (event: SelectChangeEvent) => {
    setCurrentAddress(event.target.value);
  }
  const handleOriginAddress = (event: SelectChangeEvent) => {
    setOriginAddress(event.target.value);
  }

  const handleQ1 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ1(event.target.value);
  }
  const handleQ2 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ2(event.target.value);
  }
  const handleQ3 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ3(event.target.value);
  }
  const handleQ4 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ4(event.target.value);
  }
  const handleQ5 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ5(event.target.value);
  }
  const handleQ6 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ6(event.target.value);
  }
  const handleQ7 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ7(event.target.value);
  }
  const handleQ8 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ8(event.target.value);
  }
  const handleQ9 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ9(event.target.value);
  }
  const handleQ10 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ10(event.target.value);
  }
  const handleQ11 = (event: ChangeEvent<HTMLInputElement>) => {
    setQ11(event.target.value);
  }

  const handleHomless = (value: boolean) => {
    setIsHomless(value);
  }

  const handleSubmit = () => {
    setIsSubmit(true)
  };

  function GetStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <RadioStep
            setValue={handleQ1}
            question={questions[step]}
          />
        )
      case 1:
        return (
          <RadioStep
          setValue={handleQ2}
            question={questions[step]}
          />
        )
      case 2:
        if (isHomless) {
          switch (activeFollowUp) {
            case 0:
              return (
                <RadioStep
                    setValue={handleQ11}
                    question={questions[2]}
                />
              )
            case 1:
              return (
                <SelectStep
                currentOrOrigin={'current'}
                address={currentAddress}
                handleAddress={handleCurrentAddress}
            />
              )
              case 2:
              return (
                <SelectStep
                currentOrOrigin={'origin'}
                address={originAddress}
                handleAddress={handleOriginAddress}
            />
              )
            default:
              return;
          }
        } else {
          return (
            <SelectStep
            currentOrOrigin={'current'}
            address={currentAddress}
            handleAddress={handleCurrentAddress}
        />
          )
        }
        case 3:
          return (
            <RadioStep
              setValue={handleQ3}
              question={questions[step]}
              isHomless={handleHomless}
            />
          )
      case 4:
        return (
          <RadioStep
          setValue={handleQ4}
            question={questions[step]}
          />
        )
      case 5:
        return (
          <RadioStep
          setValue={handleQ5}
            question={questions[step]}
          />
        )
      case 6:
        return (
          <RadioStep
          setValue={handleQ6}
            question={questions[step]}
          />
        )
      case 7:
        return (
          <RadioStep
          setValue={handleQ7}
            question={questions[step]}
          />
        )
      case 8:
        return (
          <RadioStep
          setValue={handleQ8}
            question={questions[step]}
          />
        )
      case 9:
        return (
          <RadioStep
          setValue={handleQ9}
            question={questions[step]}
          />
        )
      case 10:
        return (
          <RadioStep
          setValue={handleQ10}
            question={questions[step]}
          />
        )
      default:
        return;
    }
  
  }

  const steps: string[] = [
    "שאלה 1",
    "שאלה 2",
    "שאלה 3",
    "שאלה 4",
    "שאלה 5",
    "שאלה 6",
    "שאלה 7",
    "שאלה 8",
    "שאלה 9",
  ]

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {GetStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose}>{t(LocalizationKeys.Common.Close)}</Button>
        <Button
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          disabled={activeStep === 0}
        >
          {t(LocalizationKeys.Common.Back)}
        </Button>
        <Button
          variant={"contained"}
          onClick={handleNext}
          disabled={activeStep === 8}
        >
          {t(LocalizationKeys.Common.Next)}
        </Button>
        {activeStep === 8 ? (
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            {t(LocalizationKeys.Common.Submit)}
          </Button>
        ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrgWizard;
