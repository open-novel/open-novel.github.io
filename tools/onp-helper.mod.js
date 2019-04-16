/**
ES6移行 ES Modules

作品のデータ構造などを自動的に解析し、
JSONデータとして抽出する
立ち絵、背景ディレクトリがなければテキストのみ作品と見なす
特定の要素の子に特定の要素を出力する機能
dl要素？
*/
import * as $ from "https://open-novel.github.io/Player/プログラム/ヘルパー.js";
window.addEventListener("DOMContentLoaded",function() {
	let onpElements = document.getElementsByClassName("onp");
	for(var i = 0; i < onpElements.length; i++) {
		let href = onpElements.item(i).getAttribute("href");
		console.log(href);
	}
});
export function test() {
	alert("test");
}