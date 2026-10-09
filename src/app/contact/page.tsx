'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [{ name: 'Contact', url: '/contact' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static client-side form behavior
    const mailtoUrl = `mailto:contact@texttoolshub.com?subject=${encodeURIComponent(
      subject || 'Inquiry from TextToolsHub'
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container className="max-w-3xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Get in Touch
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Support & Feedback
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a suggestion for a new text utility, found a bug, or want to partner with us? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Mail className="w-6 h-6 text-emerald-600 mb-2" />
            <h2 className="font-semibold text-slate-900 text-sm">Direct Email</h2>
            <p className="text-xs text-slate-600 mt-1">
              contact@texttoolshub.com
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <MessageSquare className="w-6 h-6 text-emerald-600 mb-2" />
            <h2 className="font-semibold text-slate-900 text-sm">Feedback</h2>
            <p className="text-xs text-slate-600 mt-1">
              Feature requests & bug reports
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
            <h2 className="font-semibold text-slate-900 text-sm">Response Time</h2>
            <p className="text-xs text-slate-600 mt-1">
              Typically within 24–48 hours
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-emerald-900">Thank You for Reaching Out!</h2>
            <p className="text-sm text-emerald-800 max-w-md mx-auto">
              Your default email application should have opened with your inquiry. If not, feel free to write directly to <strong>contact@texttoolshub.com</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Question, suggestion, or bug report"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </Container>
    </div>
  );
}
