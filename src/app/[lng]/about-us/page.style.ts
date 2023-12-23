export const styles = {
    root: {
        pt: 4,
        pb: 6,
    },
    container: {
        margin: "20px",
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
            transform: "scale(1.05)",
        },
    },
    cardMedia: {
        pt: "100.00%",
    },
    cardContent: {
        flexGrow: 1,
    },
    text: {
        textAlign: "justify",
    },
};
