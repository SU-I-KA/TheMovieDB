import React, { useState, useEffect } from 'react'
import styles from './Movie.module.css'

import HighLight from '../HighLight/HighLight'
import HighLighted from '../HighLighted/HighLighted'
import Star from '../Star/Star'
import Mark from '../Mark/Mark'

const Movie = ({
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    setHighLighted,
    highLighted,
    deleteItem
}) => {
    const [addRemove, setAddRemove] = useState(null)

    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
    const TMDB_MOVIE_LINK = `https://www.themoviedb.org/movie/${id}`

    const handleClick = () => {
        if (highLighted.includes(id)) {
            deleteItem(id)
        } else {
            setHighLighted((oldList) => {
                return [...oldList, id]
            })
        }

    }

    const toggleSettings = () => {
        let title;
        if (highLighted?.includes?.(id)) {
            title = 'de-Highlight'
        } else {
            title = 'Highlight'
        }
        setAddRemove(title)
    }

    useEffect(() => {
        toggleSettings()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highLighted])


    return (
        <article className={styles.movie} >
            <div className={styles.highLight} >
                <button title={`Click to ${addRemove}`} className={styles.btnMarked} onClick={handleClick}>
                    {highLighted?.includes?.(id) ? 
                    <>
                        <Mark fill='#f5c518' stroke='#000' />
                        <HighLighted className={styles.starIcon} />
                    </> : 
                    <>
                        <Mark fill='#fff'stroke='#000'/>
                        <HighLight className={styles.starIcon} />
                    </>}
                </button>
            </div>
            <a href={TMDB_MOVIE_LINK} title={title}>
                <img src={imageUrl} alt={title} />
            </a>
            <div className={styles.movieInfo}>
                <div>
                    <h4><a href={TMDB_MOVIE_LINK}>{`${title} (${release_date.substring(0, 4)})`}</a></h4>
                    <div className={styles.rate}>
                        <Star />
                        <p>{vote_average} </p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Movie
