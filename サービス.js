/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

let channel, devCh, locCh


self.addEventListener( 'fetch', e => {

	let req = e.request

	try {

		if ( ( devCh || locCh ) && req.url.includes( '/Player' ) ) {
			if ( locCh ) req = new Request( Object.assign( { }, req, { url: req.url.replace( '/Player', '' ) } ) )
			else if ( devCh ) req = new Request( Object.assign( { }, req, { url: req.url.replace( '/Player', '/Player_Dev' ) } ) )
		}

		let network = fetch( req, req.mode == 'navigate' ? undefined : { cache: 'no-store' } )
			.then( res => {
				caches.open('v1').then( cache => cache.put( req, res ) )
				return res.clone( )
			} )

		let list = [ 'manifest', 'document', 'serviceworker' ]

		if ( req.mode == 'navigate' || list.includes( req.destination ) || req.url.includes( '/Player' ) ) {
			e.respondWith( network.catch( ( ) => caches.match( req ) ) )
		} else {
			e.respondWith( caches.match( req ).then( v => v || network ) )
		}

	} catch ( err ) {

		self.registration.update( )
		console.error( err )
		e.respondWith( fetch( req ) )

	}

} )

self.addEventListener( 'install', ( ) => self.skipWaiting( ) )

self.addEventListener( 'activate', e => {
	const channel = new URL( self.registration.active.scriptURL ).searchParams.get( 'ch' )
	devCh = !! channel == 'Dev'
	locCh = !! channel == 'Loc'
	e.waitUntil( self.clients.claim( ) )
} )
