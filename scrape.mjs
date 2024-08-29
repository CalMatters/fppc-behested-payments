import fs from "fs/promises";

import * as cheerio from "cheerio";
import * as d3 from "d3-dsv";
import Queue from "p-queue";

async function scrapeTableNamePerYear(name, year = "2024") {
  console.log(`🧑‍💼 Scraping "${name}" during ${year}`);
  const rows = [];
  const url = `https://dv.fppc.ca.gov/Detail?Year=${year}&Name=${name}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const tableRows = $("#GridView1 tr");
  const columns = [];
  tableRows.each((i, rowEl) => {
    const isHeaderRow = i === 0;
    const cellSelector = isHeaderRow ? "th" : "td";
    const cells = $(cellSelector, rowEl);
    const d = {
      Name: name,
    };
    cells.each((ii, cellEl) => {
      const text = $(cellEl).text();
      if (isHeaderRow) {
        columns.push(text);
      } else {
        const col = columns[ii];
        if (col === "Amount") {
          d[col] = text.replaceAll("$", "").replaceAll(",", "");
        } else {
          d[col] = text;
        }
      }
    });

    if (!isHeaderRow) {
      rows.push(d);
    }
  });

  return rows;
}

async function scrapeOfficialsPerTypePerYear(officialType, year = "2024") {
  console.log(`🤼 Scraping ${officialType} officials during ${year}`);
  const officials = [];
  const url =
    `https://dv.fppc.ca.gov/OfficialTypeYear?OfficialType=${officialType}&Year=${year}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const areas = $("#Chart1ImageMap area");

  areas.each((i, el) => {
    const href = $(el).attr("href");
    const name = href.split("Name=").pop();
    officials.push(name);
  });

  return officials;
}

async function scrapeAllRowsPerYear(year = "2024") {
  console.log(`📅 Scraping everything for ${year}`)
  const officials = [];
  const queue = new Queue({ concurrency: 2 });

  types.forEach((type) => {
    queue.add(async () => {
      const d = await scrapeOfficialsPerTypePerYear(type, year);
      officials.push(...d);
    });
  });

  await queue.onIdle();

  const rows = [];

  officials.forEach((official) => {
    queue.add(async () => {
      const d = await scrapeTableNamePerYear(official, year);
      rows.push(...d);
    });
  });

  await queue.onIdle();

  return rows
}

const types = [
  "Constitutional",
  "Assembly",
  "Senate",
];
const years = [
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

const queue = new Queue({ concurrency: 1 })
const rows = []
years.forEach(year => {
  queue.add(async () => {
    const d = await scrapeAllRowsPerYear(year)
    rows.push(...d)
  })
})
await queue.onIdle()

const csv = d3.csvFormat(rows);
await fs.writeFile(`behested.csv`, csv);
console.log(`✅ Saved behested.csv (${rows.length.toLocaleString('en-US')} rows) with all years from ${years[0]} through ${years[years.length - 1]}`)