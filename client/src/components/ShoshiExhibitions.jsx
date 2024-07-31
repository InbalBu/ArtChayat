import React from 'react';
import styles from '../css/Exhibitions.module.css'; // Import the CSS module

function ShoshiExhibitions({ language }) {
  const isHebrew = language === 'he';

  return (
    <div className={`${styles['exhibitions-container']} ${isHebrew ? styles['exhibitions-rtl'] : styles['exhibitions-ltr']}`}>
      <h2>{isHebrew ? 'תערוכות' : 'Exhibitions'}</h2>
      <p>{isHebrew ? 'במהלך הקריירה האמנותית שלה הציגה שושי חייט 27 תערוכות יחיד ועוד 36 תערוכות קבוצתיות בישראל ובעולם.' : 'During her artistic career, Shoshi Khayat presented 27 solo exhibitions and 36 group exhibitions in Israel and around the world.'}</p>
      <div className={styles['exhibitions-list']}>
        <ul>
          {isHebrew ? (
            <>
              <li>1975 - גלריה "ננוה", תל אביב.</li>
              <li>1976 - גלריה "אתר ארט", תל אביב.</li>
              <li>1977 - מוזיאון "בן-ארי", בת-ים.</li>
              <li>1977 - גלריה "פינו גלרי", חולון.</li>
              <li>1978 - "בית ראשונים", גבעתיים.</li>
              <li>1979 - גלריה "די נור", יפו העתיקה.</li>
              <li>1980 - "בית האמנים", מקסיקו סיטי, מקסיקו.</li>
              <li>1980 - "הגלריה החדשה, תל אביב.</li>
              <li>1981 - "יד לבנים", רחובות.</li>
              <li>1982 - "הגלריה העירונית", כפר-סבא.</li>
              <li>1982 - גלריה "קמליה", רמת-גן.</li>
              <li>1983 - גלריה "המרתף", רעננה.</li>
              <li>1984 - גלריה "מרינה", בת-ים.</li>
              <li>1985 - גלריה "המרתף", רעננה.</li>
            </>
          ) : (
            <>
              <li>1975 - "Nanou" Gallery, Tel Aviv.</li>
              <li>1976 - "Etar Art" Gallery, Tel Aviv.</li>
              <li>1977 - "Ben-Ari" Museum, Bat Yam.</li>
              <li>1977 - "Pino Gallery", Holon.</li>
              <li>1978 - "Beit Rishonim", Givatayim.</li>
              <li>1979 - "Di Nur" Gallery, Old Jaffa.</li>
              <li>1980 - "House of Artists", Mexico City, Mexico.</li>
              <li>1980 - "The New Gallery", Tel Aviv.</li>
              <li>1981 - "Yad LaBanim", Rehovot.</li>
              <li>1982 - "City Gallery", Kfar Saba.</li>
              <li>1982 - "Camelia" Gallery, Ramat Gan.</li>
              <li>1983 - "The Basement" Gallery, Ra'anana.</li>
              <li>1984 - "Marina" Gallery, Bat Yam.</li>
              <li>1985 - "The Basement" Gallery, Ra'anana.</li>
            </>
          )}
        </ul>
        <ul>
          {isHebrew ? (
            <>
              <li>1986 - מוזיאון "יד לבנים", ראשון-לציון.</li>
              <li>1987 - "הגלרי החדשה", בית אבא חושי, חיפה.</li>
              <li>1989 - "מוזיאון ריבק", בת-ים.</li>
              <li>1990 - גלריה "הכיכר", יפו העתיקה. השקת ספר שירים ראשון "תותים אדומים", יחד עם תערוכת רישומים מתוך הספר.</li>
              <li>1991 - הגלריה העירונית "בית עלי", אשקלון.</li>
              <li>1997 - "בית אלון", גבעתיים. השקת ספר שירים שני, "לראות את אלוהים מבעד לחשיכה".</li>
              <li>1997 - הצבת פסל סביבתי בפרק הפסלים בעינות.</li>
              <li>2000 - גלריה "אחוזת בית", רעננה.</li>
              <li>2000 - מוזיאון התנ"ך, תל אביב.</li>
              <li>2003 - גלריה "בגובה העיניים", חולון.</li>
              <li>2004 - גלריה "היכל התרבות", פתח-תקוה.</li>
              <li>2008 - בית יד-לבנים, נס-ציונה.</li>
              <li>2012 - תערוכה במלאת שנה לפטירתה של שושי חייט בבית אריאלה, תל אביב.</li>
            </>
          ) : (
            <>
              <li>1986 - "Yad LaBanim" Museum, Rishon Lezion.</li>
              <li>1987 - "The New Gallery", Aba Hushi House, Haifa.</li>
              <li>1989 - "Ribak" Museum, Bat Yam.</li>
              <li>1990 - "The Square" Gallery, Old Jaffa. Launch of the first poetry book "Red Strawberries", along with an exhibition of drawings from the book.</li>
              <li>1991 - "Ali House" City Gallery, Ashkelon.</li>
              <li>1997 - "Alon House", Givatayim. Launch of the second poetry book "Seeing God Through the Darkness".</li>
              <li>1997 - Installation of an environmental sculpture in the Sculpture Park at Einot.</li>
              <li>2000 - "Ahuza House" Gallery, Ra'anana.</li>
              <li>2000 - Bible Museum, Tel Aviv.</li>
              <li>2003 - "At Eye Level" Gallery, Holon.</li>
              <li>2004 - "Culture Palace" Gallery, Petah Tikva.</li>
              <li>2008 - Yad LaBanim House, Ness Ziona.</li>
              <li>2012 - Exhibition marking the first anniversary of Shoshi Khayat's passing at Beit Ariela, Tel Aviv.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShoshiExhibitions;
