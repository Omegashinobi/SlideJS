# SlideJS
####a Plugin for PDF.JS that adds slideshow capability 

##Dependencies

```
pdf.js
pdf.worker.js
jquery
bootstrap
font-awesome
```

##Setting Up

include these in the head of the document:

```
<script type="text/javascript" src="js/slide.js"></script>
<link rel='stylesheet' type='text/css' href='css/slide.css'>

```

to initialize:

```

<script>
	slide.init("YourPdfNameHere");
</script>

```

This will load "YouPdfNameHere.pdf".

(Currently there needs to be folder called "PDF" with your PDF insde, on the same level as the page your currently trying to use it on.)
