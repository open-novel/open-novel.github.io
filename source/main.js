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
				desc:null
			},
			ss: {
				name:null,
				characters:[],
				content:null
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
					app.story.desc = html.getElementById("description").innerHTML;
					app.story.name = html.getElementsByTagName("title")[0].innerText;
					app.story.summary = html.getElementById("description").innerHTML;
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
			enlarge() {
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
		},
	});
});
