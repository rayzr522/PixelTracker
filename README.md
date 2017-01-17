# PixelTracker
This is some simple demo software for a [pixel tracker](https://en.wikipedia.org/wiki/Web_beacon) (also known as a web beacon, web bug, or tag). I just used it to create a simple view-counter for webpages and also to keep track of what IPs have viewed the site and how many times they've viewed it.

## Setup
It's actually quite simple to set up. Prerequisites: `git`, [`yarn`](https://yarnpkg.com/en/docs/install).

    # Download project
    git clone https://github.com/Rayzr522/PixelTracker.git
    cd PixelTracker
    # Install dependencies
    yarn
    
    # Now start up the web-server
    yarn run server
    
Go to `localhost:3000` to view the simple website, and the view-stats will display on the homepage.
    
