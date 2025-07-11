import Footer from '@/components/footer.js';
import Navbar from '@/components/navbar.js';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Agenda.module.css';

const concerts = [
  // {
  //   date: "",
  //   title: "",
  //   locationen: "",
  //   locationga: "",
  // },
  {
    date: "02/08/2025",
    title: "Róis",
    locationen: "All Together Now, Waterford",
    locationga: "All Together Now, Port Láirge",
  },
  {
    date: "26/07/2025",
    title: "Bunchlann/Buncharraig",
    locationen: "Liverpool Biennial, England",
    locationga: "Liverpool Biennial, Sasana",
  },
  {
    date: "17/05/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Éigse na Bruiséile, Belgium",
    locationga: "Éigse na Bruiséile, An Bheilg",
  },
  {
    date: "10/05/2025",
    title: "Mo Chac",
    locationen: "Ranelagh Arts Festival, Dublin",
    locationga: "Ranelagh Arts Festival, BÁC",
  },
  {
    date: "04/05/2025",
    title: "Gliogar",
    titlega: "Gliogar",
    locationen: "Alternating Current Festival, The Complex, Dublin",
    locationga: "Alternating Current Festival, The Complex, BÁC",
  },
  {
    date: "03/05/2025",
    title: "Mythlantics",
    locationen: "Galway Arts Centre",
    locationga: "Ionad Ealaíne na Gaillimhe",
  },
  {
    date: "27/04/2025",
    title: "w/ Lara Gallagher & Arthur Greene",
    titlega: "le Lara Gallagher ⁊ Arthur Greene",
    locationen: "The Dublin Jazz Co-op, The Cobblestone, Dublin",
    locationga: "The Dublin Jazz Co-op, The Cobblestone, BÁC",
  },
  {
    date: "11/04/2025",
    title: "Féile Phobail",
    locationen: "Inis Oírr, Galway",
    locationga: "Inis Oírr, Gaillimh",
  },
  {
    date: "27/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Coláiste Chomáin, Ros Dumhach, Mayo",
    locationga: "Coláiste Chomáin, Ros Dumhach, Maigh Eo",
  },
  {
    date: "26/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Coláiste Naomh Feichín, Corr na Móna, Galway",
    locationga: "Coláiste Naomh Feichín, Corr na Móna, Gaillimh",
  },
  {
    date: "21/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Scoil Phobail Mhic Dara, Carna, Galway",
    locationga: "Scoil Phobail Mhic Dara, Carna, Gaillimh",
  },
  {
    date: "20/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Coláiste Cholmcille, Indreabhán, Galway",
    locationga: "Coláiste Cholmcille, Indreabhán, Gaillimh",
  },
  {
    date: "19/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Coláiste na bPiarsach, Ros Muc, Galway",
    locationga: "Coláiste na bPiarsach, Ros Muc, Gaillimh",
  },
  {
    date: "18/03/2025",
    title: "Ar An Dé Deiridh",
    locationen: "Coláiste Chroí Mhuire gan Smál, An Spidéal, Galway",
    locationga: "Coláiste Chroí Mhuire gan Smál, An Spidéal, Gaillimh",
  },
  {
    date: "16/03/2025",
    title: "Féile Thomáis Bháin",
    locationen: "Inis Meáin, Galway",
    locationga: "Inis Meáin, Gaillimh",
  },
  {
    date: "23/11/2024",
    title: "w Róis & Harry Hennessy",
    title: "le Róis & Harry Hennessy",
    locationen: "Daylight, Glasnevin, Dublin",
    locationga: "Daylight, Glas Naíon, BÁC",
  },
  {
    date: "02/11/2024",
    title: "Gathering Darkness, DOE",
    locationen: "BASE, Dublin",
    locationga: "BASE, BÁC",
  },
  {
    date: "21/09/2024",
    title: "Son of the Land",
    locationen: "Earth Rising, IMMA, Dublin",
    locationga: "Earth Rising, IMMA, BÁC",
  },
  {
    date: "20/09/2024",
    title: "Fáistineach",
    locationen: "Maam Community Centre, Galway",
    locationga: "Ionad Pobail an Mháma, Gaillimh",
  },
  {
    date: "21/08/2024",
    title: "Princ€ss",
    locationen: "Féile na Gréine, Limerick",
    locationga: "Féile na Gréine, Luimneach",
  },
  {
    date: "19/08/2024",
    title: "Ceadal Ceoil",
    locationen: "National Heritage Week, City Hall, Dublin",
    locationga: "Seachtain Náisiúnta na hOidhreachta, Halla na Cathrach, BÁC",
  },
  {
    date: "24/07/2024",
    title: "Ar An Dé Deiridh",
    locationen: "Áras Pobail Chorr na Móna, Galway",
    locationga: "Áras Pobail Chorr na Móna, Gaillimh",
  },
  {
    date: "18/07/2024",
    title: "Ar An Dé Deiridh",
    locationen: "Seanscoil Sailearna, Indreabhán, Galway",
    locationga: "Seanscoil Sailearna, Indreabhán, Gaillimh",
  },
  {
    date: "16/07/2024",
    title: "Ar An Dé Deiridh",
    locationen: "Áras Éanna, Inis Oírr, Galway",
    locationga: "Áras Éanna, Inis Oírr, Gaillimh",
  },
  {
    date: "30/06/2024",
    title: "Princ€ss",
    locationen: "The Hug and Pint, Glasgow, Scotland",
    locationga: "The Hug and Pint, Glaschú, Albain",
  },
  {
    date: "28/06/2024",
    title: "Princ€ss",
    locationen: "Cafe Oto, London, England",
    locationga: "Cafe Oto, Londain, Sasana",
  },
  {
    date: "27/06/2024",
    title: "An Tionól Gaeltachta, Conradh na Gaeilge",
    locationen: "The Emigrants Commemorative Centre, Carna, Galway",
    locationga: "Ionad Cuimhneacháin na nImirceach, Carna, Gaillimh",
  },
  {
    date: "07/04/2024",
    title: "Ar An Dé Deiridh",
    locationen: "Scéal na Gaillimhe, An Taibhdhearc, Galway",
    locationga: "Scéal na Gaillimhe, An Taibhdhearc, Gaillimh",
  },
  {
    date: "23/03/2024",
    title: "Princ€ss",
    locationen: "Bello Bar, Dublin",
    locationga: "Bello Bar, BÁC",
  },
  {
    date: "15/03/2024",
    title: "Tráthnóna Ceoil & Scannáin",
    locationen: "Spiddal Library, Galway",
    locationga: "Leabharlann an Spidéil, Gaillimh",
  },
  {
    date: "09/11/2023",
    title: "Cuimhneachán Liam Uí Fhlaithearta",
    locationen: "Carraroe Library, Galway",
    locationga: "Leabharlann na Ceathrún Rua, Gaillimh",
  },
  {
    date: "31/10/2023",
    title: "Gliogar",
    locationen: "Cape Clear Island, Cork",
    locationga: "Oileán Chléire, Corcaigh",
  },
  {
    date: "29/10/2023",
    title: "Róis",
    locationen: "Grand Social, Dublin",
    locationga: "Grand Social, BÁC",
  },
  {
    date: "22/09/2023",
    title: "Gaeltacht na Todchaí",
    locationen: "Oíche Chultúir, An Taibhdhearc, Galway",
    locationga: "Culture Night, An Taibhdhearc, Gaillimh",
  },
  {
    date: "21/08/2023",
    title: "Róis",
    locationen: "Féile na Gréine, Limerick",
    locationga: "Féile na Gréine, Luimneach",
  },
  {
    date: "19/08/2023",
    title: "Dreamcycles",
    locationen: "Féile na Gréine, Limerick",
    locationga: "Féile na Gréine, Luimneach",
  },
  {
    date: "26/07/2023",
    title: "Róis",
    locationen: "Gliogar, Seanscoil Sailearna, Indreabhán, Galway",
    locationga: "Gliogar, Seanscoil Sailearna, Indreabhán, Gaillimh",
  },
  {
    date: "23/07/2023",
    title: "Róis",
    locationen: "The John Hewitt, Belfast TradFest, Antrim",
    locationga: "The John Hewitt, TradFest Bhéal Feirste, Aontroim",
  },
  {
    date: "22/07/2023",
    title: "Róis",
    locationen: "Gliogar, Sneem Summer Festival, Kerry",
    locationga: "Gliogar, Féile Samhraidh na Snadhma, Ciarraí",
  },
  {
    date: "21/07/2023",
    title: "Róis",
    locationen: "nonfaction, Tralee, Kerry",
    locationga: "nonfaction, Trá Lí, Ciarraí",
  },
  {
    date: "16/07/2023",
    title: "Róis",
    locationen: "Quarter Block Party, Cork",
    locationga: "Quarter Block Party, Corcaigh",
  },
  {
    date: "15/07/2023",
    title: "Róis",
    locationen: "Connolly's of Leap, Cork",
    locationga: "Connolly's of Leap, Corcaigh",
  },
  {
    date: "14/07/2023",
    title: "Róis",
    locationen: "Connolly's of Leap, Cork",
    locationga: "Connolly's of Leap, Corcaigh",
  },
  {
    date: "27/05/2023",
    title: "w/ Trá Pháidín",
    titlega: "le Trá Pháidín",
    locationen: "Rebel Reads, Cork",
    locationga: "Rebel Reads, Corcaigh",
  },
  {
    date: "30/04/2023",
    title: "Róis",
    locationen: "Gliogar, Racket Space, Dublin",
    locationga: "Gliogar, Racket Space, BÁC",
  },
  {
    date: "02/04/2023",
    title: "Róis",
    locationen: "Connolly's of Leap, Cork",
    locationga: "Connolly's of Leap, Corcaigh",
  },
  {
    date: "31/03/2023",
    title: "Róis",
    locationen: "Gliogar, The Corner House, Cork",
    locationga: "Gliogar, The Corner House, Corcaigh",
  },
  {
    date: "30/03/2023",
    title: "Róis",
    locationen: "Gliogar, Record Room, Limerick",
    locationga: "Gliogar, Record Room, Luimneach",
  },
  {
    date: "04/02/2023",
    title: "Róis",
    locationen: "Gliogar, Áras na nGael, Galway",
    locationga: "Gliogar, Áras na nGael, Gaillimh",
  },
  {
    date: "13/12/2022",
    title: "Crash Ensemble",
    locationen: "The Source Arts Centre, Thurles, Tipperary",
    locationga: "The Source Arts Centre, Durlas, Tiobraid Árann",
  },
  {
    date: "02/12/2022",
    title: "Gemma Dunleavy",
    locationen: "Other Voices, Dingle, Kerry",
    locationga: "Other Voices, Daingean Uí Chúis, Ciarraí",
  },
  {
    date: "15/10/2022",
    title: "Crash Ensemble",
    locationen: "The Model, Sligo",
    locationga: "The Model, Sligeach",
  },
  {
    date: "11/09/2022",
    title: "Crash Ensemble",
    locationen: "Sundays at Noon, Hugh Lane Gallery, Dublin",
    locationga: "Sundays at Noon, Dánlann Hugh Lane, BÁC",
  },
  {
    date: "03/09/2022",
    title: "ponxi ⨉ screamhound",
    locationen: "Electric Picnic, Stradbally, Laois",
    locationga: "an Phicnic Leictreach, An Sráidbhaile, Laois",
  },
  {
    date: "03/09/2022",
    title: "w/ Róis Ní Chonghaile",
    titlega: "le Róis Ní Chonghaile",
    locationen: "Electric Picnic, Stradbally, Laois",
    locationga: "an Phicnic Leictreach, An Sráidbhaile, Laois",
  },
  {
    date: "29/07/2022",
    title: "Trinity Orchestra",
    locationen: "All Together Now, Curraghmore House, Waterford",
    locationga: "All Together Now, Teach Churrach Mór, Port Láirge",
  },
  {
    date: "21/06/2022",
    title: "Crash Ensemble",
    locationen: "Linenhall Theatre, Castlebar, Mayo",
    locationga: "Amharclann Halla an Línéadaigh, Caisleán An Bharraigh, Maigh Eo",
  },
  {
    date: "28/05/2022",
    title: "Drop Everything",
    locationen: "Inis Oírr, Galway",
    locationga: "Inis Oírr, Gaillimh",
  },
  {
    date: "14/05/2022",
    title: "Sonology Electroacoustic Ensemble",
    locationen: "Amare, The Hague, The Netherlands",
    locationga: "Amare, An Háig, An Ísiltír",
  },
  {
    date: "06/05/2022",
    title: "Michael Winter",
    locationen: "Institute of Sonology, The Hague, The Netherlands",
    locationga: "Institute of Sonology, An Háig, An Ísiltír",
  },
  {
    date: "03/05/2022",
    title: "Aduantas",
    locationen: "CASS, The Hague, The Netherlands",
    locationga: "CASS, An Háig, An Ísiltír",
  },
  {
    date: "28/04/2022",
    title: "New Music Dublin",
    locationen: "National Concert Hall, Dublin",
    locationga: "Ceol Áras Naisiúnta, BÁC",
  },
  {
    date: "07/04/2022",
    title: "Aduantas",
    locationen: "Spring Festival, The Hague, The Netherlands",
    locationga: "Spring Festival, An Háig, An Ísiltír",
  },
  {
    date: "12/03/2022",
    title: "delta(x)",
    locationen: "Opera Forward Festival, Amsterdam, The Netherlands",
    locationga: "Opera Forward Festival, Amstardam, An Ísiltír",
  },
  {
    date: "25/02/2022",
    title: "Brno-Hague Connections",
    locationen: "Amare, The Hague, The Netherlands",
    locationga: "Amare, An Háig, An Ísiltír",
  },
  {
    date: "21/02/2022",
    title: "Aduantas",
    locationen: "Korzo, The Hague, The Netherlands",
    locationga: "Korzo, An Háig, An Ísiltír",
  },
  {
    date: "20/02/2022",
    title: "Residentie Orkest",
    locationen: "Amare, The Hague, The Netherlands",
    locationga: "Amare, An Háig, An Ísiltír",
  },
  {
    date: "17/02/2022",
    title: "JAMU",
    locationen: "Brno, Czech Republic",
    locationga: "Brno, Poblacht na Seice",
  },
  {
    date: "11/02/2022",
    title: "Sonology Electroacoustic Ensemble",
    locationen: "Amare, The Hague, The Netherlands",
    locationga: "Amare, An Háig, An Ísiltír",
  },
  {
    date: "20/11/2021",
    title: "Kiberdob",
    locationen: "Paikka, Budapest, Hungary",
    locationga: "Paikka, Búdaipeist, An Ungáir",
  },
  {
    date: "07/11/2021",
    title: "Aduantas",
    locationen: "Evidence In Motion, Rijswijk, The Netherlands",
    locationga: "Evidence In Motion, Rijswijk, An Ísiltír",
  },
  {
    date: "05/11/2021",
    title: "Sonology Electroacoustic Ensemble",
    locationen: "Amare, The Hague, The Netherlands",
    locationga: "Amare, An Háig, An Ísiltír",
  },
  {
    date: "01/10/2021",
    title: "Bert van Stam",
    locationen: "Maranathakerk, The Hague, The Netherlands",
    locationga: "Maranathakerk, An Háig, An Ísiltír",
  },
  {
    date: "29/05/2021",
    title: "w/ Robert Nettleship",
    titlega: "le Robert Nettleship",
    locationen: "Spring Festival, The Hague, The Netherlands",
    locationga: "Spring Festival, An Háig, An Ísiltír",
  },
  {
    date: "28/05/2021",
    title: "MAZE ensemble",
    locationen: "Spring Festival, The Hague, The Netherlands",
    locationga: "Spring Festival, An Háig, An Ísiltír",
  },
  {
    date: "25/04/2021",
    title: "MAZE ensemble",
    locationen: "TivoliVredenburg, Utrecht, The Netherlands",
    locationga: "TivoliVredenburg, Utrecht, An Ísiltír",
  },
  {
    date: "12/07/2020",
    title: "GEMMAE",
    locationen: "Parc du Mont-Royal, Montreal, Canada",
    locationga: "Parc du Mont-Royal, Montréal, Ceanada",
  },
  {
    date: "04/07/2020",
    title: "Hyoid ⨉ Zona",
    locationen: "Parc Émile-Nelligan, Montreal, Canada",
    locationga: "Parc Émile-Nelligan, Montréal, Ceanada",
  },
  {
    date: "07/03/2020",
    title: "Zane & Richi",
    locationen: "La Plante, Montreal, Canada",
    locationga: "La Plante, Montréal, Ceanada",
  },
  {
    date: "04/03/2020",
    title: "Zane & Richi",
    locationen: "La Sotterenea, Montreal, Canada",
    locationga: "La Sotterenea, Montréal, Ceanada",
  },
  {
    date: "24/11/2019",
    title: "Zona 10",
    locationen: "Montreal, Canada",
    locationga: "Montréal, Ceanada",
  },
  {
    date: "01/09/2019",
    title: "Trinity Orchestra",
    locationen: "Electric Picnic, Stradbally, Laois",
    locationga: "an Phicnic Leictreach, An Sráidbhaile, Laois",
  },
  {
    date: "31/08/2019",
    title: "Draoi",
    locationen: "Electric Picnic, Stradbally, Laois",
    locationga: "an Phicnic Leictreach, An Sráidbhaile, Laois",
  },
  {
    date: "17/08/2019",
    title: "Draoi",
    locationen: "Home Grown Outdoors, Dublin",
    locationga: "Home Grown Outdoors Festival, BÁC",
  },
  {
    date: "10/08/2019",
    title: "Seán Being",
    locationen: "Folláin #3, Pallas Project Studios, Dublin",
    locationga: "Folláin #3, Pallas Project Studios, BÁC",
  },
  {
    date: "03/08/2019",
    title: "Trinity Orchestra",
    locationen: "All Together Now, Curraghmore House, Waterford",
    locationga: "All Together Now, Teach Churrach Mór, Port Láirge",
  },
  {
    date: "12/07/2019",
    title: "Seán Being",
    locationen: "Thomas House, Dublin",
    locationga: "Thomas House, BÁC",
  },
  {
    date: "22/06/2019",
    title: "Draoi",
    locationen: "Body & Soul, Ballinlough Castle, Meath",
    locationga: "Body & Soul, Caisleán Baile an Locha, An Mhí",
  },
  {
    date: "16/06/2019",
    title: "Lara Gallagher Musician in Residence",
    locationen: "DLR Lexicon, Dún Laoighre",
    locationga: "DLR Lexicon, Dún Laoighre",
  },
  {
    date: "01/06/2019",
    title: "Trinity Orchestra",
    locationen: "Forbidden Fruit, Dublin",
    locationga: "Forbidden Fruit, BÁC",
  },
  {
    date: "25/05/2019",
    title: "Seán Being",
    locationen: "Arroz Studios, Lisbon, Portugal",
    locationga: "Arroz Studios, Liospóin, An Phortaingéil",
  },
  {
    date: "17/05/2019",
    title: "Seán Being",
    locationen: "Studio 10, Dublin",
    locationga: "Studio 10, BÁC",
  },
  {
    date: "05/05/2019",
    title: "Sea Pictures",
    locationen: "Holy Trinity, Westport, Mayo",
    locationga: "Séipéil Holy Trinity, Cathair na Mart, Maigh Eo",
  },
  {
    date: "18/04/2019",
    title: "Malachy Robinson",
    locationen: "Studio 10, Dublin",
    locationga: "Studio 10, BÁC",
  },
  {
    date: "12/04/2019",
    title: "Trinity Orchestra",
    locationen: "Trinity Ball, Dublin",
    locationga: "Trinity Ball, BÁC",
  },
  {
    date: "22/03/2019",
    title: "w/ Lara Gallagher",
    titlega: "le Lara Gallagher",
    locationen: "Anseo, Dublin",
    locationga: "Anseo, BÁC",
  },
  {
    date: "21/03/2019",
    title: "The Cultural Equinox",
    locationen: "exhibition on the DART, Dublin",
    locationga: "taispeántas ar an DART, BÁC",
  },
  {
    date: "14/02/2019",
    title: "Henry Earnest",
    locationen: "Trinity Arts Festival, Pacinos, Dublin",
    locationga: "Trinity Arts Festival, Pacinos, BÁC",
  },
  {
    date: "06/02/2019",
    title: "Henry Earnest",
    locationen: "Workman’s Club, Dublin",
    locationga: "Workman’s Club, BÁC",
  },
  {
    date: "06/02/2019",
    title: "Exploring Electronics",
    locationen: "City Assembly Hall, Dublin",
    locationga: "Halla na Cathrach, BÁC",
  },
  {
    date: "12/01/2019",
    title: "Henry Earnest",
    locationen: "Folláin #1, JaJa Studios, Dublin",
    locationga: "Folláin #1, JaJa Studios, BÁC",
  },
  {
    date: "07/01/2019",
    title: "Trinity Orchestra",
    locationen: "David Bowie Festival, National Concert Hall, Dublin",
    locationga: "David Bowie Festival, an Ceoláras Náisiúnta, BÁC",
  },
  {
    date: "13/12/2018",
    title: "Ebony Wind Quintet",
    locationen: "ICC In Dialogue series, Woodquay, Dublin",
    locationga: "ICC In Dialogue series, An Ché Adhmaid, BÁC",
  },
  {
    date: "29/11/2018",
    title: "Trinity Orchestra",
    locationen: "Adam & Eve’s Church, Dublin",
    locationga: "Séipéil Adam ⁊ Eve, BÁC",
  },
  {
    date: "02/11/2018",
    title: "Henry Earnest",
    locationen: "the Bernard Shaw, Dublin",
    locationga: "the Bernard Shaw, BÁC",
  },
  {
    date: "28/10/2018",
    title: "Trinity Orchestra",
    locationen: "Metropolis Festival, Dublin",
    locationga: "Metropolis Festival, BÁC",
  },
  {
    date: "20/10/2018",
    title: "Henry Earnest",
    locationen: "Garden Collective, Cork",
    locationga: "Garden Collective, Corcaigh",
  },
  {
    date: "02/09/2018",
    title: "Trinity Orchestra",
    locationen: "Electric Picnic, Stradbally, Laois",
    locationga: "an Phicnic Leictreach, An Sráidbhaile",
  },
  {
    date: "04/08/2018",
    title: "Trinity Orchestra",
    locationen: "All Together Now, Curraghmore House, Waterford",
    locationga: "All Together Now, Teach Churrach Mór, Port Láirge",
  },
  {
    date: "24/07/2018",
    title: "Trinity Orchestra",
    locationen: "Trinity Summer Series, Dublin",
    locationga: "Trinity Summer Series, BÁC",
  },
  {
    date: "02/06/2018",
    title: "Trinity Orchestra",
    locationen: "Forbidden Fruit, Dublin",
    locationga: "Forbidden Fruit, BÁC",
  },
  {
    date: "06/04/2018",
    title: "Trinity Orchestra",
    locationen: "Trinity Ball, Dublin",
    locationga: "Trinity Ball, BÁC",
  },
  {
    date: "16/04/2017",
    title: "Westport 250",
    locationen: "Town Hall, Westport, Mayo",
    locationga: "Amharclann Chathair na Mart, Maigh Eo",
  },
  {
    date: "07/04/2017",
    title: "Trinity Orchestra",
    locationen: "Trinity Ball, Dublin",
    locationga: "Trinity Ball, BÁC",
  },
  {
    date: "04/11/2016",
    title: "ICC Speak",
    locationen: "Irish Architectural Archives, Dublin",
    locationga: "Irish Architectural Archives, BÁC",
  },
  {
    date: "18/09/2016",
    title: "Clifden Arts Festival",
    titlega: "Féile Ealaíne An Clochán",
    locationen: "Galway",
    locationga: "Gaillimh",
  },
  {
    date: "08/05/2016",
    title: "1916 Commemorations",
    titlega: "Comóraidh 1916",
    locationen: "Westport, Mayo",
    locationga: "Cathair na Mart, Maigh Eo",
  },
  {
    date: "20/12/2015",
    title: "Winter Strings w/ Jane Hackett & Yseult Cooper Stockdale",
    locationen: "Lutheran Hall, Dublin",
    locationga: "Lutheran Hall, BÁC",
  },
  {
    date: "04/09/2015",
    title: "Westport Arts Festival",
    titlega: "Féile Ealaíne Chathair na Mart",
    locationen: "Mayo",
    locationga: "Maigh Eo",
  },
  {
    date: "30/01/2015",
    title: "Trinity Arts Festival",
    locationen: "Block T, Dublin",
    locationga: "Block T, BÁC",
  },
  {
    date: "20/11/2014",
    title: "ICC10",
    locationen: "Project Arts Centre, Dublin",
    locationga: "Project Arts Centre, BÁC",
  },
];

const groupConcertsByYear = (concerts) => {
  return concerts.reduce((acc, concert) => {
    const year = concert.date.slice(6, 10);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(concert);
    return acc;
  }, {});
};

export default function ConcertList() {
  let router = useRouter();
  let { t } = useTranslation();
  const groupedConcerts = groupConcertsByYear(concerts);

  return (
    <div>
      <Head>
        <title>
          {t("agenda:title")}
        </title>
        <meta name="description" content="List of upcoming concerts" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        {Object.keys(groupedConcerts).map((year) => (
          <div key={year} className={styles.year}>
            <h2>{year}</h2>
            <div className={styles.concertBundle}>
              {groupedConcerts[year].map((concert, index) => (
                <div key={index} className={styles.concertSingle}>
                  <p className={styles.concertDate}>{concert.date.slice(0, 5)}</p>
                  <p className={styles.concertTitle}>
                    {router.locale === 'en' ? concert.title : concert.titlega ??= concert.title}
                  </p>
                  <p className={styles.concertLocation}>{router.locale === 'en' ? concert.locationen : concert.locationga}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
