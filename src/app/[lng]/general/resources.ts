import { Question } from "@/app/[lng]/general/interfaces";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export const addresses: string[] = [
    "אשקלון",
    "גברעם",
    "זיקים",
    "יד-מרדכי",
    "כרמיה",
    "ניצנים",
    "בית-שקמה",
    "ברכיה",
    "גיאה",
    "הודיה",
    "חלץ",
    "כוכב-מיכאל",
    "מבקיעים",
    "משען",
    "ניר-ישראל",
    "נתיב-העשרה",
    "תלמי-יפה",
    "בת-הדר",
    "ניצן",
    "ניצן ב'",
    "באר גנים",
    "אורים",
    "בארי",
    "כיסופים",
    "עין השלושה",
    "נירים",
    "ניר-עוז",
    "רעים",
    "מגן",
    "ניר-יצחק",
    "סופה",
    "חולית",
    "כרם-שלום",
    "גבולות",
    "צאלים",
    "אוהד",
    "שדה-ניצן",
    "תלמי-אליהו",
    "עמיעוז",
    "מבטחים",
    "ישע",
    "תלמי-יוסף",
    "פריגן",
    "דקל",
    "יתד",
    "שדי-אברהם",
    "יבול",
    "עין-הבשור",
    "בני-נצרים",
    "נווה",
    "אבשלום",
    "צוחר",
    "שלומית",
    "שדרות",
    "אור-הנר",
    "ארז",
    "ברור-חיל",
    "גבים",
    "דורות",
    "כפר-עזה",
    "מפלסים",
    "נחל-עוז",
    "ניר-עם",
    "רוחמה",
    "יכיני",
    "עלומים",
    "סעד",
    "כפר-מימון",
    "יושביה",
    "זרועה",
    "גבעולים",
    "בית-הגדי",
    "תקומה",
    "שרשרת",
    "שיבולים",
    "שוקדה",
    "שובה",
    "מלילות",
    "תושיה",
    "זמרת ומעגלים",
    "נתיבות",
    "אופקים",
    "מרחבים",
    "בני שמעון",
    "נהריה",
    "עכו",
    "מעלות-תרשיחא",
    "טמרה",
    "שפרעם",
    "עראבה",
    "מע'אר",
    "שלומי",
    "מזרעה",
    "כפר ורדים",
    "פסוטה",
    "מעיליא",
    "כפר יאסיף",
    "אבו סנאן",
    "ג'וליס",
    "ירכא",
    "ג'דיידה-מכר",
    "כסרא-סמיע",
    "יאנוח-ג'ת",
    "פקיעין",
    "מג'ד אל-כרום",
    "דיר אל-אסד",
    "בענה",
    "נחף",
    "סג'ור",
    "ראמה",
    "שעב",
    "כאבול",
    "אעבלין",
    "דיר חנא",
    "עיילבון",
    "כאוכב אבו אל-היג'א",
    "כפר מנדא",
    "ביר אל-מכסור",
    "מועצה אזורית מטה אשר",
    "מועצה אזורית מעלה יוסף",
    "מועצה אזורית משגב",
    "מגדל תפן",
    "מדינת אכזיב",
    "חיפה",
    "אפרת",
    "אלון שבות",
    "אלעזר",
    "בת עין",
    "גבעות",
    "הר גילה",
    "כפר עציון",
    "כרמי צור",
    "מגדל עוז",
    "מעלה עמוס",
    "מיצד",
    "נווה דניאל",
    "נוקדים",
    "ראש צורים",
    "תקוע",
    "מטה בנימין",
    "בית אל",
    "אבני חפץ",
    "איתמר",
    "אלון מורה",
    "ברוכין",
    "ברקן",
    "הר ברכה",
    "חוות יאיר",
    "חוות גלעד",
    "חיננית",
    "חרמש",
    "טל בנימין",
    "טל מנשה",
    "יצהר",
    "יקיר",
    "כפר תפוח",
    "לשם",
    "מבוא דותן",
    "מגדלים",
    "מעוז צבי",
    "נופי נחמיה",
    "נופים",
    "סלעית",
    "עלי זהב",
    "ענב",
    "פדואל",
    "צופים",
    "קריית נטפים",
    "רבבה",
    "רחלים",
    "ריחן",
    "שבי שומרון",
    "שקד",
    "קרית ארבע חברון",
    "מועצה אזורית הר חברון",
    "הישוב היהודי בחברון",
    "אביגיל",
    "אדורה",
    "בית חגי",
    "בית יתיר",
    "טנא עומרים",
    "כרמל",
    "נגוהות",
    "ליבנה",
    "מעון",
    "מעלה חבר",
    "סוסיא",
    "סנסנה",
    "עשהאל",
    "עתניאל",
    "שמעה",
    "ירושלים",
    "תלם",
    "קריית ארבע",
    "מועצה אזורית שומרון",
    "אריאל",
    "קדומים",
    "קרני שומרון",
    "עמנואל",
    "ביתר עילית",
    "אפרת",
    "מועצה אזורית גוש עציון",
    "תל אביב",
];

export const questions: Question[] = [
    {
        id: "1",
        text: "האם אתה: ",
        filtering: true,
        options: ["חייל/משרת כרגע במילואים", "מעל גיל 18", "מתחת לגיל 18"],
    },
    {
        id: "2",
        text: "האם אתה כעת מפונה מביתך",
        filtering: true,
        options: ["לא", "כן"],
    },
    {
        id: "3",
        text: "האם פונית על ידי המדינה או שהתפנית עצמאית?",
        filtering: true,
        options: ["התפניתי עצמאית", "פוניתי על ידי המדינה"],
    },
    {
        id: "4",
        text: "האם אתה מוכר בביטוח לאומי או ברווחה?",
        filtering: true,
        options: ["כן, בביטוח לאומי", "כן, ברווחה", "כן, בשניהם", "לא"],
    },
    {
        id: "5",
        text: "האם חווית טראומה באופן ישיר?",
        filtering: true,
        options: ["לא", "כן"],
    },
    {
        id: "6",
        text: "האם מישהו מבני משפחתך מדרגה ראשונה נפצע/נחטף/נעדר/נרצח?",
        filtering: true,
        options: ["לא", "כן"],
    },
    {
        id: "7",
        text: "באיזה קופת חולים אתה מבוטח?",
        filtering: true,
        options: ["לאומית", "מאוחדת", "כללית", "מכבי"],
    },
    {
        id: "8",
        text: "אנא דרג את רמת המצוקה שלך כרגע?",
        filtering: true,
        options: [
            "1 - אני חווה מצוקה ברמה גבוהה ואני צריך מענה מידי",
            "2 - אני חווה מצוקה ברמה בינונית, שמפריעה לי מאוד בתפקוד",
            "3 - אני חווה מצוקה ברמה נמוכה, שמפריעה לי בתפקוד",
        ],
    },
    {
        id: "9",
        text: "האם היית מעדיף שהטיפול יהיה בשפה שאינה עברית?",
        filtering: true,
        options: [
            "ערבית",
            "רוסית",
            "אנגלית",
            "ספרדית",
            "צרפתית",
            "אמהרית",
            "מעדיף להישאר בעברית",
        ],
    },
];

// const { t } = useTrans();

export const aboutUsCards = [
    {
        id: 1,
        title: LocalizationKeys.Credits.Shir.Title,
        description: LocalizationKeys.Credits.Shir.Description,
        imageUrl: "https://i.ibb.co/FbvRRPC/shir.jpg",
        linkedin: "",
    },
    {
        id: 2,
        title: LocalizationKeys.Credits.NadavW.Title,
        description: LocalizationKeys.Credits.NadavW.Description,
        imageUrl:
            "https://media.licdn.com/dms/image/C4D03AQE_P3IHLL6trQ/profile-displayphoto-shrink_800_800/0/1615991285399?e=1703721600&v=beta&t=Wli5uAAS8XqpjSelNVZA6tEMtFr_cgKhMoXLk_OJtPg",
        linkedin: "https://www.linkedin.com/in/nadav-weisler/",
    },
    {
        id: 3,
        title: LocalizationKeys.Credits.Shlomi.Title,
        description: LocalizationKeys.Credits.Shlomi.Description,
        imageUrl: "https://i.ibb.co/YjZkfHZ/shlomi.jpg",
        linkedin: "https://www.linkedin.com/in/shlomi-shitrit-31b839223/",
    },
    {
        id: 4,
        title: LocalizationKeys.Credits.NadavP.Title,
        description: LocalizationKeys.Credits.NadavP.Description,
        imageUrl:
            "https://media.licdn.com/dms/image/C4D03AQEuJZ1UkM-Emw/profile-displayphoto-shrink_800_800/0/1572158793894?e=1703721600&v=beta&t=YE8_KRYCLddjUlblqDK9ELJ1id7OMDj55jfMWBYJQZQ",
        linkedin: "https://www.linkedin.com/in/nadav-porat-126805b1/",
    },
    {
        id: 5,
        title: LocalizationKeys.Credits.Nitzan.Title,
        description: LocalizationKeys.Credits.Nitzan.Description,
        imageUrl:
            "https://media.licdn.com/dms/image/C5603AQH4PYEY5LNFRg/profile-displayphoto-shrink_800_800/0/1603109816717?e=1708560000&v=beta&t=bpxcZnlkiBSDskZmQuGKYkMLtwaTb886qOEHWbMApqQ",
        linkedin: "https://www.linkedin.com/in/nitzan-rosen-1b91771ba/",
    },
    {
        id: 6,
        title: LocalizationKeys.Credits.Gaia.Title,
        description: LocalizationKeys.Credits.Gaia.Description,
        imageUrl:
            "https://media.licdn.com/dms/image/D4D03AQG6GVjshybq6g/profile-displayphoto-shrink_400_400/0/1672679569607?e=1703721600&v=beta&t=Q_suFXMwBzJqbQczaIg1Fk3PSkk1b39H72JScQ0iY1Y",
        linkedin: "https://www.linkedin.com/in/gaya-aran/",
    },
    {
        id: 7,
        title: LocalizationKeys.Credits.Ana.Title,
        description: LocalizationKeys.Credits.Ana.Description,
        imageUrl: "https://source.unsplash.com/random?wallpapers",
        linkedin: "",
    },
    {
        id: 8,
        title: LocalizationKeys.Credits.Netanel.Title,
        description: LocalizationKeys.Credits.Netanel.Description,
        imageUrl: "https://i.ibb.co/WBLYHc6/netanel.jpg",
        linkedin: "",
    },
    {
        id: 9,
        title: LocalizationKeys.Credits.Tatiana.Title,
        description: LocalizationKeys.Credits.Tatiana.Description,
        imageUrl: "https://source.unsplash.com/random",
        linkedin: "",
    },
];

export const aboutUsTexts = [
    "כולנו מתנהלים כעת בתקופה חריגה ומערערת, שאנחנו לא יודעים כמה זמן היא תימשך, ושהתחילה בבת אחת, בהפתעה גמורה.",
    "משפט שחוזרים עליו רבות בזמנים אלו, הוא שטראומה היא תגובה נורמלית למצב לא נורמלי. זה בסדר אם אתם מוצפים רגשית, או לא מרגישים מוצפים כלל. זה בסדר גם אם אתם לא מעוניינים לגשת או לחשוב בכלל על התקופה וההתמודדות הכרוכה בה.",
    "יחד עם זאת, מי שירצה לחפש מידע על התמודדות נפשית בימים אלו, ימצא הצפה מבהילה ולפרקים מתנגשת או בלתי ניתנת לתיעדוף, של מידע באינטרנט בכלל וברשתות החברתיות בפרט. המצב הנוכחי הביא לכך שאנשי מקצוע רבים וטובים הציעו את עזרתם, הפיצו מהידע שלהם על בריאות נפשית בזמנים טראומטיים, ושחררו תוכן רב מסוגים שונים ולצרכים שונים.",
    "אנחנו, חבורת מתנדבים רב-תחומית של מתכנתים, מתרגמים, חוקרי פסיכולוגיה ואנשי תוכן, הרגשנו את ההצפה הזו בעצמנו, והחלטנו לנסות לאגד ולאמת את כל התוכן הזה, הפרוס בפנינו, שלפעמים הכמות שלו עשויה להבהיל בפני עצמה.",
    "הפלטפורמה שאנחנו בונים ומשפרים ללא הרף נועדה להנגיש לכולנו מידע אמין בלבד על התמודדות נפשית, באופן שיהיה ניתן לסינון, מותאם אישית אליכם, למקום בו המצב הזה תופס אתכם ולתוכן שאתם זקוקים לו.",
    "נשמח אם תעלו גם אתם תכנים שאתם נתקלים בהם כדי שהאתר ימשיך להתעדכן כל הזמן בתוכן מדויק ומגוון ככל שניתן. כל העלאה כמובן עוברת את אישורנו לפני כן, לטובת אימות מהימנות המקור.",
    "אנחנו מקווים שהאתר הזה יוכל לסייע לכם!",
    "צוות המתנדבים שלנו:",
];

export const rightsViewRows = [
    [
        "כיוונים - כלי המכוון אותך לזכויות המגיעות לנפגעי ונפגעות ״חרבות ברזל״",
        "https://www.kivunimrights.com/",
    ],
    ["מוקד הכוונה משפית של משרד המשפטים", "0733928666"],
    [
        "הרשת - איחוד הקליניקות המשפטיות בארץ",
        "הרשת - הכוונה משפטית - https://rb.gy/qtf30",
    ],
    ["מוקד מיצוי זכויות למפונים - עיריית ירושלים", "0537639873"],
    ["יד מכוונת", "*2496"],
    ["אתר כל זכות", "אתר כל זכות - https://tinyurl.com/bdf2tetz"],
    ["פתחון לב - מוקד טלפוני", "https://www.pitchonlev.org.il/"],
    [
        "מענק כספי למחוסרי מיגון- אשקלון",
        "מענק כספי - אשקלון - https://did.li/7tgZH]",
    ],
];
