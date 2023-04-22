#!/usr/bin/env node

const fs = require("fs");

// Read environment variables
const variables = Object.entries(process.env).filter(
  ([key, value]) => key.startsWith("REACT") || key.startsWith("VITE")
);

// Generate __ENV.js content
const envContent = `window.__ENV = {${variables.reduce(
  (acc, [key, value]) => acc + `\n\t"${key}": "${value}",`,
  ""
)}
};`;

// Write __ENV.js file
fs.writeFileSync("./__ENV.js", envContent, { encoding: "utf8" });
console.log("__ENV.js file generated successfully!");

// Update index.html to reference __ENV.js file
const indexHtmlPath = "./index.html"; // Update with the actual path to your index.html file
const envScriptPath = "./__ENV.js"; // Update with the actual path to the generated __ENV.js file

if (fs.existsSync(indexHtmlPath)) {
  // Read index.html file
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

  if (!indexHtml.includes(`<script src="${envScriptPath}"></script>`)) {
    // Replace </body> tag with a script tag referencing __ENV.js file
    const updatedIndexHtml = indexHtml.replace(
      "</head>",
      `\t<script src="${envScriptPath}"></script>\n</head>`
    );

    // Write updated contents back to index.html file
    fs.writeFileSync(indexHtmlPath, updatedIndexHtml, "utf8");

    console.log("index.html updated successfully!");
  }
}
