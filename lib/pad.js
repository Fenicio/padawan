this.Pad = function Pad(id, selector) {
	jQuery.event.props.push("dataTransfer");


	var canvas = $(selector);
	var wrap = $('.canvas-wrap');
	var img = document.createElement("img");
	var ctx = canvas[0].getContext('2d');
	var drawing = false;
	var color;

	color = localStorage.getItem('color-question');
	if(!color) {
		color = getRandomColor();
		localStorage.setItem('color', color);
	}
	var pad = canvas.attr({ //TODO
		width: wrap.width(),
		height: wrap.height()
	}).hammer();

	pad.on('dragstart', onDragStart);
	pad.on('dragend', onDragEnd);
	pad.on('drag', onDrag);
	pad.on("dragover", onDragOver);
	pad.on("drop", onDrop);

	ctx.strokeStyle=color;
	ctx.fillStyle='rgba(7,7,7,0)';
	ctx.lineCap = 'round';
	ctx.lineWidth = 3;
	ctx.fillRect(0, 0, canvas.width(), canvas.height());


	img.addEventListener("load", function() {
		ctx.drawImage(img, 0, 0);
	}, false);

	document.ontouchmove = function(e) {
		e.preventDefault();
	}

	this.close = function() {
		pad.off('dragstart', onDragStart);
		pad.off('dragend', onDragEnd);
		pad.off('drag', onDrag);
		pad.off('dragover', onDragOver);
		pad.off('drop', onDrop)
	};

	function onDrag(event) {
		if(drawing) {
			var to = getPosition(event);
			drawLine(from, to, color);
			from = to;
			skipCount=0;
		}
	}

	function onDragStart(event) {
		drawing = true;
		from = getPosition(event);
	}

	function onDragEnd() {
		drawing = true;
	}

	function onDrop(evt) {
		evt.preventDefault();
		var files=evt.dataTransfer.files;
		if(files.length>0) {
			var file = files[0];
			if(typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				reader.onload = function(evt) {
					img.src = evt.target.result;
				};
				reader.readAsDataURL(file);
			}
		}
	};

	function onDragOver(evt) {
		evt.preventDefault();
	}

	function getPosition(event) {
		return {
			x: parseInt(event.gesture.center.pageX-canvas[0].offsetLeft),
			y: parseInt(event.gesture.center.pageY-canvas[0].offsetTop)
		};
	}

	function drawLine(from, to, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.closePath();
		ctx.stroke();
	}

	function wipe(emitAlso) {
		//ctx.fillRect(0,0, canvas.width(), canvas.height());
		ctx.save();
		var w = canvas[0].width;
		canvas[0].width=1;
		canvas[0].width=w;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
		ctx.restore();
		ctx.lineWidth = 3;
	}

	function drawImage(source) {
		var _img = document.createElement('img');
		_img.src=source;
		ctx.drawImage(_img,0,0);
	}
	
	function getRandomColor() {
		var letters='0123456789ABCDEF'.split('');
		var color = '#';
		for(var i = 0; i< 6; i++) {
			color += letters[Math.round(Math.random()*11)]; //15
		}
		return color;
	}

	function toDataUrl() {
		return canvas[0].toDataURL();
	}

	this.wipe = wipe;
	this.drawImage = drawImage;
	this.toDataURL = toDataUrl;
	

	
}