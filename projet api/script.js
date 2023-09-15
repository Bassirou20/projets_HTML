const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const API_url='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page='




function createElement(tagName,attribut={},content=''){
  const element=document.createElement(tagName)
  for (const key in attribut) {
   element.setAttribute(key,attribut[key])
  }
  element.textContent =content
  return element
}





function createFilm(title,img,description_titre,vote,description_content){
    const film=createElement('div',{class:'film'})

    const conteneur_image=createElement('div',{class:'image'})
    const imge=createElement('img',{src:img})
    conteneur_image.append(imge)

    const info_film=createElement('div',{class:'info_film'})
    const titre_h2=createElement('h2',{},title)
    const vote1=createElement('span',{class:'vote'},vote)

    info_film.append(titre_h2,vote1)

    const description1=createElement('div',{class:'overview'})
    const titre_niv2=createElement('h2',{},description_titre)
    const paragraphe=createElement('p',{},description_content)

    description1.append(titre_niv2,paragraphe)

    film.append(conteneur_image,info_film,description1)

    return film
}

let page=2


async function fetchFillm(url){
    const response =await fetch(url)

    const data = await response.json()
    console.log('res',data);

    return data.results
}
// fetchFillm('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=')

// console.log(createFilm);
const conteneur_film = document.querySelector('main')
const movie =createFilm('titre du film','','7.8','description')

const movies = fetchFillm(API_url+page++)



movies.then(data =>{
    for (const movie of data){
        const titre= movie.original_title
        const overview=movie.overview
        const vote=movie.vote_average
        console.log(movie);
        const image= IMGPATH + movie.backdrop_path
        const movie1=createFilm(titre,image,'Overview',vote,overview)
        conteneur_film.append(movie1)
     }
})
// console.log(movie);
