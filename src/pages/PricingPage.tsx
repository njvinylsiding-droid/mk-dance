import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const groupPackages = [
  {
    name: 'Drop-In Class',
    price: 25,
    period: 'per class',
    description: 'Try a single class with no commitment.',
    features: ['Access to any group class', 'No membership required', 'All levels welcome', 'Pay at the door or online'],
    popular: false,
  },
  {
    name: '4-Class Pack',
    price: 80,
    period: 'per month',
    description: 'Perfect for once-a-week dancers.',
    features: ['4 group classes', 'Valid for 30 days', 'Any class style', 'Save $20 vs drop-in', 'Flexible scheduling'],
    popular: true,
    savings: 20,
  },
  {
    name: '8-Class Pack',
    price: 140,
    period: 'per month',
    description: 'For dancers who want faster progress.',
    features: ['8 group classes', 'Valid for 30 days', 'Any class style', 'Save $60 vs drop-in', 'Priority booking', 'Includes open practice'],
    popular: false,
    savings: 60,
  },
  {
    name: 'Unlimited Monthly',
    price: 199,
    period: 'per month',
    description: 'Unlimited access for the dedicated dancer.',
    features: ['Unlimited group classes', 'All styles included', 'Open practice sessions', 'Priority booking', '10% off private lessons', 'Cancel anytime'],
    popular: false,
    savings: 100,
  },
];

const privatePackages = [
  {
    name: 'Single Private Lesson',
    price: 85,
    period: 'per session',
    description: 'One-on-one with your chosen instructor.',
    features: ['60 minute session', '1-on-1 instruction', 'Customized to your goals', 'Any dance style', 'Flexible scheduling'],
    popular: false,
  },
  {
    name: '4-Lesson Private Pack',
    price: 300,
    period: '4 sessions',
    description: 'Commit to your progress with a package.',
    features: ['4 x 60 minute sessions', 'Save $40 vs single', 'Structured curriculum', 'Progress tracking', 'Valid for 60 days'],
    popular: true,
    savings: 40,
  },
  {
    name: '8-Lesson Private Pack',
    price: 560,
    period: '8 sessions',
    description: 'Maximum value for serious learners.',
    features: ['8 x 60 minute sessions', 'Save $120 vs single', 'Comprehensive program', 'Video progress reviews', 'Valid for 90 days', 'Couples welcome'],
    popular: false,
    savings: 120,
  },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleSelectPackage = (name: string) => {
    setSelectedPackage(name);
    setShowPayment(true);
    setTimeout(() => {
      const el = document.getElementById('payment-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.name || !paymentForm.email || !paymentForm.phone) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    toast({
      title: 'Registration Received!',
      description: `We'll confirm your ${selectedPackage} package within 24 hours. Welcome to MK Dance Studio!`,
    });
    setShowPayment(false);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">MK</span>
              </div>
              <span className="text-white font-bold text-xl">MK Dance Studio</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Class Packages & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Pricing</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the package that fits your goals. All packages include access to our beautiful Ironbound studio.
            </p>
          </div>
        </div>
      </div>

      {/* Group Classes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-16">Group Class Packages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {groupPackages.map((pkg, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                pkg.popular ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-200'
              } ${selectedPackage === pkg.name ? 'ring-4 ring-red-500/30' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              {pkg.savings && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Save ${pkg.savings}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">${pkg.price}</span>
                <span className="text-gray-400 text-sm ml-1">/{pkg.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPackage(pkg.name)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>

        {/* Private Lessons */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Private Lesson Packages</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {privatePackages.map((pkg, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                pkg.popular ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-200'
              } ${selectedPackage === pkg.name ? 'ring-4 ring-amber-500/30' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Best Value
                  </span>
                </div>
              )}
              {pkg.savings && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Save ${pkg.savings}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">${pkg.price}</span>
                <span className="text-gray-400 text-sm ml-1">/{pkg.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPackage(pkg.name)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        {showPayment && (
          <div id="payment-section" className="max-w-2xl mx-auto mb-20">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Complete Your Registration</h2>
                  <p className="text-gray-500 text-sm mt-1">Selected: <span className="font-semibold text-red-600">{selectedPackage}</span></p>
                </div>
                <button
                  onClick={() => { setShowPayment(false); setSelectedPackage(null); }}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={paymentForm.name}
                      onChange={e => setPaymentForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={paymentForm.phone}
                      onChange={e => setPaymentForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="(201) 555-0123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={paymentForm.email}
                    onChange={e => setPaymentForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="you@email.com"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Payment Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={e => setPaymentForm(p => ({ ...p, cardNumber: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={paymentForm.expiry}
                        onChange={e => setPaymentForm(p => ({ ...p, expiry: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={paymentForm.cvv}
                        onChange={e => setPaymentForm(p => ({ ...p, cvv: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-xl shadow-red-600/20 mt-4"
                >
                  Complete Registration
                </button>
                <p className="text-center text-gray-400 text-xs mt-2">
                  Secure payment. Your information is encrypted and protected.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I switch packages?', a: 'Absolutely! You can upgrade or change your package at any time. We\'ll prorate the difference.' },
              { q: 'Do packages expire?', a: 'Class packs are valid for the duration listed (30, 60, or 90 days from purchase). Monthly unlimited renews each month.' },
              { q: 'Can I share my package with someone?', a: 'Packages are individual and non-transferable. However, couples can each purchase their own package.' },
              { q: 'What\'s your cancellation policy?', a: 'Monthly unlimited can be cancelled anytime. Class packs are non-refundable but can be used within their validity period.' },
              { q: 'Do you offer student or military discounts?', a: 'Yes! Contact us for special pricing for students, military, and first responders.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center pb-20">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
