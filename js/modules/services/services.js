const postData = async (url, json) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: json,
	});
	return await res.json();
};

const getResource = async url => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`${res} - ${res.status}`);
	}

	return await res.json();
};

export { getResource, postData };
