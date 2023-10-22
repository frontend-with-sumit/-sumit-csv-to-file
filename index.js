#!/usr/bin/env node

const fs = require("fs");
const { parse } = require("csv-parse");
const yargs = require("yargs");
const readline = require("readline");

const argv = yargs
	.option("i", {
		alias: "input",
		describe: "Input csv file path",
		demandOption: true,
	})
	.option("o", {
		alias: "output",
		describe: "Output file path",
		demandOption: true,
	}).argv;

const csvFilePath = argv.i;
const jsOutputFilePath = argv.o;

if (!csvFilePath || !jsOutputFilePath) {
	console.error("Error: Input and output file paths are mandatory.");
	process.exit(1); // Exit with a non-zero status code to indicate an error
}

const rows = [];

// Check if the input file exists at the specified path
if (!fs.existsSync(csvFilePath)) {
	console.error("Missing File: CSV file doesn't exist on the specified path.");
	process.exit(1); // Exit with an error status code
}

fs.createReadStream(csvFilePath)
	.pipe(parse({ delimiter: ",", from_line: 1 }))
	.on("data", function (row) {
		rows.push(row);
	})
	.on("error", function (error) {
		console.error("Error:", error.message);
		process.exit(1); // Exit with an error status code
	})
	.on("end", function () {
		if (fs.existsSync(jsOutputFilePath)) {
			// Prompt the user for confirmation before deleting the existing file
			console.log(`The output file "${jsOutputFilePath}" already exists.`);
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question("Do you want to overwrite it? (y/n) ", (answer) => {
				if (answer.toLowerCase() !== "y") {
					console.log("Aborted. File not overwritten.");
					rl.close();
					process.exit(0); // Exit with success status code
				}

				// Continue with file deletion and writing
				deleteAndWriteFile(rows);
				rl.close();
			});
		} else {
			// Output file doesn't exist, proceed with writing
			writeJsOutputFile(jsOutputFilePath, rows);
		}
	});

function writeJsOutputFile(filePath, rows) {
	for (let row of rows) {
		const content = `export const ${row[0]
			.split(" ")
			.join("_")
			.toUpperCase()} = {\n\teng: "${row[1]}",\n\tbhs: "${row[2]}"\n};\n`;

		fs.appendFile(filePath, content, (err) => {
			if (err) {
				console.error("Error while writing data to file:", err.message);
				process.exit(1); // Exit with an error status code
			}
		});
	}

	console.log(
		"Woo hoo!!! File converted successfully. Find it at",
		jsOutputFilePath
	);
}

function deleteAndWriteFile(rows) {
	fs.unlink(jsOutputFilePath, (err) => {
		if (err) {
			console.error("Error while deleting the existing file:", err.message);
			process.exit(1); // Exit with an error status code
		}

		writeJsOutputFile(jsOutputFilePath, rows);
	});
}
