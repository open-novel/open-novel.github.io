window.addEventListener("load", ()=>{
	const characterPane = document.getElementById("character-pane");
	const app = new Vue({
		el:"#app",
		data: {
			chardesc: null,
			character: {
				name: null,
				images:[],
				desc:null,
			}
		},
		methods: {
			fetchCharacter: function(me) {
				const character = me.target.innerText;
				axios({
					method:"GET",
					url:`character/${character}.html`, 
					responseType:"document",
				}).then(response=>{
					console.log(response);
					const html = response.data;
					app.character.desc = html.getElementById("description").innerHTML;
					app.character.name = html.getElementsByTagName("title")[0].innerText;
					app.character.images = [];
					for(let li of html.querySelectorAll("#images > li")) {
						console.log(li);
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
					console.log(response);
				});
			},
			enlarge() {
			},
			selectTab() {
			},
		},
	});
});
