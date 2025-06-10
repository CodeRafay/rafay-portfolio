# Portfolio Website - Rafay Adeel

A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring smooth animations, Google Forms integration, and a clean design.

## 🌟 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations** - CSS animations and scroll-triggered effects
- **Contact Form** - Integrated with Google Forms for seamless message handling
- **Modern UI/UX** - Clean, professional design with gradient themes
- **Interactive Elements** - Hover effects, typing animations, and particle effects
- **Fast Loading** - Optimized performance with minimal dependencies
- **SEO Friendly** - Semantic HTML structure
- **Cross-browser Compatible** - Works on all modern browsers

## 🚀 [Live Demo](https://coderafay.github.io/rafay-portfolio/)

## 📁 Project Structure

```
portfolio-website/
│
├── index.html                 # Main HTML file
├── style.css                  # CSS styles and animations
├── script.js                  # JavaScript functionality
├── README.md                  # Project documentation
│
└── assets/                    # Assets folder
    ├── profile-image.png      # Profile picture
    ├── RA_CV.pdf             # Resume/CV file
    └── background.mp4         # Background video (optional)
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid, animations, and custom properties
- **JavaScript (ES6+)** - Interactive functionality and form handling
- **Google Forms** - Contact form backend
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Poppins)

## ⚡ Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/CodeRafay/rafay-portfolio.git
cd rafay-portfolio
```

### 2. Add Your Assets
- Replace `assets/profile-image.png` with your profile picture
- Replace `assets/RA_CV.pdf` with your resume
- Add `assets/background.mp4` for background video (optional)

### 3. Customize Content
Update the following in `index.html`:
- Personal information (name, bio, contact details)
- Social media links
- Projects and descriptions
- Experience and education
- Skills and interests

### 4. Set Up Contact Form
1. Create a Google Form with fields: Name, Email, Subject, Message
2. Get your form action URL and field entry IDs
3. Update the form in `index.html`:
   ```html
   <form action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse">
       <input name="entry.YOUR_NAME_ID">
       <input name="entry.YOUR_EMAIL_ID">
       <input name="entry.YOUR_SUBJECT_ID">
       <textarea name="entry.YOUR_MESSAGE_ID"></textarea>
   </form>
   ```

### 5. Run Locally
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Visit `http://localhost:8000`

## 🎨 Customization

### Colors
Update CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #00cec9;
  --accent-color: #fd79a8;
  --background-color: #0f0f1a;
  --text-color: #f0f0f0;
}
```

### Fonts
Change the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Animations
Modify animation timings and effects in `style.css` and `script.js`

## 📱 Sections

1. **Home** - Hero section with animated typing effect
2. **About** - Personal introduction, skills, and interests
3. **Projects** - Portfolio showcase with project cards
4. **Experience** - Work experience and roles
5. **Education** - Academic background and certifications
6. **Contact** - Contact form and social links

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to \[netlify.com\](https://netlify.com)
2. Or connect your GitHub repository for automatic deployments

### Vercel
1. Connect your GitHub repository to \[vercel.com\](https://vercel.com)
2. Automatic deployments on every push

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the \[MIT License\](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use! If you make improvements, consider submitting a pull request.

## 💡 Free to Use

**This portfolio template is completely free to use!** 

You are welcome to:
- ✅ Use it for personal portfolios
- ✅ Modify and customize it
- ✅ Use it for commercial purposes
- ✅ Share it with others
- ✅ Create derivative works

**No attribution required, but appreciated!**

## 🎯 Features Breakdown

### Animations
- Smooth scroll animations
- Typing effect for subtitle
- Particle background effects
- Hover animations on cards and buttons
- Loading screen animation

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized for all screen sizes
- Touch-friendly navigation

### Performance
- Minimal external dependencies
- Optimized images and assets
- Efficient CSS and JavaScript
- Fast loading times

## 🛠️ Customization Guide

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `style.css`
3. Add any JavaScript functionality in `script.js`
4. Update navigation links

### Modifying Projects
Update the projects grid in `index.html`:
```html
<div class="project-card">
    <div class="project-image">
        <img src="your-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Your Project</h3>
        <p class="project-description">Description...</p>
        <div class="project-tech">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

## 📞 Support

If you have questions or need help customizing this template:
- Open an issue on GitHub
- Check the documentation
- Review the code comments
- Contact at +92 3023966541
- [Email](rafayadeel1999@gmail.com)

## 🌟 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images
- Google Forms for contact functionality

---

**Made with ❤️ by Rafay Adeel**

*Feel free to use this template for your own portfolio!*
```



