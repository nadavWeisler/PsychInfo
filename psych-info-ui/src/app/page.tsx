"use client";
import { Fragment, useState } from "react";
import { Typography, Button, Box, ThemeProvider } from "@mui/material";
import Wizrad from "@/app/Components/Wizard/Wizard";
import { darkTheme } from "@/app/General/styles";
import { Provider } from "react-redux";
import store from "@/app/store";

function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };
    return (
        <Provider store={store}> 
            <Fragment>
                <ThemeProvider theme={darkTheme}>
                    <Wizrad open={open} onClose={closeWizradHandler} />
                    <Box
                        sx={{
                            margin: "auto",
                            textAlign: "center",
                            marginTop: "75px",
                        }}
                    >
                        <Typography variant="h1" component="div" gutterBottom>
                            Welcome to PsychInfo!
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            Click the button below to get started.
                        </Typography>
                        <Button
                            sx={{
                                marginTop: "20px",
                                width: "100px",
                                height: "50px",
                            }}
                            variant="contained"
                            color="primary"
                            onClick={openWizradHandler}
                        >
                            Start
                        </Button>
                    </Box>
                </ThemeProvider>
            </Fragment>
        </Provider>
    );
}

export default HomePage;
