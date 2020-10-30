

x Overview
x Brief
x Technologies
Approach
  x APIs (what APIS, how and why)
  Linking / Dynamic page creation
  Libraries
    Caroussel
    Spinner
Screenshots
Challenges / Victories
  caroussel
  x play buttons
  ... search page (speedy)
Known bugs
  x Play buttons
  CORS error (might be worth a mention)
  Search page CSS
Potential future features
  Similar artist section on artist page
  Mobile optimised
x Images & audio
  x unsplash
  x noun project

  ---

## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly, Software Engineering Immersive

#Project #2: Reacathon


##Overview
In teams of two we were asked to build a **React application** that consumes a **public API**.
We decided to build a music site where you could **discover top tracks and music news from around the world**.

###Technical Requirements

* **Consume a public API**.
* **Have several components** - At least one classical and one functional.
* **The app should include a router** - with several "pages".
* **Include wireframes**.
* Have **semantically clean HTML**.
* **Be deployed online** and accessible to the public.

##Technologies

* HTML
* CSS / SCSS
* JavaScript (ES6)
* JS DOM
* React
* npm
* Git and GitHub
* Ziteboard
* APIs
	* [Deezer](https://developers.deezer.com/api)
	* [Bing News](https://azure.microsoft.com/en-us/services/cognitive-services/bing-news-search-api/)
	* [Last.fm](https://www.last.fm/api)

##Approach

###Wireframes
![wireframe](./images/screenshots/project-2-wireframe.png)

###APIs 

We started with a plan to use two APIs: one to get the charts from around the world (Deezer) and one to get news on specific artists or bands (Bing News). As we were planing the app out added a third API to pull in artist/band biographies (Last.fm).

For **Deezer** we didn't need an authentication key but had to use a CORS proxi server to get any results back. That worked fine but causes some instabilities in the deployed project.

To call the API we opted for the axios fetch method which is triggered by a `useEffect` everytime a country (`currentPlaylist`) is selected:

```
useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${currentPlaylistID}`)
      updatePlaylistData(data)
    }
    fetchData()
  }, [currentPlaylist])
```
With the **Bing API** we faced the challenge to include a key in the header of the fetch request. This was finally resolved by studying the axios documentation and using an .env file.

```
const { data: dataNews } = await axios.get(
	`https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=${artistName}&count=10&offset=0&mkt=en-us&safeSearch=Moderate`, {
	headers: {
		'Ocp-Apim-Subscription-Key': (process.env.Ocp_Apim_Subscription_Key)
	}
})
```
The third API - **Last.fm** - used an authentication key in the URL which we stored in the .env file and concatenated within our fetch, like so:

```
const { data: dataInfo } = await axios.get(
	`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.Last_API_Key}&format=json`
)
```


##Challenges / Victories
###Play buttons [Challenge]
On the Charts page the play/pause buttons gave us more trouble than we expected; for ex. all changing from play to pause when one was clicked, not stopping to play once one had been clicked, or needing various clicks to start or to stop.
 
We still have a know bug remaining with these buttons (see "Known bugs" section), but we resolved most of our issues by using a local vairable and some JS DOM techniques.

```
import pauseButton from '../images/pause.png'
import playButton from '../images/play.png'

[...]
let playState = false
[...]
<img src= { playButton } alt="play button" className="play-button" id={`play${index}`} onClick={() => {
	playState = !playState

	{ playState ? document.querySelector(`#play${index}`).src = pauseButton : document.querySelector(`#play${index}`).src = playButton}

	document.querySelector('.player').src = `${track.preview}`
                
	{ playState ? document.querySelector('.player').play() : document.querySelector('.player').pause() }
}} />
[...]
<audio src='' className='player'></audio>
```
After reflection, inserting the images via a background-image in a CSS class might be a safer solution. The onClick would then simply switch the class. This might also help with our know bug.

###Setting up the search page in record time [Victory]
We felt very satisfied that we managed to pull the Artist Search page together in just about an hour by leveraging our learnings from building the Charts and Artist pages beforehand. 
[...]


##Known bugs
###Play buttons
* When a play button is clicked, music is playing. When another play button is then clicked, the music switches but the first button image stays on the pause image rather than switching back.

##Images
* Homepage background image by [Vishnu R Nair on Unsplash](https://unsplash.com/@vishnurnair)
* Background image for other pages by [Claus Grünstäudl on Unsplash](https://unsplash.com/@w18)
* Play/Pause buttons from [noun project](https://thenounproject.com/)