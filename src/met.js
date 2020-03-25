export class Met {
  constructor () {
    this.perItemCallback;
  }

  search (keyword, startYear, endYear, artist, completionCallback) {
    let count = 0;
    (async () => {
      try {
        let url = "";
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`;
        let response = await fetch(url);
        let json;
        if (response.ok && response.status === 200) {
          json = await response.json();
          if (json) {
            let objects = json.objectIDs;
            for (let i = 0; i < json.total; i++) {
              let object = objects[i];
              (async () => {
                  let url2 = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object}`;
                  let response = await fetch(url2);
                  let json2;
                  if (response.ok && response.status === 200) {
                    json2 = await response.json();
                    if (json2) {
                      if (this.perItemCallback) this.perItemCallback(json2);
                      count++;
                    }
                  }
              })();
            }
          }
        }
      } catch (e) {
        alert(e.message);
      }
    })();
    if (completionCallback) completionCallback(count);
  }
}