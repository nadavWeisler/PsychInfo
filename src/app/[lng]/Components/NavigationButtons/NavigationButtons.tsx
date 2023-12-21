import { Box, Button } from "@mui/material";
import React from "react";
import { Question } from "@/app/[lng]/Components/OrgWizard/OrgWizard";

interface NavigationButtonsProps {
  activeQuestion: number;
  onBack: () => void;
  onNext: () => void;
  itemsLength: number;
}

export default function NavigationButtons({
  activeQuestion,
  onBack,
  onNext,
  itemsLength,
}: NavigationButtonsProps) {
  return (
    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
      {activeQuestion > 0 && <Button onClick={onBack}>הקודם</Button>}
      {activeQuestion < itemsLength - 1 && (
        <Button onClick={onNext}>הבא</Button>
      )}
    </Box>
  );
}
