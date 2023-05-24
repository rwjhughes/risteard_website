import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar.js'
import Footer from '@/components/footer.js'
import styles from '../styles/Projects.module.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const projects = [
  {
    category: "music",
    title: "May Day",
    year: "2022",
    infoen: "compilation album - released on The Department of Energy",
    infoga: "albam teaglama - eisithe ar The Department of Energy",
    link: "https://thedepartmentofenergy.bandcamp.com/album/may-day-landscape-mixtape",
  },
  {
    category: "performing",
    title: "Róis",
    year: "2023",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "https://roseconnolly.bandcamp.com/album/uisce-agus-bean",
  },
  {
    category: "recording",
    title: "UISCE AGUS BEAN",
    year: "2023",
    infoen: "album - cello for Róis",
    infoga: "albam - dordveidhil do Róis",
    link: "https://roseconnolly.bandcamp.com/album/uisce-agus-bean",
  },
  {
    category: "soundtrack",
    title: "Inis Oírr, portrait d'une île",
    year: "2022",
    infoen: "soundtrack for film by Evangéline D. Allizé",
    infoga: "fuaimrian do scannán le Evangéline D. Allizé",
    link: "https://youtu.be/aLZ_Gf9rGfo",
  },
  {
    category: "arranging",
    title: "Glasshouse",
    year: "2021",
    infoen: "arranged for Prince and Kate Bush sets",
    infoga: "coiríodh seiteanna Prince agus Kate Bush",
    link: "https://www.musicglasshouse.com/",
  },
  {
    category: "arranging",
    title: "Trinity Orchestra",
    year: "2016-22",
    infoen: "arranged pop music sets for summer festivals",
    infoga: "coiríodh seiteanna popcheol do fhéilte samhraidh",
    link: "https://www.trinityorchestra.com",
  },
  {
    category: "coding",
    title: "Focal an Lae",
    year: "2022",
    infoen: "Telegram bot that sends Irish word of the day with other features",
    infoga: "bota Telegram a sheolanns Focal an Lae le gnéithe eile",
    link: "https://t.me/Focailbot",
  },
  {
    category: "performing",
    title: "Gemma Dunleavy",
    year: "2022",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "https://youtu.be/eSJjUlpFqPc",
  },

  {
    category: "soundtrack",
    title: "Old Aran in Colour",
    year: "2022",
    infoen: "soundtrack production for exhibition",
    infoga: "léiriúchán fuaimriain don taispeántas",
    link: "http://aras-eanna.ie/en/project/old-aran-in-colour/",
  },
  {
    category: "recording",
    title: "Blackwater Valley High",
    year: "2021",
    infoen: "album - cello on track 9, released on The Department of Energy",
    infoga: "albam - dordveidhil ar rian 9, eisithe ar The Department of Energy",
    link: "https://thedepartmentofenergy.bandcamp.com/album/blackwater-valley-high-landscape-mixtape",
  },
  {
    category: "coding",
    title: "EDO SYNTH",
    year: "2021",
    infoen: "online installation for Screen Dive, Gaudeamus Festival",
    infoga: "suiteán ar líne le haghaidh Screen Dive, Gaudeamus Festival",
    link: "https://gaudeamusscreendive.com/edo-synth",
  },
  {
    category: "music",
    title: "ponxi",
    year: "2020",
    infoen: "experimental electronic duo - live sets and recorded music",
    infoga: "dísreach leictreach trialach. seiteanna beo agus taifeadta.",
    link: "https://ponxi.art",
  },
  {
    category: "music",
    title: "Lee Lines",
    year: "2021",
    infoen: "compilation album - released on The Department of Energy",
    infoga: "albam teaglama - eisithe ar The Department of Energy",
    link: "https://thedepartmentofenergy.bandcamp.com/album/lee-lines-landscape-mixtape",
  },
  {
    category: "music",
    title: "Herzog TV: MirrorWorld",
    year: "2021",
    infoen: "compilation album",
    infoga: "albam teaglama",
    link: "https://herzogtv.bandcamp.com/album/herzog-tv-mirrorworld",
  },
  {
    category: "recording",
    title: "Stalker",
    year: "2020",
    infoen: "album - cello & keys for Stephen Star",
    infoga: "albam - dordveidhil ⁊ méarchlár do Stephen Star",
    link: "https://herzogtv.bandcamp.com/album/stalker",
  },
  {
    category: "music",
    title: "Hello, World!",
    year: "2020",
    infoen: "album - released on Herzog TV",
    infoga: "albam - eisithe ar Herzog TV",
    link: "https://herzogtv.bandcamp.com/album/hello-world",
  },
  {
    category: "music",
    title: "D'AW CLUB",
    year: "2020",
    infoen: "compilation album - tracks 1 & 19",
    infoga: "albam teaglama - rianta 1 ⁊ 19",
    link: "https://soundcloud.com/daw-club/sets/daw-club-greatest-hits",
  },
  {
    category: "recording",
    title: "The Brikc",
    year: "2019",
    infoen: "EP - piano for Seán Being",
    infoga: "EP - pianó do Seán Being",
    link: "https://wherethetimegoes.bandcamp.com/album/potboiler-no-4-sean-being-the-brikc",
  },
  {
    category: "performing",
    title: "Seán Being",
    year: "2019",
    infoen: "piano & synths",
    infoga: "pianó ⁊ sintéiseoirí",
    link: "https://www.youtube.com/watch?v=qsbIjbVS260",
  },
  {
    category: "performing",
    title: "Henry Earnest",
    year: "2018-19",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "https://www.youtube.com/watch?v=h1JhUVTI-5E",
  },
  {
    category: "performing",
    title: "Trinity Orchestra",
    year: "2017-19",
    infoen: "piano",
    infoga: "pianó",
    link: "https://www.trinityorchestra.com",
  },

  {
    category: "music",
    title: "Anois",
    year: "2018",
    infoen: "All City Records compilation tape for Cassette Store Day",
    infoga: "téip teaglama All City Records le haghaidh Cassette Store Day",
    link: "https://www.facebook.com/events/2253108821428710/",
  },
  {
    category: "recording",
    title: "Temple of the Comet Star",
    year: "2018",
    infoen: "EP - synthesiser for Zane Walden",
    infoga: "EP - sintéiseoir do Zane Walden",
    link: "https://herzogtv.bandcamp.com/album/temple-of-the-comet-star",
  },
  {
    category: "recording",
    title: "Waiting To Happen",
    year: "2015",
    infoen: "EP - cello for A Happy Accident",
    infoga: "EP - dordveidhil do A Happy Accident",
    link: "https://ahappyaccidentmusic.bandcamp.com/album/waiting-to-happen-e-p",
  },
  {
    category: "composing",
    title: "Aduantas",
    year: "2022",
    infoen: "Netherlands",
    infoga: "An Ísiltír",
    link: "",
  },
  {
    category: "composing",
    title: "Michelle Pritchard",
    year: "2022",
    infoen: "Netherlands",
    infoga: "An Ísiltír",
    link: "http://www.michelle-pritchard.com/",
  },
  {
    category: "composing",
    title: "Residentie Orkest",
    year: "2022",
    infoen: "Netherlands",
    infoga: "An Ísiltír",
    link: "https://residentieorkest.nl/",
  },
  {
    category: "composing",
    title: "Crash Ensemble",
    year: "2022",
    infoen: "Ireland",
    infoga: "Éire",
    link: "https://www.crashensemble.com/",
  },
  {
    category: "composing",
    title: "MAZE Ensemble",
    year: "2021",
    infoen: "Netherlands",
    infoga: "An Ísiltír",
    link: "https://www.maze.nu/",
  },
  {
    category: "composing",
    title: "Kate Ellis",
    year: "2020",
    infoen: "Ireland",
    infoga: "Éire",
    link: "",
  },
  {
    category: "composing",
    title: "Malachy Robinson",
    year: "2019",
    infoen: "Ireland",
    infoga: "Éire",
    link: "https://malachyrobinson.com/",
  },
  {
    category: "composing",
    title: "Ebony Wind Quintet",
    year: "2019",
    infoen: "Ireland",
    infoga: "Éire",
    link: "",
  },
  {
    category: "composing",
    title: "Kirkos Ensemble",
    year: "2016",
    infoen: "Ireland",
    infoga: "Éire",
    link: "https://www.kirkosensemble.com/",
  },
  {
    category: "composing",
    title: "Máire Carroll",
    year: "2014",
    infoen: "Ireland",
    infoga: "Éire",
    link: "http://www.mairecarroll.com/",
  },
];

const groupProjectsByCategory = (projects) => {
  return projects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {});
};

export default function ProjectList() {
  let router = useRouter();
  let { t } = useTranslation();

  const translateCategory = (category) => {
    switch (category) {
      case 'music':
        return router.locale === 'en' ? 'MUSIC' : 'CEOL';
      case 'recording':
        return router.locale === 'en' ? 'RECORDING' : 'TAIFEADADH';
      case 'performing':
        return router.locale === 'en' ? 'PERFORMING' : 'TAIBHLÉIRIÚ';
      case 'composing':
        return router.locale === 'en' ? 'COMPOSING' : 'CUMADH';
      case 'soundtrack':
        return router.locale === 'en' ? 'SOUNDTRACK' : 'FUAIMRIAN';
      case 'arranging':
        return router.locale === 'en' ? 'ARRANGING' : 'COIRIÚ';
      case 'coding':
        return router.locale === 'en' ? 'CODING' : 'CÓDÚ';
      default:
        return category;
    }
  };

  const groupedProjects = groupProjectsByCategory(projects);

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950) {
        setColumns(3);
      } else if (window.innerWidth >= 670) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columnCount = {
    columnCount: columns,
  };

  return (
    <div>
      <Head>
        <title>
          {t("projects:title")}
        </title>
        <meta name="description" content="List of projects" />
      </Head>
      <Navbar />
      {/* <h1>
        {t("projects:title")}
      </h1> */}
      <div className={styles.container} style={columnCount}>

        {Object.keys(groupedProjects).map((category, index) => (
          <div key={category} className={styles.item} id={index}>
            <h2 className={`${styles.itemTitle} ${category}`}>{translateCategory(category)}</h2>
            <div className={styles.projectBundle}>

              {groupedProjects[category].map((project, index) => (
                <div key={index} className={styles.projectSingle}>

                  {/* empty link if there's no link */}
                  <Link href={project.link}
                    id={index} target={project.link === "" ? "" : "_blank"}>

                    <h3>{project.title}</h3>
                  </Link>
                  <p>{project.year}, {router.locale === 'en' ? project.infoen : project.infoga}</p>
                </div>
              ))}
            </div>
          </div>
        ))
        }
      </div>
      <Footer />
    </div >
  );
}
