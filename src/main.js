import './styles.css';
import $ from 'jquery';
import { Met } from './met.js';

let met = new Met();

$(document).ready(function() {
	$('#test').click(function() {
		let keyword = $('#keyword').val();
		let startYear = $('#start-year').val();
		let endYear = $('#end-year').val();
		let artist = $('#artist').val();
		$('#results').empty();
		met.perItemCallback = function (object) {
			$('#results').append(`
				<div>
					<div class="title">${object.title}</div>
					<div><a href='${object.primaryImage}' target='_blank'><img src='${object.primaryImageSmall}'></img></a></div>
					<div class="date">${object.artistDisplayName}</div>
					<div class="date">${object.objectDate}</div>
				</div>
			`);
		}
		met.search(keyword, startYear, endYear, artist, ()=>{});
	});
});
