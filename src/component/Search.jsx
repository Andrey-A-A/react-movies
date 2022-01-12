import React from "react";

class Search extends React.Component {
  state = {
    search: '',
    type: 'all',
  }

  //здесь напишем функцию с помощью которой по нажатию клавиши enter, данные, занесенные в поисковую строку, будут отправлены для дальнейшей обработки для вывода нового набора карточек
  handleKey = (e) => {
    //Свойство key объекта события позволяет получить символ нажатый на клавиатуре
    if (e.key === 'Enter') {
      //мы получили пропсами в компоненте Main метод searchMovies, поэтому можем его здесь вызвать и передать ему текущий state
      this.props.searchMovies(this.state.search, this.state.type);
    }
    //данные из поиска можно отправить также с помощью кнопки в рендере
  }

  //функция для выбора радио-кнопки, по умолчанию в стейте выбрана кнопка со значением "all". В рендере для радиокнопок задан data-атрибут, который мы и присвоим элементу type в стейте, используя свойство dataset. Далее нам нужно будет в эту функцию добавить также вызов функции searchMovies, каждый раз, когда мы поменяем значение type, то есть произведем клик по радиокнопке выбора типов отображающихся карточек. При вызове функции searchMovies в качестве параметров передаем кроме строки поиска еще и значение type пришедшее от пользователя. Так как вызов функции searchMovies, должен происходить уже после того как обновится стейт и для ключа type придет новое значение, то в setState сначала в виде колбек функции происходит обновление стейта (поэтому используем именно колбек функцию, которая сразу делает это обновление), и уже потом также используя колбек функцию, вызываем функцию searchMovies
  handleFilter = (e) => {
    this.setState(() => ({ type: e.target.dataset.type }), () => { this.props.searchMovies(this.state.search, this.state.type) });
  }

  render() {
    return <div className="row">
      <div className="input-field">
        <input
          className="validate"
          placeholder="поиск"
          type="search"
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyDown={this.handleKey}
        />
        <button className="btn search-btn" onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>Поиск</button>
        <div>
          <label className="radio-button">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="all"
              onChange={this.handleFilter}
              checked={this.state.type === 'all'}
            />
            <span>Все</span>
          </label>
          <label className="radio-button">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="movie"
              onChange={this.handleFilter}
              checked={this.state.type === 'movie'}
            />
            <span>Только фильмы</span>
          </label>
          <label className="radio-button">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="series"
              onChange={this.handleFilter}
              checked={this.state.type === 'series'}
            />
            <span>Только сериалы</span>
          </label>
          <label className="radio-button">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="game"
              onChange={this.handleFilter}
              checked={this.state.type === 'game'}
            />
            <span>Только игры</span>
          </label>
        </div>
      </div>
    </div>
  }

}

export { Search }