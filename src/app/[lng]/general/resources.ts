import { Question } from "@/app/[lng]/general/interfaces";

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
    "תל אביב"
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
      options: ["לאומית" ,"מאוחדת", "כללית", "מכבי"],
    },
    {
      id: "8",
      text: "אנא דרג את רמת המצוקה שלך כרגע?",
      filtering: true,
      options: [
        "1 - אני חווה מצוקה ברמה גבוהה ואני צריך מענה מידי",
       "2 - אני חווה מצוקה ברמה בינונית, שמפריעה לי מאוד בתפקוד",
        "3 - אני חווה מצוקה ברמה נמוכה, שמפריעה לי בתפקוד"
      ],
    },
    {
      id: "9",
      text: "האם היית מעדיף שהטיפול יהיה בשפה שאינה עברית?",
      filtering: true,
      options: ["ערבית",
       "רוסית",
        "אנגלית",
      "ספרדית",
      "צרפתית",
      "אמהרית",
      "מעדיף להישאר בעברית"
    ],
    },
  ];