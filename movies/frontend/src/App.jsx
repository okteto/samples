import React, { Component }  from 'react';
import { hot } from 'react-hot-loader';

import userAvatarImage from './assets/images/user.jpg';
import movieBackground from './assets/images/movie-bg.jpg';
import movieLogo from './assets/images/movie-logo.png';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mylist: {
        data: {},
        loaded: false
      },
      movies: {
        data: {},
        loaded: false
      },
      watching: {
        data: {},
        loaded: false
      },
      session: {
        name: 'Cindy',
        lastName: 'Lopez',
        username: 'cindy',
        avatar: userAvatarImage
      },
      fixHeader: false
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    fetch('/api/movies')
      .then(res => res.json())
      .then(result => {
        this.setState({
          movies: {
            data: result,
            loaded: true
          }
        })
      });

    fetch('/api/mylist')
      .then(res => res.json())
      .then(result => {
        this.setState({
          mylist: {
            data: result,
            loaded: true
          }
        })
      });

    fetch('/api/watching')
      .then(res => res.json())
      .then(result => {
        this.setState({
          watching: {
            data: result,
            loaded: true
          }
        })
      });

    window.addEventListener('scroll', this.onScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setState({
      fixHeader: window.scrollY > 100
    });
  }

  render() {
    const { movies, mylist, watching } = this.state;
    return (
      <div className="App">
        <header className={`Header ${this.state.fixHeader ? 'fixed' : ''}`}>
          <div className="content">
            <div className="logo">Netflix</div>
            <ul className="menu">
              <li className="selected">Home</li>
              <li>TV Shows</li>
              <li>Movies</li>
            </ul>
            <UserProfile user={this.state.session} />
          </div>
        </header>
        <Hero />
        <TitleList title="My List" titles={mylist.data} loaded={mylist.loaded}/>
        <TitleList title={`Continue watching for ${this.state.session.name}`} titles={watching.data} loaded={watching.loaded} />
        <TitleList title="Movies" titles={movies.data} loaded={movies.loaded} />
      </div>
    );
  }
}

class Loader extends Component {
  render() {
    return (
      <div className="Loader">
        <svg version="1.1" id="loader" x="0px" y="0px"
            width="40px" 
            height="40px" 
            viewBox="0 0 50 50" 
            style={{
              enableBackground: 'new 0 0 50 50'
            }}>
          <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    );
  }
}


class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">{`${user.name} ${user.lastName}`}</div>
          <div className="image"><img src={user.avatar} alt="profile" /></div>
        </div>
      </div>
    );
  }
}


class Hero extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: `url(${movieBackground})`}}>
        <div className="content">
          <img className="logo" src={movieLogo} alt="narcos background" />
          <p>
            Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist 
            John Deacon take the music world by storm when they form the rock 'n' roll band 
            Queen in 1970. 
          </p>
          <div className="button-container">
            <HeroButton class="play-button">
              <svg className="icon play-icon" width="20" height="20" viewBox="0 0 512 512">
                <path d="M405.2 232.9L126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"/>
              </svg>
              Play
            </HeroButton>
            <HeroButton class="list-button">
              <svg className="icon add-icon" width="20" height="20" viewBox="0 0 20 20">
                <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z"/>
              </svg>
              My list
            </HeroButton>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}


class HeroButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="#" className="Button">{this.props.children}</a>
    );
  }
}


class TitleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let titles = '';
    if (this.props.titles && this.props.loaded) {
      titles = this.props.titles.map((title, i) => {
        if (i < 4) {
          let name = '';
          const backDrop = `http://image.tmdb.org/t/p/original${title.backdrop_path}`;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }
          return (
            <Item 
              key={title.id} 
              title={name} 
              score={title.vote_average} 
              overview={title.overview} 
              backdrop={backDrop} 
            />
          );  
        } else {
          return (
            <div key={title.id}></div>
          );
        }
      }); 
    } 
    return (
      <div ref="titlecategory" className="TitleList">
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-slider">
            {titles || <Loader />}
          </div>
        </div>
      </div>
    );
  }
}


class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Item">
        <div className="ItemContainer" style={{ backgroundImage: `url(${this.props.backdrop})` }}>
          <div className="overlay">
            <div className="title">{this.props.title}</div>
            <div className="rating">{this.props.score} / 10</div>
            <ListToggle />
          </div>
        </div>
      </div>
    );
  }
}


class ListToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true }); 
    }
  }

  render() {
    return (
      <div className="ListToggle" onClick={this.handleClick} data-toggled={this.state.toggled}>
        <div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M24,13.2c-0.6,0-1,0.4-1,1v9h-9c-0.6,0-1,0.4-1,1s0.4,1,1,1h9v9c0,0.6,0.4,1,1,1s1-0.4,1-1v-9h9c0.6,0,1-0.4,1-1    s-0.4-1-1-1h-9v-9C25,13.6,24.6,13.2,24,13.2z"/>
            </svg>
          </div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M33.2,16.9L21,29l-6.5-6.4c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l7.2,7.1c0.2,0.2,0.5,0.3,0.7,0.3    c0.3,0,0.5-0.1,0.7-0.3l12.8-12.8c0.4-0.4,0.4-1,0-1.4C34.2,16.5,33.6,16.5,33.2,16.9z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
