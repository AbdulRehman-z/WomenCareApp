# Women's Care App

A static website with health information for women before, during and after pregnancy. It has six categories: exercise, MSK pain and posture, emotional well-being, nutrition, baby care, and pregnancy, labour and recovery. Each topic can be read aloud with the browser's text-to-speech.

## Running

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Home page with the category buttons |
| `menu.html` | Topic list for one category (`menu.html?cat=<category>`) |
| `information.html` | One topic page (`information.html?topic=<id>`) |
| `content.js` | All content: `CATEGORIES`, and topics registered with `addTopic()` |
| `script.js` | Navigation, text-to-speech, and page loaders |
| `style.css` | Styles |

## Adding a topic

Add an `addTopic()` call in `content.js`:

```js
addTopic(id, category, icon, label, intro, sections, warning);
```

- `category` is a key of `CATEGORIES`.
- `sections` is a list of `[heading, body]` pairs. `body` is either a paragraph string or an array of bullet strings.
- `warning` is optional. It is shown in a "When to seek help" box.

The topic appears in its category menu automatically.

## Disclaimer

The information here is general guidance and does not replace advice from a qualified healthcare professional.
