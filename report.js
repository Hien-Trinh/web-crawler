function printReportPages(pages) {
    console.log("Report:");
    pages.sort((a, b) => b[1] - a[1]);
    for (const [url, count] of pages) {
        console.log(`Found ${count} internal links to ${url}`);
    }

    return;
}

export { printReportPages };
