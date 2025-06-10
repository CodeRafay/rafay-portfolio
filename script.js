// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  function updateScrollIndicator() {
    const homeSection = document.querySelector("#home")
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
    const scrollPosition = window.scrollY + window.innerHeight

    if (scrollIndicator) {
      if (scrollPosition > homeSectionBottom) {
        scrollIndicator.style.opacity = "0"
        scrollIndicator.style.visibility = "hidden"
      } else {
        scrollIndicator.style.opacity = "1"
        scrollIndicator.style.visibility = "visible"
      }
    }
  }

  window.addEventListener("scroll", updateScrollIndicator)
  updateScrollIndicator() // Call once on page load

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      menuToggle.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link on scroll
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".nav-link")

  function updateActiveLink() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveLink)
  updateActiveLink() // Call once on page load

  // Project cards hover effect
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      projectCards.forEach((c) => c.classList.remove("active"))
      this.classList.add("active")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("active")
    })
  })

  // Google Forms Integration
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const formStatus = document.getElementById("form-status")

  function showStatus(message, type) {
    formStatus.textContent = message
    formStatus.className = `form-status ${type}`
    formStatus.style.display = "block"

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formStatus.style.display = "none"
    }, 5000)
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true
      btnText.style.display = "none"
      btnLoading.style.display = "inline-block"
      submitBtn.style.opacity = "0.7"
    } else {
      submitBtn.disabled = false
      btnText.style.display = "inline-block"
      btnLoading.style.display = "none"
      submitBtn.style.opacity = "1"
    }
  }

  // Form validation
  function validateForm() {
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    if (!name || name.length < 2) {
      showStatus("Please enter a valid name (at least 2 characters)", "error")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      showStatus("Please enter a valid email address", "error")
      return false
    }

    if (!subject || subject.length < 3) {
      showStatus("Please enter a subject (at least 3 characters)", "error")
      return false
    }

    if (!message || message.length < 10) {
      showStatus("Please enter a message (at least 10 characters)", "error")
      return false
    }

    return true
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      if (!validateForm()) {
        return
      }

      // Check if Google Form is configured
      const formAction = contactForm.getAttribute("action")
      if (formAction.includes("YOUR_FORM_ID")) {
        showStatus("Please configure Google Forms integration. See setup instructions below.", "error")
        return
      }

      setLoadingState(true)

      // Create a copy of the form to submit
      const formData = new FormData(contactForm)

      // Submit to Google Forms
      fetch(formAction, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Important for Google Forms
      })
        .then(() => {
          // Since we're using no-cors, we can't read the response
          // But Google Forms will accept the submission
          showStatus("Thank you! Your message has been sent successfully. I'll get back to you soon!", "success")
          contactForm.reset()
        })
        .catch((error) => {
          console.error("Form submission error:", error)
          showStatus("There was an error sending your message. Please try again or contact me directly.", "error")
        })
        .finally(() => {
          setLoadingState(false)
        })
    })
  }

  // Alternative: Handle iframe load event for better feedback
  const hiddenIframe = document.getElementById("hidden_iframe")
  if (hiddenIframe) {
    hiddenIframe.onload = () => {
      if (submitBtn.disabled) {
        showStatus("Thank you! Your message has been sent successfully. I'll get back to you soon!", "success")
        contactForm.reset()
        setLoadingState(false)
      }
    }
  }

  // Skill items hover effect
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("active")
    })

    item.addEventListener("mouseleave", function () {
      this.classList.remove("active")
    })
  })

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".section")
    const windowHeight = window.innerHeight

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Call once on page load

  // Resume download functionality
  function downloadResume() {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = "assets/RA_CV.pdf"
    link.target = "_blank"
    link.download = "Rafay_Adeel_Resume.pdf"

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Add event listeners for resume links
  document.querySelectorAll(".resume-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      downloadResume()
    })
  })

  // Add event listener for download resume button in about section
  document.querySelector(".cv-download .btn").addEventListener("click", (e) => {
    e.preventDefault()
    downloadResume()
  })

  // CV download fallback for browsers that don't support the download attribute
  document.querySelectorAll("a[download]").forEach((link) => {
    link.addEventListener("click", function (e) {
      const isDownloadSupported = "download" in document.createElement("a")

      if (!isDownloadSupported) {
        e.preventDefault()
        window.open(this.href, "_blank")
      }
    })
  })

  // Typing animation for subtitle
  const animatedSubtitle = document.getElementById("animated-subtitle")
  if (animatedSubtitle) {
    const roles = ["Student", "Web Developer", "Teaching Assistant", "Data Analyst"]
    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typingSpeed = 120
    const pauseTime = 1000

    function type() {
      const currentRole = roles[roleIndex]
      if (isDeleting) {
        animatedSubtitle.textContent = currentRole.substring(0, charIndex--)
        if (charIndex < 0) {
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
          setTimeout(type, 400)
        } else {
          setTimeout(type, typingSpeed / 2)
        }
      } else {
        animatedSubtitle.textContent = currentRole.substring(0, charIndex++)
        if (charIndex > currentRole.length) {
          isDeleting = true
          setTimeout(type, pauseTime)
        } else {
          setTimeout(type, typingSpeed)
        }
      }
    }

    // Start the animation after a short delay
    setTimeout(() => {
      animatedSubtitle.style.opacity = "1"
      type()
    }, 500)
  }

  // Create floating particles
  function createParticles() {
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    document.body.appendChild(particlesContainer)

    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer)
    }
  }

  function createParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random starting position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Random animation duration
    const duration = Math.random() * 20 + 10
    particle.style.animation = `floatParticle ${duration}s linear infinite`

    // Random delay
    particle.style.animationDelay = Math.random() * 5 + "s"

    container.appendChild(particle)
  }

  // Add particle animation keyframes and form status styles
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.3;
      }
      90% {
        opacity: 0.3;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    /* Form Status Styles */
    .form-status {
      margin-top: 15px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
      animation: slideDown 0.3s ease;
    }
    
    .form-status.success {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }
    
    .form-status.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Button Loading State */
    .btn:disabled {
      cursor: not-allowed;
    }
    
    .btn-loading {
      display: none;
    }
  `
  document.head.appendChild(style)

  // Initialize particles
  createParticles()

  // Add mouse trail effect
  const mouseTrail = []
  const trailLength = 10

  function createMouseTrail(e) {
    const trail = document.createElement("div")
    trail.style.position = "fixed"
    trail.style.left = e.clientX + "px"
    trail.style.top = e.clientY + "px"
    trail.style.width = "6px"
    trail.style.height = "6px"
    trail.style.background = "var(--primary-color)"
    trail.style.borderRadius = "50%"
    trail.style.pointerEvents = "none"
    trail.style.zIndex = "9999"
    trail.style.opacity = "0.7"
    trail.style.transition = "all 0.5s ease"

    document.body.appendChild(trail)
    mouseTrail.push(trail)

    if (mouseTrail.length > trailLength) {
      const oldTrail = mouseTrail.shift()
      oldTrail.style.opacity = "0"
      setTimeout(() => {
        if (oldTrail.parentNode) {
          oldTrail.parentNode.removeChild(oldTrail)
        }
      }, 500)
    }

    setTimeout(() => {
      trail.style.opacity = "0"
      trail.style.transform = "scale(0)"
    }, 100)
  }

  // Only add mouse trail on desktop
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", createMouseTrail)
  }

  // Add text reveal animation for paragraphs
  function revealText() {
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4")

    textElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  window.addEventListener("scroll", revealText)
  revealText() // Call once on page load

  // Add loading animation
  function showLoadingAnimation() {
    const loader = document.createElement("div")
    loader.id = "page-loader"
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">RA</div>
        <div class="loader-text">Loading...</div>
        <div class="loader-bar">
          <div class="loader-progress"></div>
        </div>
      </div>
    `

    const loaderStyles = `
      #page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
      }
      
      .loader-content {
        text-align: center;
      }
      
      .loader-logo {
        font-size: 3rem;
        font-weight: 700;
        background: var(--gradient-1);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-bottom: 20px;
        animation: pulse 1.5s infinite;
      }
      
      .loader-text {
        font-size: 1.2rem;
        margin-bottom: 30px;
        color: var(--text-color);
      }
      
      .loader-bar {
        width: 200px;
        height: 4px;
        background: var(--border-color);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
      }
      
      .loader-progress {
        width: 0%;
        height: 100%;
        background: var(--gradient-1);
        border-radius: 2px;
        animation: loadProgress 2s ease-in-out forwards;
      }
      
      @keyframes loadProgress {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.textContent = loaderStyles
    document.head.appendChild(styleSheet)

    document.body.appendChild(loader)

    // Hide loader after 2 seconds and scroll to home
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader)
        }
        // Scroll to home section after loading
        const homeSection = document.querySelector("#home")
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }, 2000)
  }

  // Show loading animation
  showLoadingAnimation()
})
