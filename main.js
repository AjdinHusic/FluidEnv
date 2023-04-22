const fs = require('fs');

// Read environment variables
const variables = Object.entries(process.env)
  .filter(([key, value]) => key.startsWith("REACT") || key.startsWith("VITE"));

console.log("Finding environment variables with REACT or VITE prefix");
console.log(variables);

// Generate __ENV.js content
const envContent = `window.__ENV = {${variables.reduce((acc, [key, value]) => acc + `\n\t"${key}": "${value}",`, "")}
};`;

// Write __ENV.js file
fs.writeFileSync('./__ENV.js', envContent, { encoding: 'utf8' });

console.log('__ENV.js file generated successfully!');