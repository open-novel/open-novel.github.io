let valid = true;

// おまじない
export function print() {
	document.getElementById("onp-tester").textContent = valid ? "OK" : "NG";
}
export function begin() {

}
export function end() {
	document.getElementById("onp-tester").textContent = valid ? "OK" : "NG";
}
// === を使うアサートメソッド
export function assertTrue(value) {
	let v = value === true;
	if(v) console.error('not true');
	valid = valid && v;
}
export function assertFalse(value) {
	let v = value === false;
	if(v) console.error('not false');
	valid = valid && v;
}
export function assertEquals(expected, actual) {
	let v = expected === actual;
	if(v) console.error('not equals');
	valid = valid && v;
}
export function assertNotNull(value) {
	let v = value !== null;
	if(v) console.error('null');
	valid = valid && v;
}
export function assertNotUndefined(value) {
	let v = value !== undefined;
	if(v) console.error('undefined');
	valid = valid && v;
}
// == を使うアサートメソッド
export function assertSoftTrue(value) {
	let v = value == true;
	if(v) console.error('not soft true');
	valid = valid && v;
}
export function assertSoftFalse(value) {
	let v = value == false;
	if(v) console.error('not soft false');
	valid = valid && v;
}
export function assertSoftEquals(expected, actual) {
	let v = expected == actual;
	if(v) console.error('not soft equals');
	valid = valid && v;
}
export function assertSoftNotNull(value) {
	let v = value == null;
	if(v) console.error('soft null');
	valid = valid && v;
}
export function assertSoftNotUndefined(value) {
	let v = value == undefined;
	if(v) console.error('soft undefined');
	valid = valid && v;
}