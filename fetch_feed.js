const fs = require('fs');
fetch('https://medium.com/feed/@efekk')
    .then(res => res.text())
    .then(xml => fs.writeFileSync('feed_test.xml', xml));
