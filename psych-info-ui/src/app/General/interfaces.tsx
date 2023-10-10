export interface DataForWizard {
    data: StringObject[];
    addData: (data: StringObject[]) => void;
    dataType: WizardDataType;
}

export enum WizardDataType {
    Tags = "tags",
    Organization = "organization",
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

export interface Language extends StringObject {
    used: boolean;
}

export interface Tag extends StringObject {
    used: boolean;
}

export interface Organization extends StringObject {
    used: boolean;
}


export interface PagesSliceInitialState {
    tags: Tag[];
    organization: Organization[];
}

export interface WelcomeMsgProps {
    openWizradHandler: () => void;
}

export interface WizardDialogProps {
    open: boolean;
    onClose: () => void;
}
export interface ShareDialogProps extends WizardDialogProps {
    urlToShare: string;
}

export interface Filter {
    id: string;
    img: string;
    tags: string[];
    organization: string;
    language: string;
    title: string;
    description: string;
}
