interface Data {
    data: string[];
    addData: (data: string[]) => void;
    dataType: string;
}

export interface TagsGridProps extends Data {}

export interface StepProps extends Data {
    text: string;
}

export interface WizardDialogProps {
    open: boolean;
    onClose: () => void;
}

export interface PagesSliceInitialState {
    tags: string[];
    organization: string[];
}

export interface WelcomeMsgProps {
    openWizradHandler: () => void;
}
