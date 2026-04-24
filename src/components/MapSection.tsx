import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Find Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Our Studio</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Located in the heart of Newark's Ironbound section. Come visit us and feel the rhythm!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[400px] lg:h-auto bg-gray-100">
            <iframe
              title="MK Dance Studio Location"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              src="https://www.google.com/maps?q=86+Monroe+St,+Newark,+NJ+07105&output=embed"
              allowFullScreen
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Studio Address</h3>
                  <p className="text-gray-600">86 Monroe Street, 3rd Floor</p>
                  <p className="text-gray-600">Newark's Ironbound Section</p>
                  <p className="text-gray-600">Newark, NJ 07105</p>
                  <a
                    href="https://www.google.com/maps/dir//86+Monroe+St,+Newark,+NJ+07105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-sm mt-3 transition-colors"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                  <a href="tel:+12019235803" className="text-gray-600 hover:text-red-600 transition-colors text-lg">(201) 923-5803</a>
                  <p className="text-gray-400 text-sm mt-1">Mon-Sat: 10am - 9pm | Sun: 10am - 5pm</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                  <a href="mailto:info@mkdancestudio.com" className="text-gray-600 hover:text-red-600 transition-colors">info@mkdancestudio.com</a>
                  <p className="text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', href: '#', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
                  { name: 'Facebook', href: '#', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'TikTok', href: '#', path: 'M9 12a4 4 0 104 4V4a5 5 0 005 5' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 transition-all hover:-translate-y-1"
                    title={social.name}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
