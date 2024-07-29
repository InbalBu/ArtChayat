import React from 'react';
import '../css/Biography.css'; // Make sure to create and link the CSS file for styling
import jacobPortrait from '../images/jacob_chayat_portrait.jpg'; // Make sure to add the image

function Jacob({ language }) {
  return (
    <div className={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="jacob-container">
        <div className="jacob-content">
          <div className="image-container">
            <img src={jacobPortrait} alt="Jacob Khayat" className="jacob-image" />
          </div>
          <div className="text-container">
            <h1>{language === 'he' ? 'יעקב חייט' : 'Yaakov Khayat'}</h1>
            <h2>{language === 'he' ? 'ביוגרפיה' : 'Biography'}</h2>
            <p>
              {language === 'he' 
                ? 'יעקב חייט (6 באוגוסט 1939 – 13 בנובמבר 2018) היה צייר ישראלי, חבר באגודת הציירים והפסלים תל אביב ובין התורמים להכרה ולהתפתחות של האמנות בישראל. בשנת 1964 נישא יעקב לציירת, הפסלת, המשוררת והסופרת שושי לבית גולדמן (שושי חייט) (1947-2011) ולזוג שתי בנות, ריקי ומיכל. הצייר גר ויצר בסטודיו שלו בעיר חולון.'
                : 'Yaakov Khayat (August 6, 1939 – November 13, 2018) was an Israeli painter, a member of the Tel Aviv Association of Painters and Sculptors, and a contributor to the recognition and development of art in Israel. In 1964, Yaakov married the painter, sculptor, poet, and writer Shoshi Goldman (Shoshi Khayat) (1947-2011), and the couple had two daughters, Riki and Michal. The painter lived and created in his studio in Holon.'
              }
            </p>
            <p>
              {language === 'he' 
                ? 'חייט נולד בבגדאד שבעיראק ובשנת 1951 עלה לישראל. הוריו נשלחו למעברת אשקלון והוא נשלח לקיבוץ דפנה במסגרת עליית הנוער. על תקופה זו העיד שהייתה היפה ביותר בחייו ובה למד להכיר ולאהוב את ישראל. סביבת מגוריו, בקרבה לכנרת, העניקה לו את ההשראה להכניס ביצירותיו את נופי הגליל, הכנרת, את הציפורים והדמויות שפגש בדרכיו.'
                : 'Khayat was born in Baghdad, Iraq, and immigrated to Israel in 1951. His parents were sent to the Ashkelon transit camp, and he was sent to the Dafna kibbutz as part of the Youth Aliyah. He testified that this period was the most beautiful of his life and it helped him to get to know and love Israel. His surroundings, close to the Sea of Galilee, inspired him to incorporate the landscapes of Galilee, the Sea of Galilee, the birds, and the figures he encountered in his works.'
              }
            </p>
            <p>
              {language === 'he' 
                ? 'את שירותו הצבאי עשה בחיל האוויר ולאחר שרותו השתקע במרכז ישראל.'
                : 'He served in the Air Force and after his service, settled in central Israel.'
              }
            </p>
            <p>
              {language === 'he' 
                ? 'ביקוריו של חייט מעת לעת בירושלים צרבו בתוכו את הזיכרון ההיסטורי-הקולקטיבי הקשור בחשיבות העיר ועל כן רבות מיצירותיו, לאורך השנים, מתייחסות אל העיר ואל אתרי הקודש בה. כמו כן חייט שילב לא אחת ביצירותיו דמויות תנ"כיות שמעוררות בו עניין רב. ביום שלישי, ה-13 בנובמבר 2018, הלך לעולמו בגיל 79.'
                : 'Visits to Jerusalem periodically etched in him the historical and collective memory associated with the city’s importance, and therefore many of his works, over the years, refer to the city and its holy sites. Khayat also frequently incorporated biblical figures into his works that fascinated him. On Tuesday, November 13, 2018, he passed away at the age of 79.'
              }
            </p>
            <h2>{language === 'he' ? 'לימודים' : 'Education'}</h2>
            <p>
              {language === 'he' 
                ? 'חייט למד אמנות וגרפיקה במכונים הטכנולוגים בתל אביב ובשנות ה-60 עד לשנות ה-80 עבד, במקביל לעיסוקו כצייר, כגרפיקאי וכמאייר בבית דפוס. את יצירותיו הגרפיות עשה במלאכת יד.'
                : 'Khayat studied art and graphics at technological institutes in Tel Aviv and worked as a graphic designer and illustrator in a printing house from the 1960s to the 1980s, alongside his painting career. His graphic works were handmade.'
              }
            </p>
            <h2>{language === 'he' ? 'סגנון היצירה' : 'Artistic Style'}</h2>
            <p>
              {language === 'he' 
                ? 'חייט הרבה לשלב מגוון סגנונות וטכניקות של ציור ונמנע מלהגדיר תחום וסגנון בלעדי. בתפיסת עולמו האמנותית צריך היוצר ללכת עם התקופה, עם הזמן ועם הסביבה ובהתאם לכך להשתנות ולהתפתח כל עת. לפיכך תערוכותיו הרבות שונות האחת מקודמתה והציגו פנים ותחומי עניין מגוונים של היוצר.'
                : 'Khayat often combined various painting styles and techniques and avoided defining an exclusive field and style. In his artistic view, the creator should go with the times and adapt and evolve continuously. Consequently, his many exhibitions varied from one to another, showcasing different aspects and interests of the artist.'
              }
            </p>
            <p>
              {language === 'he' 
                ? 'ביצירותיו הוא השתמש בשלל חומרים ובכללם: אקריליק, שמן, אקוורל וצבעי פנדה.'
                : 'In his works, he used a variety of materials including acrylic, oil, watercolor, and panda colors.'
              }
            </p>
            <p>
              {language === 'he' 
                ? 'חייט חתם על כלל יצירותיו וכמו כן החל משנת 2009 להטביע בגב היצירה סמל הייחודי רק לו.'
                : 'Khayat signed all his works and, starting from 2009, began to emboss a unique symbol on the back of the artwork.'
              }
            </p>
          </div>
        </div>
      </div>
      <div className="video-section">
        <p>
          {language === 'he' 
            ? 'סרט דוקומנטרי על יצירתו וחייו של הצייר הישראלי יעקב חייט ז"ל.'
            : 'Documentary about the life and work of the Israeli painter Yaakov Khayat.'
          }
        </p>
        <p>
          {language === 'he' 
            ? 'בסרט אזכורים רבים לרעייתו, הציירת שושי חייט ז"ל.'
            : 'The film includes many references to his wife, the painter Shoshi Khayat.'
          }
        </p>
        <div className="video-container">
          <iframe
            width="890"
            height="515"
            src="https://www.youtube.com/embed/QifoTZm_NdM" // Replace with your video ID
            title="Documentary on Jacob Khayat"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Jacob;
