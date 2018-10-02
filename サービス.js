/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

let cache

self.addEventListener( 'fetch', e => {

	let req = e.request

	try {

		let dest = req.mode == 'navigate' ? 'document' : req.destination

		let network = fetch( req, req.mode == 'navigate' ? undefined : { cache: 'no-cache' } )
			.then( res => {
				cache.put( req, res.clone( ) )
				return res
			} )

		if ( [ 'image', 'audio', 'video' ].includes( dest ) ) {	
			e.respondWith( cache.match( req ).then( v => v || network ) )
		} else {
			e.respondWith( network.catch( ( ) => cache.match( req ) ) )
		}

	} catch ( err ) {

		self.registration.update( )
		console.error( err )
		e.respondWith(  req )
		
	}

} )


self.addEventListener( 'install', ( ) => self.skipWaiting( ) )


self.addEventListener( 'activate', e => {
	e.waitUntil( Promise.all( [
		self.clients.claim( ),
		caches.open( 'v1' ).then( c => { cache = c } ) 
	] ) )
} )
