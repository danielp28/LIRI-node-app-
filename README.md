# LIRI-node-app-
LIRI is a Language interpretation and Recognition Interface, and is interacted with through the command line to perform three commands.

As of now, LIRI can do three things:
1. spotify-this-song: Will look up a specific song for you,
2. movie-this: Looks up a movie of your choice,
3. concert-this: Looks up an artist and tell you where and when their next live show is,



Using the spotify-this-song command, the user can look up a song of their choice. LIRI will respond with the artist, album and and a link to preview the song. 
<img src="https://github.com/danielp28/LIRI-node-app-/blob/master/images/spotify-prompt.PNG">


The movie-this command uses the OMDB API to query a movie search of the user's choice. It will respond with the title, the year of release, the runtime, and a link to an image of the poster.

<img src="https://github.com/danielp28/LIRI-node-app-/blob/master/images/movie-prompt.PNG">


The concert-this command uses the BandsinTown API to search an artist of the user's choice. This search will return with the date and location of the selected artist's next live event.

<img src="https://github.com/danielp28/LIRI-node-app-/blob/master/images/concert-prompt.PNG">


In this version of LIRI I made an effort to utilize switch statements to keep my code DRY and easy to look at, as well as the inquirer node for a smoother user experience through the command line. LIRI has the ablity to prompt the user and even supply a list of commands using the inquirer node. 

<img src="https://github.com/danielp28/LIRI-node-app-/blob/master/images/intial-prompt.PNG">