import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ArrowRight,
  Send,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export function Connect() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Brand Film',
    budget: '$5,000 – $10,000',
    description: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedSuccessMessage, setCopiedSuccessMessage] = useState(false)

  const nameInputRef = useRef(null)

  const copyToClipboard = (text, key, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setToastMessage(`${label} copied to clipboard`)
      setTimeout(() => setCopiedKey(null), 2500)
      setTimeout(() => setToastMessage(''), 3000)
    })
  }

  const scrollToFormAndFocus = () => {
    if (nameInputRef.current) {
      nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      nameInputRef.current.focus()
    }
  }

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (formData.phone.trim() && !/^[+0-9\s\-()]{7,}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number or leave empty.'
    }

    if (!formData.description.trim()) {
      errs.description = 'Please describe what you are looking to create.'
    } else if (formData.description.trim().length < 20) {
      errs.description = 'Please provide at least 20 characters for your project brief.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const buildFormattedMessage = () => {
    return (
      `Hi Reverts Team,\n\n` +
      `I'm interested in commissioning a video project with Reverts.\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone || 'Not provided'}\n` +
      `• Project Type: ${formData.projectType}\n` +
      `• Budget Range: ${formData.budget}\n\n` +
      `Project Brief:\n${formData.description}\n\n` +
      `Sent via reverts.com`
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const formattedMessage = buildFormattedMessage()
    const subject = encodeURIComponent(`New project inquiry: ${formData.projectType} — ${formData.name}`)
    const body = encodeURIComponent(formattedMessage)

    // 1. Open visitor's native email client
    const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
    window.location.href = mailtoUrl

    // 2. Show verified honest state
    setIsSubmitted(true)
  }

  const handleCopyMessage = () => {
    const formatted = buildFormattedMessage()
    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedSuccessMessage(true)
      setTimeout(() => setCopiedSuccessMessage(false), 2500)
    })
  }

  const handleWhatsApp = () => {
    const formatted = buildFormattedMessage()
    const url = `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(formatted)}`
    window.open(url, '_blank')
  }

  return (
    <section id="connect" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative">
      {/* Toast Notification region */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="bg-surface text-text-primary px-4 py-2.5 rounded-pill shadow-soft border border-border text-xs sm:text-sm font-medium flex items-center gap-2 pointer-events-auto"
            >
              <Check className="w-4 h-4 text-accent-dark" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-3 block">
          Get in Touch
        </span>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.1] mb-5">
          Have an idea worth bringing to life?
        </h2>
        <p className="text-text-secondary text-lg sm:text-xl font-normal leading-relaxed mb-6">
          Tell us what you're imagining. We'll help turn it into a visual story worth watching.
        </p>

        <button
          type="button"
          onClick={scrollToFormAndFocus}
          className="inline-flex items-center gap-2 text-accent-dark hover:text-text-primary font-medium text-base group transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
        >
          <span>Let's create together</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Contact & Location */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="font-serif italic text-2xl text-text-primary mb-4">
              Direct Contact
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Reach out directly by email or WhatsApp. We reply promptly with creative ideas and preliminary timelines.
            </p>
          </div>

          {/* Contact Details Rows */}
          <div className="space-y-4">
            {/* Email Row */}
            <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle group hover:border-accent/40 transition-all flex items-center justify-between">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3.5 text-text-primary group-hover:text-accent-dark transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary group-hover:text-accent-dark">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-text-secondary block">Email</span>
                  <span className="text-sm sm:text-base font-medium">{siteConfig.contact.email}</span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(siteConfig.contact.email, 'email', 'Email')}
                className="p-2 rounded-full hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Copy email address"
                title="Copy email"
              >
                {copiedKey === 'email' ? (
                  <Check className="w-4 h-4 text-accent-dark" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Row */}
            <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle group hover:border-accent/40 transition-all flex items-center justify-between">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3.5 text-text-primary group-hover:text-accent-dark transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary group-hover:text-accent-dark">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-text-secondary block">Phone / Mobile</span>
                  <span className="text-sm sm:text-base font-medium">{siteConfig.contact.phone}</span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(siteConfig.contact.phone, 'phone', 'Phone number')}
                className="p-2 rounded-full hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Copy phone number"
                title="Copy phone"
              >
                {copiedKey === 'phone' ? (
                  <Check className="w-4 h-4 text-accent-dark" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* WhatsApp Row */}
            <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle group hover:border-accent/40 transition-all flex items-center justify-between">
              <a
                href={`https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 text-text-primary group-hover:text-accent-dark transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary group-hover:text-accent-dark">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-text-secondary block">WhatsApp</span>
                  <span className="text-sm sm:text-base font-medium">Chat with Director</span>
                </div>
              </a>

              <span className="text-xs font-mono text-accent-dark px-2.5 py-1 bg-accent/15 rounded-pill font-medium">
                Active
              </span>
            </div>
          </div>

          {/* Location & Studio Notes */}
          <div className="pt-6 border-t border-border space-y-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-accent-dark flex-shrink-0" />
              <span>{siteConfig.contact.location} • {siteConfig.contact.availabilityNote}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-accent-dark flex-shrink-0" />
              <span>{siteConfig.contact.responseTime}</span>
            </div>
          </div>

          {/* Social Links (only rendered if URL is set in config) */}
          <div className="pt-6 border-t border-border">
            <span className="text-xs uppercase tracking-wider text-text-secondary font-semibold block mb-3">
              Follow Our Experiments
            </span>
            <div className="flex flex-wrap gap-3">
              {siteConfig.contact.socials.instagram && (
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-pill border border-border text-xs font-medium hover:border-text-primary text-text-secondary hover:text-text-primary transition-colors"
                >
                  Instagram
                </a>
              )}
              {siteConfig.contact.socials.youtube && (
                <a
                  href={siteConfig.contact.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-pill border border-border text-xs font-medium hover:border-text-primary text-text-secondary hover:text-text-primary transition-colors"
                >
                  YouTube
                </a>
              )}
              {siteConfig.contact.socials.linkedin && (
                <a
                  href={siteConfig.contact.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-pill border border-border text-xs font-medium hover:border-text-primary text-text-secondary hover:text-text-primary transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {siteConfig.contact.socials.x && (
                <a
                  href={siteConfig.contact.socials.x}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-pill border border-border text-xs font-medium hover:border-text-primary text-text-secondary hover:text-text-primary transition-colors"
                >
                  X (Twitter)
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className="lg:col-span-7 bg-surface p-8 sm:p-10 rounded-media border border-border shadow-soft">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="border-b border-border pb-4 mb-6">
                <h3 className="font-serif italic text-2xl sm:text-3xl text-text-primary mb-1">
                  Start a Conversation
                </h3>
                <p className="text-text-secondary text-sm">
                  Fill in the project outline below to generate your direct inquiry.
                </p>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="form-name" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={nameInputRef}
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none"
                    aria-describedby={errors.name ? 'error-name' : undefined}
                  />
                </div>
                {errors.name && (
                  <motion.p
                    id="error-name"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-1.5"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label htmlFor="form-email" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@company.com"
                    className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none"
                    aria-describedby={errors.email ? 'error-email' : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      id="error-email"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-600 mt-1.5"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="form-phone" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                    Phone / WhatsApp <span className="text-text-secondary/60 lowercase">(optional)</span>
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none"
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                  />
                  {errors.phone && (
                    <motion.p
                      id="error-phone"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-600 mt-1.5"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Project Type & Budget Range Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="form-project-type" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                    Project Type
                  </label>
                  <select
                    id="form-project-type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none"
                  >
                    <option value="Brand Film">Brand Film</option>
                    <option value="AI Storytelling">AI Storytelling / Narrative</option>
                    <option value="Product Commercial">Product Commercial</option>
                    <option value="Promotional Campaign">Promotional Campaign</option>
                    <option value="Experimental Visuals">Experimental Visuals</option>
                    <option value="Other">Other Custom Vision</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-budget" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                    Expected Budget Range
                  </label>
                  <select
                    id="form-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none"
                  >
                    <option value="< $5,000">&lt; $5,000</option>
                    <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000+">$25,000+ (Comprehensive)</option>
                    <option value="Undisclosed / Discussion">Let's discuss</option>
                  </select>
                </div>
              </div>

              {/* Brief Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="form-description" className="block text-xs uppercase tracking-wider text-text-secondary font-semibold">
                    Brief Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-mono text-text-secondary">
                    {formData.description.length} / 500
                  </span>
                </div>
                <textarea
                  id="form-description"
                  required
                  maxLength={500}
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us what you are imagining: the mood, story, desired visual aesthetic, or timeline..."
                  className="w-full px-4 py-3 bg-bg-secondary/40 rounded-xl border border-border focus:border-accent focus:bg-white text-text-primary text-sm transition-all outline-none resize-none"
                  aria-describedby={errors.description ? 'error-description' : undefined}
                />
                {errors.description && (
                  <motion.p
                    id="error-description"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 mt-1.5"
                  >
                    {errors.description}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group py-3.5 px-6 rounded-pill bg-text-primary text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-black transition-all shadow-subtle active:scale-[0.99]"
              >
                <span>Generate Inquiry & Open Email</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Honesty Disclosure */}
              <p className="text-[11px] text-text-secondary text-center leading-relaxed">
                Reverts processes this request directly on your device. We never capture or store your personal data on remote servers without explicit consent.
              </p>
            </form>
          ) : (
            /* Honest Success State */
            <div className="py-8 text-center space-y-6">
              {/* Animated Drawn Checkmark */}
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mx-auto text-accent-dark">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              <div>
                <h4 className="font-serif italic text-3xl text-text-primary mb-2">
                  Your email draft is ready.
                </h4>
                <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Your default email client was opened with your project brief prefilled. Simply press send to deliver it to our creative directors.
                </p>
              </div>

              {/* Fallback Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-pill bg-accent/20 hover:bg-accent/30 text-accent-dark text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-pill border border-border hover:bg-bg-secondary text-text-primary text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {copiedSuccessMessage ? (
                    <>
                      <Check className="w-4 h-4 text-accent-dark" />
                      <span>Message Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-text-secondary hover:text-text-primary underline transition-colors"
                >
                  Edit inquiry details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
