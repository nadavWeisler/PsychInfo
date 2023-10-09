interface Data {
    data: string[];
}

export interface TagsGridProps extends Data {}

export interface StepProps extends Data {
    text: string;
}

export interface StringObject {
    id: string;
    display: string;
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
    index: number;
    prop1: number;
    prop2: number;
    prop3: string;
    prop4: string;
}
