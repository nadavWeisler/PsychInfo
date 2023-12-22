import { ReactNode } from "react";
import { User } from "@firebase/auth";

export enum Operator {
  AND,
  OR,
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

export interface ContentDB {
  title: string;
  link: string;
  tags: Tag[];
  organization: Organization;
  description: string;
  languageId: string;
  uploader: string;
  isFile: boolean;
}

export interface Content extends ContentDB {
  id: string;
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

export interface TagsAndOrgState {
  tags: Tag[];
  organizations: Organization[];
}

export interface OrganizationsState {
  organization: Organization[];
}

export interface WelcomeMsgProps {}

export interface BasicDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface ShareDialogProps extends BasicDialogProps {
  urlToShare: string;
}

export interface AdminSignInFormProps {
  emailHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ContextProps {
  user: User | null | undefined;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface NavBarPage {
  text: string;
  url: string;
}

export interface ControlPanelProps {
  isDeleteHandler: () => void;
  isDelete: boolean;
}

export interface PopUpListProps extends ControlPanelProps {
  open: boolean;
  handleClose: () => void;
  dataType: "tags" | "organizations";
  title: string;
}

export interface EditContentFormProps {
  prevContent: Content;
}

export interface EditContentDialogProps
  extends BasicDialogProps,
    EditContentFormProps {}

export interface AccordionContentProps {
  data: Content;
  request: boolean;
  deleteRequest?: () => void;
  aproveRequest?: () => void;
}

export interface CustomAccordionProps {
  data: Content[];
}

interface IsErrorStep {
  isError: boolean;
  errorMsg: string;
}

export interface OrganizationStepProps extends IsErrorStep {
  organizations: Organization[];
  updateSelectedOrganizations: (organizations: Organization[]) => void;
}

export interface TagsStepProps extends IsErrorStep {
  tags: Tag[];
  updateSelectedTags: (newTags: Tag[]) => void;
}

export interface LangStepProps extends IsErrorStep {
  updateSelectedLangs: (newTags: string[]) => void;
}
