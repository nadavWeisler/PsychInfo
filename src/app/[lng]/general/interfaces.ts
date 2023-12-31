import { ReactNode, ChangeEvent } from "react";
import { User } from "@firebase/auth";
import { SelectChangeEvent, Theme } from "@mui/material";

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

export type dataType = "tags" | "organizations";

export interface PopUpListProps extends ControlPanelProps, BasicDialogProps {
    dataType: dataType;
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

export interface AddStringProps extends BasicDialogProps {
    title: string;
    handleCreate: () => void;
    inputValue: Tag | Organization;
    setInputValue: (value: Tag | Organization) => void;
}

export interface Question {
    id: string;
    text: string;
    filtering: boolean;
    options: string[];
    followUpsTrue?: Question[];
    followUpsFalse?: Question[];
}

export interface OrgWizardProps extends BasicDialogProps {}

export interface RadioStepProps {
    question: Question;
    setValue: (e: ChangeEvent<HTMLInputElement>) => void;
    isHomless?: (value: boolean) => void;
}

export interface SelectStepProps {
    handleAddress: (event: SelectChangeEvent) => void;
    address: string;
    currentOrOrigin: "current" | "origin";
}

export interface SingleArticleProps {
    article: Content;
}

export interface TableViewProps {
    headers: string[];
    rows: string[][];
}

export interface AddStringDialogContentProps {
    setInputValue: (value: Tag | Organization) => void;
    inputValue: Tag | Organization;
}

export interface AddStringDialogActionProps {
    handleCreate: () => void;
    onClose: () => void;
}

export interface ContentTextsProps extends EditContentFormProps {}

export interface ContentSelectOrgProps {
    prevContent: Content;
    organizations: Organization[];
    selectedOrganization: Organization;
    handleChangeOrganization: (event: SelectChangeEvent<Organization>) => void;
    getSelectStyles: (obj: string, allObjects: string[], theme: Theme) => any;
    appTheme: Theme;
}

export interface ContentSelectLangProps {
    prevContent: Content;
    selectedLanguage: string;
    setSelectedLanguage: (value: string) => void;
    getSelectStyles: (obj: string, allObjects: string[], theme: Theme) => any;
}

export interface ContentSelectTagProps {
    tags: Tag[];
    selectedTags: string[];
    handleChangeTags: (event: SelectChangeEvent<string[]>) => void;
    getSelectStyles: (obj: string, allObjects: string[], theme: Theme) => any;
}
interface NavBarCloseProps {
    handleCloseMenu: () => void;
    anchorEl: null | HTMLElement;
}
interface NavBarOpenProps {
    handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IsMobileProp {
    isMobile: boolean;
}

export interface AdminPageNavbarProps {
    handleCloseMenu: () => void;
}

export interface MobileNavbarProps extends NavBarCloseProps, NavBarOpenProps {}

export interface DesktopNavbarProps extends NavBarCloseProps, NavBarOpenProps {}

export interface HamburgerMenuIconProps extends IsMobileProp {
    handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DesktopHamburgerMenuProps extends NavBarCloseProps {}

export interface MobileHamburgerMenuProps extends NavBarCloseProps {}

export interface OrgtagListProps {
    handleToggle: (value: number) => () => void;
    checked: number[];
    data: Tag[] | Organization[];
}

export interface OrgTagListTextProps {
    value: Organization | Tag;
    labelId: string;
}

export interface AddDialogProps {
    dataType: dataType;
    openAddTagDialog: boolean;
    openAddOrgDialog: boolean;
    setOpenAddTagDialog: (value: boolean) => void;
    setOpenAddOrgDialog: (value: boolean) => void;
}

export interface OrgTagListActionsProps {
    data: Tag[] | Organization[];
    dataType: dataType;
    checked: number[];
    isDeleteHandler: () => void;
    onClose: () => void;
    setOpenAddTagDialog: (value: boolean) => void;
    setOpenAddOrgDialog: (value: boolean) => void;
}

export interface ArticleCardContentProps {
    article: Content;
}
export interface ArticleCardActionsProps {
    id: string;
    setOpenShare: (value: boolean) => void;
    setOpenEdit: (value: boolean) => void;
}
export interface ArticleCardTextsProps {
    title: string;
    description: string;
}
export interface ArticleCardContentLinkProps {
    link: string;
}
export interface ArticleCardTagsProps {
    tags: Tag[];
}
export interface ArticleCardFileProps {
    isFile: boolean;
    title: string;
}

export interface TableViewHeadProps {
    headers: string[];
}

export interface TableViewBodyProps {
    rows: string[][];
}

export interface AdminContentProps {
    isDelete: boolean;
}
export interface MagazineTagsProps {
    selectedTags: Tag[];
    selectTagsHandler: (value: Tag[]) => void;
}

export interface MagazineCardsProps {
    selectedCard: Content | null;
    selectedCardHandler: (value: Content) => void;
    cards: Content[];
}

export interface MagazineCardContentProps {
    card: Content;
}

export interface UploadFormProps {
    isSubmitHandler: (value: boolean) => void;
}

export interface CloseButtonProps {
    handleClose: (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => void;
}

export interface UploadOrganizationProps {
    selectedOrganization: Organization | null;
    selectedOrganizationHandler: (value: Organization) => void;
}

export interface UploadLanguageProps {
    selectedLanguageHandler: (value: string) => void;
    selectedLanguage: string;
}

export interface UploadTagsProps {
    selectedTags: string[];
    selectedTagsHandler: (value: string[]) => void;
    tags: Tag[];
}

export interface UploadFileProps {
    fileHandler: (value: File) => void;
}
