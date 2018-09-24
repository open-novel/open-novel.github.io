window.addEventListener("load", ()=>{
	const app = new Vue({
		el:"#app",
		data: {
			character: {
				name:null,
				ruby:null,
				images:[],
				desc:null,
			},
			story: {
			},
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
