// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)
  
  // Initialize animations when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
      ".hero-content, .section-title, .section-subtitle, .feature-card, .pricing-content, .live-image, .live-text, .testimonial-card, .faq-item, .download-content",
    )
  
    animatedElements.forEach((el, index) => {
      // Add different animation classes based on element type
      if (el.classList.contains("live-image")) {
        el.classList.add("slide-in-left")
      } else if (el.classList.contains("live-text")) {
        el.classList.add("slide-in-right")
      } else {
        el.classList.add("fade-in")
      }
  
      // Stagger animations
      el.style.transitionDelay = `${index * 0.1}s`
  
      observer.observe(el)
    })
  })
  
  // FAQ Toggle Function
  function toggleFaq(element) {
    const faqItem = element.parentElement
    const answer = faqItem.querySelector(".faq-answer")
    const icon = element.querySelector(".faq-icon")
  
    // Close all other FAQs
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active")
        const otherAnswer = item.querySelector(".faq-answer")
        const otherIcon = item.querySelector(".faq-icon")
        otherAnswer.classList.remove("active")
        otherIcon.textContent = "+"
      }
    })
  
    // Toggle current FAQ
    if (faqItem.classList.contains("active")) {
      faqItem.classList.remove("active")
      answer.classList.remove("active")
      icon.textContent = "+"
    } else {
      faqItem.classList.add("active")
      answer.classList.add("active")
      icon.textContent = "−"
    }
  }
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
  
  // Parallax effect for hero background
  let ticking = false
  
  function updateParallax() {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg-image")
  
    if (heroBackground) {
      const speed = 0.5
      heroBackground.style.transform = `translateY(${scrolled * speed}px)`
    }
  
    ticking = false
  }
  
  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }
  
  window.addEventListener("scroll", requestParallaxUpdate)
  
  // Button click handlers
  document.addEventListener("DOMContentLoaded", () => {
    // CTA Button handlers
    const ctaButtons = document.querySelectorAll(
      ".cta-button, .hero-cta-button, .pricing-cta-button, .live-cta-button, .download-button",
    )
  
    ctaButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Add click animation
        button.style.transform = "scale(0.95)"
        setTimeout(() => {
          button.style.transform = ""
        }, 150)
  
        // Log button action (replace with actual functionality)
        console.log("Button clicked:", button.textContent.trim())
  
        // You can add specific actions based on button type
        if (button.classList.contains("hero-cta-button") || button.classList.contains("pricing-cta-button")) {
          // Redirect to signup or show modal
          console.log("Redirecting to signup...")
        } else if (button.classList.contains("download-button")) {
          // Handle app download
          console.log("Initiating app download...")
        }
      })
    })
  })
  
  // Header scroll effect
  let lastScrollTop = 0
  const header = document.querySelector(".header")
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }
  
    lastScrollTop = scrollTop
  })
  
  // Card hover effects with enhanced animations
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".feature-card, .testimonial-card")
  
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)"
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
      })
    })
  })
  
  // Loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  
    // Trigger hero animation
    setTimeout(() => {
      const heroContent = document.querySelector(".hero-content")
      if (heroContent) {
        heroContent.classList.add("visible")
      }
    }, 500)
  })
  
  // Mobile menu toggle (if needed for future expansion)
  function toggleMobileMenu() {
    const nav = document.querySelector(".nav-container")
    nav.classList.toggle("mobile-open")
  }
  
  // Form validation (for future contact forms)
  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let isValid = true
  
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("error")
        isValid = false
      } else {
        input.classList.remove("error")
      }
    })
  
    return isValid
  }
  
  // Utility function for smooth animations
  function animateElement(element, animation, duration = 1000) {
    element.style.animation = `${animation} ${duration}ms ease-in-out`
  
    setTimeout(() => {
      element.style.animation = ""
    }, duration)
  }
  
  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Apply debounce to scroll-heavy functions
  const debouncedParallax = debounce(requestParallaxUpdate, 10)
  window.addEventListener("scroll", debouncedParallax)
  