interface Data {
    data: string[];
    addData: (data: string[]) => void;
    dataType: string;
}

export enum Language {
    Hebrew = "he",
    English = "en",
    Arabic = "arb",
    Russian = "rus",
}

export interface TagsGridProps extends Data {}

export interface StepProps extends Data {
    text: string;
}

export interface StringObject {
    id: string;
    display: string;
}

export interface Content {
    title: string;
    link: string;
    tags: Tag[];
    organization: Organization[];
    description: string;
    language: Language;
}

export interface Tag extends StringObject{
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
