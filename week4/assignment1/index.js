const fs = require('fs');
const { Command } = require('commander');

const program = new Command();

program
  .name('word-counter')
  .description('A simple CLI to count words in a file')
  .version('1.0.0');

// Define the expected argument (the file path)
program
  .argument('<filepath>', 'Path to the file you want to count words in')
  .action((filepath) => {
    // Read the file asynchronously
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error: Could not read file at path '${filepath}'.`);
        console.error(err.message);
        process.exit(1);
      }

      // If the file is completely empty, word count is 0
      if (data.trim() === '') {
        console.log('You have 0 words in this file');
        return;
      }

      // Split the text by any whitespace character (spaces, tabs, newlines)
      const words = data.trim().split(/\s+/);
      
      // Output the required format
      console.log(`You have ${words.length} words in this file`);
    });
  });

// Parse the arguments provided by the user
program.parse(process.argv);