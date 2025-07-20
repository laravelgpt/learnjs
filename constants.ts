import { LearningContent } from './types';

// The type annotation has been removed from DEFAULT_FILESYSTEM.
// The `addIdsToFS` function in App.tsx adds the required 'id' fields at runtime,
// so this initial data structure does not need to conform to the strict types.
export const DEFAULT_FILESYSTEM = [
  {
    type: 'folder',
    name: 'My Vue.js Project',
    children: [
      {
        type: 'file',
        name: 'index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Project</title>
  <script src="https://unpkg.com/vue@3"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
  </div>

  <script src="script.js"></script>
</body>
</html>`
      },
      {
        type: 'file',
        name: 'script.js',
        content: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref('Welcome to your Vue.js project!');

    function changeMessage() {
      message.value = 'You clicked the button!';
    }

    return {
      message,
      changeMessage
    };
  }
}).mount('#app');`
      },
      {
        type: 'file',
        name: 'style.css',
        content: `body {
  background-color: #1a202c;
  color: #e2e8f0;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

#app {
  text-align: center;
  background-color: #2d3748;
  padding: 2rem 4rem;
  border-radius: 8px;
  border: 1px solid #4a5568;
}

h1 {
  color: #68d391;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #68d391;
  color: #1a202c;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}`
      },
       {
        type: 'file',
        name: 'package.json',
        content: `{
  "name": "my-vue-app",
  "version": "1.0.0",
  "description": "A simple Vue.js project.",
  "dependencies": {
    "vue": "^3.4.0"
  }
}`
      },
    ]
  }
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
For 50 years, WWF has be protecting the future of nature.
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
  nextjs: [
    {
      name: 'App Router Fundamentals',
      topics: [
        {
          title: 'Pages and Layouts',
          prompt: 'Explain the role of page.tsx and layout.tsx in the App Router.',
          content: `// In Next.js, a file named 'page.tsx' creates a new public route.
// A 'layout.tsx' file defines a shared UI that wraps around pages.

function Component() {
  const containerStyles = {
    border: '1px solid #ccc',
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
  };

  return (
    <div>
      {/* This is like a layout.tsx */}
      <div style={{...containerStyles, backgroundColor: '#e0f7fa'}}>
        <p>I am a <strong>Layout</strong>. I stay the same across pages.</p>
        
        {/* This is like a page.tsx */}
        <div style={{...containerStyles, backgroundColor: '#fffde7'}}>
          <p>I am a <strong>Page</strong>. My content will change.</p>
        </div>
      </div>
    </div>
  );
}`
        },
        {
          title: 'Server Components',
          prompt: 'What are the key characteristics of a Server Component?',
          content: `function Component() {
  // This component acts like a Server Component.
  // It can't use hooks like useState, but it can be async to fetch data.
  // In this simulation, we'll just show its static nature.
  
  const serverTime = new Date().toLocaleTimeString();

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Hello from a Server Component!</h3>
      <p>This content was "rendered" on the server.</p>
      <p>Render time: {serverTime}</p>
      <p>(Note: In a real app, this time wouldn't update without a refresh)</p>
    </div>
  );
}`
        },
        {
          title: 'Client Components',
          prompt: "How do you create a Client Component and when is it needed?",
          content: `'use client';
// The 'use client' directive marks this as a Client Component.
// This allows you to use hooks like useState and useEffect for interactivity.

function Component() {
  const [count, setCount] = React.useState(0);

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div>
      <h3>Hello from a Client Component!</h3>
      <p>You have clicked the button {count} times.</p>
      <button onClick={() => setCount(count + 1)} style={buttonStyle}>
        Click me
      </button>
    </div>
  );
}`
        },
        {
          title: 'The <Link> Component',
          prompt: 'What is the benefit of using <Link> over a regular <a> tag?',
          content: `// The <Link> component enables client-side navigation,
// which is much faster than a full-page reload from a normal <a> tag.
// In this preview, clicking the links will feel instant.

function Component() {
  const [page, setPage] = React.useState('home');

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  };
  const linkStyle = {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer'
  };

  return (
    <div>
      <nav style={navStyle}>
        {/* These act like <Link> components */}
        <a onClick={() => setPage('home')} style={linkStyle}>Home</a>
        <a onClick={() => setPage('about')} style={linkStyle}>About</a>
        <a onClick={() => setPage('profile')} style={linkStyle}>Profile</a>
      </nav>
      <hr/>
      <div style={{marginTop: '1rem'}}>
        {page === 'home' && <h2>Home Page</h2>}
        {page === 'about' && <h2>About Page</h2>}
        {page === 'profile' && <h2>User Profile</h2>}
      </div>
    </div>
  );
}`
        },
        {
          title: 'Dynamic Segments',
          prompt: 'How do you create a dynamic route to handle different blog post slugs?',
          content: `function Component() {
  // This simulates a dynamic route like /blog/[slug]
  const [slug, setSlug] = React.useState('hello-world');

  const containerStyle = {
    fontFamily: 'sans-serif'
  };
  const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    marginTop: '4px'
  };

  return (
    <div style={containerStyle}>
      <label>
        Change the slug to see the page update:
        <br />
        <input 
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={inputStyle}
        />
      </label>
      <hr style={{margin: '1rem 0'}}/>
      <h2>Blog Post</h2>
      <p>
        Current slug: <strong>{slug}</strong>
      </p>
    </div>
  );
}`
        }
      ]
    },
    {
      name: 'Data Fetching',
      topics: [
        {
          title: 'Static Fetching (SSG)',
          prompt: 'How does Next.js handle `fetch` requests by default?',
          content: `function Component() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // This fetch is cached by default in Next.js (SSG).
    // The data is fetched at build time.
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once.
  
  return (
    <div>
      <h3>Static Data</h3>
      {loading && <p>Loading...</p>}
      {data && <pre><code>{JSON.stringify(data, null, 2)}</code></pre>}
    </div>
  );
}`
        },
        {
          title: 'Dynamic Fetching (SSR)',
          prompt: 'How can you ensure data is fetched fresh for every user request?',
          content: `function Component() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchData = () => {
    setLoading(true);
    // In Next.js, you'd add { cache: 'no-store' } to the fetch options.
    // This forces a new fetch on every request (SSR).
    // We simulate this by fetching a new random user each time.
    const randomId = Math.floor(Math.random() * 10) + 1;
    fetch(\`https://jsonplaceholder.typicode.com/users/\${randomId}\`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  };
  
  React.useEffect(fetchData, []);

  return (
    <div>
      <h3>Dynamic Data (New on each load)</h3>
      <button onClick={fetchData} disabled={loading}>
        Fetch New User
      </button>
      <hr style={{margin: '1rem 0'}}/>
      {loading && <p>Loading...</p>}
      {data && <pre><code>{JSON.stringify(data, null, 2)}</code></pre>}
    </div>
  );
}`
        },
        {
          title: 'Server Actions',
          prompt: 'What are Server Actions and what problem do they solve?',
          content: `function Component() {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');

  // This simulates a Server Action.
  // It's an async function that runs on the server.
  const formAction = async (formData) => {
    setResult('Processing on the "server"...');
    // In a real app, this would be a server-side database call.
    // We'll just simulate a delay.
    await new Promise(res => setTimeout(res, 1000));
    const comment = formData.get('comment');
    setResult(\`Server received: "\${comment}"\`);
    setText('');
  };

  return (
    <form action={formAction}>
      <textarea
        name="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        style={{width: '95%', padding: '4px'}}
        placeholder="Write a comment..."
      />
      <button type="submit" style={{marginTop: '8px'}}>Submit</button>
      {result && <p style={{marginTop: '8px'}}><strong>Result:</strong> {result}</p>}
    </form>
  );
}`
        }
      ]
    },
    {
      name: 'Route Handlers',
      topics: [
        {
          title: 'Creating a GET Handler',
          prompt: 'How do you create a simple GET API endpoint in the App Router?',
          content: `// In the App Router, you create API endpoints by adding a 'route.ts'
// (or .js) file inside a route segment.
// For example, this code would live in 'app/api/hello/route.ts'

import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello from the API!' })
}
`,
          projectFiles: [
            {
              type: 'file',
              name: 'index.html',
              content: `<div id="root"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `import React from 'react';
import { createRoot } from 'react-dom/client';

// This component simulates calling the API endpoint defined in the lesson.
function App() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const callApi = async () => {
    setLoading(true);
    setData(null);
    // In a real app, this would fetch from '/api/hello'.
    // We simulate the response here.
    await new Promise(res => setTimeout(res, 500));
    setData({ message: 'Hello from the API!' });
    setLoading(false);
  };
  
  return (
    <div>
      <p>This button simulates a fetch to an API endpoint at <code>/api/hello</code>.</p>
      <button onClick={callApi} disabled={loading}>{loading ? 'Loading...' : 'Call API'}</button>
      {data && <pre style={{marginTop: '1rem'}}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);`
            }
          ]
        }
      ]
    },
    {
      name: 'Optimization',
      topics: [
        {
          title: 'Image Component',
          prompt: 'What are the main benefits of using the next/image component?',
          content: `function Component() {
  return (
    <div>
      <p>The <strong>next/image</strong> component optimizes images for you.</p>
      <ul>
        <li>Resizes images for different devices</li>
        <li>Converts to modern formats like WebP</li>
        <li>Lazy loads images by default</li>
      </ul>
      <img 
        src="https://images.unsplash.com/photo-1627483298235-f3bac25d71c3?w=200"
        alt="A placeholder landscape"
        style={{width: 200, height: 120, objectFit: 'cover', marginTop: '1rem'}}
      />
    </div>
  );
}`
        },
        {
          title: 'Font Optimization',
          prompt: 'How does next/font improve performance?',
          content: `function Component() {
  return (
    <div>
      <p>The <strong>next/font</strong> component optimizes fonts by:</p>
      <ul>
        <li>Self-hosting them (no extra network request)</li>
        <li>Preventing layout shifts</li>
      </ul>
      <p style={{fontFamily: 'Georgia, serif'}}>
        This text is using a standard web-safe font.
      </p>
      <p style={{fontFamily: 'cursive'}}>
        This text uses another font to show the difference.
      </p>
    </div>
  );
}`
        },
        {
          title: 'Dynamic Metadata',
          prompt: 'How do you dynamically generate metadata for a page?',
          content: `// You can export a 'generateMetadata' function from a page
// to dynamically create metadata based on params or fetched data.

import type { Metadata } from 'next'
 
type Props = {
  params: { slug: string }
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const product = await fetch(\`https://api.example.com/products/\${params.slug}\`).then((res) => res.json())
 
  return {
    title: product.title,
    description: product.description,
  }
}
 
export default function Page({ params }: Props) {
  return <h1>Product: {params.slug}</h1>
}`,
          projectFiles: [
            {
              type: 'file', name: 'index.html', content: `<div id="root"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [slug, setSlug] = React.useState('awesome-product');

  // This simulates the outcome of dynamic metadata.
  // In a real Next.js app, the browser tab title and meta tags would update.
  const dynamicTitle = \`Title: \${slug.replace(/-/g, ' ')}\`;

  return (
    <div>
      <p>Change the slug to see the simulated metadata update.</p>
      <input 
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        style={{width: '90%', padding: '8px'}}
      />
      <hr style={{margin: '1rem 0'}}/>
      <h3>Simulated Page Metadata:</h3>
      <p><strong>Browser Tab Title:</strong></p>
      <div style={{
        background: '#111827', 
        padding: '0.5rem 1rem', 
        borderRadius: '4px',
        fontFamily: 'monospace'
      }}>
        {dynamicTitle}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);`
            }
          ]
        },
      ]
    },
    {
      name: 'Advanced Concepts',
      topics: [
        {
          title: 'Middleware',
          prompt: 'What is middleware and what are some common use cases?',
          content: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware allows you to run code before a request is completed.
// Based on the incoming request, you can modify the response by
// rewriting, redirecting, modifying headers, or responding directly.
export function middleware(request: NextRequest) {
  // Example: Redirect to a login page if not authenticated
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const isAuthenticated = request.cookies.has('auth-token');
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}`,
          projectFiles: [
            {
              type: 'file',
              name: 'index.html',
              content: `<div id="root"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `import React from 'react';
import { createRoot } from 'react-dom/client';

// In Next.js, middleware runs on the server before a request is completed.
// We can simulate it here.

function App() {
  const [path, setPath] = React.useState('/');
  const [log, setLog] = React.useState('');

  const navigate = (newPath) => {
    let finalPath = newPath;
    // --- Middleware logic simulation ---
    let logMessage = 'Navigating to ' + newPath;
    if (newPath.startsWith('/dashboard') && !isLoggedIn) {
      finalPath = '/login';
      logMessage += ' -> Redirected by middleware!';
    }
    // --- End middleware logic ---
    setPath(finalPath);
    setLog(logMessage);
  };
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div>
      <p><strong>Logged In:</strong> {isLoggedIn.toString()}</p>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Toggle Login</button>
      <hr style={{margin:'1rem 0'}}/>
      <nav style={{display:'flex', gap:'1rem'}}>
        <a style={{cursor:'pointer', color:'blue'}} onClick={() => navigate('/')}>Home</a>
        <a style={{cursor:'pointer', color:'blue'}} onClick={() => navigate('/dashboard')}>Dashboard</a>
      </nav>
      <div style={{marginTop:'1rem', padding:'1rem', border:'1px solid #eee'}}>
        <p><strong>Current Page:</strong> {path}</p>
      </div>
       <pre style={{marginTop:'1rem', color:'green'}}>{log}</pre>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App/>);`
            }
          ]
        },
        {
          title: 'Environment Variables',
          prompt: 'How do you expose an environment variable to the browser?',
          content: `function Component() {
  // In Next.js, variables prefixed with NEXT_PUBLIC_ are available in the browser.
  const analyticsId = "G-123XYZ"; // Simulating process.env.NEXT_PUBLIC_ANALYTICS_ID
  const serverKey = "secret_key_123"; // Simulating process.env.SERVER_API_KEY

  return (
    <div>
      <p>
        <strong>Public variable (e.g., Analytics ID):</strong> 
        <span>{analyticsId}</span>
      </p>
      <p>
        <strong>Server-only variable (e.g., API Key):</strong> 
        <span>(This would not be visible in the browser)</span>
      </p>
    </div>
  );
}`
        }
      ]
    }
  ],
  vuejs: [
    {
      name: 'Vue 3 Fundamentals',
      topics: [
        {
          title: 'Template Syntax & Data',
          prompt: 'How do you display dynamic data in a Vue template?',
          content: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref('Hello Vue!');
    return { message };
  },
  template: \`
    <div>
      <h1>{{ message }}</h1>
      <input v-model="message" />
    </div>
  \`
}).mount('#app')`
        },
        {
          title: 'Attribute Bindings',
          prompt: 'What is the shorthand for `v-bind`?',
          content: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const imageSrc = ref('https://vuejs.org/images/logo.png');
    const isButtonDisabled = ref(false);
    
    return { imageSrc, isButtonDisabled };
  },
  template: \`
    <div>
      <img :src="imageSrc" alt="Vue Logo" width="50" />
      <br />
      <button :disabled="isButtonDisabled">A Button</button>
      <br />
      <button @click="isButtonDisabled = !isButtonDisabled">Toggle Button</button>
    </div>
  \`
}).mount('#app')`
        },
      ]
    },
    {
      name: 'Reactivity with Composition API',
      topics: [
        {
          title: 'ref()',
          prompt: 'Why do you need to use `.value` with `ref`s in JavaScript?',
          content: `const { createApp, ref } = Vue;

createApp({
  setup() {
    // ref() makes a value reactive.
    const count = ref(0);
    
    // You must use .value in script
    function increment() {
      count.value++;
    }
    
    return { count, increment };
  },
  // In the template, .value is not needed
  template: \`
    <button @click="increment">
      Count is: {{ count }}
    </button>
  \`
}).mount('#app')`
        },
        {
          title: 'reactive()',
          prompt: 'What is the main difference between `ref()` and `reactive()`?',
          content: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    // reactive() is for objects. You don't use .value.
    const state = reactive({
      count: 0,
      user: { name: 'Alice' }
    });
    
    return { state };
  },
  template: \`
    <div>
      <p>Count: {{ state.count }}</p>
      <p>User: {{ state.user.name }}</p>
      <button @click="state.count++">Increment</button>
    </div>
  \`
}).mount('#app')`
        },
        {
          title: 'computed()',
          prompt: 'What is a computed property and when would you use one?',
          content: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');

    const fullName = computed(() => {
      return \`\${firstName.value} \${lastName.value}\`;
    });
    
    return { firstName, lastName, fullName };
  },
  template: \`
    <div>
      <input v-model="firstName" placeholder="First Name"/>
      <input v-model="lastName" placeholder="Last Name"/>
      <p>Full Name: <strong>{{ fullName }}</strong></p>
    </div>
  \`
}).mount('#app')`
        },
        {
          title: 'watch()',
          prompt: 'How can you watch for changes in a `ref`?',
          content: `const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const question = ref('');
    const answer = ref('Ask a question with a ?');

    watch(question, (newQuestion, oldQuestion) => {
      if (newQuestion.includes('?')) {
        answer.value = 'Thinking...';
        setTimeout(() => {
          answer.value = 'That is a good question!';
        }, 1000);
      }
    });
    
    return { question, answer };
  },
  template: \`
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="question" />
      </p>
      <p>{{ answer }}</p>
    </div>
  \`
}).mount('#app')`
        },
      ]
    },
    {
      name: 'Conditional and List Rendering',
      topics: [
        {
          title: 'v-if, v-else',
          prompt: 'Explain how `v-if` works.',
          content: `const { createApp, ref } = Vue;
createApp({
  setup() {
    const awesome = ref(true);
    return { awesome };
  },
  template: \`
    <div>
      <button @click="awesome = !awesome">Toggle</button>
      <h1 v-if="awesome">Vue is awesome!</h1>
      <h1 v-else>Oh no 😢</h1>
    </div>
  \`
}).mount('#app')`
        },
        {
          title: 'v-for',
          prompt: 'Why is the `:key` attribute important when using `v-for`?',
          content: `const { createApp, ref } = Vue;
createApp({
  setup() {
    const items = ref([
      { id: 1, message: 'Learn HTML' },
      { id: 2, message: 'Learn CSS' },
      { id: 3, message: 'Learn Vue' }
    ]);
    return { items };
  },
  template: \`
    <ul>
      <!-- The :key helps Vue track each item's identity -->
      <li v-for="item in items" :key="item.id">
        {{ item.message }}
      </li>
    </ul>
  \`
}).mount('#app')`
        },
      ]
    },
    {
      name: 'Event Handling',
      topics: [
        {
          title: 'Listening to Events',
          prompt: 'What is the shorthand for `v-on`?',
          content: `const { createApp, ref } = Vue;
createApp({
  setup() {
    const count = ref(0);
    return { count };
  },
  // @click is shorthand for v-on:click
  template: \`
    <button @click="count++">
      Add 1 (Count: {{count}})
    </button>
  \`
}).mount('#app')`
        },
        {
          title: 'Event Modifiers',
          prompt: 'What does the `.prevent` event modifier do?',
          content: `const { createApp } = Vue;
createApp({
  setup() {
    const onSubmit = () => {
      alert('Form submitted, but page did not reload because of .prevent');
    };
    return { onSubmit };
  },
  // .prevent stops the default browser action for the event
  template: \`
    <form @submit.prevent="onSubmit">
      <button type="submit">Submit</button>
    </form>
  \`
}).mount('#app')`
        },
      ]
    },
    {
      name: 'Form Input Bindings',
      topics: [
        {
          title: 'v-model',
          prompt: 'What does `v-model` do?',
          content: `const { createApp, ref } = Vue;
createApp({
  setup() {
    const text = ref('');
    return { text };
  },
  // v-model creates a two-way binding on the input
  template: \`
    <div>
      <input v-model="text" placeholder="Type here" />
      <p>The text is: {{ text }}</p>
    </div>
  \`
}).mount('#app')`
        },
      ]
    },
    {
      name: 'Components In-Depth',
      topics: [
        {
          title: 'Props & Events',
          prompt: 'How does a child component communicate with its parent?',
          content: `// Child components receive data from parents via 'props'.
// They communicate back up to parents by emitting 'events'.

// ChildComponent.vue
const props = defineProps(['message']);
const emit = defineEmits(['response']);

emit('response', 'Hello from child!');`,
          projectFiles: [
            {
              type: 'file',
              name: 'index.html',
              content: `<div id="app"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `const { createApp, ref } = Vue;

// Child component definition
const ChildComponent = {
  props: ['title'],
  emits: ['response'],
  setup(props, { emit }) {
    emit('response', 'hello from child!')
    return {}
  },
  template: \`
    <div style="border:1px solid #4a5568; padding:1rem; border-radius: 8px; margin-top: 1rem;">
      <h4>Child Component</h4>
      <p>Prop from parent: {{ title }}</p>
      <button @click="$emit('response', 'Button in child clicked!')">
        Emit Event
      </button>
    </div>
  \`
};

// Parent component (the main app)
createApp({
  components: { ChildComponent },
  setup() {
    const childMessage = ref('');
    return { childMessage };
  },
  template: \`
    <div>
      <h2>Parent Component</h2>
      <ChildComponent 
        title="My awesome component"
        @response="msg => childMessage = msg"
      />
      <p style="margin-top: 1rem;">
        Message from child: <strong>{{ childMessage }}</strong>
      </p>
    </div>
  \`
}).mount('#app');
`
            }
          ]
        },
        {
          title: 'Slots',
          prompt: 'What are slots used for?',
          content: `// Slots are a content distribution mechanism.
// They allow you to pass markup from a parent component
// into a child component's template.

// FancyButton.vue (Child)
<button>
  <slot></slot> <!-- Parent content goes here -->
</button>

// App.vue (Parent)
<FancyButton>
  Click Me! <!-- This content is passed into the slot -->
</FancyButton>`,
          projectFiles: [
            {
              type: 'file',
              name: 'index.html',
              content: `<div id="app"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `const { createApp } = Vue;

// Child component with a slot
const FancyButton = {
  template: \`
    <button style="background:linear-gradient(to right, #68d391, #33a06f); color:white; padding:10px 20px; border:none; border-radius:5px;">
      <slot>Default Content</slot> <!-- Slot content goes here -->
    </button>
  \`
};

// Parent component
createApp({
  components: { FancyButton },
  template: \`
    <div>
      <FancyButton>
        Click Me!  <!-- This is the slot content -->
      </FancyButton>
    </div>
  \`
}).mount('#app');
`
            }
          ]
        },
        {
          title: 'Lifecycle Hooks',
          prompt: 'What is onMounted and how is it used?',
          content: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const data = ref(null);
    
    // onMounted is called after the component is mounted to the DOM.
    // It's a great place to fetch data or interact with the DOM.
    onMounted(() => {
      console.log('Component has been mounted!');
      // Simulate fetching data
      setTimeout(() => {
        data.value = 'Data loaded successfully!';
      }, 1000);
    });
    
    return { data };
  },
  template: \`
    <div>
      <h3>Lifecycle Hooks</h3>
      <p v-if="!data">Loading...</p>
      <p v-else>{{ data }}</p>
    </div>
  \`
}).mount('#app')`
        },
        {
          title: 'Provide & Inject',
          prompt: 'How do provide and inject work for deep component communication?',
          content: `// Provide/Inject is used to pass data through a component tree
// without having to pass props down manually at every level.

// It's useful for things like the current theme, user info, etc.`,
          projectFiles: [
            {
              type: 'file', name: 'index.html', content: `<div id="app"></div><script type="module" src="script.js"></script>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `const { createApp, ref, provide, inject } = Vue;

const DeeplyNestedComponent = {
  setup() {
    // Inject the provided value with a key
    const theme = inject('theme');
    return { theme };
  },
  template: \`
    <div :style="{ color: theme.value.color, marginTop: '1rem', padding: '1rem', border: '1px solid ' + theme.value.color, borderRadius: '8px' }">
      <p>I am a deeply nested component.</p>
      <p>The current theme is: <strong>{{ theme.value.name }}</strong></p>
    </div>
  \`
};

const ChildComponent = {
  components: { DeeplyNestedComponent },
  template: \`
    <div style="margin-top: 1rem;">
      <h4>Child Component</h4>
      <DeeplyNestedComponent />
    </div>
  \`
};

createApp({
  components: { ChildComponent },
  setup() {
    const currentTheme = ref({ name: 'Light', color: '#68d391' });
    
    // Provide the value to all descendant components
    provide('theme', currentTheme);

    function toggleTheme() {
        if(currentTheme.value.name === 'Light') {
            currentTheme.value = { name: 'Dark', color: '#e53e3e' };
        } else {
            currentTheme.value = { name: 'Light', color: '#68d391' };
        }
    }
    
    return { toggleTheme };
  },
  template: \`
    <div>
      <h2>Parent Component</h2>
      <button @click="toggleTheme">Toggle Theme</button>
      <ChildComponent />
    </div>
  \`
}).mount('#app');`
            }
          ]
        },
         {
          title: 'Example: To-Do App',
          prompt: 'Show me a complete example of a simple To-Do List app in Vue.',
          content: `// This example combines several Vue concepts to create a simple to-do list application.`,
          projectFiles: [
            {
              type: 'file',
              name: 'index.html',
              content: `<div id="app"></div><script type="module" src="script.js"></script><style>
                #app { max-width: 500px; margin: auto; }
                h1 { color: #68d391; }
                input { width: 70%; padding: 8px; background: #2d3748; border: 1px solid #4a5568; color: white; border-radius: 4px; }
                button { background: #68d391; color: #1a202c; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; cursor: pointer; margin-left: 8px; }
                ul { list-style: none; padding: 0; margin-top: 1rem; }
                li { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #2d3748; border-radius: 4px; margin-bottom: 0.5rem; cursor: pointer; }
                .done { text-decoration: line-through; opacity: 0.5; }
                li button { background: #e53e3e; color: white; }
              </style>`
            },
            {
              type: 'file',
              name: 'script.js',
              content: `const { createApp, ref, computed } = Vue;

const TodoItem = {
  props: ['todo'],
  emits: ['remove'],
  template: \`
    <li>
      <span :class="{ done: todo.done }" @click="todo.done = !todo.done">
        {{ todo.text }}
      </span>
      <button @click="$emit('remove')">X</button>
    </li>
  \`
};

createApp({
  components: { TodoItem },
  setup() {
    const newTodo = ref('');
    const todos = ref([
      { id: 1, text: 'Learn Vue', done: true },
      { id: 2, text: 'Build an app', done: false },
    ]);

    const remaining = computed(() => todos.value.filter(t => !t.done).length);
    let nextTodoId = 3;

    function addTodo() {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: nextTodoId++,
          text: newTodo.value,
          done: false
        });
        newTodo.value = '';
      }
    }

    function removeTodo(id) {
      todos.value = todos.value.filter(t => t.id !== id);
    }
    
    return { newTodo, todos, addTodo, removeTodo, remaining };
  },
  template: \`
    <div>
      <h1>My To-Do List</h1>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Add a new to-do...">
        <button type="submit">Add</button>
      </form>
      
      <ul>
        <TodoItem 
          v-for="todo in todos" 
          :key="todo.id"
          :todo="todo"
          @remove="removeTodo(todo.id)"
        />
      </ul>
      
      <p v-if="todos.length > 0">
        Remaining tasks: {{ remaining }}
      </p>
      <p v-else>All done! ✨</p>
    </div>
  \`
}).mount('#app');
`
            }
          ]
        },
      ]
    },
  ],
  nuxtjs: [
    {
        name: 'Nuxt Fundamentals',
        topics: [
            {
                title: 'What is Nuxt?',
                prompt: 'What are the main advantages of using Nuxt over standard Vue?',
                content: `function Component() {
  return (
    <div>
      <p>Nuxt is a framework for Vue.js that adds many powerful features out-of-the-box:</p>
      <ul style={{textAlign: 'left'}}>
        <li>File-based routing</li>
        <li>Server-Side Rendering (SSR) & other rendering modes</li>
        <li>Auto-imports for components and composables</li>
        <li>A powerful module ecosystem for adding features</li>
      </ul>
    </div>
  );
}`,
                fileType: 'tsx',
            },
            {
                title: 'File-based Routing',
                prompt: 'How does Nuxt create routes from files?',
                content: `function Component() {
  const fileStructure = \`
pages/
├── index.vue      -> /
├── about.vue      -> /about
└── users/
    ├── [id].vue   -> /users/:id
    └── index.vue  -> /users
  \`;
  return (
    <div>
      <p>Nuxt creates routes automatically from <code>.vue</code> files in the <code>pages/</code> directory.</p>
      <pre style={{backgroundColor: '#2d3748', padding: '1rem', marginTop: '1rem', borderRadius: '4px'}}>
        <code>{fileStructure}</code>
      </pre>
    </div>
  );
}`,
                fileType: 'tsx',
            },
            {
                title: 'Auto-imported Components',
                prompt: 'Explain how component auto-importing works in Nuxt.',
                content: `function Component() {
  return (
    <div>
      <p>
        Any <code>.vue</code> component in your <code>components/</code> directory is available
        in your app without needing to write an import statement.
      </p>
      <div style={{
        border: '1px solid #48bb78', padding: '1rem', marginTop: '1rem', borderRadius: '8px'
      }}>
        This could be an &lt;AppHeader /&gt; component.
      </div>
      <div style={{
        border: '1px solid #48bb78', padding: '1rem', marginTop: '1rem', borderRadius: '8px'
      }}>
        This could be a &lt;UserProfileCard /&gt; component.
      </div>
    </div>
  );
}`,
                fileType: 'tsx',
            },
            {
                title: '<NuxtLink>',
                prompt: 'What is the difference between <NuxtLink> and a regular <a> tag?',
                content: `function Component() {
  const [page, setPage] = React.useState('Home');
  return (
    <div>
      <p>
        <code>&lt;NuxtLink&gt;</code> provides fast, client-side navigation without full page reloads.
      </p>
      <nav style={{display: 'flex', gap: '1rem', margin: '1rem 0'}}>
        <a style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => setPage('Home')}>
          NuxtLink to Home
        </a>
        <a style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => setPage('About')}>
          NuxtLink to About
        </a>
      </nav>
      <div style={{borderTop: '1px solid #4a5568', paddingTop: '1rem', marginTop: '1rem'}}>
        Current Page: <strong>{page}</strong>
      </div>
    </div>
  );
}`,
                fileType: 'tsx',
            },
        ]
    },
    {
      name: 'Key Directories',
      topics: [
        {
          title: 'app.vue',
          prompt: 'What is the purpose of the app.vue file?',
          content: `function Component() {
  // In Nuxt, app.vue is the main component of your application.
  // It's the root component that renders for every route.
  // You often use it to define a <NuxtLayout> and <NuxtPage>.

  return (
    <div style={{
      border: '2px dashed #00dc82', padding: '1rem', borderRadius: '8px', backgroundColor: '#1f2b34'
    }}>
      <h3 style={{marginTop: 0, color: '#00dc82'}}>app.vue</h3>
      <div style={{
        border: '1px solid #48bb78', padding: '1rem', borderRadius: '8px', backgroundColor: '#2c3e50'
      }}>
        <strong>&lt;NuxtLayout&gt;</strong>
        <div style={{
          border: '1px solid #9f7aea', padding: '1rem', marginTop: '1rem', borderRadius: '8px', backgroundColor: '#34495e'
        }}>
          <strong>&lt;NuxtPage /&gt;</strong>
          <p style={{margin:0}}>(Page content for the current route appears here)</p>
        </div>
      </div>
    </div>
  );
}`,
          fileType: 'tsx'
        },
        {
          title: 'Layouts',
          prompt: 'How do you create and use layouts in Nuxt?',
          content: `function Component() {
  // layouts/default.vue defines a default layout.
  // layouts/custom.vue would define a layout named 'custom'.
  // You can wrap pages in layouts for shared UI.

  const [layout, setLayout] = React.useState('default');

  const pageContent = (
    <div style={{padding: '1rem', background: '#34495e', borderRadius: '4px'}}>
      <p>This is the page content.</p>
      <p>It gets rendered inside the layout's &lt;slot /&gt;.</p>
    </div>
  );

  return (
    <div>
      <div style={{marginBottom: '1rem'}}>
        <button onClick={() => setLayout('default')}>Use Default Layout</button>
        <button onClick={() => setLayout('custom')}>Use Custom Layout</button>
      </div>

      <p>Current layout: <strong>{layout}</strong></p>

      {/* Simulating layouts */}
      {layout === 'default' ? (
        <div style={{border: '1px solid #48bb78', padding: '1rem', borderRadius: '8px'}}>
          <header>Default Layout Header</header>
          <main style={{margin: '1rem 0'}}>{pageContent}</main>
          <footer>Default Layout Footer</footer>
        </div>
      ) : (
        <div style={{border: '1px solid #9f7aea', padding: '1rem', borderRadius: '8px'}}>
          <aside style={{float: 'left', marginRight: '1rem', borderRight: '1px solid #9f7aea', paddingRight: '1rem'}}>Custom Sidebar</aside>
          <main>{pageContent}</main>
        </div>
      )}
    </div>
  );
}`,
          fileType: 'tsx'
        },
        {
          title: 'Composables',
          prompt: 'How are composables automatically imported in Nuxt?',
          content: `function Component() {
  // Any function in the 'composables/' directory is auto-imported.
  // This is great for sharing reactive logic across components.
  // e.g., composables/useCounter.ts

  // We'll simulate its usage here.
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);

  return (
    <div>
      <h3>Counter (from a simulated composable)</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
          fileType: 'tsx'
        },
      ]
    },
    {
        name: 'Data Fetching',
        topics: [
            {
                title: 'useFetch',
                prompt: 'What is `useFetch` and what does it return?',
                content: `function Component() {
  const [data, setData] = React.useState(null);
  const [pending, setPending] = React.useState(false);

  // useFetch is a composable for fetching data on server and client.
  const fetchData = () => {
    setPending(true);
    setData(null);
    setTimeout(() => {
      setData({ id: 1, title: 'Fetched via useFetch' });
      setPending(false);
    }, 1000);
  };
  
  return (
    <div>
      <button onClick={fetchData} disabled={pending}>
        {pending ? 'Loading...' : 'Run useFetch'}
      </button>
      {data && <pre style={{marginTop: '1rem', backgroundColor: '#2d3748', padding: '1rem', borderRadius: '4px'}}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>}
    </div>
  );
}`,
                fileType: 'tsx'
            },
            {
                title: 'useAsyncData',
                prompt: 'When would you use `useAsyncData` instead of `useFetch`?',
                content: `function Component() {
  const [data, setData] = React.useState(null);
  const [pending, setPending] = React.useState(false);

  // useAsyncData is great for more complex fetching logic.
  const fetchData = async () => {
    setPending(true);
    setData(null);
    // Imagine this is a complex async call, maybe not just a simple fetch.
    await new Promise(res => setTimeout(res, 1000));
    setData({ user: 'Jane Doe', from: 'useAsyncData' });
    setPending(false);
  };
  
  return (
    <div>
      <p>Use code>useAsyncData</code> for complex async logic or using 3rd party libraries.</p>
      <button onClick={fetchData} disabled={pending}>
        {pending ? 'Loading...' : 'Run useAsyncData'}
      </button>
      {data && <pre style={{marginTop: '1rem', backgroundColor: '#2d3748', padding: '1rem', borderRadius: '4px'}}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>}
    </div>
  );
}`,
                fileType: 'tsx'
            },
        ]
    },
     {
        name: 'Advanced Concepts',
        topics: [
            {
                title: 'Plugins',
                prompt: 'How do you create a Nuxt plugin?',
                content: `function Component() {
  // Plugins in the 'plugins/' directory run when your app is created.
  // They are perfect for initializing libraries or adding helper functions.
  // A file named 'plugins/myPlugin.ts' would define a plugin.

  // --- Example plugins/myPlugin.ts ---
  // export default defineNuxtPlugin(nuxtApp => {
  //   return {
  //     provide: {
  //       hello: (name) => \`Hello, \${name}!\`
  //     }
  //   }
  // })
  
  // This would make $hello available across your app.

  return (
    <div>
      <p>A plugin has provided a global helper: <code>$hello</code>.</p>
      <p>Calling it would look like this in a component:</p>
      <pre style={{backgroundColor: '#2d3748', padding: '1rem', marginTop: '1rem', borderRadius: '4px'}}>
        <code>
          const {'{ $hello }'} = useNuxtApp()<br/>
          {'const greeting = $hello("World") // "Hello, World!"'}
        </code>
      </pre>
      <p style={{marginTop: '1rem'}}><strong>Simulated output:</strong> Hello, World!</p>
    </div>
  );
}`,
                fileType: 'tsx'
            },
            {
                title: 'Server Middleware',
                prompt: 'What is server middleware in Nuxt?',
                content: `function Component() {
  // Server middleware runs on the server before any other part of your app.
  // It's located in the 'server/middleware/' directory.
  // Use cases: logging, authentication checks, adding headers.

  // --- Example server/middleware/log.ts ---
  // import { getRequestURL } from 'h3'
  // export default defineEventHandler((event) => {
  //   console.log('New request: ' + getRequestURL(event))
  // })

  return (
    <div>
      <p>Middleware is running on the server for every request.</p>
      <p>It can inspect the request and even modify the response before your page or API route is executed.</p>
      <p>In a real app, you could check the server console for logs!</p>
    </div>
  );
}`,
                fileType: 'tsx'
            },
        ]
    },
    {
        name: 'Server Engine (Nitro)',
        topics: [
            {
                title: 'API Routes',
                prompt: 'How do you create an API endpoint at `/api/products`?',
                content: `function Component() {
  const [data, setData] = React.useState(null);

  // In Nuxt, a file at /server/api/products.ts would create this endpoint.
  const callApi = async () => {
    setData({ status: 'calling /api/products...' });
    await new Promise(res => setTimeout(res, 500));
    setData([
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Mouse' }
    ]);
  };
  
  return (
    <div>
      <button onClick={callApi}>Call /api/products</button>
      {data && <pre style={{marginTop: '1rem', backgroundColor: '#2d3748', padding: '1rem', borderRadius: '4px'}}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>}
    </div>
  );
}`,
                fileType: 'tsx'
            },
        ]
    },
    {
        name: 'State Management',
        topics: [
            {
                title: 'useState',
                prompt: 'What is the purpose of `useState` in Nuxt?',
                content: `// Nuxt's useState composable creates a reactive,
// SSR-friendly shared state that is preserved across components.
// It's like a ref(), but can be accessed by multiple components.

// To define a state:
const counter = useState('counter', () => 0);

// To use it in another component:
const counter = useState('counter');`,
                projectFiles: [
                  {
                    type: 'file',
                    name: 'index.html',
                    content: `<div id="root"></div><script type="module" src="script.js"></script>`
                  },
                  {
                    type: 'file',
                    name: 'script.js',
                    content: `import React from 'react';
import { createRoot } from 'react-dom/client';

// Nuxt's useState provides SSR-friendly shared state.
// We'll simulate it with a simple shared object and a subscriber pattern.
const sharedState = {
  _counter: 0,
  _subscribers: [],
  get value() { return this._counter; },
  set value(val) { 
    this._counter = val;
    this._subscribers.forEach(cb => cb(val));
  },
  subscribe(callback) {
    this._subscribers.push(callback);
    return () => {
      this._subscribers = this._subscribers.filter(cb => cb !== callback);
    }
  }
};

function ComponentA() {
  const [count, setCount] = React.useState(sharedState.value);

  React.useEffect(() => {
    const unsubscribe = sharedState.subscribe(setCount);
    return unsubscribe;
  }, []);

  const increment = () => {
    sharedState.value++;
  };
  
  return (
    <div style={{border:'1px solid #48bb78', padding:'1rem', borderRadius:'4px'}}>
      <h3>Component A</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment from A</button>
    </div>
  )
}

function ComponentB() {
  const [count, setCount] = React.useState(sharedState.value);
  
  React.useEffect(() => {
    const unsubscribe = sharedState.subscribe(setCount);
    return unsubscribe;
  }, []);

  return (
    <div style={{border:'1px solid #48bb78', padding:'1rem', marginTop:'1rem', borderRadius:'4px'}}>
      <h3>Component B</h3>
      <p>Count: {count}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <p><code>useState</code> allows state to be shared between components.</p>
      <ComponentA />
      <ComponentB />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App/>);`
                  }
                ]
            },
        ]
    },
  ]
};


export const INITIAL_TERMINAL = `Welcome to the Interactive Node.js Terminal.
Supports npm commands like 'install', 'update', and 'uninstall'.
Try running 'npm install' to install dependencies from package.json.`;