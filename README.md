# Emotions For Reddit

### [Link to Live Site](https://reddit-emotions.herokuapp.com)

### Installation Instructions
- Create a new reddit application at [Reddit](http://www.reddit.com/prefs/app)
  - Set your redirect URL appropriately before continuing
- Create a Bluemix Account for access to IBM's Watson
- Create a new .env file
  - Set the reddit secret as `REDDIT_SECRET`
  - Set the reddit client ID with `REDDIT_CLIENT_ID`
  - Set `REDIRECT` as the redirect URL you've set up from Reddit
  - Get a refresh token yourself or use [OAuth Helper](https://github.com/not-an-aardvark/reddit-oauth-helper)
    - Set that as `REFRESH_TOKEN`
  - Set the Bluemix username as `IBM_UN` and password as `IBM_PW`
  - Edit `index.js` in `config` so that `baseURL` reflects your own 