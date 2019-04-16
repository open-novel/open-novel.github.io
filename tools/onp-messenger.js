/**
ES5

メッセンジャー
*/

if(window.NO_MODULE === undefined) window.NO_MODULE = false;

window.ONP_MESSAGE = document.createElement("p");
if(window.NO_MODULE) {
	window.ONP_MESSAGE.appendChild(document.createTextNode("※お使いの実行環境はES Modulesおよび、おーぷんノベルプレイヤーに対応しておりません※"));
	window.ONP_MESSAGE.appendChild(document.createElement("br"));
	window.ONP_MESSAGE.appendChild(document.createTextNode("※モダンブラウザ最新版をお使い下さい※"));
} else {
	window.ONP_MESSAGE.appendChild(document.createTextNode("※お使いの実行環境はES Modulesおよび、おーぷんノベルプレイヤーに対応しています※"));
	window.ONP_MESSAGE.appendChild(document.createElement("br"));
	window.ONP_MESSAGE.appendChild(document.createTextNode("※おーぷんノベルプレイヤーをお楽しみください※"));
}

window.addEventListener("DOMContentLoaded",function() {
	var onpdesc = document.getElementById("onp-desc");
	if(onpdesc != null) {
		onpdesc.appendChild(window.ONP_MESSAGE);
	}
});