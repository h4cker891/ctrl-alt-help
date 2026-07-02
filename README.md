# Ctrl Alt Help

Ctrl Alt Help is a single-page website for a free neighborhood technology repair service operated by Lucas Fielding.

## Project Structure

- `index.html` - Main page content and structure
- `style.css` - All layout, typography, color, and responsive styling
- `script.js` - Navigation behavior, counters, and repair form handling

## Adding Real Portfolio Projects

The portfolio section uses example projects for now.
To add real examples later:

1. Duplicate one of the existing portfolio cards in `index.html`
2. Update the title, description, and skills used
3. Replace the colored image panel with a real image if desired
4. Keep the `Example Project` label until the work is completed

## Editing Services

The services are listed in the `#services` section of `index.html`.
You can edit the card text directly there to add, remove, or revise service offerings.
The current list is limited to computers, laptops, printers, and related technology.

## How Formspree Works

The repair request form sends submissions to Formspree using this endpoint:

`https://formspree.io/f/mvgdkrye`

The form is submitted with JavaScript so visitors can see a success message without leaving the page.
If the request fails, the page shows a friendly error message and the user can try again.

Formspree may require you to confirm or configure the form in your Formspree dashboard before live submissions are accepted.

## Deploying the Site

### GitHub Pages

1. Create a GitHub repository for the project
2. Upload these files to the repository root
3. Open the repository settings
4. Enable GitHub Pages from the main branch
5. Wait for GitHub to publish the site

### Netlify

1. Log in to Netlify
2. Drag and drop the project folder, or connect the GitHub repository
3. Set the publish directory to the project root
4. Deploy the site

Because this site is plain HTML, CSS, and JavaScript, it does not require a build step.
