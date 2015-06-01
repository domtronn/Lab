var controls = document.getElementById('controls');

document.getElementById('control-nav').onclick = function () {

	toggleControls();
	
};

document.addEventListener( 'keydown', function (e) {

	if (e.keyCode === 67)
		toggleControls();
		
});

function toggleControls() {
	
	if (controls.className.indexOf('slideLeft') < 0) {
		
		controls.classList.add('slideLeft');
		controls.classList.add('rotateRight');
		
	} else {
		
		controls.classList.remove('slideLeft');
		controls.classList.remove('rotateRight');
		
	}
	
}
