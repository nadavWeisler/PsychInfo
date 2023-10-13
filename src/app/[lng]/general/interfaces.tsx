import { ReactNode } from "react";
import { User } from "firebase/auth";
import { LocaleTypes } from "@/i18n/settings";

export enum Operator {
    AND,
    OR,
}

export enum WizardStep {
    Tags,
    Organizations,
    Languages,
}

export const DisplayLanguages = {
    he: "עברית",
    en: "English",
    arb: "العربية",
    rus: "Русский",
};

export interface StringObject {
    id: string;
    display: string;
    languageId: string;
}

export interface Content {
    title: string;
    link: string;
    tags: Tag[];
    organization: Organization;
    description: string;
    languageId: string;
    uploader: string;
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
    languages: string[];
}

export interface ContentState {
    content: Content[];
}

export interface WelcomeMsgProps {
    lng: LocaleTypes;
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
    tags: Tag[];
    organizations: Organization[];
    languages: string[];
    title: string;
    description: string;
}

export interface AdminSignInFormProps {
    emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface RequestAccordionProps extends Content {
    deleteHandler: () => void;
}

export interface ContextProps {
    user: User | null | undefined;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface FoundMistake {
    name: string;
    emailToContact: string;
    description: string;
}

export interface FoundMistakeDB extends FoundMistake {
    id: string;
}

export interface FoundMistakeFormProps {
    isSentHandler: () => void;
}

export interface FoundMistakeAccordionProps extends FoundMistakeDB {
    deleteHandler: () => void;
}
