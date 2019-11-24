/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/


navigator.serviceWorker.register( `/サービス.js?t=${ Date.now( ) }` )


let resolve
let promise = new Promise( ok => { resolve = ok } )
let installEvent = { promise, resolve }

window.addEventListener( 'beforeinstallprompt', e => {
	installEvent.resolve( e )
	e.preventDefault( )
	return false
} )

import( `/Player${ localStorage.playerChannel == 'Dev' ? '_Dev' : '' }/プログラム/メイン.js` ).then(
  	m => m.main( installEvent )
)
