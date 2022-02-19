export default async function medSearch(searched) {
	const res = await fetch("http://api.nobelprize.org/v1/prize.json");
	const e = await res.json();
	return e.data;
}
