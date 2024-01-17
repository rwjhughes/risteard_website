import Footer from '@/components/footer.js';
import Navbar from '@/components/navbar.js';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Projects.module.css';

const projects = [
  {
    category: "releases",
    title: "Romhainn Amach",
    year: "2022",
    infoen: "track on May Day compilation album - released on The Department of Energy",
    infoga: "rian ar albam díolama May Day - eisithe ar The Department of Energy",
    link: "",
    descriptionen: "This compilation album is the fifth release from the Department of Energy which resists the free market and remembers the ancestors, featuring 40+ Irish experimental artists. <i>Romhainn Amach</i> is a track I made for the album, using a distorted sample of Máirtín Ó Cadhain with a repitched live viola delay.",
    descriptionga: "Tá an albam díolama seo an cúigiú eisiúint ó the Department of Energy ina bhfuil os cionn 40 ealaíontóir. Is rian don albam é <i>Romhainn Amach</i> a mbaineann úsáid as sampla Mháirtín Uí Chadhain as riocht le <i>delay</i> violá beo atá curtha níos ísle.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px; " src="https://bandcamp.com/EmbeddedPlayer/album=3706100408/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=483599109/transparent=true/" seamless><a href="https://thedepartmentofenergy.bandcamp.com/album/may-day-landscape-mixtape">May Day (Landscape Mixtape) by Richard Hughes</a></iframe>',
    image: "",
  },
  {
    category: "performing",
    title: "Róis",
    year: "2023",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "",
    descriptionen: "I have performed as a cellist with Róis as well as recording with her.",
    descriptionga: "Chasainn an dordveidhil le Róis agus thaifeadainn léi chomh maith.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=2331226156/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://roseconnolly.bandcamp.com/album/uisce-agus-bean">UISCE AGUS BEAN by Róis</a></iframe>',
    image: "/images/projects/rois.jpg",
  },
  {
    category: "recording",
    title: "UISCE AGUS BEAN",
    year: "2023",
    infoen: "album - cello for Róis",
    infoga: "albam - dordveidhil do Róis",
    link: "",
    descriptionen: "I played cello on the track <i>False False</i> from Róis' debut album.",
    descriptionga: "Chas mé an dordveidhil ar an rian <i>False False</i> ón gcéad albam le Róis.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=2331226156/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=1927349266/transparent=true/" seamless><a href="https://roseconnolly.bandcamp.com/album/uisce-agus-bean">UISCE AGUS BEAN by Róis</a></iframe>',
    image: "",
  },
  {
    category: "soundtrack",
    title: "Inis Oírr, portrait d'une île",
    year: "2022",
    infoen: "soundtrack for film by Evangéline D. Allizé",
    infoga: "fuaimrian do scannán le Evangéline D. Allizé",
    link: "",
    descriptionen: "I made the sound and music for this film by Evangéline D. Allizé. It was premiered at Drop Eveything on Inis Oírr in May 2022. Subtitles are available in English, French and Irish.",
    descriptionga: "Rinne mé an fuaim agus an ceol don scannán seo le Evangéline D. Allizé. Seoladh é ag Drop Eveything in Inis Oírr i mí Bealtaine 2022. Tá fotheidil ann i nGaeilge, i bhFraincis agus i mBéarla.",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/aLZ_Gf9rGfo?si=JZqktOkbDq9aJUXB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "arranging",
    title: "Glasshouse",
    year: "2021",
    infoen: "arranged for Prince and Kate Bush sets",
    infoga: "coiríodh seiteanna Prince agus Kate Bush",
    link: "https://www.musicglasshouse.com/",
    descriptionen: "I arranged songs for Glasshouse for their Prince and Kate Bush sets which are played at festivals nationally.",
    descriptionga: "Coiríodh amhráin do Glasshouse dá seiteanna Prince agus Kate Bush agam a bhíonns á gcasadh ag féilte ar fud na tíre.",
    embed: '',
    image: "",
  },
  {
    category: "arranging",
    title: "Trinity Orchestra",
    year: "2016-22",
    infoen: "arranged pop music sets for summer festivals",
    infoga: "coiríodh seiteanna popcheol do fhéilte samhraidh",
    link: "https://www.trinityorchestra.com",
    descriptionen: "I arranged numerous pop music sets for the orchestra which were played at summer festivals (Beatles, Girl Power, ABBA, Funk, New Wave). I also played piano for both classical and pop concerts.",
    descriptionga: "Coiríodh seiteanna popcheol don cheolfhoireann a bhí á gcasadh ag féilte samhraidh (Beatles, Girl Power, ABBA, Funk, New Wave). Chas mé an pianó do cheolchoirmeaca claisceacha agus pop araon.",
    embed: '',
    image: "/images/projects/troch.jpeg",
  },
  {
    category: "coding",
    title: "Focal an Lae",
    year: "2022",
    infoen: "Telegram bot that sends Irish word of the day with other features",
    infoga: "bota Telegram a sheolanns Focal an Lae le gnéithe eile",
    link: "https://t.me/Focailbot",
    descriptionen: "This is a Telegram bot I made which sends the <i>focal an lae</i> from the dictionary website <a href='_target'>teanglann.ie</a> daily. Other features include generative sentences with the <i>focal an lae</i> and an editor's pick. An update is coming soon which will let the user pick a preferred dialect and a voice note of <i>focal an lae</i> will be sent in that dialect.",
    descriptionga: "'Sé atá i gceist leis an bota Telegram seo ná seolann sé <i>focal an lae</i> ón suíomh <a href='_target'>teanglann.ie</a> go laethúil. Tá feidhmeanna eile ann ar nós abairtí giniúnacha le <i>focal an lae</i> agus rogha an eagarthóra. Beidh nuashonrú ann go luath le go mbeidh úsáideoirí in ann rogha canúna a phiocadh agus seolfar <i>focal an lae</i> mar theachtaireacht gutha sa gcanúint sin.",
    embed: '',
    image: "",
  },
  {
    category: "performing",
    title: "Gemma Dunleavy",
    year: "2022",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "",
    descriptionen: "I played cello with Gemma Dunleavy as part of Other Voices.",
    descriptionga: "Chas mé an dordveidhil le Gemma Dunleavy le haghaidh Other Voices.",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/efd6ujxULx8?si=pfhp4-ERpEmzYCyF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },

  {
    category: "soundtrack",
    title: "Old Aran in Colour",
    year: "2022",
    infoen: "soundtrack production for exhibition",
    infoga: "léiriúchán fuaimriain don taispeántas",
    link: "http://aras-eanna.ie/en/project/old-aran-in-colour/",
    descriptionen: "Working with MacDara Ó Conaola, along with John Breslin and Sarah-Anne Buckley of Old Ireland in Colour, I produced the soundtrack which accompanied an exhibition of colourised photos from the Aran Islands. The soundtrack was comprised of traditional songs from the Aran sung by MacDara which I added accompaniment to and produced other tracks with various musicians.",
    descriptionga: "",
    embed: '',
    image: "/images/projects/oldaran.jpg",
  },
  {
    category: "recording",
    title: "Blackwater Valley High",
    year: "2021",
    infoen: "album - cello on track 9, released on The Department of Energy",
    infoga: "albam - dordveidhil ar rian 9, eisithe ar The Department of Energy",
    link: "",
    descriptionen: "This is an album of 12 tracks mapped to the 12 months of the Celtic year (November to October). I play cello on track 9. It is released on The Department of Energy.<br><br>As part of Irish Design Week 2023 the album was made into an audio-visual piece called <i>Ard Ghleann an hAbhann Móire</i> which was screened in Unit 44, November 2023.",
    descriptionga: "Seo albam de 12 rian leagtha ar na 12 mí den bhliain Cheilteach (Samhain go Deireadh Fómhair) Chas mé an dordveidhil ar rian 9. Tá sé eisithe ar an lipéad The Department of Energy.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=4070463637/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=1010288436/transparent=true/" seamless><a href="https://thedepartmentofenergy.bandcamp.com/album/blackwater-valley-high-landscape-mixtape">Blackwater Valley High (Landscape Mixtape) by NCOG, Richard Hughes</a></iframe>',
    image: "",
  },
  {
    category: "coding",
    title: "EDO SYNTH",
    year: "2021",
    infoen: "online installation for Screen Dive, Gaudeamus Festival",
    infoga: "suiteán ar líne le haghaidh Screen Dive, Gaudeamus Festival",
    link: "https://gaudeamusscreendive.com/edo-synth",
    descriptionen: "EDO SYNTH is an online interactive microtonal synthesizer commissioned for Screen Dive, Gaudeamus Festival. I made it with Rory Hughes using HTML, Javascript and the Tone.js library.",
    descriptionga: "Is sintéiseoir micreathónach idirghníomhach ar líne é EDO SYNTH a bhí coimisiúnaithe ag Screen Dive, Gaudeamus Festival. Rinneadh é le Rory Hughes ag baint úsáid as HTML, Javascript agus an leabharlann Tone.js.",
    embed: '',
    image: "/images/projects/edo.jpeg",
  },
  {
    category: "releases",
    title: "Suaitiú",
    year: "2021",
    infoen: "track on Lee Lines compilation album - released on The Department of Energy",
    infoga: "rian ar albam díolama Lee Lines - eisithe ar The Department of Energy",
    link: "",
    descriptionen: "<i>Lee Lines</i> is a compilation of 46 tracks from 32 experimental artists in Ireland. <i>Suaitiú</i> is a track for solo cello I produced for the album. It is inspired by repetitive forms in nature such as waves. Always similar but never identical.",
    descriptionga: "Is albam díolama é <i>Lee Lines</i> ar a bhfuil 46 rian le 32 ealaíontóir trialach as Éirinn. Is rian do dhordveidhil aonair é <i>Suaitiú</i> a rinne mé don albam. Tógadh an inspioráid as foirmeacha atriallacha sa dúlra, cuir i gcás tonnta. Bíonn cosúlacht ann ach ní comhionannas.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3800630305/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=1563529163/transparent=true/" seamless><a href="https://thedepartmentofenergy.bandcamp.com/album/lee-lines-landscape-mixtape">Lee Lines (Landscape Mixtape) by Richard Hughes</a></iframe>',
    image: "",
  },
  {
    category: "releases",
    title: "music for people w/o people",
    year: "2020",
    infoen: "album by ponxi",
    infoga: "albam le ponxi",
    link: "",
    descriptionen: "This is an album made by ponxi, an experimental electronic duo between Zane Walden and I. Ponxi was formed in 2020. Since then, ponxi has performed live and DJed and released two singles. Ponxi also does live visuals for their own and other's electronic music sets. More ponxi releases are available at <a href='https://ponxi.art' target='_blank'>ponxi.art</a>.",
    descriptionga: "Seo albam le ponxi, dísreach leictreach trialach idir Zane Walden agus mé fhéin. Bunaíodh ponxi i 2020. Ó shin, tá seiteanna beo déanta, céirníní casta agus dhá shingil eisithe ag ponxi. Déanann ponxi amharcíomhanna beo do seiteanna dá chuid fhéin agus do dhaoine eile. Tá na heisiúintí eile de chuid ponxi ar fáil ar <a href='https://ponxi.art' target='_blank'>ponxi.art</a>.",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/hY8xdOGGz4k?si=EEU7Kri4tkpdWyCm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "releases",
    title: "All Apologies",
    year: "2021",
    infoen: "track on Herzog TV: MirrorWorld compilation album",
    infoga: "rian ar albam díolama Herzog TV: MirrorWorld",
    link: "",
    descriptionen: 'A compilation album of covers in aid Inner City Helping Homeless. I made this track was made with Evangéline D. Allizé.',
    descriptionga: "Albam díolama de <i>covers</i> ar son Inner City Helping Homless. Rinneadh an rian seo le Evangéline D. Allizé.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=844026890/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=212897197/transparent=true/" seamless><a href="https://herzogtv.bandcamp.com/album/herzog-tv-mirrorworld">Herzog TV: MirrorWorld by Azar</a></iframe>',
    image: "",
  },
  {
    category: "recording",
    title: "Stalker",
    year: "2020",
    infoen: "album - cello & keys for Stephen Star",
    infoga: "albam - dordveidhil ⁊ méarchlár do Stephen Star",
    link: "",
    descriptionen: "Stephen Star released <i>Stalker</i> in October 2020. I recorded keys and cello on three tracks.",
    descriptionga: "D'eisigh Stephen Star <i>Stalker</i> i mí Dheireadh Fómhair 2020. Thaifead mé méarchláir agus dordveidhil ar trí rian.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3184760909/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://herzogtv.bandcamp.com/album/stalker">Stalker by Stephen Star</a></iframe>',
    image: "",
  },
  {
    category: "releases",
    title: "Hello, World!",
    year: "2020",
    infoen: "album - released on Herzog TV",
    infoga: "albam - eisithe ar Herzog TV",
    link: "",
    descriptionen: "A DIY album I made in a couple of weeks with features from Zane Walden, Evangéline D. Allizé and Lara Gallagher. It is released on HerzogTV.",
    descriptionga: "Seo albam DIY a rinne m i gcupla seachtain ar a bhfuil na ceoltóirí Zane Walden, Evangéline D. Allizé and Lara Gallagher. Eisíodh é ar HerzogTV.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=1955287593/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://herzogtv.bandcamp.com/album/hello-world">Hello, World! by Richard Hughes</a></iframe>',
    image: "",
  },
  {
    category: "releases",
    title: "D'AW CLUB",
    year: "2020",
    infoen: "compilation album - tracks 1 & 19",
    infoga: "albam díolama - rianta 1 ⁊ 19",
    link: "",
    descriptionen: "<i>D'AW CLUB Greatest Hits</i> is a compilation album of tracks from friends of a weekly meetup to share ideas of music production in Montreal. Two tracks I made during these meetups are on the compilation.",
    descriptionga: "Is albam díolama é <i>D'AW CLUB Greatest Hits</i> de rianta le cairde a bhuail le chéile go seachtainiúil i Montreal chun smaointí léiriúcháin cheoil a roinnt. Tá dhá rian a ndearna mé ann san albam.",
    embed: '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/972562399&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/daw-club" title="D&#x27;AW CLUB" target="_blank" style="color: #cccccc; text-decoration: none;">D&#x27;AW CLUB</a> · <a href="https://soundcloud.com/daw-club/sets/daw-club-greatest-hits" title="D&#x27;AW CLUB Greatest Hits" target="_blank" style="color: #cccccc; text-decoration: none;">D&#x27;AW CLUB Greatest Hits</a></div>',
    image: "",
  },
  {
    category: "recording",
    title: "The Brikc",
    year: "2019",
    infoen: "EP - piano for Seán Being",
    infoga: "EP - pianó do Seán Being",
    link: "",
    descriptionen: "<i>The Brikc</i> is Seán Being's debut release. I play piano on the opening track. This EP is released on wheretheimegoes",
    descriptionga: "'Sé <i>The Brikc</i> an chéad eisiúint de chuid Seán Being. Casann mé an pianó ar an gcéad rian. Tá an EP seo eisithe ar wherethetimegoes.",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=2156913281/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://seanbeing.bandcamp.com/album/potboiler-no-4-sean-being-the-brikc">Potboiler No. 4: Sean Being - The Brikc by Seán Being</a></iframe><iframe width="853" height="480" src="https://www.youtube.com/embed/qsbIjbVS260?si=TfyEi5mKjNwOf3fR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "performing",
    title: "Seán Being",
    year: "2019",
    infoen: "piano",
    infoga: "pianó",
    link: "",
    descriptionen: "I played piano for Seán Being's live band in the second half of 2019.",
    descriptionga: "Chas mé an pianó don bhuíon beo de Seán Being sa dara leath de 2019.",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/qsbIjbVS260?si=TfyEi5mKjNwOf3fR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "performing",
    title: "Henry Earnest",
    year: "2018-19",
    infoen: "cello",
    infoga: "dordveidhil",
    link: "",
    descriptionen: "I played cello with Henry Earnest as part of his live band, performing mostly in Dublin.",
    descriptionga: "Chas mé an dordveidhil le Henry Earnest de chuid a bhuíon beo, á thaibhiú i mBleá Cliath go hiondúil.",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/h1JhUVTI-5E?si=4v1DzsPTaEkVVTyB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "performing",
    title: "Trinity Orchestra",
    year: "2017-19",
    infoen: "piano",
    infoga: "pianó",
    link: "https://www.trinityorchestra.com",
    descriptionen: "I played piano with the orchestra in concerts and festivals while a student at Trinity. I also arranged their pop music sets which were played at festivals nationwide.",
    descriptionga: "Chas mé an pianó leis an gceolfhoireann i gceolchoirmeacha agus féilte agus mé i mo scoláire i dTríonóide. Chóirigh mé seiteanna popcheol a bhí á gcasadh ag féilte ar fud na tíre.",
    embed: '',
    image: "/images/projects/troch.jpeg",
  },
  {
    category: "recording",
    title: "Temple of the Comet Star",
    year: "2018",
    infoen: "EP - keys for Zane Walden",
    infoga: "EP - meárchláir do Zane Walden",
    link: "",
    descriptionen: "<i>Temple of the Comet Star</i> by Zane Walden was released on HerzogTV. I played keys on the EP.",
    descriptionga: "",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=414981342/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=839092528/transparent=true/" seamless><a href="https://herzogtv.bandcamp.com/album/temple-of-the-comet-star">Temple of the Comet Star by Zane Walden</a></iframe>',
    image: "",
  },
  {
    category: "recording",
    title: "Waiting To Happen",
    year: "2015",
    infoen: "EP - cello for A Happy Accident",
    infoga: "EP - dordveidhil do A Happy Accident",
    link: "",
    descriptionen: "I played cello on tracks 1 and 3 on A Happy Accident's EP <i>Waiting To Happen</i>",
    descriptionga: "",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=520010544/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://ahappyaccidentmusic.bandcamp.com/album/waiting-to-happen-e-p">Waiting To Happen (E.P) by A Happy Accident</a></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Aduantas",
    year: "2022",
    infoen: "Data Is Ephemeral",
    infoga: "Data Is Ephemeral",
    link: "https://www.researchcatalogue.net/view/1592116/1592117",
    descriptionen: "Aduantas was an imporvisation ensemble made up of Pedro Latas, Isaac Barzso, Rose Connolly, Hugo Ariens and I in the Hague, Netherlands. Along with performing I composed <i>Data Is Ephemeral</i> for the ensemble as part of Spring Festival 2022.",
    descriptionga: "",
    embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Af8L3GQODZM?si=HZzcXiIEe3iXLIeD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Michelle Pritchard",
    year: "2022",
    infoen: "Veering",
    infoga: "Veering",
    link: "http://www.michelle-pritchard.com/",
    descriptionen: "<i>Veering</i> was composed for Michelle Pritchard as part of her master's research. It is written for solo viola and delay with live visuals.",
    descriptionga: "",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/twIm6lTtNbs?si=14RX7G-vbT6xSvr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Residentie Orkest",
    year: "2022",
    infoen: "Priming",
    infoga: "Priming",
    link: "https://residentieorkest.nl/",
    descriptionen: "",
    descriptionga: "",
    embed: '',
    image: "",
  },
  {
    category: "composing",
    title: "Crash Ensemble",
    year: "2022",
    infoen: "feamainn",
    infoga: "feamainn",
    link: "https://www.crashensemble.com/events/reactions-5",
    descriptionen: "On the receipt of the [REACTIONS] 2021 commission I wrote <i>feamainn</i> for Crash Ensemble — a multimedia composition about the vocabulary of seaweed in Irish.",
    descriptionga: "",
    embed: '',
    image: "",
  },
  {
    category: "composing",
    title: "MAZE Ensemble",
    year: "2021",
    infoen: "North Atlantic",
    infoga: "North Atlantic",
    link: "https://www.maze.nu/",
    descriptionen: "<i>North Atlantic</i> was written for MAZE Ensemble as part of Spring Festival 2021, the Hague. Although it receieved its premiere live on NPO Radio4. It is a composition for an improvisation ensemble based on the wind forecasts teh week previous to the performance.",
    descriptionga: "",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/luVI-ExWwBU?si=Q96wFJjs99gObm2r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Kate Ellis",
    year: "2020",
    infoen: "Suaitiú",
    infoga: "Suaitiú",
    link: "",
    descriptionen: "<i>Suaitiú</i> was composed for Kate Ellis as a project with Irish Composers' Collective. It is a composition written for any number of celli.",
    descriptionga: "",
    embed: '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=2111535049/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=3316777980/transparent=true/" seamless><a href="https://irishcomposerscollective.bandcamp.com/album/a-good-onion">A Good Onion by ICC</a></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Malachy Robinson",
    year: "2019",
    infoen: "Dialóg",
    infoga: "Dialóg",
    link: "https://malachyrobinson.com/",
    descriptionen: "<i>Dialóg</i> was written for Malachy Robinson as part of a project with the Irish Composers' Collective for double and electronics. It was premiered in Studio 10 in Dublin, April 2019.",
    descriptionga: "",
    embed: '',
    image: "",
  },
  {
    category: "composing",
    title: "Ebony Wind Quintet",
    year: "2019",
    infoen: "Absolute",
    infoga: "Absolute",
    link: "",
    descriptionen: "As part of the Irish Composers' Colelctive <i>In Dialogue</i> series I composed <i>Absolute</i> for Ebony Wind Quintet which was premiered December 2018.",
    descriptionga: "",
    embed: '',
    image: "",
  },
  {
    category: "composing",
    title: "Kirkos Ensemble",
    year: "2016",
    infoen: "Week Eight",
    infoga: "Week Eight",
    link: "https://www.kirkosensemble.com/",
    descriptionen: "Based on the poem <i>Week Eight</i> by Victoria Kennefick, I wrote an eponymous composition for Kirkos Ensemble as part of the Irish Composers' Collective <i>ICC Speak</i> series. It was premiered in the Irish architecturial Archives November 2016.",
    descriptionga: "",
    embed: '<iframe width="853" height="480" src="https://www.youtube.com/embed/iZMNnXOjQRE?si=HUcsA9PxcXIbQqGw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    image: "",
  },
  {
    category: "composing",
    title: "Máire Carroll",
    year: "2014",
    infoen: "Prelude No. 6",
    infoga: "Prelude No. 6",
    link: "http://www.mairecarroll.com/",
    descriptionen: "A very early composition of mine, <i>Prelude No.6</i> was premiered by Máire Carrol as part of <i>ICC10</i>, the Irish Composers' Collective's tenth anniversary.",
    descriptionga: "",
    embed: '',
    image: "/images/projects/iccmaire.jpg",
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
      case 'releases':
        return router.locale === 'en' ? 'RELEASES' : 'EISIÚINTÍ';
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

  const [selectedProject, setSelectedProject] = useState(null);

  const groupedProjects = groupProjectsByCategory(projects);

  const [columns, setColumns] = useState(1);

  const activeStyle = {
    border: 'rgb(181, 181, 181) inset 1px',
    backgroundColor: router.locale === 'en' ? '#000066' : '#0e442f',
    color: 'rgba(255, 255, 255, 0.5)',
  };

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
            <h2 className={`${styles.itemTitle} ${styles[category]}`}>{translateCategory(category)}</h2>
            <div className={styles.projectBundle}>
              {groupedProjects[category].map((project, index) => (
                <div key={index} className={`${styles.projectSingle} ${styles[category]} ${styles.hoverEffect}`} onClick={() => setSelectedProject(project)}>
                  <div>
                    <h3>{project.title}</h3>
                  </div>
                  <p>
                    {project.year},{' '}
                    {router.locale === 'en' ? project.infoen : project.infoga}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
        }
      </div>

      {selectedProject && (
        <div className={styles.popup}>
          <div className={styles.popupInner}>
            <div className={`${styles[selectedProject.category]} ${styles.popupCategory}`}>{translateCategory(selectedProject.category)}</div>

            <div className={styles.popupContent}>
              <h2>{selectedProject.title}</h2>
              <h3>{selectedProject.year}</h3>
              <p className={styles.description}
                dangerouslySetInnerHTML={{
                  __html:
                    router.locale === 'en'
                      ? selectedProject.descriptionen
                        ? selectedProject.descriptionen
                        : selectedProject.infoen
                      : selectedProject.descriptionga
                        ? selectedProject.descriptionga
                        : selectedProject.infoga
                }}></p>

              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  →{t("projects:more")}
                </a>
              )}

              {selectedProject.embed && (
                <div className={styles.iframe} dangerouslySetInnerHTML={{ __html: selectedProject.embed }} />
              )}

              {selectedProject.image && (
                <img src={selectedProject.image} alt={selectedProject.title} />
              )}

            </div>
            <div className={styles.popupButtons}>
              <button onClick={() => setSelectedProject(null)}>{t("projects:close")}</button>

              <div className={styles.locales}>
                {router.locales.map(locale => (
                  <div key={locale}>
                    <Link href={router.asPath} className={locale}
                      style={router.locale === locale ? activeStyle : {}}
                      locale={locale}>
                      {locale}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className={styles.popupBackground} onClick={() => setSelectedProject(null)}></div>

        </div>
      )}

      <Footer />
    </div >
  );
}
