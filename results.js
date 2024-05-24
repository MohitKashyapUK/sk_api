const axios = require("axios"); // For HTTP request
const cheerio = require("cheerio"); // For HTML scraping
const date = require("./date");

class Results {
  constructor(name) {
    this.name = name;
    this.init = false;
    this.sk_names = {
      "disawer": 1,
      "faridabad": 2,
      "gaziabad": 3,
      "gali": 4
    };
    // this.current_results_td_doms, this.previous_results_td_doms
  }

  async initialize() {
    if (this.init) {
      const now = date(); // current date object
      const month = now.getMonth(); // current month from date object
      const current_month = (month + 1).toString().padStart(2, "0"); // 01 ~ 12, Agar digit single hai to uske aage zero add kiya ja raha hai aur iski type ko String kiya ja raha hai
      const current_year = now.getFullYear(); // 2023, current year from date object
      // const current_day = now.getDate(); // 1 ~ 31, current day from date object
      // const lastDayOfMonth = new Date(current_year, month + 1, 0).getDate(); // 28 ~ 31, mahine kee aakhri tarikh
      
      const URL = `https://satta-king-fast.com/chart.php?month=${current_month}&year=${current_year}`; // SK URL for scraping SK results
      // const name = req.params.name; // sk name. e.g. faridabad

      let html = await axios.get(URL); // Getting HTML content of SK
      html = html.data;

      if (!html) return false;
      else this.init = true;

      const $ = cheerio.load(html); // Initializing
      const tbody = $("body > div#section > div#container > div#mix-chart > table:first > tbody:first");
      const tr = tbody.find("tr.day-number");
      const tr_len = tr.length;

      this.current_results_td_doms = tr.eq(tr_len-1).find("td");
      if (tr_len > 1) this.previous_results_td_doms = tr.eq(tr_len-2).find("td");

      return true;
      // const current_sk_date = current_results_td_doms.eq(0).contents().toString().trim();
    } else return true;
  }

  get() {
    if (!this.init) return false;

    const count = this.sk_names[this.name] || 5;
    const results = {};

    for (let i=1; i<=count; i++) {
      const condition = count != 5;
      const name = Object.keys(this.sk_names)[(condition ? this.sk_names[name] : i) - 1];
      const result = this.current_results_td_doms.eq(condition ? this.sk_names : i).text().trim();

      results[name] = result;
    }

    return results;
  }
}

module.exports = Results;