interface Data {
    data: string[];
}

export interface TagsGridProps extends Data {}

export interface StepProps extends Data {
    text: string;
}

export interface WizardDialogProps {
    open: boolean;
    onClose: () => void;
}
