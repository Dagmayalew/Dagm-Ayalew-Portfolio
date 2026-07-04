import React, { useState } from "react";
import { Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { showCvDownloadToast } from "@/components/CvDownloadToast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your mail app so the message can be sent directly.");
  }

  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Available for remote roles, freelance work, and product collaborations.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Reach out for mobile app development, frontend work, full-stack product builds,
            or product-focused engineering support.
          </p>

          <div className="mt-8 grid gap-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-gray-300 hover:text-cyan-300">
              <Mail className="h-5 w-5" /> {profile.email}
            </a>
            <p className="flex items-center gap-3 text-gray-300">
              <Phone className="h-5 w-5" /> {profile.phone}
            </p>
            <p className="flex items-center gap-3 text-gray-300">
              <MapPin className="h-5 w-5" /> {profile.location}
            </p>
            <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-cyan-300">
              <Linkedin className="h-5 w-5" /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-cyan-300">
              <Github className="h-5 w-5" /> GitHub
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="grid gap-5">
            <input
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 outline-none focus:border-cyan-300"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 outline-none focus:border-cyan-300"
            />
            <textarea
              required
              rows="6"
              placeholder="Message"
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              className="resize-none rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 outline-none focus:border-cyan-300"
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Submit <Send className="h-4 w-4" />
            </button>
            <a href={profile.cvPath} download onClick={showCvDownloadToast} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300">
              Download CV <Download className="h-4 w-4" />
            </a>
          </div>
          {status && <p className="mt-4 text-sm text-cyan-300">{status}</p>}
        </form>
      </div>
    </section>
  );
}
