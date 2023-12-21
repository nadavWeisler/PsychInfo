import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import NavigationButtons from "@/app/[lng]/Components/NavigationButtons";

export interface Question {
  id: string;
  text: string;
  filtering: boolean;
  options: string[];
  followUpsTrue?: Question[];
  followUpsFalse?: Question[];
}

interface OrgWizardProps {}

function OrgWizard({}: OrgWizardProps) {
  const questions: Question[] = [
    {
      id: "1",
      text: "האם אתה: ",
      filtering: true,
      options: ["חייל/משרת כרגע במילואים", "מעל גיל 18", "מתחת לגיל 18"],
    },
    {
      id: "2",
      text: "האם אתה כעת מפונה מביתך",
      filtering: false,
      options: ["לא", "כן"],
    },
    {
      id: "3",
      text: "האם אתה מוכר בביטוח לאומי או ברווחה?",
      filtering: false,
      options: ["כן, בביטוח לאומי", "כן, ברווחה", "כן, בשניהם", "לא"],
    },
  ];
  const [active, setActive] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <>
      <Button onClick={() => setActive(!active)}>openDialog</Button>

      <Dialog open={active} onClose={() => setActive(false)} fullWidth>
        <DialogContent>
          <h1>{questions[activeQuestion].text}</h1>
          <ul>
            {questions[activeQuestion].options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </DialogContent>
        <NavigationButtons
          activeQuestion={activeQuestion}
          onBack={() => setActiveQuestion(activeQuestion - 1)}
          onNext={() => setActiveQuestion(activeQuestion + 1)}
          itemsLength={questions.length}
        />
      </Dialog>
    </>
  );
}

export default OrgWizard;
