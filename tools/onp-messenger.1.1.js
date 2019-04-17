/**
ES5

メッセンジャー
*/
window.addEventListener("DOMContentLoaded",function() {
	var onpmess = document.getElementById("onp-message");
	if(onpmess !== null) {
		var p = document.createElement("p");
		if(window.MODULE === true) {
			p.appendChild(document.createTextNode("※お使いの実行環境はES Modulesおよび、おーぷんノベルプレイヤーに対応しています※"));
			p.appendChild(document.createElement("br"));
			p.appendChild(document.createTextNode("※おーぷんノベルプレイヤーをお楽しみください※"));
		} else if(window.MODULE === false) {
			p.appendChild(document.createTextNode("※お使いの実行環境はES Modulesおよび、おーぷんノベルプレイヤーに対応しておりません※"));
			p.appendChild(document.createElement("br"));
			p.appendChild(document.createTextNode("※モダンブラウザ最新版をお使い下さい※"));
		} else {
			p.appendChild(document.createTextNode("サイト管理者へ。"));
			p.appendChild(document.createElement("br"));
			p.appendChild(document.createTextNode("<script type=\"module\">window.MODULE = true;</script>"));
			p.appendChild(document.createElement("br"));
			p.appendChild(document.createTextNode("<script nomodule>window.MODULE = false;</script>"));
			p.appendChild(document.createElement("br"));
			p.appendChild(document.createTextNode("を忘れています。"));
		}
		onpmess.appendChild(p);
	} else {
		alert("サイト管理者へ。\n"
			+ "<div id=\"onp-message\"></div>\n"
			+ "を忘れています。");
	}
});