import { crawlPage } from "./crawl.js";
import { printReportPages } from "./report.js";

async function main() {
    if (process.argv.length != 3) {
        console.log(
            `Funtion only takes in one element. ${process.argv.length} was given`,
        );
        return;
    }

    const baseurl = process.argv[2];
    console.log(`Crawling from ${baseurl}`);

    const pages = await crawlPage(baseurl);

    printReportPages(pages);
}

main();
