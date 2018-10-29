window.addEventListener("DOMContentLoaded", function() {
	const app = new Vue({
		el:"#app",
		data: {
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
		},
		mounted: function(){
			const hash = document.location.hash;
			const paneAry = Object.keys(this.pane);
			Object.keys(this.pane).forEach(prop => this.pane[prop] = false);
			if(hash) {
				const flgmnt = decodeURI(hash.slice(1));
				const index = paneAry.findIndex(n => n === flgmnt);
				console.log(index);
				if(index != -1) {
					this.pane[paneAry[index]] = true;
				} else {
					this.pane.ようこそ = true;
				}
			} else {
				this.pane.ようこそ = true;
			}
			console.log(this.pane);
			console.log(hash);
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
						app.character.desc = dom.find('#description').html();
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
						app.story.desc = dom.find('#description').html();
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
						app.ss.content = dom.find('#content').html();
						dom
							.find('#characters > li')
							.each(function(i,e) {
								app.story.characters.push(e.textContent);
							});
					}
				});
			},
			enlarge: function(me) {
				const target = me.target;
				axios({
					method:"GET",
					url:"image.html",
					responseType:"document",
				}).then(response=>{
					const html = response.data;
					const panel = html.getElementById("image-panel");
					panel.style.position = "absolute";
					const top = me.pageY - target.naturalHeight/2 > 0 ? me.pageY - target.naturalHeight/2 : 0;
					panel.style.top = top + "px";
					panel.style.left = 0;
					panel.style.width = "100%";
					panel.style.zIndex = 30;
					const image = panel.querySelector("#image");
					const img = document.createElement("img");
					img.setAttribute("src", target.getAttribute("src"));
					const width = window.innerWidth > img.naturalWidth ? img.naturalWidth : window.innerWidth;
					img.setAttribute("width", width);
					image.appendChild(img);
					html.getElementById("close-button").addEventListener("click",(event)=>{
						document.body.removeChild(panel);
					});
					document.body.appendChild(panel);
				});
			},
			selectTab: function(me) {
				const target = me.target.innerText;
				Object.keys(this.pane).forEach(prop => this.pane[prop] = false);
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
