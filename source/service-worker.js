self.addEventListener('install', event => {
	console.log('hello world');
	console.log(event);
});
self.addEventListener('fetch', event => {
	console.log(event);
});
self.addEventListener('activate', event => {
	console.log('hello world');
});