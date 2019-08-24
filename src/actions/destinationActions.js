function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function fetchDestinations() {
  return function(dispatch) {
    fetch("http://localhost:3000/api/v1/destinations")
      .then(res => res.json())
      .then(destinations => {
        dispatch({
          type: "FETCH_DESTINATIONS",
          destinations: {
            countries: destinations
              .map(destination => destination.country)
              .filter(unique),
            citiesByCountry: destinations
              .map(destination => destination.country)
              .filter(unique)
              .map(country => {
                return {
                  [country]: destinations
                    .filter(destination => destination.country === country)
                    .map(destination => destination.city).sort()
                }
              })
              .reduce(function(result, currentObject) {
                for (var key in currentObject) {
                  if (currentObject.hasOwnProperty(key)) {
                    result[key] = currentObject[key]
                  }
                }
                return result
              }, {}),
            destinations: destinations
          }
        });
      });
  };
}

export { fetchDestinations };
