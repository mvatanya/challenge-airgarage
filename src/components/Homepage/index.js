import React, { useState } from 'react'
import { getParkingBusinesses } from '../../helpers/api'
import './styles.css'

const Homepage = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState();
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setResults()
      const searchResults = await getParkingBusinesses(location)
      setResults(searchResults)
    } catch (errors){
      setError('Something went wrong. Please try another location')
    }
    setLocation('')
  }

  /**
   * Show
      name,
      address, 
      an image if available, 
      star rating, 
      review count, 
      and link to the Yelp page.
      score = ( number of reviews * rating ) / (number of reviews + 1)
  */
  const resultBody = results && results.data.businesses.map(b => {
    const scores = ((b.review_count * b.rating) / (b.review_count +1)).toFixed(2)
    return (
      <tr key={b.id}>
        <td>{b.name}</td>
        <td>{b.location.display_address}</td>
        <td><img src={b.image_url} width='200' height='200' alt='business'/></td>
        <td>{b.rating}</td>
        <td>{b.review_count}</td>
        <td><a href={b.url}>Visit Website</a></td>
        <td>{scores}</td>
      </tr>
    )
  })
  return (
    <div>
      <form onSubmit={handleSubmit} className='form-input'>
        Search Parking Location: 
        <input 
          name='location'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <button>Search</button>
      </form>
      {results? (
        <table>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Image</th>
            <th>Star Rating</th>
            <th>Review Count</th>
            <th>Link</th>
            <th>Score</th>
          </tr>
          <tbody>{resultBody}</tbody>
        </table>
      ):(<div>{error}</div>)
      }
    </div>
  )
}

export default Homepage
