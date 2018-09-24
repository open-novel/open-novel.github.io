/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js' );
workbox.googleAnalytics.initialize( );

self.addEventListener( 'fetch', e => {
	let req = e.request

	// let path = new URL( req.url ).pathname
	// if ( path != '/index.html' && path != '/' ) {
	// 	 e.respondWith( fetch( req ) )
	// 	return
	// }
	// console.log( '!!!' )
	// e.respondWith(
	// 	caches.match( req ).then( res => {
	// 		return fetch( req ).then( res => {
	// 			return caches.open( 'v1' ).then( cache => {
	// 				cache.put( req, res.clone( ) )
	// 				return res
	// 			})
	// 		}, err => res )
	// 	})
	// )
	e.respondWith(
		fetch( req, req.mode == 'navigate' ? undefined : { cache: 'no-cache' } ).then( res => {
			caches.open( 'v1' ).then( cache => cache.put( req, res ) )
			return res.clone( )
		}, err => caches.match( req ) ).catch( e => console.error( e ) || Promise.reject( e ) )
	)
} )

self.addEventListener( 'install', e => {
	self.skipWaiting( )
} )

self.addEventListener( 'activate', e => {
	e.waitUntil( self.clients.claim( ) )
} )
