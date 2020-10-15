/**
 * Module to use LocationIQ's geocoding and reverse geocoding.
 */
let LocationIQ;
export default LocationIQ = {
	token : null,
	
	/**
	 * Initialize the module.
	 * @param {String} token The LocationIQ token.
	 * @see https://locationiq.com/docs
	 */
	init(token) {
		this.token = token;
	},

	/**
	 * @returns {boolean} True if the module has been initiated. False otherwise.
	 */
	get isInit() {
		return !!this.token;
	},

	/**
	 * Do <a href="https://locationiq.com/docs#reverse-geocoding">(reverse) geocoding</a>, converting geographic coordinates into a human-readable address.
	 * Accepted parameters:
	 * <ul>
	 *     <li>from(Number latitude, Number longitude)</li>
	 *     <li>from(Array [latitude, longitude])</li>
	 *     <li>from(Object {latitude, longitude})</li>
	 *     <li>from(Object {lat, lng})</li>
	 * </ul>
	 * @returns {Promise.<Object>} Object containing informations about the place at the coordinates.
	 * @see https://locationiq.com/docs#reverse-geocoding
	 */
	async reverse(...params) {
		// check api key
		if (!LocationIQ.isInit)
			throw {
				code : LocationIQ.Errors.NOT_INITIATED,
				message : "LocationIQ isn't initialized. Call LocationIQ.init function, passing it your token as parameter.",
			};

		// --- convert parameters ---
		let queryParams;

		// (latitude, longitude)
		if (!isNaN(params[0]) && !isNaN(params[1]))
			queryParams = {lat : `${params[0]}`, lon : `${params[1]}`};

		// [latitude, longitude]
		else if (params[0] instanceof Array)
			queryParams = {lat : `${params[0][0]}`, lon : `${params[0][1]}`};

		// {latitude, longitude}  or {lat, lng}
		else if (params[0] instanceof Object)
			queryParams = {lat : `${params[0].lat || params[0].latitude}`, lon : `${params[0].lng || params[0].longitude}`};

		// --- start geocoding ---

		// check query params
		if (!queryParams)
		// no query params, means parameters where invalid
			throw {
				code : LocationIQ.Errors.INVALID_PARAMETERS,
				message : "Invalid parameters : \n" + JSON.stringify(params, null, 2),
			};

		queryParams = { key: this.token, format: 'json', ...queryParams }
		// build url
		const url = `https://us1.locationiq.com/v1/reverse.php?${toQueryParams(queryParams)}`;

		return await fetchResponse(url);
	},

	/**
	 * Do <a href="https://locationiq.com/docs#forward-geocoding">(search) geocoding</a>, converting human-readable address into geographic coordinates.
	 * Accepted parameters:
	 * <ul>
	 *     <li>from(String address)</li>
	 * </ul>
	 * @returns {Promise.<Object>} Object containing informations about the place at the coordinates.
	 * @see https://locationiq.com/docs#forward-geocoding
	 */
	async search(...params) {
		// check api key
		if (!LocationIQ.isInit)
			throw {
				code : LocationIQ.Errors.NOT_INITIATED,
				message : "LocationIQ isn't initialized. Call LocationIQ.init function, passing it your token as parameter.",
			};

		// --- convert parameters ---
		let queryParams;

		// address
		if (typeof params[0] === 'string')
			queryParams = {q : params[0]};

		// --- start geocoding ---

		// check query params
		if (!queryParams)
		// no query params, means parameters where invalid
			throw {
				code : LocationIQ.Errors.INVALID_PARAMETERS,
				message : "Invalid parameters : \n" + JSON.stringify(params, null, 2),
			};

		queryParams = { key: this.token, format: 'json', ...queryParams }
		// build url
		const url = `https://us1.locationiq.com/v1/search.php?${toQueryParams(queryParams)}`;

		return await fetchResponse(url);
	},

	/**
	 * Do <a href="https://locationiq.com/docs#nearby-points-of-interest-poi-private-beta">(nearby) Points of Interest nearby</a>, get geographic coordinates nearby points of interest.
	 * Accepted parameters:
	 * <ul>
	 *     <li>from(Number latitude, Number longitude, String tag, Nuber radius)</li>
	 *     <li>from(Array [latitude, longitude, tag, radius])</li>
	 *     <li>from(Object {latitude, longitude, tag, radius})</li>
	 *     <li>from(Object {lat, lng, tag, radius})</li>
	 * </ul>
	 * @returns {Promise.<Object>} Object containing informations about POI nearby the coordinates.
	 * @see https://locationiq.com/docs#nearby-points-of-interest-poi-private-beta
	 */
	async nearby(...params) {
		// check api key
		if (!LocationIQ.isInit)
			throw {
				code : LocationIQ.Errors.NOT_INITIATED,
				message : "LocationIQ isn't initialized. Call LocationIQ.init function, passing it your token as parameter.",
			};

		// --- convert parameters ---
		let queryParams;

		// (latitude, longitude)
		if (!isNaN(params[0]) && !isNaN(params[1]) && typeof params[2] === 'string' && !isNaN(params[3]))
			queryParams = {lat : `${params[0]}`, lon : `${params[1]}`, tag : `${params[2]}`, radius : `${params[3]}`};

		// [latitude, longitude]
		else if (params[0] instanceof Array)
			queryParams = {lat : `${params[0][0]}`, lon : `${params[0][1]}`, tag : `${params[0][2]}`, radius : `${params[0][3]}`};

		// {latitude, longitude}  or {lat, lng}
		else if (params[0] instanceof Object)
			queryParams = {lat : `${params[0].lat || params[0].latitude}`, lon : `${params[0].lng || params[0].longitude}`, tag : `${params[0].tag}`, radius : `${params[0].radius}`};

		// --- start geocoding ---

		// check query params
		if (!queryParams)
		// no query params, means parameters where invalid
			throw {
				code : LocationIQ.Errors.INVALID_PARAMETERS,
				message : "Invalid parameters : \n" + JSON.stringify(params, null, 2),
			};

		queryParams = { key: this.token, format: 'json', ...queryParams }
		// build url
		const url = `https://us1.locationiq.com/v1/nearby.php?${toQueryParams(queryParams)}`;
		
		return await fetchResponse(url);
	},

	/**
	 * All possible errors.
	 */
	Errors : {
		/**
		 * Module hasn't been initiated. Call {@link LocationIQ.init}.
		 */
		NOT_INITIATED : 0,

		/**
		 * Parameters are invalid.
		 */
		INVALID_PARAMETERS : 1,

		/**
		 * Error wile fetching to server.
		 * The error.origin property contains the original fetch error.
		 */
		FETCHING : 2,

		/**
		 * Error while parsing server response.
		 * The error.origin property contains the response.
		 */
		PARSING : 3,

		/**
		 * Error from the server.
		 * The error.origin property contains the response's body.
		 */
		SERVER : 4,
	},
}

/**
 * Convert an object into query parameters.
 * @param {Object} object Object to convert.
 * @returns {string} Encoded query parameters.
 */
function toQueryParams(object) {
	return Object.keys(object)
		.filter(key => !!object[key])
		.map(key => key + "=" + encodeURIComponent(object[key]))
		.join("&")
}

/**
 * Convert an object into query parameters.
 * @param {string} url Object to convert.
 * @returns {string} Encoded query parameters.
 */
async function fetchResponse(url) {
	let response, data;

	// fetch
	try {
		response = await fetch(url);
	} catch(error) {
		throw {
			code : LocationIQ.Errors.FETCHING,
			message : "Error while fetching. Check your network.",
			origin : error,
		};
	}

	// parse
	try {
		data = await response.json();
	} catch(error) {
		throw {
			code : LocationIQ.Errors.PARSING,
			message : "Error while parsing response's body into JSON. The response is in the error's 'origin' field. Try to parse it yourself.",
			origin : response,
		};
	}

	// check response's data
	if (data.place_id === undefined && data[0] === undefined && data.osm_id === undefined)
		throw {
			code : LocationIQ.Errors.SERVER,
			message : "Expected data was not found. The received datas are in the error's 'origin' field. Check it for more informations.",
			origin : data,
		};

	return data;
}
