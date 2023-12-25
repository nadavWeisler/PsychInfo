"use client";
import { Fragment } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const mainResults = [
    {
        name: "מרפאת בריאות הנפש - אגריפס",
        phone: "026215444",
        website: "",
        type: "בהתאם לעומס הפעילות במרפאה (מקרים דחופים מתקבלים מידית לאחר הערכה מקצועית)",
        hour: "",
        short: "טיפול ארוך טווח",
        telphone: "טלפוני, פיזי, ווידאו",
        pay: "יינתנו ללא תשלום, מלבד במקרים מסויימים https://www.kolzchut.org.il/he/%D7%98%D7%99%D7%A4%D7%95%D7%9C_%D7%9E%D7%A8%D7%A4%D7%90%D7%AA%D7%99_%D7%91%D7%91%D7%A8%D7%99%D7%90%D7%95%D7%AA_%D7%94%D7%A0%D7%A4%D7%A9#.D7.AA.D7.A9.D7.9C.D7.95.D7.9D",
        hafnaya: "",
        relevant_population: ["מבוגר", "סטודנט"],
        homeless: "",
        original_home: "",
        current_home: "ירושלים",
        bituh_leumi: "",
        traume: "",
        family_injured: "",
        macabi: "מאוחדת",
        destress: ["1", "2"],
        leng: "",
    },
    {
        name: "עוטף לב - סיוע נפשי ישראלי",
        phone: "",
        website: "https://www.oteflev.org.il/",
        type: "מענה תוך 24 שעות",
        hour: "",
        short: "טווח קצר 1-3 מפגשים",
        telphone: "טלפוני, פיזי, ווידאו",
        pay: "חינם",
        hafnaya: "",
        relevant_population: ["מבוגר", "סטודנט"],
        homeless: ["מפונה", "מתפנה"],
        original_home: "",
        current_home: "",
        bituh_leumi: "",
        traume: "",
        family_injured: "",
        macabi: "",
        destress: ["1", "2"],
        leng: "",
    },
];
const secondaryResult = [
    {
        name: "קטמון - תחנת בריאות הנפש",
        phone: "025633759",
        website: "",
        type: "בהתאם לעומס הפעילות במרפאה (מקרים דחופים מתקבלים מידית לאחר הערכה מקצועית)",
        hour: "",
        short: "טיפול ארוך טווח",
        telphone: "",
        pay: "יינתנו ללא תשלום, מלבד במקרים מסויימים https://www.kolzchut.org.il/he/%D7%98%D7%99%D7%A4%D7%95%D7%9C_%D7%9E%D7%A8%D7%A4%D7%90%D7%AA%D7%99_%D7%91%D7%91%D7%A8%D7%99%D7%90%D7%95%D7%AA_%D7%94%D7%A0%D7%A4%D7%A9#.D7.AA.D7.A9.D7.9C.D7.95.D7.9D",
        hafnaya: "",
        relevant_population: ["ילד"],
        homeless: ["מפונה", "מתפנה"],
        original_home: "",
        current_home: "ירושלים",
        bituh_leumi: "",
        traume: "כן",
        family_injured: "",
        macabi: "",
        destress: ["2", "3"],
        leng: "",
    },
    {
        name: "מרכז חוסן - אשקלון",
        phone: "*2452",
        website: "",
        type: "",
        hour: "",
        short: "טיפול קצר מועד",
        telphone: "",
        pay: "חינם",
        hafnaya: "",
        relevant_population: ["סטודנט", "מבוגר", "חייל"],
        homeless: ["מפונה", "מתפנה"],
        original_home: "אשקלון",
        current_home: "אשקלון",
        bituh_leumi: "",
        traume: "כן",
        family_injured: "כן",
        macabi: "",
        destress: ["2", "3"],
        leng: "",
    },
];

export default function ResultsPage() {
    return (
        <>
            <br />
            <br />
            <Box sx={{ flexDirection: "column" }}>
                {mainResults.map((result, index) => (
                    <Fragment key={index}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {result?.name}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {result?.type}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {result?.hour}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {result?.short}
                                </Typography>
                                <Typography variant="body2">
                                    {result?.telphone}
                                </Typography>
                                <Typography variant="body2">
                                    {result?.hafnaya}
                                </Typography>
                            </CardContent>
                        </Card>
                        <br />
                    </Fragment>
                ))}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {secondaryResult.map((result, index) => (
                    <Card key={index} sx={{ minWidth: 550 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {result?.name}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {result?.type}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {result?.hour}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {result?.short}
                            </Typography>
                            <Typography variant="body2">
                                {result?.telphone}
                            </Typography>
                            <Typography variant="body2">
                                {result?.hafnaya}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
}
