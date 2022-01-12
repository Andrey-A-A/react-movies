import React from "react";
import { Movies } from '../component/Movies';
import { Search } from '../component/Search';
import { Preloader } from '../component/Preloader';


const API_KEY = process.env.REACT_APP_API_KEY;


class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
  }

  //используем метод жизненого цикла, внутри которого наш запрос смонтировался
  componentDidMount() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=moscow`)
      //fetch(`https://www.omdbapi.com/?apikey=b6d65065&s=moscow`)
      .then(response => response.json())
      .then(data => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        alert(err);
        this.setState({ loading: false })
      })
  }//в fetch передаем url который берем из postman, после этого нам придет ответ, который надо преобразовать через встроенный метод json, а потом нам уже придут те данные, которые нам показал postman. При их получении обращаемся к setState, говорим, что в наши фильмы необходимо положить, то, что лежит в data в конкретном ключе, который называется поиск (Search), который представляет из себя массив с данными по фильмам, а теперь когда данные получены, в setState обновим значение loading, заменим его на false

  //добавим функцию, которая позволит выводить карточки с фильмами по запросу из поисковой строки и выбора типа показываемых карточек (фильмы, сериалы, игры или по умолчанию все типы). В качестве переменной функция принимает некую поисковую строку str и type
  //В переменную помимо строки добавим тип, который по умолчанию равен all. Далее при запросе в fetch, нам нужно проверить, есть ли ключ type, и если есть, то дать ему значение, которое пользователь прислал/выбрал. Передаем выражение, которое добавиться в GET, в котором делаем проверку - если type не равен значению all, тогда к get-параметрам в url добавим $type= тому значению type, которое придет от пользователя, иначе возвращаем пустую строку.
  searchMovies = (str, type = 'all') => {
    this.setState({ loading: true }); //сначала, до получения данных, включается прелоадер
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
      //fetch(`https://www.omdbapi.com/?apikey=b6d65065&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
      .then(response => response.json())
      .then(data => this.setState({ movies: data.Search, loading: false })) //после получения данных состояние загрузки отключается
      .catch((err) => {
        console.error(err);
        alert(err);
        this.setState({ loading: false })
      })
  }
  //далее эту функцию нужно спустить в наш компонент Search

  render() {
    //изначально у нас ещё нет фильмов, они ещё не получены, поэтому нам потребуется прелоадер
    const { movies, loading } = this.state; //используем деструктуризацию

    return <main className="container content">
      <Search searchMovies={this.searchMovies} />
      {/*сделаем проверку - если идет загрузка, то включается прелоадер, иначе возвращаем компонент Movies*/}
      {
        loading ?
          <Preloader />
          : (
            <Movies movies={movies} />
          )
      }

    </main>
  }

}

export { Main }