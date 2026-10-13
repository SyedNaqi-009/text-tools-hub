'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [{ name: 'Contact Support', url: '/contact' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:contact@texttoolshub.com?subject=${encodeURIComponent(
      subject || 'Inquiry from TextToolsHub'
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-subtle-grid min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <div className="relative mb-12 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Direct Support & Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Get in Touch with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">Studio Team</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Have a feature proposal, found a bug in one of our 22 utilities, or inquiring about partnerships? We value high-signal feedback from authors, engineers, and creators.
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-indigo-400 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">Direct Inbox</h2>
            <p className="text-sm font-mono text-indigo-600 mt-1 break-all">
              contact@texttoolshub.com
            </p>
            <p className="text-xs text-slate-500 mt-2">
              For general inquiries, editorial corrections & feedback.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-sky-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">Feature Proposals</h2>
            <p className="text-sm text-slate-700 mt-1">
              Toolkit Suggestions
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Request new text transformations, diff modes, or encoding standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">Response Window</h2>
            <p className="text-sm text-slate-700 mt-1">
              Within 24–48 Hours
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Every inquiry is reviewed by our engineering maintainers.
            </p>
          </div>
        </div>

        {/* Form Container */}
        {submitted ? (
          <div className="p-10 rounded-3xl bg-slate-950 border border-slate-800 text-white text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Inquiry Prepared</h2>
            <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
              Your default email client has been triggered with your pre-filled inquiry. You can also send directly to{' '}
              <span className="font-mono text-indigo-400 font-semibold">contact@texttoolshub.com</span>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
            <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Send a Direct Message</h2>
                <p className="text-sm text-slate-500 mt-1">Fill out the fields below to initiate your inquiry.</p>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Zero spam, direct response</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Bug report in Markdown Converter, or New Tool Proposal"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Message Details
                </label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide context, input sample if reporting a conversion error, or tool specifications..."
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-md hover:shadow-indigo-600/20 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}
