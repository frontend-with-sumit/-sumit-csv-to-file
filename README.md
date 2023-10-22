# csv-to-file

A simple command-line tool that converts a CSV file to your specified file for easy data manipulation and integration in your projects.

**_NOTE:_** This tool is designed only to be used for internal purposes only. Because it accepts and returns a specific format only useful for the organization only.

## Input

A CSV file with the following format:

- COLUMN 1: Variable Name
- COLUMN 2: English translation
- COLUMN 3: Bahasa translation

## Output

```node
export const <variable_name> = {
    eng: <english_text>,
    bhs: <bahasa_text>
};
```

## Installation

To use this tool, you need to have Node.js installed on your system. If you don't have it, download and install it from [nodejs.org](https://nodejs.org/).

You can install the CSV to JavaScript CLI tool globally using npm:

```bash
npm install -g csv-to-file
```

## Usage

Run the tool with the following command

```bash
csv-to-file --input input.csv --output output.js
```

**_NOTE:_** Please choose output file name carefully to get expected results. Recommended extensions - **.txt**, **.js**

## Options

- --input or -i: The path to the input CSV file.
- --output or -o: The path for the output JavaScript file.

### Example

```bash
csv-to-file --input data.csv --output data.js
```

This will convert the **data.csv** file to **data.js** file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributions

If you'd like to contribute to this project, please open an issue or submit a pull request. We welcome your suggestions and improvements.

## Reporting Issue

If you encounter any issues or have questions, please open a GitHub issue.

## Author

Sumit Kumar

## Acknowledgments

Special thanks to the open-source community and libraries used in this project.
