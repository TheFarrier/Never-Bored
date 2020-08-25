# Never-Bored
A web app to find activities to do in your area.

# Usage
Select a category and provide a zip/postal code to generate a random activity and locations related to it. The sliders for Buddies and Money will influence the type of prompt you recieve.

![Neverbored Menu](https://i.gyazo.com/de21e70752e38b7b05ce2ea1d6e2d728.png)

The results page will list locations near the ZIP code provided that are related to the prompt you recieve using Google Maps. Each pin on the map can be clicked to expand brief location information.

![Neverbored Results](https://i.gyazo.com/f71611eda928af4d40b3d706b68644b8.png)

# Third Party APIs
Prompts are generated from https://www.boredapi.com/ and the selection page is based on the options used by the API.
The map is generated using google maps API.
Due to some of the Bored prompts being notably odd or specific, if the google API query fials to return relevant locations, it will default to using the category selected instead of the prompt. This will also likely be the case for prompts that do not require leaving the user's home.

# Technologies Used

Materialize Fontawesome and Animate fof frontend styling

Ajax for API call handling

Google Maps API
