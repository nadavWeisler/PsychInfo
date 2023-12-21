const fs = require("fs");
const path = require("path");

function snakeToCamel(str) {
  const camelCased = str.replace(/_([a-z])/g, function (match, group) {
    return group.toUpperCase();
  });
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

// Set the path to the single localization file you want to use
const localizationFilePath = path.join(
  __dirname,
  "../src/i18n/locales/he/translation.json",
); // Adjust the path accordingly
const outputKeysFile = path.join(__dirname, "../src/i18n/LocalizationKeys.ts"); // The file where keys will be stored

// Ensure the output directory exists
if (!fs.existsSync(localizationFilePath)) {
  console.error("Localization file not found.");
  process.exit(1);
}

// Function to recursively traverse the JSON structure and generate the class content
function generateClassContent(obj, currentKey, isfirst = true) {
  let classContent = "";
  for (const key of Object.keys(obj)) {
    const fullKey = currentKey ? `${currentKey}.${key}` : key;
    if (typeof obj[key] === "object") {
      if (isfirst) {
        classContent += `        static ${snakeToCamel(
          key,
        )} = {\n${generateClassContent(obj[key], fullKey, false)}        }\n`;
      } else {
        classContent += `        ${snakeToCamel(
          key,
        )}: {\n${generateClassContent(obj[key], fullKey, false)}        },\n`;
      }
    } else {
      classContent += `        ${snakeToCamel(key)}: '${fullKey}',\n`;
    }
  }
  return classContent;
}

// Read the single localization file
const localizationData = require(localizationFilePath);

// Generate the LocalizationKeys class
const classContent = `export class LocalizationKeys {\n${generateClassContent(
  localizationData,
)}\n}\n`;

// Write the LocalizationKeys class to the LocalizationKeys.js file
fs.writeFileSync(outputKeysFile, classContent);

console.log(`LocalizationKeys class has been written to ${outputKeysFile}`);
