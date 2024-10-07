import React from 'react';
import { Helmet } from 'react-helmet';
import styles from '../css/About.module.css'; // Import CSS module
import shoshiAndJacob from '../images/shoshiandjacob.jpeg';
import Presentation from './Presentation';

function About({ language }) {
    return (
        <div className={`${styles['about-container']} ${language === 'he' ? styles['about-rtl'] : styles['about-ltr']}`}>
            <Helmet>
                <title>{language === 'he' ? 'ArtChayat - אודות | ארט חייט' : 'About | ArtChayat - ארט חייט'}</title>
                <meta name="description" content={language === 'he' ? 'ארט חייט נולד מתוך יצירה ואהבה לאומנות...' : 'Art Chayat was born out of creativity and a love for art...'} />
                <meta name="keywords" content={language === 'he' ? 'ארט חייט, יעקב חייט, שושי חייט, אומנות, ציור, פיסול' : 'Art Chayat, Jacob Chayat, Shoshi Chayat, art, painting, sculpture'} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph tags */}
                <meta property="og:title" content={language === 'he' ? 'אודות | ארט חייט - ArtChayat' : 'Art Chayat - Painting a Love Story'} />
                <meta property="og:description" content={language === 'he' ? 'ארט חייט נולד מתוך יצירה ואהבה לאומנות...' : 'Art Chayat was born out of creativity and a love for art...'} />
                <meta property="og:image" content={shoshiAndJacob} />
                <meta property="og:url" content="https://artchayat.netlify.app/about" />
                <meta property="og:type" content="website" />
            </Helmet>

            <h1>{language === 'he' ? 'ארט חייט - מציירים סיפור אהבה' : 'Art Chayat - Painting a Love Story'}</h1>
            <div className={styles['about-content']}>
                <div className={styles['about-text-container']}>
                    <p>{language === 'he' ? 'ארט חייט נולד מתוך יצירה ואהבה לאומנות, משולב בסיפור אהבתם של הורינו, זוג האומנים שושי ויעקב חייט ז"ל.' : 'Art Chayat was born out of creativity and a love for art, intertwined with the love story of our parents, the artists Shoshi and Yaakov Chayat.'}</p>
                    <p>{language === 'he' ? 'נעים להכיר: מיכל בוקריס וריקי חייט בנותיהם, בעלים של חברת "ארט חייט" ומנהלות העיזבון שהותירו אחריהם.' : 'Nice to meet you: Michal Bukris and Riki Chayat, their daughters, owners of "Art Chayat," and managers of the estate they left behind.'}</p>
                    <p>{language === 'he' ? 'רבות מיצירותיהם מוצגות בגלריות ובקרב אספני אומנות בישראל ובחו"ל. האוסף שמוצע למכירה, מכיל יצירות אומנות רבות ומגוונות מתקופות שונות לאורך 50 שנות יצירה: ציורי שמן ואקריליק אורגינליים, אקוורלים, רישומים, הדפסים, שטיחי קיר אומנותיים, פסלים וספרי שירה ורומן המבוסס על יומניה האישיים של שושי.' : 'Many of their works are displayed in galleries and among art collectors in Israel and abroad. The collection available for sale includes a wide range of artworks from different periods over 50 years of creation: original oil and acrylic paintings, watercolors, drawings, prints, artistic wall carpets, sculptures, and poetry and novel books based on Shoshi\'s personal diaries.'}</p>
                    <p>{language === 'he' ? 'אין האחד בלעדי השניה. מאותו הרגע שנפגשו, לא נפרדו בחייהם. עד המוות. האהבה והחיבור בין שניהם הוליד, מלבד שתי בנות ריקי ומיכל וחמישה נכדים, גם קריירה רבת שנים של כל אחד מהם כאומן ייחודי בפני עצמו.' : 'The two were inseparable from the moment they met until death. Their love and connection not only resulted in two daughters, Riki and Michal, and five grandchildren, but also in each of their long careers as unique artists in their own right.'}</p>
                    <p>{language === 'he' ? 'יעקב חייט מלבד היותו צייר ואמן, ייסד את אגודת הציירים והפסלים בבת-ים והיה היו"ר הראשון. כמו כן ניהל את מוזיאון בן-ארי וקידם את האומנות הישראלית בבת-ים.' : 'In addition to being a painter and artist, Yaakov Chayat founded the Association of Painters and Sculptors in Bat Yam and was its first chairman. He also managed the Ben-Ari Museum and promoted Israeli art in Bat Yam.'}</p>
                </div>
                <div className={styles['about-text-container']}>
                    <p>{language === 'he' ? 'שושי חייט שכונתה "ציירת הליצנים" היתה אמנית מגוונת, פסלת, משוררת וסופרת. היא זכתה בפרס סיפרותי של קרן תרבות על ספר שיריה "תותים אדומים".' : 'Shoshi Chayat, known as "The Clown Painter," was a versatile artist, sculptor, poet, and writer. She won a literary award from the Culture Fund for her poetry book "Red Strawberries.'}</p>
                    <p>{language === 'he' ? 'את זכרונותיהם ומאוויהם, הכאב והעצב, השמחה והאופטימיות של שניהם הם העלו על הבד. בכדי להבין את מקור ההשראה של כל אחד מהם, אתם מוזמנים לבקר באתר "ארט חייט" ולצלול לתוך סיפור חייהם המרתק, ואהבתם המיוחדת יוצאת הדופן שניצתה בפגישה מקרית בסחנה, וחיברה בין יעקב יליד עירק שעלה לארץ עם משפחתו כשהיה בן 11, לבין שושי לבית משפחת גנץ, בת להורים ניצולי שואה שנולדה ברומניה לאחר המלחמה ועלתה לארץ עם אמה כשהיתה בת שנתיים.' : 'Their memories and desires, their pain and sadness, joy and optimism, were all captured on canvas. To understand each of their sources of inspiration, you are invited to visit the "Art Chayat" website and delve into their fascinating life story, and their unique love that ignited from a chance meeting in Sakhne, connecting Yaakov, born in Iraq and who came to Israel with his family when he was 11, with Shoshi, from the Gantz family, born to Holocaust survivor parents in Romania after the war and who came to Israel with her mother when she was two.'}</p>
                    <p>{language === 'he' ? 'נשמח לעמוד לשירותכם ולענות על כל שאלה.' : 'We are happy to assist you and answer any questions.'}</p>
                    <p>{language === 'he' ? <>בברכה,<br />מיכל בוקריס<br />ריקי חייט</> : <>Best regards,<br />Michal Bukris<br />Riki Chayat</>}</p>
                </div>
            </div>
            <div className={styles['presentation-container']}>
                <Presentation />
            </div>
        </div>
    );
}

export default About;
