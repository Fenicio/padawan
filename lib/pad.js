this.Pad = function Pad(id, selector) {
	jQuery.event.props.push("dataTransfer");


	var canvas = $(selector);
	var wrap = $('.canvas-wrap');
	var img = document.createElement("img");
	var ctx = canvas[0].getContext('2d');
	var drawing = false;
	var history = [];
	var historyIndex=0;
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
	pad.on("mouseout", onMouseOut);
	pad.on("mousedown", onMouseDown);
	pad.on('click', onClick);
	pad.on("selectstart", onSelectStart);

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
		pad.off("mouseout", onMouseOut);
		pad.off("mousedown", onMouseDown);
		pad.off('click', onClick);
		pad.off("selectstart", onSelectStart);
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

	function onDragEnd(event) {
		if(drawing) {
			saveHistory();
		}
		drawing = false;
	}

	function onMouseOut() {
		if(drawing) {
			saveHistory();
		}
		drawing=false;
	}

	function onClick(event) {
		var temp = ctx.fillStyle;
		ctx.fillStyle=ctx.strokeStyle;
		ctx.fillRect(event.offsetX-2, event.offsetY-2, 4, 4);
		ctx.fillStyle=temp;
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

	function onSelectStart() {
		return false;
	}

	function onMouseDown() {
		return false;
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
		_img.onload=function() {
			ctx.drawImage(_img,0,0);
		}
	}
	
	function getRandomColor() {
		var letters='0123456789ABCDEF'.split('');
		var color = '#';
		for(var i = 0; i< 6; i++) {
			color += letters[Math.round(Math.random()*11)]; //15
		}
		return color;
	}

	function saveHistory() {
		history[historyIndex]=canvas[0].toDataURL();
		console.log("historyIndex:" + historyIndex + ":"+ history[historyIndex]);
		historyIndex++;
		for (var i = history.length - 1; i >= historyIndex; i--) {
			delete history[historyIndex];
		};
	}

	function undo() {
		if(historyIndex>1) {
			historyIndex--;
			wipe();
			var _img = document.createElement('img');
			console.log("undo, cargando: "+historyIndex + ": " + history[historyIndex]);
			_img.src=history[historyIndex-1];
			_img.onload=function() {
				ctx.drawImage(_img,0,0);
			}
		} else if(historyIndex===1) {
			wipe();
			historyIndex=0;
		}
		return false;
	}

	function redo() {
		if(historyIndex<(history.length) && history[historyIndex]) {
			wipe();
			var _img = document.createElement('img');
			console.log("redo, cargando: "+historyIndex + ": " + history[historyIndex]);
			_img.src=history[historyIndex];
			_img.onload=function() {
				ctx.drawImage(_img,0,0);
			}
			historyIndex++;
		}
		return false;
	}

	function toDataUrl() {
		return canvas[0].toDataURL();
	}

	this.wipe = wipe;
	this.drawImage = drawImage;
	this.toDataURL = toDataUrl;
	this.undo = undo;
	this.redo = redo;
}