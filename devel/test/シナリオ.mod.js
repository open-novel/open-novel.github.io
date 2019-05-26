import * as Scenario from '/Player_Dev/プログラム/シナリオ.js';
import * as tester from '/tools/onp-tester.mod.js';

window.Scenario = Scenario

function print( name, valid ) {
	let e = document.getElementById("onp-tester")
	if ( valid )
		e.textContent += `test【${ name }】: OK  `;
	else
		e.textContent = `test【${ name }】: NG  ` + e.textContent;
}

let text, obj

//空文
text = ``
obj = Scenario.parse( text, 'dummy_name' )
