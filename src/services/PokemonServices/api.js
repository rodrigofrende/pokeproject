const axios = require('axios');

export const getPokemonModalData = async (url) => {
  const { data } = await axios.get(url)
  return data
}


