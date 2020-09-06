const apiKey = 'gwwnBwwC6PkJNaA6p_iLU9EPcXLm6-LjoWE3JJAJm6NlxEO5EcYQr4NRyKPjdl9v_hxEfkTFo8c-6eKG5KS7MY-Vm919AR-h_TZ7q2YXO_v-oX--cKOwgI8n3XhUX3Yx';

const Yelp = {
  search: (term, location, sortBy) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          })
        } else {
          throw new Error("Business not found")
        }
      })
  }
}

export default Yelp;

