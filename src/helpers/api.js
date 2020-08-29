import axios from 'axios';

export const getParkingBusinesses = async (location) => {
  const response = await axios.get(
    `http://localhost:5000/search?location=${location}`
  )
  return response
}