import React from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Drop-In',
    price: '$25',
    period: 'per class',
    description: 'Perfect for trying us out or occasional dancers.',
    features: ['Any group class', 'No commitment', 'All levels welcome', 'Pay as you go'],
    popular: false,
    color: 'border-gray-200',
  },
  {
    name: '4-Class Pack',
    price: '$80',
    period: 'per month',
    description: 'Our most popular option for weekly dancers.',
    features: ['4 group classes', 'Valid for 30 days', 'Save $20 vs drop-in', 'Any class style', 'Flexible scheduling'],
    popular: true,
    color: 'border-red-500',
  },
  {
    name: '8-Class Pack',
    price: '$140',
    period: 'per month',
    description: 'For the dedicated dancer who wants faster progress.',
    features: ['8 group classes', 'Valid for 30 days', 'Save $60 vs drop-in', 'Priority booking', 'Any class style'],
    popular: false,
    color: 'border-gray-200',
  },
  {
    name: 'Private Lesson',
    price: '$85',
    period: 'per session',
    description: 'One-on-one attention for accelerated learning.',
    features: ['1-on-1 with instructor', '60 minute session', 'Customized curriculum', 'Flexible scheduling', 'Couples welcome'],
    popular: false,
    color: 'border-gray-200',
  },
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Pricing</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Yourself</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Flexible packages designed to fit your schedule and goals. Start with a free trial class — no commitment required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border-2 ${pkg.color} transition-all duration-300 hover:-translate-y-1 ${
                pkg.popular ? 'ring-2 ring-red-500/20' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">{pkg.price}</span>
                <span className="text-gray-400 text-sm ml-1">{pkg.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/pricing')}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/20 hover:scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Full Pricing Link */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg transition-colors group"
          >
            View Full Pricing & Packages
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
