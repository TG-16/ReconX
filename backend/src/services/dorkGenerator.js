function generateDorks(name) {
  return [
    `"${name}"`,
    `"${name}" site:linkedin.com`,
    // `"${name}" site:github.com`,
    // `"${name}" filetype:pdf`,
    // `"${name}" resume`
  ];
}

module.exports = generateDorks;
