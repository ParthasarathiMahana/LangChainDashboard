import React, { useState } from 'react'
import { Input } from 'antd'
import styles from './searchBar.module.css'

const SearchBar = () => {
    const handleSearch = (value) => {
        console.log(value);
    }

    return (
        <>
            <div className={styles.searchBarContainer}>
                <Input.Search
                    size='large'
                    className={styles.searchBar}
                    placeholder='Search for a Ticket'
                    onSearch={handleSearch} />
            </div>
        </>
    )
}

export default SearchBar