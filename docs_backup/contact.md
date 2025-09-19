---
layout: default
title: Contact
permalink: /contact/
---

# Contact

Use Formspree or Netlify Forms for contact forms. Email: contact@alariadynamics.example

This Markdown file is deprecated. Use `contact/index.html` instead.

## Contact form (Formspree example)

Replace the action URL with your Formspree endpoint (e.g. https://formspree.io/f/{form_id}).

<form method="POST" action="https://formspree.io/f/your-form-id">
	<label for="name">Name</label>
	<input id="name" type="text" name="name" required>

	<label for="email">Email</label>
	<input id="email" type="email" name="email" required>

	<label for="message">Message</label>
	<textarea id="message" name="message" rows="5" required></textarea>

	<p><button type="submit" class="btn">Send</button></p>
</form>

<noscript>Please enable JavaScript to use the contact form or email us at contact@alariadynamics.example</noscript>

