// console.log("SANITYYYYYY");

let name;

const display = document.getElementById("response");

const oReq = new XMLHttpRequest();

const p4name = document.getElementById("person4Name");
const p4HW = document.getElementById("person4HomeWorld");

const p14name = document.getElementById("person14Name");
const p14spec = document.getElementById("person14Species");

function reqListener() {
  const data = JSON.parse(this.responseText);
  name = data.name;

  // console.log(data);
  p4name.innerHTML = name;

  function reqVaderHW() {
    const data2 = JSON.parse(this.responseText);
    home = data2.name;
    console.log("wtf: ", home);
    p4HW.innerHTML = home;
  }
  const oReqVhw = new XMLHttpRequest();
  oReqVhw.addEventListener("load", reqVaderHW);
  oReqVhw.open("GET", "https://swapi.co/api/planets/1/");
  oReqVhw.send();

  function reqSolo() {
    const data3 = JSON.parse(this.responseText);
    const soloName = data3.name;
    // console.log(data3);
    p14name.innerHTML = soloName;

    function soloSpec() {
      const data4 = JSON.parse(this.responseText);
      const soloSpec = data4.name;
      // console.log(data4);
      p14spec.innerHTML = soloSpec;
    }
    const oReqSolS = new XMLHttpRequest();
    oReqSolS.addEventListener("load", soloSpec);
    oReqSolS.open("GET", "https://swapi.co/api/species/1/");
    oReqSolS.send();
  }
  const oReqP14 = new XMLHttpRequest();
  oReqP14.addEventListener("load", reqSolo);
  oReqP14.open("GET", "https://swapi.co/api/people/14/");
  oReqP14.send();
}

oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://swapi.co/api/people/4/");
oReq.send();

//---------------films----------------------
const filmId = document.getElementById("filmList");

function filmLister(flms) {
  for (let i = 0; i < flms.length; i++) {
    let filmLi = eleMaker(filmId, "li", "f" + i, "film");
    let myFilm = flms[i];
    let myTitle = myFilm.title;
    let myPlanets = myFilm.planets;
    // console.log(myPlanets);

    eleMaker(filmLi, "h2", null, "filmTitle", myTitle);
    eleMaker(filmLi, "h3", null, null, "Planets");
    let myP = eleMaker(filmLi, "ul", "p" + i, "filmPlanets");

    for (let k = 0; k < myPlanets.length; k++) {
      function requester() {
        const theData = JSON.parse(this.responseText);
        let aPlanet = eleMaker(myP, "li", "f" + i + "p" + k, "planet");
        eleMaker(aPlanet, "h4", null, "planetName", theData.name);
      }
      let reqPlanets = new XMLHttpRequest();
      reqPlanets.addEventListener("load", requester);
      reqPlanets.open("GET", myPlanets[k]);
      reqPlanets.send();
    }
  }
}
function reqFilms() {
  const filmsObj = JSON.parse(this.responseText);
  const films = filmsObj.results;
  // console.log(filmsObj);

  filmLister(films);
}
const oFilms = new XMLHttpRequest();
oFilms.addEventListener("load", reqFilms);
oFilms.open("GET", "https://swapi.co/api/films/");
oFilms.send();

function eleMaker(parent, ele, id, cls, inner) {
  let myEle = document.createElement(ele);
  if (id) {
    myEle.id = id;
  }
  if (cls) {
    myEle.class = cls;
  }
  if (inner) {
    myEle.innerHTML = inner;
  }

  parent.appendChild(myEle);
  return document.getElementById(id);
}
