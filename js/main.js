;(() => {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener)
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select("#navbar .nav-link", true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active")
      } else {
        navbarlink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const header = select("#header")
    let offset = header.offsetHeight

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20
    }

    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  const selectHeader = select("#header")
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled")
      } else {
        selectHeader.classList.remove("header-scrolled")
      }
    }
    window.addEventListener("load", headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  const backtotop = select(".back-to-top")
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active")
      } else {
        backtotop.classList.remove("active")
      }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".navbar-toggler", function (e) {
    select("#navbar").classList.toggle("navbar-mobile")
    this.classList.toggle("bi-list")
    this.classList.toggle("bi-x")
  })

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar-nav .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle("dropdown-active")
      }
    },
    true,
  )

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on(
    "click",
    ".nav-link",
    function (e) {
      if (this.hash) {
        e.preventDefault()
        scrollto(this.hash)
      }
    },
    true,
  )

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  /**
   * Preloader
   */
  const preloader = select("#preloader")
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove()
    })
  }

  /**
   * Animation on scroll
   */
  let AOS
  window.addEventListener("load", () => {
    AOS = window.AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  })

  /**
   * Initiate portfolio isotope
   */
  let Isotope
  window.addEventListener("load", () => {
    const projectContainer = select(".project-container")
    if (projectContainer) {
      Isotope = window.Isotope
      const projectIsotope = new Isotope(projectContainer, {
        itemSelector: ".project-item",
        layoutMode: "fitRows",
      })

      const projectFilters = select(".filters-list li", true)
      on(
        "click",
        ".filters-list li",
        function (e) {
          e.preventDefault()
          projectFilters.forEach((el) => {
            el.classList.remove("active")
          })
          this.classList.add("active")

          projectIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          })
        },
        true,
      )
    }
  })

  /**
   * Skills animation
   */
  let Waypoint
  const skilsContent = select(".skills-content")
  if (skilsContent) {
    Waypoint = window.Waypoint
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: (direction) => {
        const progress = select(".progress .progress-bar", true)
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%"
        })
      },
    })
  }

  /**
   * Contact form validation
   */
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  /**
   * Read More button toggle
   */
  const readMoreBtn = document.querySelector(".read-more-btn")
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true"
      this.innerHTML = expanded
        ? 'Read More <i class="fas fa-chevron-down"></i>'
        : 'Read Less <i class="fas fa-chevron-up"></i>'
    })
  }
})()
