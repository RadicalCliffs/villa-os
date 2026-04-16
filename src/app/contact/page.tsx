'use client';

import { useState } from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { NavHeader } from '@/components/nav-header';
import { Footer } from '@/components/footer';

const villaRanges = ['1-5', '6-20', '21-50', '50+'];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get in touch</h1>
          <p className="mt-4 text-lg text-emerald-100/70 max-w-xl mx-auto">
            Have questions about VillaOS? Our team in Phuket is here to help.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-emerald-100 dark:bg-emerald-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message sent</h2>
                  <p className="text-gray-500 dark:text-gray-400">We will get back to you within one business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Villas Managed</label>
                    <select
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select a range</option>
                      {villaRanges.map((r) => (
                        <option key={r} value={r}>{r} villas</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact information</h2>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Office</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Boat Lagoon, 22/1 Moo 2, Thepkrasattri Road, Koh Kaew, Phuket 83000</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">hello@villaos.co</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Phone</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+66 76 456 789</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Hours</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Monday - Friday, 9:00 - 18:00 (ICT)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl h-64 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-700/30">
                <div className="text-center text-emerald-500/50">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm font-medium">Map</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Follow us</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Facebook">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Instagram">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C8.808 0 8.408.015 7.122.072 5.838.129 4.942.333 4.162.63c-.805.31-1.488.726-2.168 1.406C1.314 2.716.898 3.399.588 4.204.29 4.984.087 5.88.029 7.164-.028 8.45-.028 8.85-.028 12.06c0 3.21.015 3.61.072 4.896.057 1.284.261 2.18.558 2.96.31.805.726 1.488 1.406 2.168.68.68 1.363 1.096 2.168 1.406.78.297 1.676.5 2.96.558 1.286.057 1.686.072 4.896.072s3.61-.015 4.896-.072c1.284-.057 2.18-.261 2.96-.558.805-.31 1.488-.726 2.168-1.406.68-.68 1.096-1.363 1.406-2.168.297-.78.5-1.676.558-2.96.057-1.286.072-1.686.072-4.896s-.015-3.61-.072-4.896c-.057-1.284-.261-2.18-.558-2.96-.31-.805-.726-1.488-1.406-2.168C20.74 1.314 20.057.898 19.252.588 18.472.29 17.576.087 16.292.029 15.006-.028 14.606-.028 11.396-.028h.621zM11.4 2.163c3.147 0 3.52.012 4.764.069 1.15.052 1.773.245 2.188.407.55.213.942.469 1.353.88.412.412.667.804.88 1.354.162.415.355 1.038.407 2.188.057 1.244.069 1.617.069 4.764s-.012 3.52-.069 4.764c-.052 1.15-.245 1.773-.407 2.188-.213.55-.469.942-.88 1.353-.412.412-.804.667-1.354.88-.415.162-1.038.355-2.188.407-1.244.057-1.617.069-4.764.069s-3.52-.012-4.764-.069c-1.15-.052-1.773-.245-2.188-.407-.55-.213-.942-.469-1.353-.88-.412-.412-.667-.804-.88-1.354-.162-.415-.355-1.038-.407-2.188C2.175 15.52 2.163 15.147 2.163 12s.012-3.52.069-4.764c.052-1.15.245-1.773.407-2.188.213-.55.469-.942.88-1.353.412-.412.804-.667 1.354-.88.415-.162 1.038-.355 2.188-.407C8.305 2.175 8.678 2.163 11.825 2.163H12zm0 3.537a6.3 6.3 0 100 12.6 6.3 6.3 0 000-12.6zM12 16.1a4.1 4.1 0 110-8.2 4.1 4.1 0 010 8.2zm8.042-10.473a1.473 1.473 0 11-2.946 0 1.473 1.473 0 012.946 0z"/></svg>
                  </a>
                  <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" aria-label="Line">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
