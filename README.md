# Weather React

_Hello! When I deploy this project, it probably won't be called "weather-react". For now, that's a plain and appropriate name for it. Although... I do want the theme of the page to 'react' to the search result, so maybe I'll leave the name alone. The name is probably not original so, yeah, I will probably ditch it._

## Objective:
The goal of this app was to create a simple React project based on what I learned from a tutorial on Udemy and from the intro exercises on the official React page. Also, although I really like front-end work, I don't get a chance to do much of it, especially with "mainstream" or "modern" front-end libraries and tools because a lot of my current tasks at work pertain to maintaining and debugging back-end code for a CRM/ERP system (in JavaScript) and working with ImageMagick inside of a Ruby on Rails app.

I'm encountering some interesting problems that I intend to solve. I'm thinking that as I solve them, I can mark those tasks as complete. In case you're wondering, yes, I am familiar with Agile methodology, sprints, etc., however, I'm working alone and I think it's overkill.

## Stuff to solve:

### API issues:
* This API seems to return one city when it's a city inside the US. If I search for "Toronto" and then click on "Toronto, ON, CA", I get the same entire list of results of all Torontos in the world. I'm not sure why. If I search for "Austin", I can click on "Austin, TX" and the API will yield `current_observation` data for just that city. 
* I need to sort the responses (list of cities) in a more user-friendly way and in a way that makes more sense. What I mean is, it isn't likely that if you're in the USA, and you type "Los Angeles", that you are looking for eight-one responses to this. 
  * I could try to use the user's location to present results that are more geo-proximal
  * I could try to get a list of cities, or pre-load some API or database into here, and when a user types "Los Angeles", I can cross reference the API results with more "likely" results, limit the length of the dropdown list, and if they want more results, they can click to expand it.
* I need to see if it's really necessary to make three API calls to get:
  * A list of cities after a user types a string
  * The weather for the city the user selects with a click
  * The forecast for that same city
  * I think the current weather API response has an .html value for forecast, and maybe that has data I can parse so I can keep the API call to two.

### Error Handling, User Input:
* ERR handling: I have no error handling at the moment. If the user searches for a term, and either misspells it, or it doesn't exist, the site breaks. 
* Smarter search, searc suggestions, typo-correction.

## Fun stuff to innovate:
I'd like to make this page responsive to the search results that appear. Whether it's with subtle animations, learning to work with SVG graphics, or toggling classes based on change of state and search results to change the theme of the page (day, night, sunny, cloudy, rainy, etc.), it's a challenge to take user input, return API data, and present it in a very delightful way.

## Solutions:
I will update this section with comments on the solutions to the issues and goals from the sections above.

## Additional and Miscellaneous Info:
### Software Tools
* If you need more info, this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* I'm using this API: https://www.wunderground.com/weather/api
* Plain CSS
### Hardware (random, I know but sometimes we are curious about these matters)
* Input Club White Fox "True Fox" layout or a Vortex Race 3
* Logitech MX Master 2 mouse
* 2015 Macbook Air
* Logitech 29" ultrawide display (the budget version)
* A cheap IKEA desk and chair
