import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../css/ShoshiBiography.module.css'; // Ensure this CSS file is linked
import shoshiPortrait from '../images/shoshi_chayat_portrait.jpg';

function Shoshi({ language }) {
  const isHebrew = language === 'he';

  return (
    <div className={`${styles['shoshi-container']} ${isHebrew ? styles['shoshi-rtl'] : styles['shoshi-ltr']}`}>
      <Helmet>
        <title>{isHebrew ? 'שושי חייט - ביוגרפיה' : 'Shoshi Khayat - Biography'}</title>
        <meta name="description" content={isHebrew ? 'ביוגרפיה של שושי חייט, אמנית ישראלית ידועה, דור שני לשואה.' : 'Biography of Shoshi Khayat, a renowned Israeli artist, second generation Holocaust survivor.'} />
        <meta name="keywords" content={isHebrew ? 'שושי חייט, אומנות, ביוגרפיה' : 'Shoshi Khayat, art, biography'} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags */}
        <meta property="og:title" content={isHebrew ? 'שושי חייט - ביוגרפיה' : 'Shoshi Khayat - Biography'} />
        <meta property="og:description" content={isHebrew ? 'ביוגרפיה של שושי חייט, אמנית ישראלית ידועה, דור שני לשואה.' : 'Biography of Shoshi Khayat, a renowned Israeli artist, second generation Holocaust survivor.'} />
        <meta property="og:image" content={shoshiPortrait} />
        <meta property="og:url" content="https://artchayat.netlify.app/shoshi" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={styles['shoshi-content']}>
        <div className={`${styles['shoshi-image-container']} ${isHebrew ? styles['shoshi-image-container-rtl'] : styles['shoshi-image-container-ltr']}`}>
          <img src={shoshiPortrait} alt="Shoshi Khayat" className={styles['shoshi-image']} />
        </div>
        <div className={styles['shoshi-text-container']}>
          <h1>{isHebrew ? 'שושי חייט' : 'Shoshi Khayat'}</h1>
          <h2>{isHebrew ? 'ביוגרפיה' : 'Biography'}</h2>
          <p>
            {isHebrew
              ? 'נולדה למשפחת גולדמן, דור שני לשואה בעיר קלוז\' בטרנסליבניה, רומניה. בשנת 1950 עלתה לישראל. חיי ילדותה ונערותה היו קשים מנשוא היות שאביה נטש אותה בהיותה תינוקת ואמה התאבדה כשהייתה נערה בת 12. בשנת 1964 נישאה לצייר יעקב חייט. לזוג שתי בנות ו5 נכדים.'
              : 'Born to the Goldman family, a second generation Holocaust survivor in Cluj, Transylvania, Romania. In 1950, she immigrated to Israel. Her childhood and youth were unbearably difficult as her father abandoned her as a baby and her mother committed suicide when she was a 12-year-old girl. In 1964, she married the painter Yaakov Khayat. The couple has two daughters and 5 grandchildren.'
            }
          </p>

          <h2>{isHebrew ? 'לימודים' : 'Education'}</h2>
          <p>
            {isHebrew
              ? '1961-1964 - לימודי אמנות בויצו צרפת. בין מוריה היו האומנים והציירים: אלכסנדר בוגן, שמואל טפלר, משה רוזנטליס, ויצחק יורש.'
              : '1961-1964 - Art studies at WIZO France. Among her teachers were the artists and painters: Alexander Bogen, Shmuel Tefler, Moshe Rosenthalis, and Yitzhak Yuresh.'
            }
          </p>
          <p>
            {isHebrew
              ? '1984-1986 - לימודי פיסול במכון לאמנות בבת-ים. מורה ראשי: הפסל יעקב אפשטיין.'
              : '1984-1986 - Sculpture studies at the Bat Yam Art Institute. Main teacher: sculptor Yaakov Epstein.'
            }
          </p>

          <h2>{isHebrew ? 'סגנון היצירה' : 'Artistic Style'}</h2>
          <p>
            {isHebrew
              ? 'בחייט דבק הכינוי \'ציירת הליצנים\', משום שהדמויות האנושיות בציוריה עוטות על פניהן לרוב מסכה. סימטריה, שקט, סמכותיות ושלוות צבע עבדו אצל הציירת כמין בולם זעזועים מפני רקמת המציאות הקשה. חייט אפשרה ביצירותיה למצוא גוונים רבים ולעיתים הניחה רק לשחור וללבן, הפשוטים לכאורה של העיפרון, להעניק הבעות אנושיות מגוונות כחכמה, תמימות, ערמומיות ואומללות.'
              : 'Khayat was nicknamed the "Clown Painter" because the human figures in her paintings often wear masks. Symmetry, tranquility, authority, and color calmness acted as shock absorbers against the harsh reality. In her works, Khayat allowed finding many shades and sometimes left only black and white, seemingly simple pencil drawings, to express diverse human expressions such as wisdom, innocence, cunning, and misery.'
            }
          </p>

          <p>
            {isHebrew
              ? 'בין יצירותיה הטריפטיכון, המשקף את מסכת חייה הקשים של האמנית כבר מילדותה, שהטילה אותה כהגדרתה, וכשם היצירה, אל זירת קרקס החיים של שושי. בכוח אישיותה, בדומה למסכה שביצירותיה, היא עוטה על רגשותיה מעטה בדמוי של \'רומנטיקת קרקסים\', ובכך מרחיקה את הצופה מן ההליכה על חבל הזכרונות הדק האישי שלה.'
              : 'Among her works is the triptych, reflecting the difficult life story of the artist from her childhood, which she described and named, into the circus arena of Shoshi’s life. With her personality, similar to the mask in her works, she covers her emotions with a cloak resembling "circus romance", thus distancing the viewer from walking on the thin rope of her personal memories.'
            }
          </p>

          <p>
            {isHebrew
              ? 'אף על פי שהעיסוק בדמות הליצן מאפשר זאת, קשה למצוא בעבודותיה פארסה, בוטות או סלפסטיק לשמו, שכן דומה כי מרבית הדמויות, לרבות הפסלים שיצרה, נושאות בנטל של סבילות.'
              : 'Although dealing with the clown figure allows for it, it is difficult to find farce, crudeness, or slapstick in her works, as most of the characters, including the sculptures she created, seem to bear the burden of passivity.'
            }
          </p>

          <p>
            {isHebrew
              ? 'דוגמה לשימוש בלקסיקון הלולייני החזותי של היוצרת הייתה נוכחת ביצירת סדרת ציורי התנ"ך שיצרה, שבה הדמויות המסורתיות לובשות על פניהן מסכות של ליצנים. מתוך הסדרה בולט ציור בשם "טרוף טורף יוסף" (מתוך מעמד כתונת הפסים לאחר מכירתו של יוסף לישמעאלים), המהווה כמשל וכנמשל מרחשי ליבה וסיפורה האישי.'
              : 'An example of using the creator\'s visual circus lexicon was present in her series of Bible paintings, where traditional characters wear clown masks. From this series, a painting named "Joseph was Torn to Pieces" (from the scene of the coat of many colors after Joseph was sold to the Ishmaelites) stands out, serving as both allegory and analogy to her inner feelings and personal story.'
            }
          </p>

          <p>
            {isHebrew
              ? 'באחד הראיונות שנתנה לתקשורת הסבירה את עומק יצירתה ואת ההקשר לדמויות הליצנים:'
              : 'In one of the interviews she gave to the media, she explained the depth of her work and the connection to clown figures:'
            }
          </p>
          <blockquote className={styles['shoshi-blockquote']}>
            <p>
              {isHebrew
                ? '"אני משתמשת בדמותו של הליצן כדי להמחיש את מורכבות האדם ואת הצורך שלו להסתתר מאחורי מסכות. ליצן הוא אדם שעוטה על פניו מסכה, כולנו עוטים על פנינו מסכות. רוב שעות היום אנחנו מכסים את האמת במסכות כדי להתאים את עצמנו לסביבה. הליצן הוא אני, ומזה אני לא יכולה לברוח".'
                : '"I use the clown figure to illustrate the complexity of human beings and their need to hide behind masks. A clown is a person who wears a mask; we all wear masks. Most of the time, we cover the truth with masks to fit into our surroundings. The clown is me, and I cannot escape from that."'
              }
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Shoshi;
