import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2, ShieldCheck, Send,
} from 'lucide-react';
import { AGENCY_INFO } from '../../data/agencyData';

interface ContactSectionProps {
  initialService?: string;
  /** kept for backwards compatibility with the Quote page (no longer used) */
  initialBudget?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website_honeypot: string;
}

type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message', string>>;

const SUBJECT_OPTIONS = ['Digital Marketing', 'SEO Optimization', 'Website'];

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website_honeypot: '',
};

/** Map a service title coming from a link (?service=...) to one of the select options. */
const mapServiceToSubject = (service: string): string => {
  const t = service.toLowerCase();
  if (!t) return '';
  if (t.includes('seo') || t.includes('search')) return 'SEO Optimization';
  if (t.includes('web') || t.includes('ui') || t.includes('design') || t.includes('develop')) return 'Website';
  if (t.includes('ads') || t.includes('market') || t.includes('social') || t.includes('brand')) return 'Digital Marketing';
  return '';
};

const inputBase =
  'w-full px-4 py-3 text-sm rounded-xl border bg-[#f9f9f9] text-[#0a0a0a] placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]';

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    ...initialFormState,
    subject: mapServiceToSubject(initialService),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!formData.name.trim()) e.name = 'Please enter your name.';
    else if (formData.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';

    if (!formData.email.trim()) e.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      e.email = 'Please enter a valid email address.';

    if (!formData.phone.trim()) e.phone = 'Please enter your phone number.';
    else if (!/^\d{7,15}$/.test(formData.phone.replace(/[\s()+-]/g, '')))
      e.phone = 'Please enter a valid phone number.';

    if (!formData.subject) e.subject = 'Please select a service.';

    if (!formData.message.trim()) e.message = 'Please tell us about your requirements.';
    else if (formData.message.trim().length < 10) e.message = 'Please enter at least 10 characters.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Honeypot spam protection
    if (formData.website_honeypot) return;
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_txmvqfi';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_q0mj0zq';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Ppb72WrdgtSh1pGrZ';

      // These names MUST match the variables used in your EmailJS template:
      // {{name}} {{email}} {{phone}} {{subject}} {{message}}
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (err) {
      console.error('EmailJS submission failed:', err);
      setErrorMessage(
        `Unable to send your message right now. Please try again or email us at ${AGENCY_INFO.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (hasError?: string) =>
    `${inputBase} ${hasError ? 'border-red-500' : 'border-black/10'}`;

  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-2';

  const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
    msg ? (
      <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {msg}
      </p>
    ) : null;

  return (
    <section id="contact-form" className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="bg-grain-dark text-white rounded-[24px] sm:rounded-[36px] p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, White Headline, Contact Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>GET IN TOUCH</span>
              </div>

              {/* White Headline */}
              <h2 className="headline-editorial font-light tracking-tight text-white mb-8">
                Tell us about your project - whether it&apos;s a website, SEO, or marketing.
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-12 max-w-lg">
                We collaborate with ambitious founders, established enterprises, and fast-scaling startups to build category-defining digital solutions.
              </p>
            </div>

            {/* Info Columns: TALK TO US and ADDRESS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              {/* Column 1: TALK TO US */}
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 block mb-4">
                  TALK TO US
                </span>
                <div className="space-y-3 text-sm">
                  <a
                    href={`mailto:${AGENCY_INFO.email}`}
                    className="flex items-center gap-2.5 text-white hover:text-gray-300 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    <span>{AGENCY_INFO.email}</span>
                  </a>
                  <a
                    href="tel:+918607653657"
                    className="flex items-center gap-2.5 text-white hover:text-gray-300 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    <span>{AGENCY_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Column 2: ADDRESS */}
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 block mb-4">
                  ADDRESS
                </span>
                <div className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    {AGENCY_INFO.address.line1}, {AGENCY_INFO.address.line2}, {AGENCY_INFO.address.city}, {AGENCY_INFO.address.state} {AGENCY_INFO.address.zip}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: White Rounded Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white text-[#0a0a0a] rounded-[24px] p-8 sm:p-10 shadow-xl border border-black/5">
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#0a0a0a] mb-2">
                Have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-[#6b6b6b] mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSuccess ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-light text-[#0a0a0a] mb-2">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-[#6b6b6b] max-w-sm mb-8 leading-relaxed">
                    Thank you! Your project inquiry has been received by Himnora IT Solution. We will review your requirements and reach out promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsSuccess(false); setErrors({}); }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] underline underline-offset-4 hover:opacity-75"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_honeypot">Leave this blank</label>
                    <input
                      type="text"
                      id="website_honeypot"
                      name="website_honeypot"
                      value={formData.website_honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>Your Name *</label>
                      <input
                        type="text" id="name" name="name"
                        placeholder="Enter your name"
                        value={formData.name} onChange={handleChange}
                        className={fieldClass(errors.name)}
                      />
                      <FieldError msg={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input
                        type="email" id="email" name="email"
                        placeholder="you@example.com"
                        value={formData.email} onChange={handleChange}
                        className={fieldClass(errors.email)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                      <input
                        type="tel" id="phone" name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handleChange}
                        className={fieldClass(errors.phone)}
                      />
                      <FieldError msg={errors.phone} />
                    </div>
                    <div>
                      <label htmlFor="subject" className={labelClass}>Subject *</label>
                      <select
                        id="subject" name="subject"
                        value={formData.subject} onChange={handleChange}
                        className={fieldClass(errors.subject)}
                      >
                        <option value="" disabled>Select a service...</option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <FieldError msg={errors.subject} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>Message *</label>
                    <textarea
                      id="message" name="message" rows={5}
                      placeholder="Tell us about your requirements..."
                      value={formData.message} onChange={handleChange}
                      className={`${fieldClass(errors.message)} resize-none`}
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0a0a0a] text-white hover:bg-[#222] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center text-[11px] text-slate-500 pt-3 border-t border-black/5">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0a0a0a]" />
                      Your information is secure and only used to respond to your enquiry.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
