import './styles.css';
import $ from 'jquery';
import { Met } from './met.js';

let met = new Met();

$(document).ready(function() {
	$('#test').click(function() {
		let keyword = $('#keyword').val();
		let startYear = $('#start-year').val();
		let endYear = $('#end-year').val();
		met.callback = function (object) {
			console.log(object.primaryImageSmall);
			console.log(object.title);
			console.log(object.objectDate);
		}
		met.search(keyword, startYear, endYear);
	});
});
