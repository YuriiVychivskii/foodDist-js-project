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

export { postData };
