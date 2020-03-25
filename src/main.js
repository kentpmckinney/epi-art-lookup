import './styles.css';
import $ from 'jquery';

$(document).ready(function() {
	$('#test').click(function() {
		(async () => {
			try {
				let keyword = $('#keyword').val();
				let startYear = $('#start-year').val();
				let endYear = $('#end-year').val();
				let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=${startYear}&dateEnd=${endYear}&q=${keyword}&hasImages=true`;
				let url2 = `https://collectionapi.metmuseum.org/public/collection/v1/objects/437406`;
				console.log(url);
				let response = await fetch(url);
				let jsonifiedResponse;
				if (response.ok && response.status === 200) {
					jsonifiedResponse = await response.json();
				} else {
					jsonifiedResponse = false;
				}
				let results = jsonifiedResponse;
				let objectIDs = results.objectIDs;
				console.log(objectIDs);
				for (let i = 0; i < results.total; i++) {
					let object = objectIDs[i];
					(async () => {
							let url2 = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object}`;
							console.log(url2);
							let response = await fetch(url2);
							let jsonifiedResponse;
							if (response.ok && response.status === 200) {
								jsonifiedResponse = await response.json();
							}
							let results = jsonifiedResponse;
								console.log(results.primaryImageSmall);
								console.log(results.title);
								console.log(results.objectDate);
					})();
					console.log(object.primaryImageSmall);
					console.log(object.title);
					console.log(object.objectDate);
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	});
});
