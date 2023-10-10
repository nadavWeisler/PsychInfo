interface DataForWizard {
    data: string[];
    addData: (data: string[]) => void;
    dataType: string;
}

export interface TagsGridProps extends DataForWizard {}
export enum Language {
    Hebrew = "עברית",
    English = "English",
    Arabic = "العربية",
    Russian = "Русский",
}

export interface StepProps extends DataForWizard {
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
    organization: Organization;
    description: string;
    language: string;
    uploader: string;
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

export interface ShareDialogProps extends WizardDialogProps {
    urlToShare: string;
}

export interface AdminSignInFormProps {
    emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface RequestAccordionProps extends Content {
    deleteHandler: () => void;
}
