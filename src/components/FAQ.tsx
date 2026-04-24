import React, { useState } from 'react';

const faqs = [
  {
    question: "I've never danced before. Can I still join?",
    answer: "Absolutely! Most of our students start with zero dance experience. Our beginner classes are designed specifically for people who have never danced before. We break everything down step by step, and our instructors are incredibly patient and encouraging. You'll be surprised how quickly you pick it up!",
  },
  {
    question: 'What should I wear to class?',
    answer: "Wear comfortable clothing that allows you to move freely — think stretchy pants or jeans, and a breathable top. For shoes, bring clean indoor shoes with smooth soles (avoid rubber/sneaker soles as they grip the floor too much). Many students start with socks and later invest in dance shoes. We can recommend great options!",
  },
  {
    question: 'Do I need to bring a dance partner?',
    answer: "Not at all! In our group classes, we rotate partners so everyone gets to dance with everyone. This is actually one of the best ways to improve because you learn to adapt to different partners. Solo students are always welcome — you'll never feel left out.",
  },
  {
    question: 'What is Salsa On2 (New York Style)?',
    answer: "Salsa On2, also known as New York Style Mambo, is a smooth, elegant style of salsa where dancers break on the second beat of the music. It's known for its musicality, body movement, and sophisticated turn patterns. It's the style danced in New York's legendary salsa clubs and is considered by many to be the most refined form of salsa.",
  },
  {
    question: "What's the difference between private and group lessons?",
    answer: "Group lessons are perfect for learning in a fun, social environment with other students. You'll learn choreography, technique, and get to practice with multiple partners. Private lessons offer one-on-one attention with an instructor, allowing for a customized curriculum focused on your specific goals and pace. Many students do both!",
  },
  {
    question: 'How often should I take classes?',
    answer: "For steady progress, we recommend at least one class per week. Students who take 2-3 classes per week see the fastest improvement. Consistency is key — even one class a week will have you dancing confidently within a few months. Our flexible packages make it easy to find the right frequency for you.",
  },
  {
    question: 'Is there parking available?',
    answer: "Yes! There's street parking available on Monroe Street and surrounding blocks. There are also nearby parking lots. The studio is also easily accessible via public transit — we're just a short walk from Newark Penn Station.",
  },
  {
    question: 'What age groups do you teach?',
    answer: "Our classes are designed for adults of all ages. We have students ranging from their early 20s to their 60s, and everyone dances together. Latin dance is truly ageless — it's about the music, the movement, and the joy of dancing.",
  },
  {
    question: 'How does the free trial class work?',
    answer: "Simply fill out our booking form and we'll contact you to schedule your free trial class. You'll join a regular group class, meet our instructors, and experience the MK Dance Studio vibe firsthand. There's absolutely no obligation — just come, dance, and see if you love it (you will!).",
  },
  {
    question: 'Can couples take lessons together?',
    answer: "Of course! Couples are welcome in both group and private lessons. Private lessons are especially popular with couples who want to learn together at their own pace. In group classes, we do rotate partners for learning purposes, but you'll also get plenty of time dancing with your partner.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Asked</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about MK Dance Studio. Can't find your answer? Contact us!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === i ? 'border-red-200 shadow-lg shadow-red-100/50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold text-lg pr-4 transition-colors ${openIndex === i ? 'text-red-600' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  openIndex === i ? 'bg-red-100 rotate-180' : 'bg-gray-100'
                }`}>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-6">We'd love to hear from you. Reach out anytime!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19735551234"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a
              href="mailto:info@mkdancestudio.com"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
