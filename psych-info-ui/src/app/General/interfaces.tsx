interface DataForWizard {
    data: string[];
    addData: (data: string[]) => void;
    dataType: string;
}

export interface TagsGridProps extends DataForWizard {}

export interface StepProps extends DataForWizard {
    text: string;
}

export interface StringObject {
    id: string;
    display: string;
}

export interface Tag extends StringObject {
    used: boolean;
}

export interface Organization extends StringObject {
    used: boolean;
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

interface Results {
    content: string;
    link: string;
    organization: string;
    relevantTags: string[];
}

export interface ResultAccordionProps extends Results {
    title: string;
}

export interface AccordionContentProps extends Results {}
