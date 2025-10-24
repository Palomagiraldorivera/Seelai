'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { AnimatedSection } from './components/AnimatedSection'

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Define section IDs for scroll animation
  const sectionIds = ['hero', 'services', 'about', 'contact']
  const { activeSection, isSectionActive, getSectionVisibility } = useScrollAnimation(sectionIds)

  // Smooth scroll to section with proper centering
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Approximate header height
      const elementTop = element.offsetTop - headerHeight
      const windowHeight = window.innerHeight
      const elementHeight = element.offsetHeight
      
      // Calculate scroll position to center the section
      const scrollPosition = elementTop - (windowHeight - elementHeight) / 2
      
      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      const response = await fetch('https://formspree.io/f/xzzjlpew', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    }
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Seelai</h1>
              <a 
                href="https://oversai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Oversai Partner
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <AnimatedSection 
        id="hero"
        isActive={isSectionActive('hero')}
        visibilityRatio={getSectionVisibility('hero')}
        className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Building with
              <span className="block text-gray-600 mt-2 sm:mt-4">Intention</span>
            </h1>
          </div>
          
          <div className="mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-light">
              We design and implement AI agents for any use case: customer service, 
              automation, analysis, or internal support.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Our goal is to integrate AI naturally into your processes, regardless of industry or area.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto border-2 border-gray-300 text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-8 sm:mt-12 md:mt-16 animate-bounce">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection 
        id="services"
        isActive={isSectionActive('services')}
        visibilityRatio={getSectionVisibility('services')}
        className="flex items-center justify-center min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
              We create the future of your company with AI. Our solutions integrate 
              seamlessly into your existing processes and transform your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors duration-300">AI Consulting</h3>
              <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Strategic guidance to identify AI opportunities and create implementation roadmaps that drive real business value.
              </p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-700 transition-colors duration-300">AI Implementation</h3>
              <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                End-to-end development and deployment of AI solutions tailored to your specific business needs and objectives.
              </p>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-purple-700 transition-colors duration-300">Process Automation</h3>
              <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Streamline your operations with intelligent automation that adapts to your business and scales with your growth.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection 
        id="about"
        isActive={isSectionActive('about')}
        visibilityRatio={getSectionVisibility('about')}
        className="flex items-center justify-center min-h-screen py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Seelai?</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Technology has arrived to help us all. We believe AI should integrate 
                naturally into any process, regardless of industry or area. Our approach 
                is intentional, strategic, and results-driven.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-600">Custom AI solutions for your specific needs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-600">Seamless integration with existing systems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <a href="https://oversai.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                      Oversai partnership for cutting-edge technology
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To democratize AI technology and make it accessible to businesses of all sizes. 
                We believe every company deserves the power of artificial intelligence.
              </p>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Partnership</p>
                <a 
                  href="https://oversai.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Oversai Partner
                </a>
                <p className="text-sm text-gray-600">Access to cutting-edge AI technology</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection 
        id="contact"
        isActive={isSectionActive('contact')}
        visibilityRatio={getSectionVisibility('contact')}
        className="flex items-center justify-center min-h-screen py-20 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Get In Touch</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Ready to build the future of your company? Let's start the conversation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Send us a message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">¡Mensaje enviado!</h4>
                  <p className="text-gray-600 mb-4">Gracias por contactarnos. Te responderemos pronto.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-gray-900 hover:text-gray-700 underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form action="https://formspree.io/f/xzzjlpew" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-gray-900">seelaiconsulting@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-900">+57 3138742029</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href="https://wa.me/573138742029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Chat with us
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Seelai</h3>
            <p className="text-gray-400 mb-6">Building with Intention</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="https://oversai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
              >
                Oversai Partner
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Seelai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
