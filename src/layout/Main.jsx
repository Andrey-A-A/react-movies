import React from "react";
import { Movies } from '../component/Movies';
import { Search } from '../component/Search';
import { Preloader } from '../component/Preloader';
import process from 'process';

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=moscow`)
      .then(response => response.json())
      .then(data => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        alert(err);
        this.setState({ loading: false })
      })
  }
  searchMovies = (str, type = 'all') => {
    this.setState({ loading: true }); //сначала, до получения данных, включается прелоадер
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
      .then(response => response.json())
      .then(data => this.setState({ movies: data.Search, loading: false })) //после получения данных состояние загрузки отключается
      .catch((err) => {
        console.error(err);
        alert(err);
        this.setState({ loading: false })
      })
  }
  
  render() {
    
    const { movies, loading } = this.state;

    return <main className="container content">
      <Search searchMovies={this.searchMovies} />
      
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