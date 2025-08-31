/**
 * Extract plain text from HTML string
 * @param {string} html - HTML string to convert
 * @returns {string} - Plain text without HTML tags
 */
export function stripHtml(html) {
  if (!html) return "";

  // Create a temporary DOM element
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Extract text content
  return tempDiv.textContent || tempDiv.innerText || "";
}

/**
 * Extract plain text and limit to specific length
 * @param {string} html - HTML string to convert
 * @param {number} maxLength - Maximum length of returned text
 * @returns {string} - Truncated plain text
 */
export function stripHtmlAndTruncate(html, maxLength = 150) {
  const plainText = stripHtml(html);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + "...";
}

/**
 * Extract text from HTML using DOMParser (alternative method)
 * @param {string} html - HTML string to convert
 * @returns {string} - Plain text without HTML tags
 */
export function stripHtmlWithParser(html) {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.body.textContent || "";
}
