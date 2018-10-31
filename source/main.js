var vueData = {
		character: {
			name:null,
			ruby:null,
			images:[],
			desc:null
		},
		pane: {
			ようこそ:false,
			システム:false,
			キャラクター:false,
			ストーリー:false,
			ギャラリー:false
		},
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
window.addEventListener("DOMContentLoaded", function() {
	var  app = new Vue({
		el:"#app",
		data: vueData,
		mounted: function(){
			var  hash = document.location.hash;
			var  paneAry = Object.keys(this.pane);
			Object.keys(this.pane).forEach(function(prop) {
				vueData.pane[prop] = false
			});
			if(hash) {
				var  flgmnt = decodeURI(hash.slice(1));
				var index = -1;
				$.each(paneAry, function(i,n) {
					if(n === flgmnt) return n;
				});
				if(index != -1) {
					this.pane[paneAry[index]] = true;
					return;
				}
			}
			vueData.pane.ようこそ = true;
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
				$.ajax({
					type: 'GET',
					url: "image.html",
					dataType: 'xml',
					success: function(data, textStatus) {
						
						var  panel = data.getElementById("image-panel");
						panel.style.position = "absolute";
						var  top = me.pageY - target.naturalHeight/2 > 0 ? me.pageY - target.naturalHeight/2 : 0;
						panel.style.top = top + "px";
						panel.style.left = 0;
						panel.style.width = "100%";
						panel.style.zIndex = 30;
						var  image = panel.querySelector("#image");
						var  img = document.createElement("img");
						img.setAttribute("src", target.getAttribute("src"));
						var  width = window.innerWidth > img.naturalWidth ? img.naturalWidth : window.innerWidth;
						img.setAttribute("width", width);
						image.appendChild(img);
						data.getElementById("close-button").addEventListener("click",function (event) {
							document.body.removeChild(panel);
						});
						document.body.appendChild(panel);
					}
				});
			},
			selectTab: function(me) {
				var  target = me.target.innerText;
				Object.keys(this.pane).forEach(function (prop) {app.pane[prop] = false});
				this.pane[target] = true;
				this.showMenu = false;
			},
			toggleMenu: function() {
				this.showMenu = this.showMenu ? false : true;
				if(document.querySelector("#main-menu")) document.querySelector("#main-menu").style.display = "block";
			},
			onp: function(e) {
				onp(e);
			}
		},
	});
});
