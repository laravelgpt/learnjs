

import { LearningContent } from './types';

// The type annotation has been removed from DEFAULT_FILESYSTEM.
// The `addIdsToFS` function in App.tsx adds the required 'id' fields at runtime,
// so this initial data structure does not need to conform to the strict types.
export const DEFAULT_FILESYSTEM = [
  {
    type: 'folder',
    name: 'My Project',
    children: [
       {
        type: 'file',
        name: 'package.json',
        content: `{
  "name": "js-learn-studio-project",
  "version": "1.0.0",
  "description": "A project created in JS Learn Studio",
  "main": "script.js",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {}
}`
      },
      {
        type: 'file',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="header">Hello World!</h1>
  <p>Welcome to your first web page.</p>
  <button onclick="changeText()">Click Me</button>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        type: 'file',
        name: 'script.js',
        content: `import _ from 'lodash';

function changeText() {
  const header = document.getElementById('header');
  const newText = _.join(['You', 'clicked', 'the', 'button!'], ' ');
  header.textContent = newText;
  header.style.color = 'blue';
  console.log('Text changed successfully using lodash!');
}`,
      },
      {
        type: 'file',
        name: 'style.css',
        content: `body {
  font-family: sans-serif;
  background-color: #f0f0f0;
  color: #333;
}
button {
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}`,
      },
    ],
  },
];

export const LEARNING_CONTENT: LearningContent = {
  html: [
    {
      name: 'HTML Basics',
      topics: [
        {
          title: 'Intro to HTML',
          content: `<!-- HTML stands for HyperText Markup Language -->
<!-- It's the standard markup language for Web pages -->
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
          prompt: 'What is HTML and what is its basic structure?',
          projectFiles: [{
            type: 'file', name: 'index.html', content: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph. This is what your browser will show!</p>
</body>
</html>`
          }]
        },
        {
          title: 'HTML Elements & Tags',
          content: `<!-- HTML elements are the building blocks of HTML pages -->
<!-- They are represented by <> tags -->
<p>This is a paragraph tag.</p>
<a>This is an anchor (link) tag.</a>
<br> <!-- This is a line break tag, it's an empty tag -->`,
          prompt: 'Explain what HTML elements and tags are.'
        },
        {
          title: 'HTML Attributes',
          content: `<!-- Attributes provide additional information about elements -->
<!-- They are always specified in the start tag -->
<a href="https://www.google.com">This link has an href attribute.</a>
<img src="image.jpg" alt="An image" width="104" height="142">
<p title="I'm a tooltip">This paragraph has a title attribute.</p>`,
          prompt: 'What are HTML attributes? Give some examples.',
          projectFiles: [{
            type: 'file', name: 'index.html', content: `<!DOCTYPE html>
<html>
<body>
  <h2>Attributes in action</h2>
  <a href="https://www.google.com">A link to Google (href attribute)</a>
  <br><br>
  <img src="https://via.placeholder.com/100" alt="A placeholder image (alt attribute)">
  <br><br>
  <p title="Hover me!">This paragraph has a tooltip (title attribute).</p>
</body>
</html>`
          }]
        },
        {
          title: 'Comments',
          content: `<!-- This is a comment. -->
<p>This is a paragraph.</p>
<!-- Comments are not displayed in the browser.
They can be used to explain your code, which can help you
when you edit the source code at a later date. -->`,
          prompt: 'How do you write comments in HTML and why are they useful?'
        },
      ]
    },
    {
      name: 'Text Formatting',
      topics: [
        {
            title: 'Headings',
            content: `<!-- Headings are defined with <h1> to <h6> tags. -->
<!-- <h1> defines the most important heading. <h6> defines the least important heading. -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>`,
            prompt: 'Explain the different heading tags in HTML.',
            projectFiles: [{
              type: 'file', name: 'index.html', content: `<!DOCTYPE html>
<html><body>
<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6>
</body></html>`
            }]
        },
        {
            title: 'Paragraphs & Breaks',
            content: `<p>This is a paragraph. Browsers automatically add some white space (a margin) before and after a paragraph.</p>
<p>This is another paragraph.</p>
<p>This paragraph contains<br>a line break.</p>`,
            prompt: 'How do you create paragraphs and line breaks in HTML?'
        },
        {
            title: 'Bold, Italic, and More',
            content: `<b>This text is bold.</b>
<strong>This text is important (usually bold).</strong>
<i>This text is italic.</i>
<em>This text is emphasized (usually italic).</em>
<mark>This text is marked.</mark>
<small>This is smaller text.</small>`,
            prompt: 'Show the difference between <b>/<strong> and <i>/<em>.'
        },
        {
            title: 'Subscript & Superscript',
            content: `<p>This text contains <sub>subscript</sub> text.</p>
<p>This text contains <sup>superscript</sup> text.</p>
<p>Chemical formula for water: H<sub>2</sub>O</p>
<p>A common math expression: E = mc<sup>2</sup></p>`,
            prompt: 'When would you use subscript or superscript text?'
        },
        {
            title: 'Quotations',
            content: `<p>Here is a quote from WWF's website:</p>
<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature.
</blockquote>

<p>WWF's goal is to <q>build a future where people live in harmony with nature.</q></p>`,
            prompt: 'What is the difference between <blockquote> and <q> in HTML?'
        },
      ]
    },
    {
        name: 'Links & Images',
        topics: [
            {
                title: 'Creating Links',
                content: `<!-- The <a> tag defines a hyperlink. -->
<a href="https://www.google.com">Visit Google</a>`,
                prompt: 'How do you create a hyperlink in HTML?'
            },
            {
                title: 'Link Targets',
                content: `<!-- The target attribute specifies where to open the linked document. -->

<!-- Opens in the same window/tab -->
<a href="https://www.google.com" target="_self">Opens in self</a>

<!-- Opens in a new window or tab -->
<a href="https://www.google.com" target="_blank">Opens in new tab</a>`,
                prompt: 'Explain the different values for the `target` attribute on a link.'
            },
            {
                title: 'Images',
                content: `<img src="https://via.placeholder.com/150" alt="A 150x150 placeholder image">`,
                prompt: 'How do you embed an image on a web page?',
                projectFiles: [{
                  type: 'file', name: 'index.html', content: `<!DOCTYPE html>
<html><body>
  <h2>This is an image:</h2>
  <img src="https://via.placeholder.com/150" alt="A 150x150 placeholder image">
</body></html>`
                }]
            },
            {
                title: 'Image Alt Text',
                content: `<!-- The alt attribute provides an alternate text for an image, if the user for some reason cannot view it. -->
<img src="wrong_name.gif" alt="A beautiful landscape">`,
                prompt: 'Why is the `alt` attribute important for images?'
            },
        ]
    },
    {
      name: 'Lists',
      topics: [
        {
          title: 'Unordered Lists',
          content: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>`,
          prompt: 'How do you create a bulleted (unordered) list?',
          projectFiles: [{
            type: 'file', name: 'index.html', content: `<!DOCTYPE html>
<html><body>
  <h2>My Grocery List</h2>
  <ul>
    <li>Milk</li>
    <li>Bread</li>
    <li>Cheese</li>
  </ul>
</body></html>`
          }]
        },
        {
          title: 'Ordered Lists',
          content: `<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`,
          prompt: 'How do you create a numbered (ordered) list?'
        },
        {
          title: 'Description Lists',
          content: `<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>`,
          prompt: 'What is a description list and what are its parts?'
        }
      ]
    },
    {
        name: 'Tables',
        topics: [
            {
                title: 'Basic Table Structure',
                content: `<table border="1">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
  </tr>
</table>`,
                prompt: 'Show me the basic structure of an HTML table.'
            },
            {
                title: 'Headers, Body, and Footers',
                content: `<table border="1">
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
</table>`,
                prompt: 'Explain the purpose of <thead>, <tbody>, and <tfoot> in a table.'
            },
            {
                title: 'Spanning Columns & Rows',
                content: `<table border="1">
  <tr>
    <th>Name</th>
    <th colspan="2">Telephone</th>
  </tr>
  <tr>
    <td>Bill Gates</td>
    <td>55577854</td>
    <td>55577855</td>
  </tr>
  <tr>
      <th>Name:</th>
      <td>Bill Gates</td>
  </tr>
  <tr>
      <th rowspan="2">Telephone:</th>
      <td>55577854</td>
  </tr>
  <tr>
      <td>55577855</td>
  </tr>
</table>`,
                prompt: 'How do you make a table cell span multiple rows or columns?'
            }
        ]
    },
    {
        name: 'Forms & Inputs',
        topics: [
            {
                title: 'The <form> Element',
                content: `<form action="/submit-data" method="post">
  <!-- Form elements go here -->
</form>`,
                prompt: 'What is the purpose of the HTML `<form>` element?'
            },
            {
                title: 'Labels & Text Inputs',
                content: `<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>

  <label for="pwd">Password:</label><br>
  <input type="password" id="pwd" name="pwd">
</form>`,
                prompt: 'How do you create labels and text input fields in a form?'
            },
            {
                title: 'Checkboxes & Radios',
                content: `<form>
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1"> I have a bike</label><br>

  <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label>
</form>`,
                prompt: 'What is the difference between a checkbox and a radio button?'
            },
            {
                title: 'Buttons',
                content: `<form>
  <input type="submit" value="Submit Form">
  <input type="reset" value="Reset Form">
  <button type="button" onclick="alert('Hello!')">Click Me</button>
</form>`,
                prompt: 'Explain the different types of buttons in HTML forms.'
            },
            {
                title: 'Dropdowns (Select)',
                content: `<label for="cars">Choose a car:</label>
<select id="cars" name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat" selected>Fiat</option>
  <option value="audi">Audi</option>
</select>`,
                prompt: 'How do you create a dropdown selection list?'
            },
            {
                title: 'Textareas',
                content: `<textarea name="message" rows="5" cols="30">
The cat was playing in the garden.
</textarea>`,
                prompt: 'When should I use a <textarea> instead of a text input?'
            },
        ]
    },
    {
        name: 'Semantic HTML',
        topics: [
            {
                title: 'What is Semantic HTML?',
                content: `<!-- Semantic HTML elements clearly describe their meaning to both the browser and the developer. -->
<!-- Non-semantic: --> <div>, <span>
<!-- Semantic: --> <form>, <table>, and <article>

<!-- They make code more readable and improve accessibility. -->`,
                prompt: 'What are semantic HTML tags and why are they important?'
            },
            {
                title: 'Header & Footer',
                content: `<header>
  <h1>My Website</h1>
  <p>A slogan for my website.</p>
</header>

<footer>
  <p>Author: John Doe</p>
  <p><a href="mailto:john@example.com">john@example.com</a></p>
</footer>`,
                prompt: 'Explain the <header> and <footer> elements.'
            },
            {
                title: 'Nav & Main',
                content: `<nav>
  <a href="/html/">HTML</a> |
  <a href="/css/">CSS</a> |
  <a href="/js/">JavaScript</a>
</nav>

<main>
  <h1>Most important content</h1>
  <p>This is the main content of the document.</p>
</main>`,
                prompt: 'When should you use the <nav> and <main> tags?'
            },
            {
                title: 'Article & Section',
                content: `<article>
  <h2>Google Chrome</h2>
  <p>Google Chrome is a web browser developed by Google.</p>
</article>

<section>
  <h2>Chapter 1</h2>
  <p>This is the first part of our story.</p>
</section>`,
                prompt: 'What is the difference between <article> and <section>?'
            },
            {
                title: 'Figure & Figcaption',
                content: `<figure>
  <img src="https://via.placeholder.com/200" alt="placeholder">
  <figcaption>Fig.1 - A placeholder image.</figcaption>
</figure>`,
                prompt: 'How do you associate a caption with an image semantically?'
            },
        ]
    },
    {
        name: 'Multimedia & Embedding',
        topics: [
             {
                title: 'Audio',
                content: `<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`,
                prompt: 'How do you embed an audio file in an HTML page?'
            },
            {
                title: 'Video',
                content: `<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>`,
                prompt: 'Show me how to embed a video with controls.'
            },
            {
                title: 'Iframes',
                content: `<!-- An iframe is used to display a web page within a web page. -->
<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen=""></iframe>`,
                prompt: 'What is an iframe and what is a security concern with using them?'
            }
        ]
    },
    {
        name: 'Accessibility (A11y)',
        topics: [
            {
                title: 'Why Accessibility Matters',
                content: `<!-- Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. -->
<!-- Example: Using alt text for screen readers -->
<img src="nav_logo.png" alt="Company Logo">`,
                prompt: 'What is web accessibility and why is it important?'
            },
            {
                title: 'ARIA Roles',
                content: `<!-- ARIA roles can be added to give elements more semantic meaning for assistive technologies. -->
<div id="tabs" role="tablist">
  <a role="tab" aria-selected="true" href="#panel-1">First tab</a>
  <a role="tab" href="#panel-2">Second tab</a>
</div>

<div role="tabpanel" id="panel-1">
  <p>Content for first tab</p>
</div>`,
                prompt: 'What are ARIA roles and how do they improve accessibility?'
            },
            {
                title: 'Form Accessibility',
                content: `<!-- Using <label> correctly is crucial for form accessibility. -->
<!-- Clicking the label will focus the input. -->
<label for="username">Username:</label>
<input type="text" id="username" name="username">

<!-- Grouping related controls -->
<fieldset>
  <legend>Choose your favorite monster</legend>
  <input type="radio" id="kraken" name="monster">
  <label for="kraken">Kraken</label><br/>
</fieldset>`,
                prompt: 'What are some key practices for making HTML forms accessible?'
            }
        ]
    }
  ],
  css: [
    {
      name: 'CSS Fundamentals',
      topics: [
        {
          title: 'Intro to CSS',
          content: `/* CSS describes how HTML elements are to be displayed. */
h1 {
  color: navy;
  text-align: center;
}`,
          prompt: 'What is CSS and what is its basic syntax?',
          projectFiles: [
            { type: 'file', name: 'index.html', content: `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"></head><body><h1>Hello, CSS!</h1><p>This paragraph is not styled.</p></body></html>` },
            { type: 'file', name: 'style.css', content: `h1 {\n  color: navy;\n  text-align: center;\n}` }
          ]
        },
        {
          title: 'Applying CSS',
          content: `/* External CSS (in a .css file) is best practice. */
/* Internal CSS is inside a <style> tag in the HTML <head>. */
/* Inline CSS is a "style" attribute on an HTML element. */
<p style="color: red;">This is an inline style.</p>`,
          prompt: 'What are the three ways to apply CSS to HTML?'
        },
        {
          title: 'Comments',
          content: `/* This is a single-line comment in CSS. */
h1 {
  color: blue; /* Comments can be on the same line. */
}
/* This is
   a multi-line
   comment. */`,
          prompt: 'How do you write comments in CSS?'
        }
      ]
    },
    {
        name: 'Selectors In-Depth',
        topics: [
            {
                title: 'Type, Class & ID',
                content: `p { color: gray; } /* Type selector */
.highlight { background-color: yellow; } /* Class selector */
#main-title { font-size: 32px; } /* ID selector */`,
                prompt: 'Explain the difference between type, class, and ID selectors.'
            },
            {
                title: 'Attribute Selectors',
                content: `a[target="_blank"] {
  color: red; /* Selects <a> tags with target="_blank" */
}
input[type="text"] {
  border: 1px solid gray; /* Selects text inputs */
}`,
                prompt: 'How do you select elements based on their attributes?'
            },
            {
                title: 'Pseudo-classes',
                content: `a:hover {
  text-decoration: underline; /* Style on mouse over */
}
li:nth-child(odd) {
  background-color: #f2f2f2; /* Style odd list items */
}`,
                prompt: 'What are pseudo-classes? Give examples for :hover and :nth-child.'
            },
            {
                title: 'Pseudo-elements',
                content: `p::first-line {
  font-weight: bold; /* Style the first line of a paragraph */
}
p::before {
  content: "-> "; /* Insert content before the element */
}`,
                prompt: 'What is the difference between a pseudo-class and a pseudo-element?'
            },
            {
                title: 'Combinators',
                content: `div p { color: blue; } /* Descendant selector */
div > p { color: green; } /* Child selector */
h2 + p { margin-top: 0; } /* Adjacent Sibling selector */
h2 ~ p { text-indent: 1em; } /* General Sibling selector */`,
                prompt: 'Explain the four CSS combinators (descendant, child, adjacent, general).'
            },
        ]
    },
    {
        name: 'The Box Model',
        topics: [
            {
                title: 'Content, Padding, Border, Margin',
                content: `.box {
  width: 200px;
  height: 100px;
  padding: 20px; /* Space inside the border */
  border: 5px solid black; /* The border itself */
  margin: 15px; /* Space outside the border */
}`,
                prompt: 'Explain the four parts of the CSS Box Model.',
                projectFiles: [
                  { type: 'file', name: 'index.html', content: `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"></head><body><div class="box">This is the content.</div></body></html>` },
                  { type: 'file', name: 'style.css', content: `body { background: #eee; }\n.box {\n  background-color: lightblue;\n  width: 200px;\n  height: 100px;\n  padding: 20px;\n  border: 5px solid navy;\n  margin: 15px;\n}` }
                ]
            },
            {
                title: 'box-sizing',
                content: `/* 'box-sizing' changes how width/height are calculated. */
.content-box { /* default */
  box-sizing: content-box;
  width: 200px; /* Total width is 200px + padding + border */
}
.border-box {
  box-sizing: border-box;
  width: 200px; /* Total width is 200px including padding/border */
}`,
                prompt: "What's the difference between content-box and border-box?"
            },
            {
                title: 'Margin vs Padding',
                content: `.card {
  padding: 20px; /* Pushes content away from the border, inside */
  margin: 10px; /* Pushes other elements away, outside */
  background-color: lightgray;
  border: 1px solid gray;
}`,
                prompt: 'Visually, what is the main difference between margin and padding?'
            },
        ]
    },
    {
        name: 'Typography',
        topics: [
            {
                title: 'font-family & Web Fonts',
                content: `@import url('https://fonts.googleapis.com/css2?family=Roboto');
body {
  /* Fallback fonts are important */
  font-family: 'Roboto', sans-serif;
}`,
                prompt: 'How do you use custom web fonts with `font-family`?'
            },
            {
                title: 'font-size & font-weight',
                content: `p {
  font-size: 16px; /* Can use px, em, rem, % */
}
h1 {
  font-weight: 700; /* or 'bold' */
}`,
                prompt: 'Explain `font-size` units (px, em, rem) and common `font-weight` values.'
            },
            {
                title: 'text-align & text-decoration',
                content: `h1 { text-align: center; }
p { text-align: justify; }
a { text-decoration: none; } /* Removes underline from links */`,
                prompt: 'How do you center text and remove the underline from a link?'
            },
            {
                title: 'line-height & letter-spacing',
                content: `p {
  line-height: 1.6; /* Improves readability */
  letter-spacing: 0.5px; /* Adjusts space between characters */
}`,
                prompt: 'What do the `line-height` and `letter-spacing` properties do?'
            },
        ]
    },
    {
        name: 'Colors & Backgrounds',
        topics: [
            {
                title: 'Color Values',
                content: `p { color: #ff0000; } /* Hex */
h1 { color: rgb(0, 0, 255); } /* RGB */
div { background-color: hsla(120, 100%, 50%, 0.5); } /* HSLA with alpha */`,
                prompt: 'Show examples of setting colors using hex, rgb, and hsla values.'
            },
            {
                title: 'Background Image',
                content: `.hero {
  background-image: url('landscape.jpg');
  background-size: cover; /* Cover the entire element */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Don't tile the image */
}`,
                prompt: 'How do you set a background image that covers its container?'
            },
            {
                title: 'Gradients',
                content: `.gradient-box {
  /* Fades from top to bottom */
  background-image: linear-gradient(to bottom, #4facfe, #00f2fe);
}
.radial-gradient {
  /* Fades from center outwards */
  background-image: radial-gradient(circle, #fbc2eb, #a6c1ee);
}`,
                prompt: 'Show examples of a linear and a radial gradient.'
            },
        ]
    },
    {
        name: 'Layout: Display & Position',
        topics: [
            {
                title: 'display Property',
                content: `span { display: inline; } /* Default for <span> */
div { display: block; } /* Default for <div> */
button { display: inline-block; } /* Acts inline but can have width/height */
.hidden { display: none; } /* Removes element from layout */`,
                prompt: 'Explain the difference between display: block, inline, and inline-block.'
            },
            {
                title: 'position: relative & absolute',
                content: `.parent {
  position: relative; /* Becomes the anchor for absolute children */
}
.child {
  position: absolute;
  top: 10px;
  right: 10px;
}`,
                prompt: 'How do `position: relative` and `position: absolute` work together?'
            },
            {
                title: 'position: fixed & sticky',
                content: `.cookie-banner {
  position: fixed; /* Stays in the same spot in the viewport */
  bottom: 0;
  width: 100%;
}
.sticky-header {
  position: sticky; /* Acts like 'relative' until it hits the top */
  top: 0;
}`,
                prompt: 'What is the difference between `position: fixed` and `position: sticky`?'
            },
            {
                title: 'z-index',
                content: `.modal-background {
  position: fixed;
  z-index: 100; /* Lower stack order */
}
.modal-dialog {
  position: fixed;
  z-index: 101; /* Higher stack order, appears on top */
}`,
                prompt: 'How does `z-index` work with positioned elements?'
            },
        ]
    },
    {
        name: 'Layout: Flexbox',
        topics: [
            {
                title: 'Flex Container',
                content: `.container {
  display: flex;
  flex-direction: row; /* or column */
  flex-wrap: wrap; /* or nowrap */
}`,
                prompt: 'How do you create a flex container and set its main direction?',
                projectFiles: [
                  { type: 'file', name: 'index.html', content: `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"></head><body><div class="container"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div></body></html>` },
                  { type: 'file', name: 'style.css', content: `.container {\n  display: flex;\n  background-color: #ddd;\n  padding: 10px;\n}\n.item {\n  background-color: dodgerblue;\n  color: white;\n  padding: 20px;\n  margin: 5px;\n}` }
                ]
            },
            {
                title: 'justify-content',
                content: `/* Aligns items along the main axis (horizontally in a row) */
.container {
  display: flex;
  justify-content: space-between; /* center, flex-start, etc. */
}`,
                prompt: 'Explain what `justify-content` does in a flex container.'
            },
            {
                title: 'align-items',
                content: `/* Aligns items along the cross axis (vertically in a row) */
.container {
  display: flex;
  height: 200px;
  align-items: center; /* stretch, flex-start, etc. */
}`,
                prompt: 'Explain what `align-items` does in a flex container.'
            },
            {
                title: 'Flex Items',
                content: `.item {
  flex-grow: 1; /* Allows item to grow */
  flex-shrink: 1; /* Allows item to shrink */
  flex-basis: 200px; /* Initial size before distributing space */
  /* Shorthand: flex: 1 1 200px; */
}`,
                prompt: 'Explain flex-grow, flex-shrink, and flex-basis.'
            },
        ]
    },
    {
        name: 'Layout: CSS Grid',
        topics: [
            {
                title: 'Grid Container',
                content: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal-width columns */
  grid-template-rows: auto 100px; /* Two rows, first auto height, second 100px */
  gap: 10px; /* Space between grid cells */
}`,
                prompt: 'How do you create a basic grid with 3 columns and set the gap?'
            },
            {
                title: 'Spanning Columns & Rows',
                content: `.item-a {
  grid-column-start: 1;
  grid-column-end: 3; /* Spans from column line 1 to 3 */
  /* Shorthand: grid-column: 1 / 3; */
}
.item-b {
  grid-row: 1 / span 2; /* Spans 2 rows starting from row line 1 */
}`,
                prompt: 'How do you make a grid item span multiple columns or rows?'
            },
            {
                title: 'Grid Areas',
                content: `.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }`,
                prompt: 'What is `grid-template-areas` and how does it work?'
            },
        ]
    },
    {
        name: 'Responsive Design',
        topics: [
            {
                title: 'Media Queries',
                content: `/* Base styles */
.container { width: 960px; }

/* On screens 600px wide or less */
@media (max-width: 600px) {
  .container { width: 100%; }
}`,
                prompt: 'What are media queries and how are they used for responsive design?'
            },
            {
                title: 'Viewport Units',
                content: `.fullscreen-hero {
  width: 100vw; /* 100% of viewport width */
  height: 100vh; /* 100% of viewport height */
}`,
                prompt: 'Explain the `vw` and `vh` CSS units.'
            },
            {
                title: 'Fluid Layouts',
                content: `.container {
  width: 90%; /* Use percentages for widths */
  max-width: 1200px; /* Set a max size for large screens */
}`,
                prompt: 'How do you create a fluid layout using percentages and `max-width`?'
            },
        ]
    },
    {
        name: 'Transitions & Animations',
        topics: [
            {
                title: 'transition Property',
                content: `button {
  background-color: blue;
  transition: background-color 0.3s ease-in-out;
}
button:hover {
  background-color: skyblue;
}`,
                prompt: 'How do you create a smooth color change transition on a button?'
            },
            {
                title: 'transform Property',
                content: `.box:hover {
  transform: rotate(45deg) scale(1.1); /* Rotate and enlarge */
}`,
                prompt: 'Show examples of the `rotate`, `scale`, and `translate` transform functions.'
            },
            {
                title: 'animation & @keyframes',
                content: `@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
.box {
  animation: slide-in 1s ease-out;
}`,
                prompt: 'How do you define a simple animation using `@keyframes`?'
            },
        ]
    },
    {
        name: 'Advanced Topics',
        topics: [
            {
                title: 'CSS Variables',
                content: `:root {
  --main-color: #3498db;
}
button {
  background-color: var(--main-color);
}`,
                prompt: 'How do you declare and use a CSS variable (custom property)?'
            },
            {
                title: 'calc() function',
                content: `.container {
  width: calc(100% - 40px); /* Mix units */
}`,
                prompt: 'What is the `calc()` function used for in CSS?'
            },
            {
                title: 'object-fit',
                content: `img {
  width: 200px;
  height: 200px;
  object-fit: cover; /* Resizes to fill, cropping if needed */
}`,
                prompt: 'Explain how `object-fit: cover` works for images.'
            },
            {
                title: 'filter Property',
                content: `img:hover {
  filter: grayscale(100%) blur(2px);
}`,
                prompt: 'Show how to apply a grayscale and blur filter to an element.'
            },
        ]
    }
  ],
  javascript: [
    {
      name: 'JavaScript Fundamentals',
      topics: [
        {
          title: 'Variables (let, const, var)',
          content: `// 'let' for block-scoped variables that can be reassigned.
let message = "Hello";
message = "Hi"; // OK

// 'const' for block-scoped variables that cannot be reassigned.
const year = 2024;
// year = 2025; // Error!

// 'var' is the old way, function-scoped. Avoid using it.
var oldSchool = "don't use";`,
          prompt: 'Explain the difference between let, const, and var.',
          projectFiles: [
            { type: 'file', name: 'index.html', content: `<!DOCTYPE html><html><body><h1>Check the console!</h1><script src="script.js"></script></body></html>` },
            { type: 'file', name: 'script.js', content: `let message = "Hello from 'let'!";\nconsole.log(message);\n\nconst framework = "React";\nconsole.log("Framework is " + framework);\n\nvar legacy = "This is from 'var'.";\nconsole.log(legacy);` }
          ]
        },
        {
          title: 'Data Types',
          content: `// Primitives
let text = "a string";      // String
let num = 100;              // Number
let isLearning = true;      // Boolean
let notDefined = undefined; // Undefined
let noValue = null;         // Null
let id = Symbol('id');      // Symbol
let bigNum = 9007199254740991n; // BigInt

// Complex
let user = { name: 'John' }; // Object`,
          prompt: 'List all primitive data types in JavaScript with examples.'
        },
        {
            title: 'Operators',
            content: `let x = 10;
let y = 5;

// Arithmetic
console.log(x + y); // 15
console.log(x * y); // 50
console.log(x % y); // 0 (remainder)

// Comparison
console.log(x > y); // true
console.log('10' == x); // true (loose equality)
console.log('10' === x); // false (strict equality)

// Logical
let a = true;
let b = false;
console.log(a && b); // false (AND)
console.log(a || b); // true (OR)`,
            prompt: 'Explain the difference between `==` and `===`.'
        },
        {
            title: 'Type Coercion',
            content: `console.log('5' + 3);   // "53" (string concatenation)
console.log('5' - 3);   // 2 (numeric subtraction)
console.log('5' * 3);   // 15 (numeric multiplication)
console.log(true + 1);  // 2 (boolean converted to number)
console.log(5 + null);  // 5 (null converted to 0)`,
            prompt: 'What is type coercion in JavaScript? Give an example.'
        },
      ],
    },
    {
        name: 'Control Flow',
        topics: [
            {
                title: 'if / else / else if',
                content: `const hour = 14;
if (hour < 12) {
  console.log('Good morning!');
} else if (hour < 18) {
  console.log('Good afternoon!');
} else {
  console.log('Good evening!');
}`,
                prompt: 'Show the syntax for an if-else if-else statement.'
            },
            {
                title: 'Ternary Operator',
                content: `const age = 20;
const message = age >= 18 ? 'You can vote.' : 'You cannot vote yet.';
console.log(message);`,
                prompt: 'What is the ternary operator and when is it useful?'
            },
            {
                title: 'switch Statement',
                content: `const day = 'Monday';
switch (day) {
  case 'Monday':
    console.log('Start of the week!');
    break;
  case 'Friday':
    console.log('Weekend is almost here!');
    break;
  default:
    console.log('Another day.');
}`,
                prompt: 'How does a switch statement work?'
            },
            {
                title: 'for Loop',
                content: `for (let i = 0; i < 5; i++) {
  console.log('The number is ' + i);
}`,
                prompt: 'Write a `for` loop that prints numbers from 1 to 5.'
            },
            {
                title: 'while Loop',
                content: `let i = 0;
while (i < 5) {
  console.log('The number is ' + i);
  i++;
}`,
                prompt: 'What is the difference between a `for` loop and a `while` loop?'
            },
            {
                title: 'for...of vs for...in',
                content: `const fruits = ['apple', 'banana', 'cherry'];
// for...of iterates over values
for (const fruit of fruits) {
  console.log(fruit);
}

const user = { name: 'Alice', age: 25 };
// for...in iterates over keys/properties
for (const key in user) {
  console.log(key + ': ' + user[key]);
}`,
                prompt: 'Explain the difference between `for...of` and `for...in` loops.'
            },
        ]
    },
    {
      name: 'Functions In-Depth',
      topics: [
        {
          title: 'Function Declarations',
          content: `// Hoisted: can be called before it's defined.
greet('World');

function greet(name) {
  console.log('Hello, ' + name);
}`,
          prompt: 'What is a function declaration and what does it mean that it is "hoisted"?'
        },
        {
          title: 'Function Expressions',
          content: `// Not hoisted: must be defined before it is called.
const sayGoodbye = function(name) {
  console.log('Goodbye, ' + name);
};

sayGoodbye('World');`,
          prompt: 'What is a function expression?'
        },
        {
          title: 'Arrow Functions',
          content: `// Concise syntax for function expressions.
const add = (a, b) => a + b;

const square = (n) => {
  return n * n;
};`,
          prompt: 'What are the main benefits of using arrow functions?'
        },
        {
          title: 'Parameters & Arguments',
          content: `// Default parameters
function greet(name = 'Guest') {
  console.log('Hello, ' + name);
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`,
          prompt: 'What are default and rest parameters in functions?'
        },
        {
          title: 'Scope & Closures',
          content: `function outer() {
  let count = 0; // 'count' is in the outer scope.

  // The inner function has access to 'count'.
  // This combination is a closure.
  function inner() {
    count++;
    console.log(count);
  }
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2`,
          prompt: 'What is a closure in JavaScript? Provide a simple example.'
        },
        {
            title: 'The `this` Keyword',
            content: `const user = {
  name: 'Bob',
  greet() {
    // Here, 'this' refers to the 'user' object.
    console.log('Hello, my name is ' + this.name);
  }
};

user.greet();`,
            prompt: 'Explain what the `this` keyword typically refers to inside an object method.'
        }
      ],
    },
    {
        name: 'Arrays and Objects',
        topics: [
            {
                title: 'Array Methods: map, filter, reduce',
                content: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
const sum = numbers.reduce((total, num) => total + num, 0); // 15`,
                prompt: 'Explain the map, filter, and reduce array methods.'
            },
            {
                title: 'Array Methods: find, some, every',
                content: `const numbers = [1, -2, 3, -4, 5];
const firstPositive = numbers.find(num => num > 0); // 1
const hasPositive = numbers.some(num => num > 0); // true
const allPositive = numbers.every(num => num > 0); // false`,
                prompt: 'What do the `find`, `some`, and `every` array methods do?'
            },
            {
                title: 'Array & Object Destructuring',
                content: `// Array destructuring
const [first, second] = ['apple', 'banana', 'cherry'];
console.log(first); // 'apple'

// Object destructuring
const user = { name: 'Alice', age: 30 };
const { name, age } = user;
console.log(name); // 'Alice'`,
                prompt: 'Show an example of both array and object destructuring.'
            },
            {
                title: 'Spread Syntax',
                content: `const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }`,
                prompt: 'Show examples of the spread syntax for both arrays and objects.'
            },
             {
                title: 'Object Keys, Values, Entries',
                content: `const user = { name: 'Alice', age: 30 };

console.log(Object.keys(user));   // ['name', 'age']
console.log(Object.values(user)); // ['Alice', 30]
console.log(Object.entries(user)); // [['name', 'Alice'], ['age', 30]]`,
                prompt: 'How can you get an array of an object\'s keys, values, or entries?'
            }
        ]
    },
    {
        name: 'ES6+ Features',
        topics: [
             {
                title: 'Template Literals',
                content: `const name = 'World';
const greeting = \`Hello, \${name}!\`;
console.log(greeting);`,
                prompt: 'What are template literals and how do you embed expressions in them?'
            },
            {
                title: 'Modules: import / export',
                content: `// 📁 math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// 📁 main.js
import multiply, { add } from './math.js';
console.log(add(2, 3));
console.log(multiply(2, 3));`,
                prompt: 'Explain the difference between a default and a named export.'
            },
            {
                title: 'Classes',
                content: `class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
}
const alice = new Person('Alice');
alice.greet();`,
                prompt: 'What is a class in JavaScript? Show a simple example.'
            },
             {
                title: 'Optional Chaining (?.)',
                content: `const user = {
  name: 'John',
  // address property is missing
};

// Instead of: user.address.street (which would throw an error)
// We can do this:
const street = user?.address?.street;
console.log(street); // undefined (no error)`,
                prompt: 'What problem does optional chaining solve?'
            },
            {
                title: 'Nullish Coalescing (??)',
                content: `let name = null;
let defaultName = 'Guest';

// Returns the right-hand side if the left-hand side is null or undefined.
let displayName = name ?? defaultName;
console.log(displayName); // 'Guest'`,
                prompt: 'How is the nullish coalescing operator (??) different from the logical OR (||) operator?'
            },
        ]
    },
    {
        name: 'Asynchronous JS',
        topics: [
            {
                title: 'The Event Loop',
                content: `console.log('First'); // 1. Runs immediately

setTimeout(() => {
  console.log('Third'); // 3. Runs after the stack is clear
}, 0);

console.log('Second'); // 2. Runs immediately`,
                prompt: 'Explain the JavaScript event loop at a high level.'
            },
            {
                title: 'Callback Functions',
                content: `function fetchData(callback) {
  // Simulate a network request
  setTimeout(() => {
    const data = { message: 'Data received' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data.message);
});`,
                prompt: 'What is a callback function?'
            },
            {
                title: 'Promises',
                content: `const myPromise = new Promise((resolve, reject) => {
  let success = true; // Simulate a successful operation
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed.");
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
                prompt: 'What are the three states of a Promise?'
            },
            {
                title: 'async/await',
                content: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

fetchData();`,
                prompt: 'How does async/await simplify working with Promises?'
            },
            {
                title: 'Promise.all',
                content: `const promise1 = Promise.resolve('First');
const promise2 = new Promise(resolve => setTimeout(resolve, 100, 'Second'));
const promise3 = fetch('https://api.example.com/data');

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log('All promises have resolved:', values);
  })
  .catch(error => {
    console.error('One of the promises rejected:', error);
  });`,
                prompt: 'When would you use `Promise.all`?'
            }
        ]
    },
    {
      name: 'DOM Manipulation',
      topics: [
        {
          title: 'Selecting Elements',
          content: `// By ID (fastest)
const mainTitle = document.getElementById('main-title');

// By CSS selector (most versatile)
const paragraph = document.querySelector('p.intro');
const allButtons = document.querySelectorAll('button');`,
          prompt: 'What is the difference between querySelector and querySelectorAll?'
        },
        {
          title: 'Changing Content & Attributes',
          content: `const header = document.getElementById('header');
// Change text content (safe)
header.textContent = "DOM Manipulation Fun!";

// Change inner HTML (can be risky)
header.innerHTML = '<em>DOM Manipulation Fun!</em>';

// Change an attribute
const link = document.querySelector('a');
link.setAttribute('href', 'https://www.bing.com');`,
          prompt: 'What is the security risk of using innerHTML?'
        },
        {
            title: 'Styling Elements',
            content: `const header = document.getElementById('header');
header.style.color = 'blue';
header.style.fontSize = '24px'; // Note: camelCase for CSS properties

// Using classes is often better
header.classList.add('important-title');
header.classList.remove('old-class');
header.classList.toggle('active');`,
            prompt: 'What are two ways to change an element\'s style using JavaScript?'
        },
        {
            title: 'Creating & Appending Elements',
            content: `const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a new paragraph.';

const container = document.getElementById('container');
container.appendChild(newParagraph);`,
            prompt: 'How do you create a new HTML element and add it to the page?'
        },
        {
            title: 'Event Handling',
            content: `const button = document.getElementById('my-button');

function handleClick() {
  alert('Button was clicked!');
}

// The recommended way to add event listeners
button.addEventListener('click', handleClick);`,
            prompt: 'What is the benefit of using `addEventListener` over `onclick`?',
            projectFiles: [
                { type: 'file', name: 'index.html', content: `<!DOCTYPE html><html><head><link rel="stylesheet" href="style.css"></head><body><button id="my-button">Click Me!</button><p id="message"></p><script src="script.js"></script></body></html>` },
                { type: 'file', name: 'style.css', content: `button { padding: 10px 15px; font-size: 16px; cursor: pointer; } #message { margin-top: 10px; font-weight: bold; }` },
                { type: 'file', name: 'script.js', content: `const button = document.getElementById('my-button');\nconst message = document.getElementById('message');\nlet count = 0;\n\nbutton.addEventListener('click', () => {\n  count++;\n  message.textContent = \`Button clicked \${count} times.\`;\n});` }
            ]
        },
      ],
    },
     {
        name: 'Web APIs',
        topics: [
            {
                title: 'Fetch API',
                content: `fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));`,
                prompt: 'How do you make a simple GET request using the Fetch API?'
            },
            {
                title: 'Local Storage',
                content: `// Store data
localStorage.setItem('username', 'Alice');

// Get data
const username = localStorage.getItem('username');
console.log(username); // "Alice"

// Remove data
localStorage.removeItem('username');`,
                prompt: 'What is the difference between localStorage and sessionStorage?'
            },
            {
                title: 'Timers',
                content: `// Runs once after 2 seconds
const timeoutId = setTimeout(() => {
  console.log('2 seconds have passed.');
}, 2000);
// clearTimeout(timeoutId); // This would prevent it from running

// Runs every 1 second
const intervalId = setInterval(() => {
  console.log('Tick');
}, 1000);
// clearInterval(intervalId); // This would stop the ticking`,
                prompt: 'Explain the difference between `setTimeout` and `setInterval`.'
            },
        ]
    }
  ],
  typescript: [
    {
      name: 'TypeScript Fundamentals',
      topics: [
        {
          title: 'Intro to TypeScript',
          content: `// TypeScript is a superset of JavaScript that adds static types.
// It helps catch errors early during development.
function greet(name: string) {
  // name.toUpperCase() is safe because 'name' is a string.
  console.log("Hello, " + name.toUpperCase() + "!!");
}
// greet(42); // This would cause a compile-time error.`,
          prompt: 'What is TypeScript and how does it relate to JavaScript?'
        },
        {
          title: 'Basic Types',
          content: `let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 10];`,
          prompt: 'Show examples of basic types like boolean, number, string, array, and tuple in TypeScript.'
        },
        {
            title: 'any, unknown, void, never',
            content: `let notSure: any = 4;
notSure = "maybe a string instead"; // OK

let maybe: unknown = 10;
// let num: number = maybe; // Error: Type 'unknown' is not assignable to type 'number'.
if (typeof maybe === 'number') {
  let num: number = maybe; // OK
}

function warnUser(): void {
  console.log("This is a warning");
}

function error(message: string): never {
  throw new Error(message);
}`,
            prompt: 'Explain the special types `any`, `unknown`, `void`, and `never`.'
        },
        {
            title: 'Type Assertions',
            content: `let someValue: unknown = "this is a string";

// Using 'as' syntax (preferred for JSX)
let strLength: number = (someValue as string).length;

// Using '<>' syntax
let strLength2: number = (<string>someValue).length;`,
            prompt: 'What are type assertions and when would you use them?'
        },
      ]
    },
    {
        name: 'Interfaces and Type Aliases',
        topics: [
            {
                title: 'Interfaces',
                content: `interface User {
  readonly id: number; // Readonly property
  name: string;
  age: number;
  isPremium?: boolean; // Optional property
}

function printUser(user: User) {
  console.log(\`User \${user.name} (\${user.id}) is \${user.age}\`);
}`,
                prompt: 'How do you define and use an interface with optional and readonly properties?'
            },
            {
                title: 'Extending Interfaces',
                content: `interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

const employee: Employee = { name: "Alice", employeeId: 123 };`,
                prompt: 'Show how to extend an interface in TypeScript.'
            },
            {
                title: 'Type Aliases',
                content: `type Point = {
  x: number;
  y: number;
};

type UserID = string | number; // Union type

let id: UserID = '123-abc';
id = 123;`,
                prompt: 'What is a type alias and how does it differ from an interface?'
            },
            {
                title: 'Index Signatures',
                content: `interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred"];
const first = myArray[0];

interface Dictionary {
    [key: string]: number;
}
const scores: Dictionary = { math: 95, science: 88 };`,
                prompt: 'What are index signatures in TypeScript interfaces?'
            }
        ]
    },
    {
        name: 'Functions in TypeScript',
        topics: [
            {
                title: 'Typing Functions',
                content: `// Named function with typed parameters and return value
function add(x: number, y: number): number {
    return x + y;
}

// Function expression
const subtract = (x: number, y: number): number => {
    return x - y;
};`,
                prompt: 'How do you add type annotations to function parameters and return values?'
            },
            {
                title: 'Optional & Default Parameters',
                content: `// Optional parameter 'lastName'
function buildName(firstName: string, lastName?: string) {
    return firstName + " " + (lastName || "");
}

// Default parameter 'lastName'
function buildNameDefault(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}`,
                prompt: 'Explain the difference between optional and default parameters in TypeScript functions.'
            },
            {
                title: 'Rest Parameters',
                content: `function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");`,
                prompt: 'How do rest parameters work in TypeScript?'
            }
        ]
    },
    {
      name: 'Classes and OOP',
      topics: [
        {
          title: 'Basic Classes',
          content: `class Greeter {
  greeting: string; // Property
  constructor(message: string) {
    this.greeting = message;
  }
  greet() { // Method
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");`,
          prompt: 'Show a basic class definition in TypeScript.'
        },
        {
          title: 'Inheritance',
          content: `class Animal {
  move(distanceInMeters: number = 0) {
    console.log(\`Animal moved \${distanceInMeters}m.\`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}`,
          prompt: 'How does inheritance work in TypeScript classes?'
        },
        {
          title: 'Access Modifiers',
          content: `class Person {
  public name: string; // Accessible everywhere (default)
  private age: number; // Only accessible within this class
  protected ssn: string; // Accessible within this class and subclasses

  constructor(name: string, age: number, ssn: string) {
    this.name = name;
    this.age = age;
    this.ssn = ssn;
  }
}`,
          prompt: 'Explain the `public`, `private`, and `protected` access modifiers.'
        },
        {
          title: 'Abstract Classes',
          content: `abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // Must be implemented in derived class
}

class AccountingDepartment extends Department {
  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
}`,
          prompt: 'What is an abstract class and when would you use one?'
        },
      ]
    },
    {
        name: 'Advanced Types',
        topics: [
            {
                title: 'Union Types',
                content: `// A variable that can be one of several types
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}`,
                prompt: 'What are union types and how do you work with them?'
            },
            {
                title: 'Intersection Types',
                content: `interface Colorful { color: string; }
interface Circle { radius: number; }

// An intersection type combines multiple types into one.
type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = { color: "red", radius: 42 };`,
                prompt: 'What are intersection types?'
            },
            {
                title: 'Type Guards',
                content: `// Example interfaces
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
      pet.swim(); // pet is now known to be a Fish
  } else {
      pet.fly(); // pet is known to be a Bird
  }
}`,
                prompt: 'Explain what a type guard is with an example.'
            },
            {
                title: 'Enums',
                content: `enum Direction {
  Up,    // 0 by default
  Down,  // 1
  Left,  // 2
  Right  // 3
}

enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE"
}

let go: Direction = Direction.Up;
let reqStatus: Status = Status.Success;`,
                prompt: 'Explain numeric and string enums in TypeScript.'
            }
        ]
    },
    {
        name: 'Generics',
        topics: [
            {
                title: 'Generic Functions',
                content: `function identity<T>(arg: T): T {
  return arg;
}

let outputStr = identity<string>("myString");
let outputNum = identity<number>(100);`,
                prompt: 'What are Generics in TypeScript and why are they useful for functions?'
            },
            {
                title: 'Generic Interfaces',
                content: `interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;`,
                prompt: 'Show an example of a generic interface.'
            },
            {
                title: 'Generic Classes',
                content: `class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};`,
                prompt: 'How do you create a generic class?'
            },
            {
                title: 'Generic Constraints',
                content: `interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // Now we know it has a .length property
    return arg;
}
loggingIdentity({length: 10, value: 3}); // OK
// loggingIdentity(3); // Error, number doesn't have a .length property`,
                prompt: 'How can you constrain the types that a generic type parameter can accept?'
            },
        ]
    },
    {
      name: 'Utility Types',
      topics: [
        {
          title: 'Partial<T> & Required<T>',
          content: `interface Todo { title: string; description: string; }
// Makes all properties optional
const partialTodo: Partial<Todo> = { title: 'Clean room' };

// Makes all properties required
const requiredTodo: Required<Partial<Todo>> = { title: 'A', description: 'B'};`,
          prompt: 'Explain Partial<T> and Required<T> utility types.'
        },
        {
          title: 'Readonly<T>',
          content: `interface Todo { title: string; }
const todo: Readonly<Todo> = { title: "Delete inactive users" };
// todo.title = "Hello"; // Error! Cannot assign to 'title'`,
          prompt: 'What does the Readonly<T> utility type do?'
        },
        {
          title: 'Record<K,T>',
          content: `interface PageInfo { title: string; }
type Page = 'home' | 'about' | 'contact';

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};`,
          prompt: 'Explain the Record<K,T> utility type.'
        },
        {
          title: 'Pick<T,K> & Omit<T,K>',
          content: `interface Todo { title: string; description: string; completed: boolean; }

// Pick creates a type with only the specified properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit creates a type with all properties except the specified ones
type TodoEdit = Omit<Todo, "completed">;`,
          prompt: 'What is the difference between Pick<T,K> and Omit<T,K>?'
        },
      ]
    },
    {
        name: 'Configuration',
        topics: [
            {
                title: 'tsconfig.json',
                content: `{
  "compilerOptions": {
    "target": "ES6",          // Specify ECMAScript target version
    "module": "commonjs",     // Specify module code generation
    "strict": true,           // Enable all strict type-checking options
    "esModuleInterop": true,  // Enables compatibility with CommonJS modules
    "outDir": "./dist",       // Redirect output structure to the directory
    "rootDir": "./src"        // Specify the root directory of input files
  },
  "include": ["src/**/*"]
}`,
                prompt: 'What is the purpose of `tsconfig.json` and what are some common options?'
            }
        ]
    }
  ],
};


export const INITIAL_TERMINAL = `Welcome to the Interactive Node.js Terminal.
Supports npm commands like 'install', 'update', and 'uninstall'.
Try running 'npm install' to install dependencies from package.json.`;
