import * as cheerio from "cheerio";

const response = await fetch('https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub');

const html = await response.text();

const $ = cheerio.load(html);
const rows = $("tr");


const points = [];
let maxX = 0;
let maxY = 0;

rows.each((index, row) => {

    if (index === 0) return; 

    const cells = $(row).find("td");

    const x = Number($(cells[0]).text().trim());

    const char = $(cells[1]).text().trim();

    const y = Number($(cells[2]).text().trim());

    points.push({ x, y, char });

    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
});

const grid = Array.from(
    { length: maxY + 1 },
    () => Array(maxX + 1).fill(" ")
);

for (const { x, y, char } of points) {
    grid[y][x] = char
}

for (const row of grid) {
    console.log(row.join(""));
}
