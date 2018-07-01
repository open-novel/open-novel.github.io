/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

self.addEventListener( 'fetch', e => {
	let req = e.request
	let path = new URL( req.url ).pathname
	if ( path != '/index.html' && path != '/' ) {
		 e.respondWith( fetch( req ) )
		return
	}
	console.log( '!!!' )
	e.respondWith(
		caches.match( req ).then( res => {
			return fetch( req ).then( res => {
				return caches.open( 'v1' ).then( cache => {
					cache.put( req, res.clone( ) )
					return res
				})
			}, err => res )
		})
	)
} )

self.addEventListener( 'activate', e => {
	console.log( 'activate' )
	self.registration.update( )
} )
