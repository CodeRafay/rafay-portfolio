// Global variable to track form submission
var submitted = false

// Advanced Animation System inspired by anime.js
class AdvancedAnimations {
  constructor() {
    this.particles = []
    this.cursor = { x: 0, y: 0 }
    this.init()
  }

  init() {
    this.createParticleSystem()
    this.initCursorEffects()
    this.initMorphingAnimations()
    this.initAdvancedScrollAnimations()
  }

  // Particle System for Background
  createParticleSystem() {
    const canvas = document.createElement("canvas")
    canvas.id = "particle-canvas"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1"
    canvas.style.opacity = "0.6"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      })
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()
  }

  // Interactive Cursor Effects
  initCursorEffects() {
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>'
    document.body.appendChild(cursor)

    const style = document.createElement("style")
    style.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      .cursor-dot {
        width: 8px;
        height: 8px;
        background: #3b82f6;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
      }
      .cursor-ring {
        width: 40px;
        height: 40px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        opacity: 0.5;
      }
      .cursor-hover .cursor-ring {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 1;
      }
      body * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    document.addEventListener("mousemove", (e) => {
      this.cursor.x = e.clientX
      this.cursor.y = e.clientY
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })

    // Hover effects
    document.querySelectorAll("a, button, .project-card, .skill-tag").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"))
      el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"))
    })
  }

  // Morphing Animations
  initMorphingAnimations() {
    const morphElements = document.querySelectorAll(".floating-card")

    morphElements.forEach((el, index) => {
      el.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

      setInterval(() => {
        const scale = 0.9 + Math.sin(Date.now() * 0.001 + index) * 0.1
        const rotate = Math.sin(Date.now() * 0.0005 + index) * 5
        el.style.transform = `translateX(-50%) scale(${scale}) rotate(${rotate}deg)`
      }, 16)
    })
  }

  // Advanced Scroll Animations
  initAdvancedScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const advancedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target, index)
        }
      })
    }, observerOptions)

    document.querySelectorAll(".project-card, .timeline-item, .skill-category, .cert-item").forEach((el) => {
      advancedObserver.observe(el)
    })
  }

  animateElement(element, index) {
    const animations = [
      () => this.slideInFromLeft(element),
      () => this.slideInFromRight(element),
      () => this.scaleIn(element),
      () => this.rotateIn(element),
      () => this.bounceIn(element),
    ]

    const randomAnimation = animations[index % animations.length]
    randomAnimation()
  }

  slideInFromLeft(element) {
    element.style.transform = "translateX(-100px)"
    element.style.opacity = "0"
    element.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    setTimeout(() => {
      element.style.transform = "translateX(0)"
      element.style.opacity = "1"
    }, 100)
  }

  slideInFromRight(element) {
    element.style.transform = "translateX(100px)"
    element.style.opacity = "0"
    element.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    setTimeout(() => {
      element.style.transform = "translateX(0)"
      element.style.opacity = "1"
    }, 100)
  }

  scaleIn(element) {
    element.style.transform = "scale(0.5)"
    element.style.opacity = "0"
    element.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

    setTimeout(() => {
      element.style.transform = "scale(1)"
      element.style.opacity = "1"
    }, 100)
  }

  rotateIn(element) {
    element.style.transform = "rotate(-180deg) scale(0.5)"
    element.style.opacity = "0"
    element.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

    setTimeout(() => {
      element.style.transform = "rotate(0deg) scale(1)"
      element.style.opacity = "1"
    }, 100)
  }

  bounceIn(element) {
    element.style.transform = "translateY(100px) scale(0.3)"
    element.style.opacity = "0"
    element.style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

    setTimeout(() => {
      element.style.transform = "translateY(0) scale(1)"
      element.style.opacity = "1"
    }, 100)
  }
}

// Typing Animation System
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element
    this.texts = texts
    this.speed = speed
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false
    this.init()
  }

  init() {
    this.type()
  }

  type() {
    const currentText = this.texts[this.textIndex]

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1)
      this.charIndex--
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1)
      this.charIndex++
    }

    let typeSpeed = this.speed

    if (this.isDeleting) {
      typeSpeed /= 2
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000
      this.isDeleting = true
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
      typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// 3D Card Hover Effects
class Card3DEffects {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", this.handleMouseMove.bind(this))
      card.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
    })
  }

  handleMouseMove(e) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    card.style.transition = "transform 0.1s ease"
  }

  handleMouseLeave(e) {
    const card = e.currentTarget
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    card.style.transition = "transform 0.5s ease"
  }
}

// Glitch Effect for Text
class GlitchEffect {
  constructor(element) {
    this.element = element
    this.originalText = element.textContent
    this.init()
  }

  init() {
    this.element.addEventListener("mouseenter", () => this.startGlitch())
    this.element.addEventListener("mouseleave", () => this.stopGlitch())
  }

  startGlitch() {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let iterations = 0

    this.glitchInterval = setInterval(() => {
      this.element.textContent = this.originalText
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return this.originalText[index]
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        })
        .join("")

      if (iterations >= this.originalText.length) {
        clearInterval(this.glitchInterval)
        this.element.textContent = this.originalText
      }

      iterations += 1 / 3
    }, 30)
  }

  stopGlitch() {
    clearInterval(this.glitchInterval)
    this.element.textContent = this.originalText
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Advanced Animation System
  const advancedAnimations = new AdvancedAnimations()
  const card3DEffects = new Card3DEffects()

  // Initialize Typing Animation for Hero Title
  const heroTitle = document.querySelector(".hero-title .gradient-text")
  if (heroTitle) {
    new TypingAnimation(heroTitle, ["intelligent code", "amazing experiences", "innovative solutions", "digital magic"])
  }

  // Initialize Glitch Effect for Brand
  const brandText = document.querySelector(".brand-text")
  if (brandText) {
    new GlitchEffect(brandText)
  }

  // Magnetic Button Effects
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)"
    })
  })

  // Parallax Scrolling Effect
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-visual, .floating-card")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform += ` translateY(${scrolled * speed}px)`
    })
  })

  // Theme Management - Initialize first
  const html = document.documentElement
  const themeToggle = document.getElementById("theme-toggle")

  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light"
  html.setAttribute("data-theme", savedTheme)

  // Update theme toggle icon with animation
  function updateThemeIcon() {
    if (themeToggle) {
      const icon = themeToggle.querySelector("i")
      icon.style.transform = "rotate(360deg)"
      icon.style.transition = "transform 0.5s ease"

      setTimeout(() => {
        if (html.getAttribute("data-theme") === "dark") {
          icon.className = "fas fa-sun"
        } else {
          icon.className = "fas fa-moon"
        }
        icon.style.transform = "rotate(0deg)"
      }, 250)
    }
  }

  // Initialize theme icon
  updateThemeIcon()

  // Theme toggle event listener with enhanced animation
  if (themeToggle) {
    themeToggle.addEventListener("click", (e) => {
      e.preventDefault()

      const currentTheme = html.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      // Add ripple effect
      const ripple = document.createElement("div")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(59, 130, 246, 0.3)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.left = "50%"
      ripple.style.top = "50%"
      ripple.style.width = "100px"
      ripple.style.height = "100px"
      ripple.style.marginLeft = "-50px"
      ripple.style.marginTop = "-50px"

      themeToggle.style.position = "relative"
      themeToggle.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)

      html.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon()
    })
  }

  // Add ripple animation CSS
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(rippleStyle)

  // Hero section buttons with enhanced effects
  const viewWorkBtn = document.getElementById("view-work-btn")
  const letsConnectBtn = document.getElementById("lets-connect-btn")

  if (viewWorkBtn) {
    viewWorkBtn.addEventListener("click", (e) => {
      e.preventDefault()
      scrollToSection("work")
    })
  }

  if (letsConnectBtn) {
    letsConnectBtn.addEventListener("click", (e) => {
      e.preventDefault()
      scrollToSection("connect")
    })
  }

  // Enhanced smooth scrolling function
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Add scroll animation
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 1000
      let start = null

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      requestAnimationFrame(animation)
    }
  }

  // Mobile Navigation
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const sectionId = href.substring(1)
        scrollToSection(sectionId)
      }

      if (hamburger && navMenu) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  })

  // Active Navigation Link
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

  window.addEventListener("scroll", updateActiveNavLink)

  // Contact Form with Google Forms integration
  const contactFormElement = document.getElementById("contact-form")
  const formStatusElement = document.getElementById("form-status")

  function showFormStatus(message, type) {
    if (formStatusElement) {
      formStatusElement.textContent = message
      formStatusElement.className = `form-status ${type}`
      formStatusElement.style.display = "block"

      setTimeout(() => {
        formStatusElement.style.display = "none"
      }, 5000)
    }
  }

  function setFormLoading(isLoading) {
    if (contactFormElement) {
      const submitBtn = contactFormElement.querySelector('button[type="submit"]')
      const btnText = submitBtn.querySelector(".btn-text")
      const btnLoading = submitBtn.querySelector(".btn-loading")

      if (isLoading) {
        submitBtn.disabled = true
        if (btnText) btnText.style.display = "none"
        if (btnLoading) btnLoading.style.display = "inline-flex"
      } else {
        submitBtn.disabled = false
        if (btnText) btnText.style.display = "inline"
        if (btnLoading) btnLoading.style.display = "none"
      }
    }
  }

  if (contactFormElement) {
    contactFormElement.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(contactFormElement)

      const name = formData.get("entry.371530169").trim()
      const email = formData.get("entry.1665995197").trim()
      const subject = formData.get("entry.185249844").trim()
      const message = formData.get("entry.497792568").trim()

      if (name.length < 2) {
        showFormStatus("Please enter a valid name (at least 2 characters)", "error")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showFormStatus("Please enter a valid email address", "error")
        return
      }

      if (subject.length < 3) {
        showFormStatus("Please enter a subject (at least 3 characters)", "error")
        return
      }

      if (message.length < 10) {
        showFormStatus("Please enter a message (at least 10 characters)", "error")
        return
      }

      setFormLoading(true)

      try {
        // Submit to Google Forms
        const response = await fetch(
          "https://docs.google.com/forms/d/e/1FAIpQLScw1PbntXqsx9BUT2yf7IOsiNf-_A99TmjffJ84v87aHBqhDQ/formResponse",
          {
            method: "POST",
            mode: "no-cors",
            body: formData,
          },
        )

        submitted = true
        showFormStatus("Thank you! Your message has been sent successfully. I'll get back to you soon!", "success")
        contactFormElement.reset()
      } catch (error) {
        showFormStatus("There was an error sending your message. Please try again.", "error")
      } finally {
        setFormLoading(false)
      }
    })
  }

  // Resume Download
  const downloadResumeBtn = document.getElementById("download-resume")

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const link = document.createElement("a")
      link.href = "assets/RA_CV.pdf"
      link.target = "_blank"
      link.download = "Rafay_Adeel_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  // Navigation Resume Download
  const navResumeBtn = document.getElementById("nav-resume-btn")

  if (navResumeBtn) {
    navResumeBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const link = document.createElement("a")
      link.href = "assets/RA_CV.pdf"
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  // Enhanced stats animation with stagger effect
  const stats = document.querySelectorAll(".stat-number")
  const animateStats = () => {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        const target = Number.parseInt(stat.textContent)
        const increment = target / 50
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            stat.textContent = target + (stat.textContent.includes("+") ? "+" : "")
            clearInterval(timer)
          } else {
            stat.textContent = Math.floor(current) + (stat.textContent.includes("+") ? "+" : "")
          }
        }, 30)
      }, index * 200)
    })
  }

  // Trigger stats animation when hero section is visible
  const heroSection = document.querySelector(".hero")
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats()
        statsObserver.unobserve(entry.target)
      }
    })
  })

  if (heroSection) {
    statsObserver.observe(heroSection)
  }

  // Enhanced navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    const currentTheme = html.getAttribute("data-theme")

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.backdropFilter = "blur(20px)"
        if (currentTheme === "dark") {
          navbar.style.background = "rgba(17, 24, 39, 0.95)"
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.95)"
        }
      } else {
        navbar.style.backdropFilter = "blur(12px)"
        if (currentTheme === "dark") {
          navbar.style.background = "rgba(17, 24, 39, 0.8)"
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.8)"
        }
      }
    }
  })

  // Scroll indicator with enhanced animation
  const scrollIndicator = document.querySelector(".scroll-indicator")

  function updateScrollIndicator() {
    if (scrollIndicator) {
      const heroSection = document.querySelector("#hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight

        if (scrollPosition > heroBottom) {
          scrollIndicator.style.opacity = "0"
          scrollIndicator.style.transform = "translateX(-50%) translateY(20px)"
          scrollIndicator.style.visibility = "hidden"
        } else {
          scrollIndicator.style.opacity = "1"
          scrollIndicator.style.transform = "translateX(-50%) translateY(0)"
          scrollIndicator.style.visibility = "visible"
        }
      }
    }
  }

  window.addEventListener("scroll", updateScrollIndicator)
  updateScrollIndicator()

  // SVG Signature Animation using anime.js createDrawable concept
  class SVGSignature {
    constructor() {
      this.init()
    }

    init() {
      this.createSignatureSVG()
      this.setupSignatureAnimation()
    }

    createSignatureSVG() {
      // Create the signature container
      const signatureContainer = document.createElement("div")
      signatureContainer.className = "signature-container"
      signatureContainer.innerHTML = `
    <div class="signature-wrapper">
      <svg width="800" height="100" viewBox="0 0 800 100" class="signature-svg">
        <!-- RAFAY -->
        <g transform="translate(250, 0)">
        <path id="rafay-path" d="M21.58 51.32Q21.39 50.44 21.09 49.00Q20.80 47.56 20.34 45.87Q19.87 44.19 19.21 42.48Q18.55 40.77 17.63 39.38Q16.70 37.99 15.50 37.11Q14.31 36.23 12.70 36.23Q12.06 36.23 11.04 36.33Q10.01 36.43 9.03 36.65Q8.06 36.87 7.32 37.26Q6.59 37.65 6.59 38.18L6.59 50.59Q6.40 50.59 6.01 50.49Q5.62 50.39 5.22 50.22Q4.83 50.05 4.54 49.85Q4.25 49.66 4.25 49.41L4.25 25.05Q3.66 25.15 3.22 25.56Q2.78 25.98 2.51 26.56Q2.25 27.15 2.10 27.73Q1.95 28.32 1.90 28.81Q1.71 28.81 1.37 28.59Q1.03 28.37 0.73 28.08Q0.44 27.78 0.22 27.47Q0 27.15 0 26.90Q0 25.68 0.73 24.54Q1.46 23.39 2.64 22.44Q3.81 21.48 5.25 20.73Q6.69 19.97 8.15 19.43Q9.62 18.90 10.94 18.60Q12.26 18.31 13.18 18.31Q14.55 18.31 15.77 18.41Q16.99 18.51 17.90 18.97Q18.80 19.43 19.34 20.41Q19.87 21.39 19.87 23.05Q19.87 24.56 19.34 26.00Q18.80 27.44 17.97 28.76Q17.14 30.08 16.11 31.27Q15.09 32.47 14.06 33.50Q16.36 34.91 17.77 36.35Q19.19 37.79 20.07 39.23Q20.95 40.67 21.41 42.11Q21.88 43.55 22.14 45.07Q22.41 46.58 22.68 48.14Q22.95 49.71 23.44 51.32L21.58 51.32M13.38 20.26Q13.04 20.26 12.43 20.29Q11.82 20.31 11.04 20.41Q10.25 20.51 9.50 20.70Q8.74 20.90 8.08 21.24Q7.42 21.58 7.01 22.05Q6.59 22.51 6.59 23.19L6.59 35.60Q7.76 35.60 9.03 35.01Q10.30 34.42 11.55 33.42Q12.79 32.42 13.96 31.18Q15.14 29.93 16.02 28.61Q16.89 27.29 17.43 25.98Q17.97 24.66 17.97 23.63Q17.97 22.51 17.60 21.85Q17.24 21.19 16.60 20.83Q15.97 20.46 15.14 20.36Q14.31 20.26 13.38 20.26ZM34.91 20.80Q36.72 20.80 38.06 21.85Q39.40 22.90 40.41 24.66Q41.41 26.42 42.09 28.71Q42.77 31.01 43.21 33.52Q43.65 36.04 43.90 38.60Q44.14 41.16 44.24 43.41Q44.34 45.65 44.36 47.46Q44.38 49.27 44.38 50.29L43.21 50.29L41.36 39.99Q41.11 39.75 40.26 39.70Q39.40 39.65 38.26 39.75Q37.11 39.84 35.77 40.01Q34.42 40.19 33.23 40.26Q32.03 40.33 31.05 40.31Q30.08 40.28 29.64 39.99L29.64 50.29L27.15 50.29Q27.15 50.15 27.17 49.73Q27.20 49.32 27.20 48.88Q27.20 48.44 27.25 48.05Q27.29 47.66 27.29 47.51Q27.59 44.68 27.76 41.77Q27.93 38.87 28.17 36.13Q28.42 33.40 28.83 30.91Q29.25 28.42 30.03 26.39Q30.81 24.37 31.98 22.92Q33.15 21.48 34.91 20.80M35.69 23.05Q34.42 23.05 33.57 23.95Q32.71 24.85 32.18 26.29Q31.64 27.73 31.35 29.49Q31.05 31.25 30.96 32.93Q30.86 34.62 30.83 36.06Q30.81 37.50 30.81 38.28Q33.20 38.28 35.69 37.92Q38.18 37.55 40.38 37.16Q40.43 36.96 40.45 36.52Q40.48 36.08 40.50 35.55Q40.53 35.01 40.55 34.52Q40.58 34.03 40.58 33.89Q40.58 32.28 40.41 30.81Q40.23 29.35 39.72 27.95Q39.21 26.56 38.26 25.34Q37.30 24.12 35.69 23.05ZM47.22 25.93Q47.07 25.88 46.88 25.63Q46.68 25.39 46.53 25.10Q46.39 24.80 46.29 24.51Q46.19 24.22 46.24 24.07Q46.29 23.88 46.53 23.58Q46.78 23.29 47.07 22.97Q47.36 22.66 47.66 22.41Q47.95 22.17 48.14 22.17Q48.73 22.02 49.98 21.70Q51.22 21.39 52.78 21.00Q54.35 20.61 56.08 20.21Q57.81 19.82 59.40 19.46Q60.99 19.09 62.23 18.80Q63.48 18.51 64.06 18.41Q64.31 18.36 64.87 18.31Q65.43 18.26 66.06 18.21Q66.70 18.16 67.26 18.12Q67.82 18.07 68.02 18.07Q68.02 18.99 67.80 19.41Q67.58 19.82 67.16 19.97Q66.75 20.12 66.21 20.12Q65.67 20.12 64.99 20.26Q64.50 20.41 63.38 20.70Q62.26 21.00 60.89 21.36Q59.52 21.73 57.98 22.12Q56.45 22.51 55.05 22.90Q53.66 23.29 52.56 23.61Q51.46 23.93 50.93 24.07Q50.20 24.90 50.10 25.59Q50 26.27 50 27.20Q50 29.30 50.27 31.18Q50.54 33.06 50.93 35.30Q51.03 35.30 51.20 35.33Q51.37 35.35 51.46 35.35Q52.78 35.35 54.03 35.03Q55.27 34.72 56.52 34.33Q57.76 33.94 59.06 33.62Q60.35 33.30 61.72 33.30Q61.91 33.30 62.38 33.33Q62.84 33.35 63.28 33.47Q63.72 33.59 63.96 33.79Q64.21 33.98 64.06 34.33L51.46 38.13L51.46 51.51Q50.59 51.51 50.10 51.29Q49.61 51.07 49.41 50.66Q49.22 50.24 49.17 49.68Q49.12 49.12 49.07 48.39Q48.97 47.56 48.83 45.80Q48.68 44.04 48.51 41.82Q48.34 39.60 48.14 37.16Q47.95 34.72 47.75 32.50Q47.56 30.27 47.41 28.52Q47.27 26.76 47.22 25.93ZM74.46 20.80Q76.27 20.80 77.61 21.85Q78.96 22.90 79.96 24.66Q80.96 26.42 81.64 28.71Q82.32 31.01 82.76 33.52Q83.20 36.04 83.45 38.60Q83.69 41.16 83.79 43.41Q83.89 45.65 83.91 47.46Q83.94 49.27 83.94 50.29L82.76 50.29L80.91 39.99Q80.66 39.75 79.81 39.70Q78.96 39.65 77.81 39.75Q76.66 39.84 75.32 40.01Q73.97 40.19 72.78 40.26Q71.58 40.33 70.61 40.31Q69.63 40.28 69.19 39.99L69.19 50.29L66.70 50.29Q66.70 50.15 66.72 49.73Q66.75 49.32 66.75 48.88Q66.75 48.44 66.80 48.05Q66.85 47.66 66.85 47.51Q67.14 44.68 67.31 41.77Q67.48 38.87 67.72 36.13Q67.97 33.40 68.38 30.91Q68.80 28.42 69.58 26.39Q70.36 24.37 71.53 22.92Q72.71 21.48 74.46 20.80M75.24 23.05Q73.97 23.05 73.12 23.95Q72.27 24.85 71.73 26.29Q71.19 27.73 70.90 29.49Q70.61 31.25 70.51 32.93Q70.41 34.62 70.39 36.06Q70.36 37.50 70.36 38.28Q72.75 38.28 75.24 37.92Q77.73 37.55 79.93 37.16Q79.98 36.96 80.00 36.52Q80.03 36.08 80.05 35.55Q80.08 35.01 80.10 34.52Q80.13 34.03 80.13 33.89Q80.13 32.28 79.96 30.81Q79.79 29.35 79.27 27.95Q78.76 26.56 77.81 25.34Q76.86 24.12 75.24 23.05ZM99.37 35.30Q98.63 34.23 97.39 32.67Q96.14 31.10 94.73 29.27Q93.31 27.44 91.80 25.49Q90.28 23.54 88.99 21.70Q87.70 19.87 86.72 18.29Q85.74 16.70 85.30 15.58L86.28 14.70Q88.09 16.65 89.43 18.29Q90.77 19.92 91.85 21.36Q92.92 22.80 93.80 24.12Q94.68 25.44 95.63 26.78Q96.58 28.13 97.71 29.52Q98.83 30.91 100.34 32.47Q100.63 31.10 100.90 29.42Q101.17 27.73 101.46 25.93Q101.76 24.12 102.10 22.24Q102.44 20.36 102.88 18.63Q103.32 16.89 103.83 15.38Q104.35 13.87 105.03 12.79Q105.08 12.74 105.25 12.74Q105.42 12.74 105.52 12.74Q105.66 12.74 105.93 12.79Q106.20 12.84 106.45 12.96Q106.69 13.09 106.84 13.28Q106.98 13.48 106.88 13.72Q106.35 14.84 105.79 16.75Q105.22 18.65 104.71 21.02Q104.20 23.39 103.76 26.15Q103.32 28.91 102.95 31.74Q102.59 34.57 102.29 37.38Q102.00 40.19 101.86 42.63Q101.71 45.07 101.73 47.07Q101.76 49.07 101.95 50.29Q101.86 50.83 101.78 51.10Q101.71 51.37 101.46 51.51Q101.22 51.66 100.73 51.68Q100.24 51.71 99.37 51.71L99.37 35.30Z" 
              fill="none" 
              stroke="url(#gradient1)" 
              stroke-width="4" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
        </g>
        
        <!-- ADEEL -->
         <g transform="translate(400, 0)">
        <path id="adeel-path" d="M30.91 51.61L24.85 51.61L15.53 24.66L6.10 51.61L0 51.61L12.60 15.67L18.41 15.67L30.91 51.61M18.75 40.19L20.17 44.14L10.84 44.14L12.21 40.19L18.75 40.19ZM61.13 13.67L61.13 51.61L55.52 51.61L55.18 48.34L55.18 13.67L61.13 13.67M36.43 37.45Q36.43 33.64 37.48 31.05Q38.53 28.47 40.19 26.86Q41.85 25.24 43.87 24.54Q45.90 23.83 47.85 23.83Q49.37 23.83 50.73 24.17Q52.10 24.51 53.17 25.15L53.17 30.32Q52.34 29.44 51.32 28.91Q50.29 28.37 49.02 28.37Q47.51 28.37 46.34 29.13Q45.17 29.88 44.36 31.20Q43.55 32.52 43.12 34.23Q42.68 35.94 42.68 37.89Q42.68 39.84 43.16 41.53Q43.65 43.21 44.48 44.48Q45.31 45.75 46.51 46.48Q47.71 47.22 49.12 47.22Q51.51 47.22 53.17 45.31L53.17 50.39Q52.00 51.03 50.46 51.44Q48.93 51.86 47.22 51.86Q45.26 51.86 43.38 51.15Q41.50 50.44 40.04 48.83Q38.18 46.73 37.30 43.63Q36.43 40.53 36.43 37.45ZM82.28 23.83Q84.91 24.07 87.04 25.24Q89.16 26.42 90.67 28.27Q92.19 30.13 92.99 32.52Q93.80 34.91 93.80 37.50Q93.80 38.67 93.65 39.84L76.90 39.84L76.90 35.55L88.18 35.55Q88.18 34.28 87.77 33.11Q87.35 31.93 86.55 30.93Q85.74 29.93 84.67 29.25Q83.59 28.56 82.28 28.42L82.28 23.83M82.08 47.02Q82.62 47.02 83.42 46.90Q84.23 46.78 85.13 46.46Q86.04 46.14 86.94 45.65Q87.84 45.17 88.53 44.48L90.67 47.75Q89.06 49.76 86.91 50.78Q84.77 51.81 81.45 51.81Q78.76 51.81 76.42 50.71Q74.07 49.61 72.41 47.71Q70.75 45.80 69.78 43.26Q68.80 40.72 68.80 37.79Q68.80 35.01 69.70 32.52Q70.61 30.03 72.17 28.15Q73.73 26.27 75.81 25.10Q77.88 23.93 80.27 23.78L80.27 28.47Q78.47 28.81 77.29 29.93Q76.12 31.05 75.46 32.50Q74.80 33.94 74.54 35.45Q74.27 36.96 74.27 38.04Q74.27 39.94 74.73 41.58Q75.20 43.21 76.17 44.41Q77.15 45.61 78.59 46.31Q80.03 47.02 82.08 47.02ZM114.70 23.83Q117.33 24.07 119.46 25.24Q121.58 26.42 123.10 28.27Q124.61 30.13 125.42 32.52Q126.22 34.91 126.22 37.50Q126.22 38.67 126.07 39.84L109.33 39.84L109.33 35.55L120.61 35.55Q120.61 34.28 120.19 33.11Q119.78 31.93 118.97 30.93Q118.16 29.93 117.09 29.25Q116.02 28.56 114.70 28.42L114.70 23.83M114.50 47.02Q115.04 47.02 115.84 46.90Q116.65 46.78 117.55 46.46Q118.46 46.14 119.36 45.65Q120.26 45.17 120.95 44.48L123.10 47.75Q121.48 49.76 119.34 50.78Q117.19 51.81 113.87 51.81Q111.18 51.81 108.84 50.71Q106.49 49.61 104.83 47.71Q103.17 45.80 102.20 43.26Q101.22 40.72 101.22 37.79Q101.22 35.01 102.12 32.52Q103.03 30.03 104.59 28.15Q106.15 26.27 108.23 25.10Q110.30 23.93 112.70 23.78L112.70 28.47Q110.89 28.81 109.72 29.93Q108.54 31.05 107.89 32.50Q107.23 33.94 106.96 35.45Q106.69 36.96 106.69 38.04Q106.69 39.94 107.15 41.58Q107.62 43.21 108.59 44.41Q109.57 45.61 111.01 46.31Q112.45 47.02 114.50 47.02ZM140.19 43.21Q140.19 44.87 140.63 45.83Q141.06 46.78 141.85 47.24Q142.63 47.71 143.63 47.85Q144.63 48.00 145.80 48.00L145.80 51.61Q145.17 51.71 144.48 51.76Q143.95 51.81 143.21 51.83Q142.48 51.86 141.75 51.86Q141.02 51.86 140.28 51.81Q139.55 51.76 138.96 51.66Q137.30 51.32 136.38 50.20Q135.45 49.07 134.96 47.68Q134.47 46.29 134.35 44.97Q134.23 43.65 134.23 42.92L134.23 42.33L134.23 13.67L140.19 13.67L140.19 43.21Z" 
              fill="none" 
              stroke="url(#gradient2)" 
              stroke-width="4" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
        </g>
        
        <!-- Gradients -->
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#6366f1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#06d6a0;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
          </linearGradient>
          
          <!-- Enhanced glow filter -->
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Sparkle filter -->
          <filter id="sparkle">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>
            <feOffset dx="2" dy="2" result="offset"/>
            <feFlood flood-color="#ffffff" flood-opacity="0.8"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge> 
              <feMergeNode in="SourceGraphic"/>
              <feMergeNode/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div class="signature-subtitle">— RAFAY ADEEL —</div>
      <div class="signature-tagline">Crafted with passion and precision</div>
    </div>
  `

      // Enhanced styles
      const signatureStyles = document.createElement("style")
      signatureStyles.textContent = `
    .signature-container {
      position: relative;
      padding: 1.5rem 0 1.5rem;
      text-align: center;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
      overflow: hidden;
      border-top: 1px solid var(--border-color);
    }

    .signature-wrapper {
      position: relative;
      display: inline-block;
      padding: 2rem;
    }

    .signature-svg {
      max-width: 100%;
      height: auto;
      filter: url(#glow);
      opacity: 0;
      transform: translateY(30px) scale(0.9);
      transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .signature-svg.animate {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .signature-svg path {
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
    }

    .signature-subtitle {
      margin-top: 2rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: 0.2em;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s ease 2.5s;
    }

    .signature-tagline {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-muted);
      font-style: italic;
      opacity: 0;
      transform: translateY(15px);
      transition: all 0.6s ease 3s;
    }

    .signature-subtitle.animate,
    .signature-tagline.animate {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .signature-svg {
        width: 400px;
      }
      .signature-container {
        padding: 4rem 0 3rem;
      }
    }

    @media (max-width: 480px) {
      .signature-svg {
        width: 320px;
      }
      .signature-subtitle {
        font-size: 1rem;
        letter-spacing: 0.1em;
      }
      .signature-container {
        padding: 3rem 0 2rem;
      }
    }

    /* Enhanced sparkle animation */
    .signature-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 85% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 70% 15%, rgba(245, 158, 11, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 30% 85%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
      animation: sparkle 6s ease-in-out infinite;
      pointer-events: none;
    }

    .signature-container::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      animation: pulse-bg 4s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes sparkle {
      0%, 100% { 
        opacity: 0.4; 
        transform: scale(1) rotate(0deg); 
      }
      33% { 
        opacity: 0.7; 
        transform: scale(1.02) rotate(1deg); 
      }
      66% { 
        opacity: 0.5; 
        transform: scale(0.98) rotate(-1deg); 
      }
    }

    @keyframes pulse-bg {
      0%, 100% { 
        opacity: 0.3; 
        transform: translate(-50%, -50%) scale(1); 
      }
      50% { 
        opacity: 0.6; 
        transform: translate(-50%, -50%) scale(1.1); 
      }
    }

    /* Glitch effect for signature */
  .signature-svg:hover path {
    animation: pathGlitch 0.5s infinite;
  }

  .signature-wrapper:hover .signature-subtitle {
    animation: textGlitch 0.5s infinite;
  }

  @keyframes pathGlitch {
    0% {
      stroke-dashoffset: 0;
      stroke-dasharray: 2000;
      filter: drop-shadow(0 0 2px var(--primary)) drop-shadow(0 0 5px var(--primary));
    }
    20% {
      stroke-dashoffset: 100;
      stroke-dasharray: 1500;
      filter: drop-shadow(-3px 0 2px rgba(99,102,241,0.7)) drop-shadow(3px 0 2px rgba(59,130,246,0.7));
    }
    40% {
      stroke-dashoffset: -100;
      stroke-dasharray: 1800;
      filter: drop-shadow(3px 0 2px rgba(99,102,241,0.7)) drop-shadow(-3px 0 2px rgba(59,130,246,0.7));
    }
    60% {
      stroke-dashoffset: 0;
      stroke-dasharray: 2000;
      filter: drop-shadow(0 0 5px var(--primary)) drop-shadow(0 0 10px var(--primary));
    }
    100% {
      stroke-dashoffset: 0;
      stroke-dasharray: 2000;
      filter: drop-shadow(0 0 2px var(--primary)) drop-shadow(0 0 5px var(--primary));
    }
  }

  @keyframes textGlitch {
    0% {
      opacity: 1;
      transform: translate(0);
      text-shadow: 0 0 2px var(--primary);
    }
    20% {
      opacity: 0.8;
      transform: translate(-2px, 2px);
      text-shadow: -2px 0 2px rgba(99,102,241,0.7), 2px 2px 2px rgba(59,130,246,0.7);
    }
    40% {
      opacity: 0.9;
      transform: translate(2px, -2px);
      text-shadow: 2px 0 2px rgba(99,102,241,0.7), -2px -2px 2px rgba(59,130,246,0.7);
    }
    60% {
      opacity: 0.8;
      transform: translate(-1px);
      text-shadow: 0 0 5px var(--primary);
    }
    100% {
      opacity: 1;
      transform: translate(0);
      text-shadow: 0 0 2px var(--primary);
    }
  }

  /* Add a small visual cue for hover */
  .signature-wrapper {
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .signature-wrapper:hover {
    transform: scale(1.02);
  }

  `
      document.head.appendChild(signatureStyles)

      // Insert before footer
      const footer = document.querySelector(".footer")
      if (footer) {
        footer.parentNode.insertBefore(signatureContainer, footer)
      } else {
        document.body.appendChild(signatureContainer)
      }
    }

    setupSignatureAnimation() {
      const signatureContainer = document.querySelector(".signature-container")
      const signatureSVG = document.querySelector(".signature-svg")
      const rafayPath = document.getElementById("rafay-path")
      const adeelPath = document.getElementById("adeel-path")

      // Intersection Observer for signature animation
      const signatureObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateSignature(signatureSVG, null, rafayPath, adeelPath)
              signatureObserver.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      if (signatureContainer) {
        signatureObserver.observe(signatureContainer)
      }
    }

    animateSignature(svg, subtitle, rafayPath, adeelPath) {
      // Show the SVG container first
      svg.classList.add("animate")

      // Animate RAFAY
      setTimeout(() => {
        this.animatePath(rafayPath, 2000)
      }, 800)

      // Animate ADEEL
      setTimeout(() => {
        this.animatePath(adeelPath, 2000)
      }, 1600)

      // Show subtitle and tagline
      setTimeout(() => {
        const subtitle = document.querySelector(".signature-subtitle")
        const tagline = document.querySelector(".signature-tagline")
        if (subtitle) subtitle.classList.add("animate")
        if (tagline) tagline.classList.add("animate")
      }, 2500)

      // Add completion glow effect
      setTimeout(() => {
        svg.style.filter = "url(#glow) drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))"
      }, 4000)
    }

    animatePath(path, duration) {
      if (!path) return

      const pathLength = path.getTotalLength()
      path.style.strokeDasharray = pathLength
      path.style.strokeDashoffset = pathLength

      // Animate the drawing
      path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      path.style.strokeDashoffset = "0"

      // Add a subtle pulse effect after drawing
      setTimeout(() => {
        path.style.animation = "pulse-glow 2s ease-in-out infinite"
      }, duration)

      // Add pulse animation
      if (!document.getElementById("pulse-glow-animation")) {
        const pulseStyle = document.createElement("style")
        pulseStyle.id = "pulse-glow-animation"
        pulseStyle.textContent = `
        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px currentColor);
            opacity: 1;
          }
          50% { 
            filter: drop-shadow(0 0 15px currentColor);
            opacity: 0.8;
          }
        }
      `
        document.head.appendChild(pulseStyle)
      }
    }
  }

  // Initialize SVG Signature
  const svgSignature = new SVGSignature()

  console.log("Enhanced script loaded successfully with advanced animations!")
})
