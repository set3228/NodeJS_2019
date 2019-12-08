process.stdin.on('data', (input) => {
   process.stdout.write(formatOutput(input));
});

function formatOutput(buff) {
   return buff.reverse()
      .toString()
      .trim()
      .concat('\n');
}
