window.addEventListener("DOMContentLoaded", ()=>{
	const app = new Vue({
		el:"#app",
		data: {
			character: {
				name:null,
				ruby:null,
				images:[],
				desc:null,
			},
			pane: {
				ようこそ:true,
				システム:false,
				キャラクター:false,
				ストーリー:false,
				ギャラリー:false,
			},
			story: {
				name:null,
				characters:[],
				summary:null,
				path:null,
				desc:null,
			},
			ss: {
				name:null,
				characters:[],
				content:null,
			},
			showMenu: false,
		},
		methods: {
			fetchCharacter: function(me) {
				const character = me.target.innerText;
				axios({
					method:"GET",
					url:`character/${character}.html`, 
					responseType:"document",
				}).then(response=>{
					const html = response.data;
					app.character.desc = html.getElementById("description").innerHTML;
					app.character.name = html.getElementsByTagName("title")[0].innerText;
					app.character.ruby = html.getElementById("ruby").innerText;
					app.character.images = [];
					for(let li of html.querySelectorAll("#images > li")) {
						app.character.images.push(li.innerText);
					}
				});
			},
			fetchStory: function(me) {
				const story = me.target.innerText;
				axios({
					method:"GET",
					url:`story/${story}.html`,
					responseType:"document",
				}).then(response=>{
					const html = response.data;
					app.story.desc = html.getElementById("description") ? html.getElementById("description").innerHTML:null;
					app.story.name = html.getElementsByTagName("title")[0].innerText;
					app.story.summary = html.getElementById("description").innerHTML;
					const path = html.getElementById("path");
					if(path) {
						app.story.path = path.innerText;
					} else {
						app.story.path = null;
					}
					for(let li of html.querySelectorAll("#characters > li")) {
						app.story.characters.push(li.innerText);
					}
				});
			},
			fetchSs(me) {
				const ss = me.target.innerText;
				axios({
					method:"GET",
					url:`short-story/${ss}.html`,
					responseType:"document",
				}).then(response=>{
					const html = response.data;
					app.ss.name = html.getElementsByTagName("title")[0].innerText;
					app.ss.content = html.getElementById("content").innerHTML;
					for(let li of html.querySelectorAll("#characters > li")) {
						app.story.characters.push(li.innerText);
					}
				});
			},
			enlarge(me) {
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
			selectTab(me) {
				const target = me.target.innerText;
				Object.keys(this.pane).forEach(prop => this.pane[prop] = false);
				this.pane[target] = true;
				this.showMenu = false;
			},
			toggleMenu() {
				this.showMenu = this.showMenu ? false : true;
				if(document.querySelector("#main-menu")) document.querySelector("#main-menu").style.display = "block";
			},
			onp(e) {
				onp(e);
			}
		},
	});
});
