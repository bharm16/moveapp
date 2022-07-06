import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import async from "async";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('help');
	const [favourites, setFavourites] = useState([]);




	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=eea38a28`;
		//const url = 'http://www.omdbapi.com/?s=${searchValue}&apikey=eea38a28&page';


		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	return (
		<div className='container movie-app'>
			<div className='row d-flex align-items-start'>
				<MovieListHeading heading='MovieBear' />
				<MovieListHeading heading='Films' />
				<MovieListHeading heading='Lists' />

				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div/>
			<div className='container grid'>
				<MovieList
					movies={movies}
					favouriteComponent={AddFavourites}
					handleFavouritesClick={addFavouriteMovie}
				/>
			</div>
			<div className='row d-flex align-items-start mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='grid'>
				<MovieList movies={favourites} favouriteComponent={AddFavourites} />
			</div>
		</div>
	);
};

export default App;
