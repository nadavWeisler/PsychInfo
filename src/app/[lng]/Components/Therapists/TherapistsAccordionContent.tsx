import { Typography, Box, Button } from "@mui/material";
import { TherapistsAccordionContentProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { deleteTherapist } from "@/app/[lng]/firebase/commands";

export default function TherapistsAccordionContent({
    deleteHandler,
    data,
}: TherapistsAccordionContentProps) {
    const { t, direction } = useTrans();

    async function deleteTherapistFromDB(): Promise<void> {
        await deleteTherapist(data.id);
        deleteHandler();
    }

    const btnDirrection = direction === "rtl" ? "ltr" : "rtl";

    return (
        <Box
            dir={btnDirrection}
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.name")}: {data.name}
            </Typography>
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.email")}: {data.email}
            </Typography>
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.tel")}: {data.tel}
            </Typography>
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.profession")}: {data.profession}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                    sx={{ marginLeft: "20px" }}
                    color={"error"}
                    variant={"outlined"}
                    onClick={deleteTherapistFromDB}
                >
                    {t("common.delete")}
                </Button>
            </Box>
        </Box>
    );
}
