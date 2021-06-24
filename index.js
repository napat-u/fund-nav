const axios = require('axios')

async function acceptCookie() {
  let cookieValue;
  try {
    const response = await axios.get("https://codequiz.azurewebsites.net/");
    // console.log(response);
    cookieValue = response.data
      .match(/document.cookie(.*?);/)[0]
      .match(/\'(.*?)\'/)[0]
      .replace(/'/g, "");
  } catch (error) {
    console.error(error);
  }
  getData(cookieValue);
}

async function getData(cookieValue) {
  try {
    const response = await axios.get("https://codequiz.azurewebsites.net/", {
      headers: {
        Cookie: cookieValue + ";",
      },
    });
		const item = JSON.stringify(response.data).slice(345, 691).split(/td|<|>|tr| |[,]/).filter(str => { return str !== '' && str !== '/'})
		const valueIndex = item.findIndex(ele => ele === process.argv[2]) + 1
		console.log(item[valueIndex])
  } catch (error) {
    console.error(error);
  }
}

acceptCookie();
