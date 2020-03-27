import 'bootstrap';
import './styles.css';
import $ from 'jquery';
import { Art } from './art.js';

let art = new Art();

$(document).ready(function() {

	/* Respond to the press of the Find button */
	$('#test').click(function() {
		let keyword = $('#keyword').val();
		$('#results').empty();
			art.search(keyword,
				(peritem) => {
				$('#results').append(`
					<div>
						<div>&nbsp;</div>
						<div class="title">${peritem.title}</div>
						<div><a href='${peritem.primaryImage}' target='_blank'><img src='${peritem.primaryImageSmall}'></img></a></div>
						<div class="date">${peritem.artistDisplayName}</div>
						<div class="date">${peritem.objectDate}</div>
					</div>
				`);
			}, (error) => {
					$('#results').append(`<span class="error">${error}</span>`);
			}, (noresults) => {
				$('#results').append(`<span class="info">${noresults}</span>`);
			});

	});

	/* Respond to ENTER key presses on the search input field */
	$('#keyword').bind('keypress', function(e) {
		let event = e || window.event;
		let keycode = event.keyCode || event.which;
		if (keycode == '13') $('#test').click();
	});

});
