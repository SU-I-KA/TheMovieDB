import React from 'react'
import styles from './CheckBox.module.css'

export default function CheckBox({filterMovies, highestChecked}) {
    return (
        <div className={styles.btnContainer} >
            
            <input type="radio" name="rate" className={styles.highest}  value='highest' checked={highestChecked} onChange={(e)=> filterMovies(e)}/>
            <label className={styles.labelOne}>Highest</label>  
            
            <input type="radio" name="rate" className={styles.lowest} value='lowest' checked={!highestChecked} onChange={(e)=> filterMovies(e)}/>
            <label className={styles.labelTwo}>Lowest</label> 
            
</div> 
    )
}
