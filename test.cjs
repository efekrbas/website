fetch('https://medium.com/p/af6f1af27df3').then(r=>r.text()).then(t=>{
    const match = t.match(/<meta property="og:image" content="([^"]+)"/);
    console.log(match ? match[1] : 'No image found');
});
