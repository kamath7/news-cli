const puppeteer = require("puppeteer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const getPdf = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url);
    await page.waitFor(1000);
    const doc = await new PDFDocument();

    const body = await page.evaluate(() => {
      return document.querySelector(".ga-headlines").textContent;
    });
    await doc.pipe(fs.createWriteStream("./article-with-text.pdf"));
    await doc.fontSize(14).text(body);
    await doc.end();
    //   await  console.log(typeof body)
    const pdf = await page.pdf({
      path: "./article-with-pictures.pdf",
      format: "A4",
    });

    await browser.close();
    return pdf;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPdf,
};
