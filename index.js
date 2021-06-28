const axios = require('axios')

async function getData() {
  try {
    const response = await axios.get("https://codequiz.azurewebsites.net/", {
      headers: {
        Cookie: 'hasCookie=true;',
      },
    });
		const item = JSON.stringify(response.data).slice(345, 691).split(/td|<|>|tr| |[,]/).filter(str => { return str !== '' && str !== '/'})
		const valueIndex = item.findIndex(ele => ele === process.argv[2]) + 1
		console.log(item[valueIndex])
  } catch (error) {
    console.error(error);
  }
}

getData();


/*
  async function acceptCookie() {
    let cookieValue;
    try {
      const response = await axios.get("https://codequiz.azurewebsites.net/");
      // cookieValue = response.data.match(/\'.*?\'/)[0].replace(/'/g, '')
        
      cookieValue = response.data
        .match(/document.cookie(.*?);/)[0] // document.cookie .*?  ; mean match document.cookie match all until to the end ; or use document.cookie.*?true'[0] ก็ได้
        .match(/\'(.*?)\'/)[0]
        .replace(/'/g, "");

      // console.log(cookieValue)
    
    } catch (error) {
      console.error(error);
    }
    console.log(cookieValue)
    getData(cookieValue);
  }

  async function getData(cookieValue) {
    try {
      const response = await axios.get("https://codequiz.azurewebsites.net/", {
        headers: {
          Cookie: cookieValue + ';',
        },
      });
      const item = JSON.stringify(response.data).slice(345, 691).split(/td|<|>|tr| |[,]/).filter(str => { return str !== '' && str !== '/'})
      const valueIndex = item.findIndex(ele => ele === process.argv[2]) + 1
      console.log(item[valueIndex])
    } catch (error) {
      console.error(error);
    }
  }
*/