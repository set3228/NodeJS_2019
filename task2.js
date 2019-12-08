import fs from 'fs';
import csv from 'csvtojson';

const INPUT_FILE_PATH = './cvs/example.csv';
const OUTPUT_FILE_PATH = './txt/text.txt';

const readStream = fs.createReadStream(INPUT_FILE_PATH);
const writeStream = fs.createWriteStream(OUTPUT_FILE_PATH, { encoding: 'utf8' }); 
const convertStream = csv({ ignoreColumns: /Amount/ });

readStream.on('error', (error) => console.log('Reading error', error));
convertStream.on('error', (error) => console.log('Converting error', error));
writeStream.on('error', (error) => console.log('Writing error', error));

readStream
   .pipe(convertStream)
   .pipe(writeStream)
   .on('finish', () => console.log('Writing is finished successfully'));
