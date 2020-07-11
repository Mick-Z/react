import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])

  console.log(results)

  // will run as component is loaded and whenever the component is re-rendered AND data (term) has changed
  useEffect(() => {
    // useEffect's function cannot directly be marked as async, however there are still three ways to make a request
    // inside of useEffect, e.g. useEffect( async () => {})

    // First way to call async in useEffect is to declare helper function and declare it
    // const search = async () => {
    //   await axios.get('')
    // }
    // search();

    if (term) {
      // Second way is to use IIFE - 😍
      (async() => {
        const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: term
          }
        })
        setResults(data.query.search)
      })();
    }

    // Third way is to use promises... ewwwwwwww!
    // axios.get('SOME_WEBSITE.com').then((res) => res.data)

  }, [term])

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Search;