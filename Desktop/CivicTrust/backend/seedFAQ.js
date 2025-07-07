import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from './models/faqModel.js';

dotenv.config();

const seedFAQs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await FAQ.deleteMany(); // Optional: clears old data

    const faqs = [
      {
        question: 'How to operate this as an officer?',
        answer: 'Click on the Police section on the home page -> Enter your badge number and your full name as per your ID card and you will be redirected to your personal dashboard.',
        section: 'police'
      },
      {
        question: 'What functionalities are available in the Police section?',
        answer: 'The Police section allows officers to file cases, manage reports, track case statuses, access records, act on anonymous tips, and act on active cases.',
        section: 'police'
      },
      {
        question: 'How do I close a case in the Police section?',
        answer: 'To view a case, navigate to the "Search Records" section and select the case you wish to update. You can close a case or mark it as reviewed for anonymous tips.',
        section: 'police'
      },
      {
        question: 'How do I file a case?',
        answer: 'Login to your police dashboard, click on "New Case" and fill out the form. You can attach evidence pictures as well.',
        section: 'police'
      },
      {
        question: 'How can I report an issue as a citizen?',
        answer: 'Head to the Citizen section, verify your identity and click on "Report incident". Fill out the necessary information and submit it.',
        section: 'citizen'
      },
      {
        question: 'Can i check the status of my complaint?',
        answer: 'Yes, as soon as an officer checks it and deals with it along with you, it will be marked as checked.',
        section: 'citizen'
      },
      {
        question: 'Is my report anonymous?',
        answer: 'If you file a complaint through the citizen dashboard it is NOT anonymous. For anonymity use the Anonymous dashboard.',
        section: 'citizen'
      },
      {
        question: 'How to submit an Anonymous tip?',
        answer: 'Open the anonymous portal, skipping verification. Click on submit Anonymous tip and fill the required details. ',
        section: 'citizen'
      }
    ];

    await FAQ.insertMany(faqs);
    console.log('FAQs seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding FAQs:', err);
    process.exit(1);
  }
};

seedFAQs();
