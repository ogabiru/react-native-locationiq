# react-native-locationiq

A geocoding module for [React Native](https://github.com/facebook/react-native) to transform geographic coordinates (latitude and longitude) into a description of a location (i.e. street address, town, city, country, etc.) and vice versa.

This module uses [LocationIQ Geocoding API](https://locationiq.com/docs) and requires an API key for purposes of quota management.

## Example

```js
import LocationIQ from 'react-native-locationiq';

// Initialize the module (needs to be done only once)
LocationIQ.init("xxx"); // use a valid API key

LocationIQ.search("Statue of Liberty")
		.then(json => {
			var lat = json[0].lat;
			var lon = json[0].lon;
			console.log(lat, lon);
		})
		.catch(error => console.warn(error));

LocationIQ.reverse(41.89, 12.49)
		.then(json => {
			var address = json.address;
			console.log(adress);
		})
		.catch(error => console.warn(error));

// Works as well :
// ------------

// location object
LocationIQ.reverse({
	latitude : 41.89,
	longitude : 12.49
});

// latlng object
LocationIQ.reverse({
	lat : 41.89,
	lng : 12.49
});

// array
LocationIQ.reverse([41.89, 12.49]);
```

# Error Codes
| Name | Code | Description |
| --- | --- | --- |
| NOT_INITIATED | 0 | Module hasn't been initiated. Call init function, and pass it your app's api key as parameter. |
| INVALID_PARAMETERS | 1 | Parameters are invalid. |
| FETCHING | 2 | Error wile fetching to server. The error's 'origin' property contains the fetch error. |
| PARSING | 3 | Error while parsing server response. The error's 'origin' property contains the response. |
| SERVER | 4 | Error from the server. The error's 'origin' property contains the response's body. |


## Release Notes

See [CHANGELOG.md](https://github.com/ogabiru/react-native-locationiq/blob/master/CHANGELOG.md)
