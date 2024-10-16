import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from '../css/Exhibitions.module.css'; // Import the CSS module
import logoEN from '../images/logoEN.png';

function JacobExhibitions({ language }) {
  const isHebrew = language === 'he';

  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/jacob/exhibitions"
    : "https://artchayat.netlify.app/en/jacob/exhibitions";

  return (
    <HelmetProvider>
      <div className={`${styles['exhibitions-container']} ${isHebrew ? styles['exhibitions-rtl'] : styles['exhibitions-ltr']}`}>
        <Helmet>
          <title>{language === 'he' ? 'ArtChayat - יעקב חייט | תערוכות | ארט חייט' : 'Jacob Chayat | Exhibitions | ArtChayat - ארט חייט'}</title>
          <meta name="description" content={isHebrew ? 'רבות מיצירותיו של חייט מוצגות בגלריות ובקרב אספני אומנות בישראל וברחבי תבל.' : 'Many of Chayat\'s works are displayed in galleries and among art collectors in Israel and around the world.'} />
          <meta name="keywords" content={isHebrew ? 'יעקב חייט, תערוכות, אומנות' : 'Yaakov Chayat, exhibitions, art'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={isHebrew ? 'ArtChayat - יעקב חייט | תערוכות | ארט חייט' : 'Jacob Chayat | Exhibitions | ArtChayat - ארט חייט'} />
          <meta property="og:description" content={isHebrew ? 'רבות מיצירותיו של חייט מוצגות בגלריות ובקרב אספני אומנות בישראל וברחבי תבל.' : 'Many of Chayat\'s works are displayed in galleries and among art collectors in Israel and around the world.'} />
          <meta property="og:image" content={logoEN} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <h2>{isHebrew ? 'תערוכות' : 'Exhibitions'}</h2>
        <p>{isHebrew ? 'רבות מיצירותיו של חייט מוצגות בגלריות ובקרב אספני אומנות בישראל וברחבי תבל.' : 'Many of Chayat\'s works are displayed in galleries and among art collectors in Israel and around the world.'}</p>
        <div className={styles['exhibitions-list']}>
          <ul>
            {isHebrew ? (
              <>
                <li>1967 - גלריה 220, תל אביב.</li>
                <li>1974 - מוזיאון בן-ארי, בת ים.</li>
                <li>1975 - גלריה ניווה, תל אביב.</li>
                <li>1976 - גלריה אתר-ארט, תל אביב.</li>
                <li>1977 - גלריה אנהבלי, תל אביב.</li>
                <li>1978 - גלריה שחף, יפו העתיקה.</li>
                <li>1978 - בית הראשונים, גבעתיים.</li>
                <li>1980 - הגלריה החדשה, תל אביב.</li>
                <li>1980 - בית האמנים, מקסיקו סיטי, מקסיקו.</li>
                <li>1980 - "הגלריה העירונית", כפר-סבא.</li>
                <li>1981 - בית העירייה, ברלין נויקלן, גרמניה.</li>
              </>
            ) : (
              <>
                <li>1967 - 220 Gallery, Tel Aviv.</li>
                <li>1974 - Ben-Ari Museum, Bat Yam.</li>
                <li>1975 - Neve Gallery, Tel Aviv.</li>
                <li>1976 - Etar-Art Gallery, Tel Aviv.</li>
                <li>1977 - Annabelly Gallery, Tel Aviv.</li>
                <li>1978 - Shachaf Gallery, Old Jaffa.</li>
                <li>1978 - Beit Rishonim, Givatayim.</li>
                <li>1980 - The New Gallery, Tel Aviv.</li>
                <li>1980 - House of Artists, Mexico City, Mexico.</li>
                <li>1980 - City Gallery, Kfar Saba.</li>
                <li>1981 - City Hall, Berlin Neukölln, Germany.</li>
              </>
            )}
          </ul>
          <ul>
            {isHebrew ? (
              <>
                <li>1982 - גלריה קמילה, רמת גן.</li>
                <li>1983 - גלריה המרתף, רעננה.</li>
                <li>1983 - בית האמנים, תל אביב.</li>
                <li>1986 - בית התרבות, קרית גת.</li>
                <li>1987 - הגלריה החדשה, בית אבא חושי, חיפה.</li>
                <li>1988 - גלריה טאצ'-ווד, תל אביב.</li>
                <li>1989 - גלריה המרתף, רעננה.</li>
                <li>1990 - גלריה יוריק, רמת השרון.</li>
                <li>1993 - בית היקב, ראשון לציון.</li>
                <li>1997 - בית אלון, גבעתיים.</li>
                <li>2005 - גלריה בר עוז, תל אביב.</li>
                <li>2007 - ארט אקספו, ניו יורק.</li>
              </>
            ) : (
              <>
                <li>1982 - Camelia Gallery, Ramat Gan.</li>
                <li>1983 - The Basement Gallery, Ra'anana.</li>
                <li>1983 - House of Artists, Tel Aviv.</li>
                <li>1986 - House of Culture, Kiryat Gat.</li>
                <li>1987 - The New Gallery, Aba Hushi House, Haifa.</li>
                <li>1988 - Touch-Wood Gallery, Tel Aviv.</li>
                <li>1989 - The Basement Gallery, Ra'anana.</li>
                <li>1990 - Yurik Gallery, Ramat Hasharon.</li>
                <li>1993 - The Winery House, Rishon LeZion.</li>
                <li>1997 - Alon House, Givatayim.</li>
                <li>2005 - Bar Oz Gallery, Tel Aviv.</li>
                <li>2007 - Art Expo, New York.</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default JacobExhibitions;
