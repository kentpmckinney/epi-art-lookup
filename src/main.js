import 'bootstrap';
import './style.css';
import $ from 'jquery';

$(document).ready(() => {

	$('#find').click(async () => {
		$('#results').empty();
		const keyword = $('#keyword').val();
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
			if ($('#keyword').val() != keyword)
				return;
			let result = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objects[i]}`);
			if (result.ok && result.status === 200) {
				let item = await result.json();
				if (item)
					$('#results').append(`<br><div class="item">
						<div class="title">${item.title}</div><hr>
						<div><a href='${item.primaryImage}' target='_blank'>
						<img src='${item.primaryImageSmall}'></img></a></div>
						<div class="date">${item.artistDisplayName}</div>
						<div class="date">${item.objectDate}</div></div>`);
			}
		}
		$('#keyword').focus();
	});

	/* Respond to ENTER key presses on the search input field */
	$('#keyword').bind('keypress', e => {
		let event = e || window.event;
		let keycode = event.keyCode || event.which;
		if (keycode == '13')
			$('#find').click();
	});

	$('#keyword').focus();
});
