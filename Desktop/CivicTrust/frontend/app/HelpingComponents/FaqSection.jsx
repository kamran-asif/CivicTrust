'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaqSection = () => {
  const [citizenFaqs, setCitizenFaqs] = useState([]);
  const [policeFaqs, setPoliceFaqs] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const [citizenRes, policeRes] = await Promise.all([
          axios.get('http://localhost:5001/api/faqs/getFaq?section=citizen'),
          axios.get('http://localhost:5001/api/faqs/getFaq?section=police')
        ]);
        setCitizenFaqs(citizenRes.data);
        setPoliceFaqs(policeRes.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAnswer = (question) => {
    setActiveQuestion((prev) => (prev === question ? null : question));
  };

  const renderFaqBlock = (faqList) =>
    faqList.map((faq) => (
      <div
        key={faq._id}
        className="bg-blue-950/60 backdrop-blur-md border border-blue-700 hover:border-purple-500 transition-all duration-300 rounded-xl p-5 shadow-lg"
      >
        <button
          className="w-full flex justify-between items-center text-left font-medium text-white text-lg"
          onClick={() => toggleAnswer(faq.question)}
        >
          <span>{faq.question}</span>
          <span className="text-green-400 ml-2 text-sm">
            {activeQuestion === faq.question ? '▲' : '▼'}
          </span>
        </button>

        <div
          className={`transition-all overflow-hidden ${
            activeQuestion === faq.question ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          {activeQuestion === faq.question && (
            <p className="text-gray-300 text-base leading-relaxed">
              {faq.answer}
            </p>
          )}
        </div>
      </div>
    ));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 drop-shadow-md">
        Frequently Asked Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Citizen Section */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-200 mb-4">For Citizens</h3>
          <div className="space-y-6">
            {renderFaqBlock(citizenFaqs)}
          </div>
        </div>

        {/* Police Section */}
        <div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">For Police</h3>
          <div className="space-y-6">
            {renderFaqBlock(policeFaqs)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
