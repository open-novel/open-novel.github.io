let valid = true;
export function assertTrue(value) {
	valid = value === true;
}
export function assertFalse(value) {
	valid = value === false;
}
export function assertNotNull(value) {
	valid = value !== null;
}
export function assertNotUndefined(value) {
	valid = value !== undefined;
}
export function print() {
	document.getElementById("onp-tester").textContent = valid ? "OK" : "NG";
}