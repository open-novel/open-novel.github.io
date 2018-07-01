/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

self.addEventListener( 'fetch', e => {
	let req = e.request
	let path = new URL( req.url ).pathname
	console.log( path )
	if ( path != '/index.html' ) return
	console.log( '!!!' )
} )

self.addEventListener( 'activate', e => {
	console.log( 'acti' )
	self.registration.update( )
} )
