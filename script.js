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

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert(`Thank you for your message! I'll get back to you soon.`)

      // Reset form
      contactForm.reset()
    })
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

  // Add particle animation keyframes
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
