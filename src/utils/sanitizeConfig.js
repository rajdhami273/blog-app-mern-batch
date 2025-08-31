import sanitizeHtml from "sanitize-html";

// Custom sanitize-html configuration that preserves ReactQuill styles
export const quillSanitizeOptions = {
  // Allow these HTML tags
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 's', 'sup', 'sub',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'span', 'div'
  ],

  // Allow data URLs for images (base64 encoded images)
  allowedSchemes: ['data', 'http', 'https'],

  // Allow these attributes on tags
  allowedAttributes: {
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height'],
    'p': ['style', 'class'],
    'span': ['style', 'class'],
    'div': ['style', 'class'],
    'h1': ['style', 'class'],
    'h2': ['style', 'class'],
    'h3': ['style', 'class'],
    'h4': ['style', 'class'],
    'h5': ['style', 'class'],
    'h6': ['style', 'class'],
    'strong': ['style', 'class'],
    'em': ['style', 'class'],
    'u': ['style', 'class'],
    's': ['style', 'class'],
    'ul': ['style', 'class'],
    'ol': ['style', 'class'],
    'li': ['style', 'class'],
    'blockquote': ['style', 'class'],
    'pre': ['style', 'class'],
    'code': ['style', 'class']
  },

  // Allow specific CSS properties (ReactQuill uses these)
  allowedStyles: {
    '*': {
      // Color properties
      'color': [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i, /^[a-z]+$/i],
      'background-color': [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i, /^[a-z]+$/i],
      'background': [/^#[0-9a-f]{3,6}$/i, /^rgb\(/i, /^rgba\(/i, /^[a-z]+$/i],
      
      // Font properties (support ReactQuill font families)
      'font-family': [
        /^[a-z\s,"'-]+$/i, 
        /^monospace$/i, 
        /^serif$/i, 
        /^sans-serif$/i,
        /^"[^"]*"(,\s*"[^"]*")*$/i,
        /^'[^']*'(,\s*'[^']*')*$/i,
        /^[a-z\s,"'-]+,\s*(sans-serif|serif|monospace)$/i
      ],
      'font-size': [/^[0-9.]+[a-z%]+$/i],
      'font-weight': [/^[a-z0-9]+$/i],
      'font-style': [/^[a-z]+$/i],
      
      // Text properties
      'text-align': [/^(left|right|center|justify)$/i],
      'text-decoration': [/^[a-z\s]+$/i],
      'text-indent': [/^[0-9.]+[a-z%]+$/i],
      'line-height': [/^[0-9.]+$/],
      
      // Layout properties
      'margin': [/^[0-9.]+[a-z%]*(\s+[0-9.]+[a-z%]*)*$/i],
      'margin-left': [/^[0-9.]+[a-z%]+$/i],
      'margin-right': [/^[0-9.]+[a-z%]+$/i],
      'padding': [/^[0-9.]+[a-z%]*(\s+[0-9.]+[a-z%]*)*$/i],
      'padding-left': [/^[0-9.]+[a-z%]+$/i],
      'padding-right': [/^[0-9.]+[a-z%]+$/i]
    }
  },

  // Transform tags to preserve structure
  transformTags: {
    // Ensure links open in new tab for security
    'a': function(tagName, attribs) {
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      };
    }
  },

  // Allow class names (but restrict them)
  allowedClasses: {
    '*': ['ql-*'] // Allow Quill-specific classes
  }
};

// Convenience function to sanitize HTML with Quill-friendly options
export function sanitizeQuillHtml(dirty) {
  return sanitizeHtml(dirty, quillSanitizeOptions);
}

// More restrictive options for user input (comments, etc.)
export const restrictiveSanitizeOptions = {
  allowedTags: ['p', 'br', 'strong', 'em', 'u'],
  allowedAttributes: {},
  allowedStyles: {}
};

export function sanitizeUserInput(dirty) {
  return sanitizeHtml(dirty, restrictiveSanitizeOptions);
}
