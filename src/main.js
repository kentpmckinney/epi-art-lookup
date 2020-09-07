import 'bootstrap';
import './style.css';
import $ from 'jquery';

$(document).ready(() => {

	$('#find').click(function() {
		$('#results').html = ''; /* Clear previous search results, if any */
		let keyword = $('#keyword').val();
		$('#results').empty();
		(async () => {
			let search = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
			if (!search.ok || !search.status === 200) {
				$('#results').append(`<span class="error">Error: ${search.status}: ${search.statusText}</span>`);
				return;
			}
			let objects = (await search.json()).objectIDs;
			if (!objects) {
				$('#results').append(`<span class="info">No results found.</span>`);
				return;
			}
			for (let i = 0; i < objects.length; i++) {
				if ($('#keyword').val() != keyword) /* If the user changed the search term */
					break; /* Stop showing results for the old term */
				(async () => {
					let result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${object}`);
					if (result.ok && result.status === 200) {
						let item = await result.json();
						if (item) {
							$('#results').append(`
								<div>
									<div>&nbsp;</div>
									<div class="title">${item.title}</div>
									<div><a href='${item.primaryImage}' target='_blank'>
									<img src='${item.primaryImageSmall}'></img></a></div>
									<div class="date">${item.artistDisplayName}</div>
									<div class="date">${item.objectDate}</div>
								</div>
							`);
						}
					}
				})();
			};
		})();

		$('#keyword').focus();
	});

	/* Respond to ENTER key presses on the search input field */
	$('#keyword').bind('keypress', function(e) {
		let event = e || window.event;
		let keycode = event.keyCode || event.which;
		if (keycode == '13') $('#find').click();
	});

	$('#keyword').focus();
});
