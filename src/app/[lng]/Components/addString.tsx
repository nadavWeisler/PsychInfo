import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    TextField,
} from "@mui/material";
import {
    Organization,
    Tag,
} from "@/app/[lng]/general/interfaces";
import { ReactElement } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/addString.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

interface AddStringProps {
    title: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: Tag | Organization;
    setInputValue: (value: Tag | Organization) => void;
}

export const AddString = ({
    title,
    openDialog,
    handleCloseDialog,
    handleCreate,
    inputValue,
    setInputValue,
}: AddStringProps): ReactElement => {
    const { t } = useTrans();

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} sx={styles.root}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControl
                    key={LocalizationKeys.AddString.EnterId}
                    margin="dense"
                    fullWidth
                    required
                >
                    <FormLabel>
                        {t(LocalizationKeys.AddString.EnterId)}
                    </FormLabel>
                    <TextField
                        variant="outlined"
                        value={inputValue.id}
                        onChange={(e) =>
                            setInputValue({ ...inputValue, id: e.target.value })
                        }
                    />
                </FormControl>
                <FormControl
                    key={LocalizationKeys.AddString.EnterEnDisplay}
                    margin="dense"
                    fullWidth
                    required
                >
                    <FormLabel>
                        {t(LocalizationKeys.AddString.EnterHeDisplay)}
                    </FormLabel>
                    <TextField
                        variant="outlined"
                        value={inputValue.heDisplay}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                heDisplay: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    key={LocalizationKeys.AddString.EnterEnDisplay}
                    margin="dense"
                    fullWidth
                    required
                >
                    <FormLabel>
                        {t(LocalizationKeys.AddString.EnterEnDisplay)}
                    </FormLabel>
                    <TextField
                        variant="outlined"
                        value={inputValue.enDisplay}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                enDisplay: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    key={LocalizationKeys.AddString.EnterArbDisplay}
                    margin="dense"
                    fullWidth
                    required
                >
                    <FormLabel>
                        {t(LocalizationKeys.AddString.EnterArbDisplay)}
                    </FormLabel>
                    <TextField
                        variant="outlined"
                        value={inputValue.arbDisplay}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                arbDisplay: e.target.value,
                            })
                        }
                    />
                </FormControl>
                <FormControl
                    key={LocalizationKeys.AddString.EnterRusDisplay}
                    margin="dense"
                    fullWidth
                    required
                >
                    <FormLabel>
                        {t(LocalizationKeys.AddString.EnterRusDisplay)}
                    </FormLabel>
                    <TextField
                        variant="outlined"
                        value={inputValue.rusDisplay}
                        onChange={(e) =>
                            setInputValue({
                                ...inputValue,
                                rusDisplay: e.target.value,
                            })
                        }
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    sx={styles.button}
                >
                    {t(LocalizationKeys.Common.Cancel)}
                </Button>
                <Button
                    onClick={handleCreate}
                    color="primary"
                    sx={styles.button}
                >
                    {t(LocalizationKeys.Common.Create)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
