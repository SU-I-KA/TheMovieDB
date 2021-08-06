import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'

import CheckBox from '../../components/CheckBox/CheckBox'
import Movie from '../../components/Movie/Movie'
import Loading from '../../components/Loading/Loading'
import Logo from '../../components/Logo/Logo'

const apiKey = `?api_key=${process.env.REACT_APP_API_KEY}`
const mainUrl = `https://api.themoviedb.org/3/discover/movie`

//const movieUrl = `https://api.themoviedb.org/3/movie/${movie_id}${apiKey}&language=en-US`
//const TMDB_MOVIE_LINK = `https://www.themoviedb.org/movie/${movie_id}`
//const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`


const storedList = () => {
  let list = localStorage.getItem('highLighted')
  if (list) {
    return JSON.parse(localStorage.getItem('highLighted'))
  } else {
    return []
  }
}

function Home() {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [highestChecked, setHighestChecked] = useState(true)
  const [highLighted, setHighLighted] = useState(storedList())

  const fetchMovies = async () => {
    setLoading(true)
    let url, orderBy;
    if (highestChecked) {
      orderBy = 'desc'
    } else {
      orderBy = 'asc'
    }
    const urlPage = `&page=${page}`
    const urlQuery = `&sort_by=vote_average.${orderBy}&vote_count.gte=5692`
    url = `${mainUrl}${apiKey}${urlQuery}${urlPage}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies((oldMovies) => {
        if (page === 1) {
          return data.results
        } else {
          return [...oldMovies, ...data.results]
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const deleteItem = (itemId) => {
    const newList = highLighted.filter((item) => item !== itemId);
    setHighLighted(newList);
  }

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, highestChecked])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('highLighted', JSON.stringify(highLighted))
  }, [highLighted])

  const filterMovies = (e) => {
    const value = e.target.value;
    setMovies([])
    setPage(1)
    if(value === 'highest'){
        setHighestChecked(true)
    } else if (value === 'lowest'){
        setHighestChecked(false)
    }
  }

  return (
    <main>
      <section className={styles.header}>
        <Logo className={styles.logo} />
        <div className={styles.text}>
          <h2 className={styles.title}>Top 500 Movies on TMDB</h2>
          <p className={styles.subTitle}>Sort movies by rating</p>
        </div>
      </section>
      <div className={styles.row}>
            <CheckBox filterMovies={filterMovies} highestChecked={highestChecked} />
        </div>
      <section className={styles.movies}>
        <div className={styles.moviesCenter}>
          {movies?.map?.((movie) => {
            return <Movie key={movie.id} {...movie} setHighLighted={setHighLighted} highLighted={highLighted} deleteItem={deleteItem} />
          })}
        </div>
        {loading && <Loading /> }
      </section>
    </main>
  )
}

export default Home