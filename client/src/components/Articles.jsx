import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from '../css/Articles.module.css';
import logoEN from '../images/logoEN.png';

const articles = [
  {
    image: 'https://res.cloudinary.com/dhshndco4/image/upload/v1722681589/PressImages/article1_wruyhl.webp',
    author: {
      en: 'the "whole city" system',
      he: 'מערכת "כל העיר" ',
    },
    date: {
      en: '1/17/19',
      he: '17/1/19',
    },
    title: {
      en: 'Amara Stoudemire seeks Jerusalem art',
      he: 'אמארה סטודמאייר שוחר אמנות ירושלמית',
    },
    excerpt: {
      en: 'Hapoel star Amara Stoudemire is not only a lover of fine food (the section picked you up at the "Hasdana" restaurant last night), but also an art lover...',
      he: 'כוכב הפועל אמארה סטודמאייר לא רק חובב אוכל משובח (המדור קלט אותך במסעדת "הסדנא" במוצ"ש שעבר), אלא גם שוחר אמנות מדופלם...',
    },
    link: 'https://www.kolhair.co.il/gossip/78667/?fbclid=IwZXh0bgNhZW0CMTEAAR1hdYWiFOTr7LcuZ-bUGIXu_kyH9S1IHYJs8qYGZWh0eapNPKJUCqrMnCU_aem_VQpLxatbdOgHu90__nWbDw&sfnsn=wa',
  },
  {
    image: 'https://res.cloudinary.com/dhshndco4/image/upload/v1722682324/PressImages/press4_bey06h.jpg',
    author: {
      en: 'Holon Municipality',
      he: 'עיריית חולון',
    },
    date: {
      en: '10/08/2021',
      he: '08/10/2021',
    },
    title: {
      en: '"Painting a Love Story" exhibition',
      he: 'תערוכת "מציירים סיפור אהבה"',
    },
    excerpt: {
      en: 'A retrospective exhibition for the artist couple Shushi and Yaakov Hayat, their memory is blessed...',
      he: 'תערוכה רטרוספקטיבית לזוג האומנים שושי ויעקב חייט זכרונם לברכה...',
    },
    link: 'https://www.holon.muni.il/Lists/List2/CustomDispForm.aspx?ID=2129',
  }
];

const Articles = ({ language }) => {
  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/articles"
    : "https://artchayat.netlify.app/en/articles";

  return (
    <HelmetProvider>
      <div className={`${styles.articlesPage} ${language === 'he' ? styles.rtl : styles.ltr}`}>
        <Helmet>
          <title>{language === 'he' ? 'ArtChayat - כתבות | ארט חייט' : 'Articles | ArtChayat - ארט חייט'}</title>
          <meta name="description" content={language === 'he' ? 'גלו מה נכתב על יעקב ושושי חייט ז"ל' : 'Find out what was written about the late Yaakov and Shushi Hait'} />
          <meta name="keywords" content={language === 'he' ? 'ארט חייט, יעקב חייט, שושי חייט, אמנות, מאמרים, תערוכה' : 'Art Chayat, Jacob Chayat, Shoshi Chayat, art, articles, exhibition'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={language === 'he' ? 'ArtChayat - כתבות | ארט חייט' : 'Articles | ArtChayat - ארט חייט'} />
          <meta property="og:description" content={language === 'he' ? 'גלו מה נכתב על יעקב ושושי חייט ז"ל' : 'Find out what was written about the late Yaakov and Shushi Hait'} />
          <meta property="og:image" content={logoEN} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <header className={styles.header}>
          <h1>{language === 'he' ? 'כתבות' : 'Articles'}</h1>
          <p>{language === 'he' ? 'גלו מה נכתב על יעקב ושושי חייט ז"ל' : 'Find out what was written about the late Yaakov and Shushi Hait'}</p>
        </header>
        <div className={styles.articlesContainer}>
          <div className={styles.articlesGrid}>
            {articles.map((article, index) => (
              <div key={index} className={styles.card}>
                <img src={article.image} alt={article.title[language]} className={styles.image} />
                <div className={styles.content}>
                  <p className={styles.author}>{article.author[language]}</p>
                  <p className={styles.date}>{article.date[language]}</p>
                  <h2 className={styles.title}>{article.title[language]}</h2>
                  <p className={styles.excerpt}>{article.excerpt[language]}</p>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {language === 'he' ? 'קרא עוד >' : 'Read More >'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Articles;
