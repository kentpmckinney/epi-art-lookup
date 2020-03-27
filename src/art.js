export class Art {
  constructor () {}

  /* Search the Metropolitan Museum of Art API  */
  search (keyword, perItemCallback, errorCallback, noResultsCallback) {
    (async () => {

      let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`;
      let response = await fetch(url);

      // Handle errors
      if (!response.ok) { if (errorCallback) errorCallback(`Error: ${response.status}: ${response.statusText}`); }

      if (response.ok && response.status === 200) { 
        let json = await response.json();
        let objects = json.objectIDs;

        // Handle no results
        if (!objects) { if (noResultsCallback) noResultsCallback("No results found."); }

        for (let i = 0; i < json.total; i++) {
          let object = objects[i];
          (async () => {
              let url2 = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object}`;
              let response = await fetch(url2);
              let json2;
              if (response.ok && response.status === 200) {
                json2 = await response.json();
                if (json2) { if (perItemCallback) perItemCallback(json2); }
              }
          })();
        }
      }

    })();
  }
}