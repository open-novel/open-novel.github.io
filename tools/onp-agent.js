/*
These codes are licensed under CC0.
http://creativecommons.org/publicdomain/zero/1.0
*/

;( () => { 'use strict'

const version = '6.2'

window.addEventListener( 'DOMContentLoaded', ( ) => setTimeout( init, 1 ) )


function init ( ) {

	let elms = Array.from( document.getElementsByClassName( 'onp' ) )
	elms.forEach( e => {
		e.addEventListener( 'click', onp )
		e.relList && e.relList.add( 'opener' )
	} )

	if ( ! window.parent ) return
	let player = window.parent

	let titleList = Array.from( elms, elm => {
		let url = elm.getAttribute( 'href' )
		if ( ! url ) return { }
		url = new URL( url, location.href ).href
		if ( ! url.match( /\.zip$/i ) && url[ url.length - 1 ] != '/' ) url += '/'
		let title = window.decodeURIComponent(
			( url.match( /([^/]+)(\/|.zip)$/i ) || [ , null ] ) [ 1 ]
		)
		if ( ! title ) return { }
		return { title, url }
	} )

	let channel = new MessageChannel
	channel.port1.start( )
	player.postMessage( { type: 'install-list', list: titleList, version, url: location.href }, '*', [ channel.port2 ] )

	channel.port1.addEventListener( 'message', async ( { data } ) => {

		switch ( data.type ) {
			case 'select': {
				let elm = elms[ data.index ]
				onp(  { target: elm }, player )
			} break
			case 'getFile': {
				let url = titleList[ data.index ].url
				if ( ! url ) return
				let obj = { file: null }
				if ( ! url.match( /\.zip$/i ) ) obj = await getFile( data, url )
				channel.port1.postMessage( { type: 'install-file', version, index: data.index, ...obj } )
			}
		}
	} )
}



async function onp ( evt, player ) {

	evt.preventDefault && evt.preventDefault( )
	evt.stopPropagation && evt.stopPropagation( )

	let url = evt.target.getAttribute( 'href' )
	if ( ! url ) return
	url = new URL( url, location.href ).href

	let p
	if ( ! player ) {
		p = new Promise( ok => {
			window.addEventListener( 'message', e => e.source == player && ok( ) )
		} )

		let address = evt.target.dataset.onpURL || 'https://open-novel.github.io/#install'
		player = window.open( address )
	}

	let type = url.match( /\.zip$/i ) ? 'install-packed' : 'install-folder'

	let buf = null, title = null
	if ( type == 'install-packed' ) {
		let res = await fetch( url )
		if ( res.ok )buf = await res.arrayBuffer( )
	} else {
		if ( url[ url.length - 1 ] != '/' ) url += '/'
		title = url.match( /([^/]+)\/$/ ) [ 1 ]
	}

	await p

	let channel = new MessageChannel
	channel.port1.start( )


	player.postMessage( { type, version, url: location.href, title, file: buf }, '*', [ channel.port2 ] )

	channel.port1.addEventListener( 'message', async e => {
		let obj = await getFile( e.data, url )
		channel.port1.postMessage( { type: 'install-file', version, ...obj } )
	} )
}


async function getFile ( data, url ) {

	if (data.type != 'getFile' ) return

	let path = data.path.trim( )
	let exts = data.extensions

	if( path.match( /(^\/)|(\.\/)|(\/$)|[:]/ ) ) return

	let file = null
	async function fetchFile( ext ) {
		let file = null
		try {
			let res = await fetch( new URL( path, url ).href + '.' + ext )
			if ( res.ok ) file = await res.blob( )
		} catch( e ) { }
		return file
	}

	for ( let ext of exts ) {
		file = await fetchFile( ext )
		if ( file ) break
	}

	return { path, file }
}


window.onp = onp

} )( );
