fetch('https://www.youtube.com/@efekrbs')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/<meta property="og:url" content="https:\/\/www\.youtube\.com\/channel\/([^"]+)">/);
    if(match) console.log(match[1]);
    else console.log("Not found");
  });
