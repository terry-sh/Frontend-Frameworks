
(function error_capture() {

	function handler(event) {
		const e = event.error;
		if (!!e && e instanceof Error) {
			console.log(e.stack);
		}
		alert('on-error');
	}
	window.addEventListener('error', handler);

}());