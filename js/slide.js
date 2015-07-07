var page_number = 1;
var canvas_number = 0;
var current_page = 1;
var max_pages;

var pages_loaded;
var pdf_data;
var canvas_context = [];

var slide_left = "<span id='page_left' class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-angle-left  fa-stack-1x fa-inverse'></i><span>"
var slide_right = "<span id='page_right' class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-angle-right  fa-stack-1x fa-inverse'></i><span>"

var url = 'pdf/';

var slide = {
	init : function (pdf_path) {

			pdf_data = url + pdf_path + ".pdf";
			$('document').ready (function() {
				includes();
			});

			window.onload = function() {
				SetUp();
				View();
				actions();
				loader_check();
			};
	}

}

function includes() {

	var html = "<div class='col-md-1 col-md-offset-1'><div class='slide_left'></div></div><div class='col-md-8'><div id='slide' class='slide_content'></div></div><div class='col-md-1'><div class='slide_right'></div></div><div id='loader'><div class='container'><div id='loader_graphic' class='col-md-offset-5 col-md-1'><i class='fa fa-spinner fa-pulse fa-5x'></i></div></div>";
	$('body').append(html);
}

function SetUp() {

	$(".slide_left").append(slide_left);
	$(".slide_right").append(slide_right);

	PDFJS.workerSrc = 'js/pdf.worker.js';

	var slide_content = "<canvas id='slide_canvas" + 0 +"' style='border:1px solid black;'/></canvas>";

	$(".slide_content").append(slide_content);
	$('#slide_canvas'+0).hide();
}

function View() {

	PDFJS.getDocument(pdf_data).then(function(pdf) {
		max_pages = pdf.numPages;

		renderPage(pdf, page_number++, function pageRenderingComplete() {
		if (page_number > pdf.numPages) {
		return; // All pages rendered
		}
		// Continue rendering of the next page
		renderPage(pdf, page_number++, pageRenderingComplete);
		});
	});
}

function renderPage(pdf, pageNumber, callback) {
	var slide_content = "<canvas id='slide_canvas" + (canvas_number + 1) +"' style='border:1px solid black;'/></canvas>";

	$(".slide_content").append(slide_content);
	canvas_number++;
	pdf.getPage(pageNumber).then(function(page) {
		var scale = 1;
		var viewport = page.getViewport(scale);

		var pageDisplayWidth = viewport.width;
		var pageDisplayHeight = viewport.height;

		// Prepare canvas using PDF page dimensions

		var canvas = document.getElementById('slide_canvas' + canvas_number);
		var context = canvas.getContext('2d');
		canvas.width = pageDisplayWidth;
		canvas.height = pageDisplayHeight;

		// Render PDF page into canvas context
		var renderContext = {
		  canvasContext: context,
		  viewport: viewport
		};
		page.render(renderContext).promise.then(callback);

		canvas_context[canvas_number] =  renderContext;

		$('#slide_canvas'+canvas_number).hide();


		if(canvas_number >= max_pages-1) {
			$("#slide_canvas"+current_page).show();
			$('#loader').fadeOut('1000');
		}
	});
}

function actions() {

	$('#page_left').click(function(){
		current_page--;
		$("#slide_canvas"+current_page).show();
		$("#slide_canvas"+(current_page+1)).hide();
		check_page();
	});

	$('#page_right').click(function(){
		current_page+=1;
		$("#slide_canvas"+current_page).show();
		$("#slide_canvas"+(current_page-1)).hide();
		check_page();
	});

	$('.slide_left').hide();

	$("#slide_canvas"+current_page).show();
}

function check_page() {

	if(current_page<=1) {
		$('.slide_left').hide();
	}
	if(current_page>1) {
		$('.slide_left').show();
	}
	if(current_page<canvas_number) {
		$('.slide_right').show();
	}
	if(current_page>=canvas_number) {
		$('.slide_right').hide();
	}

}

function loader_check () {

	$(canvas_number).change(function() {
		if(canvas_number >= max_pages-1) {
			$('#loader').fadeOut('1000');
		}
	});
}



