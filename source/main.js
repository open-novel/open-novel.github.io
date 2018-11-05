var DEFAULT_PANES = ['ようこそ','応分'];
var vueData = {
		character: {
			name:null,
			ruby:null,
			images:[],
			desc:null
		},
		panes: ['ようこそ','応分'],
		story: {
			name:null,
			characters:[],
			summary:null,
			path:null,
			desc:null
		},
		ss: {
			name:null,
			characters:[],
			content:null
		},
		showMenu: false
}
if(window.NO_MODULE === undefined) window.NO_MODULE = false;
var  hash = document.location.hash;
var  paneAry = ['ようこそ','システム','キャラクター','ストーリー','SS','ギャラリー'];
if(hash) {
	var array = decodeURI(hash.slice(1)).split('/');
	var index = -1;
	$.each(paneAry, function(i,n) {
		if(n === array[0]) {
			index = i;
			return;
		}
	});
	if(index !== -1) {
		vueData.panes[0] = paneAry[index];
	}
}
window.addEventListener("DOMContentLoaded", function() {
	$('#main-menu').css({
		position:"fixed",
		top:"10px",
		left:0
	});
	$('<button>メニュー</button>').click(function(){
		app.showMenu = app.showMenu ? false : true;
		document.querySelector("#main-menu").style.display = "block";
	}).appendTo($('#menu'));
	var  app = new Vue({
		el:"#app",
		data: vueData,
		mounted: function(){
			
		},
		computed: {
			
		},
		methods: {
			fetchCharacter: function(me) {
				var character = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'character/'+character+'.html',
					dataType: 'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.character.desc = $('<div></div>').append(dom.find('#description').children()).html();
						app.character.name = dom.find('title').text();
						app.character.ruby = dom.find('#ruby').text();
						app.character.images = [];
						dom
							.find('#images > li')
							.each(function(i,e) {
								app.character.images.push(e.textContent);
							});
					},
					error: function(data, textStatus) {
						console.log('error');
						alert('error');
					}
				});
			},
			fetchStory: function(me) {
				var story = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'story/'+story+'.html',
					dataType:'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.story.desc = $('<div></div>').append(dom.find('#description').children()).html();
						app.story.name = dom.find('title').text();
						app.story.path = dom.find('#path').text();
						dom
							.find('#characters > li')
							.each(function(i,e) {
								app.story.characters.push(e.textContent);
							});
					}
				});
			},
			fetchSs: function(me) {
				var ss = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'short-story/'+ss+'.html',
					dataType: 'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.ss.name = dom.find('title').text();
						app.ss.content = $('<div></div>').append(dom.find('#content').children()).html();
						dom
							.find('#characters > li')
							.each(function(i,e) {
								app.story.characters.push(e.textContent);
							});
					}
				});
			},
			enlarge: function(me) {
				var  target = me.target;
				var  top = me.pageY - target.naturalHeight/2 > 0 ? me.pageY - target.naturalHeight/2 : 0;
				$('body').append('<div id="image-panel"><div id="image"></div><div><button id="close-button">閉じる</butto></div></div>');
				var panel = $('#image-panel').css({
					position: 'absolute',
					top: top,
					width: '100%',
					"z-index": 30
				});
				var  width = window.innerWidth > me.target.naturalWidth ? me.target.naturalWidth : window.innerWidth;
				$('<img>').attr({
					src: target.getAttribute("src"),
					width: width
				}).appendTo($('#image'));
				panel.find('#close-button').click(function() {
					$('#image-panel').remove();
				});
			},
			selectTab: function(me) {
				var  target = me.target.innerText;
				this.panes[0] = target;
				this.showMenu = false;
			},
			onp: function(e) {
				onp(e);
			}
		},
	});
});
