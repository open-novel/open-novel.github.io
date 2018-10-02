/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

let cache

self.addEventListener( 'fetch', e => {

	let req = e.request

	let get = fetch( req, req.mode == 'navigate' ? undefined : { cache: 'no-cache' } )
		.then( res => {
			cache.put( req, res.clone( ) )
			return res
		} )

	if ( req.destination == 'document' ) {
		e.respondWith( cache.match( req ).then( v => v || get ) )
	} else {
		e.respondWith( get.catch( cache.match( req ) ) )
	}

} )


self.addEventListener( 'install', ( ) => self.skipWaiting( ) )


self.addEventListener( 'activate', e => {
	e.waitUntil( Promise.all( [
		self.clients.claim( ),
		caches.open( 'v1' ).then( c => { cache = c } ) 
	] ) )
} )
