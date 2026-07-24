'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md scroll-smooth overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-surface-container-lowest fixed top-0 w-full z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-margin-page py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-title-lg font-headline-md font-bold text-primary">AAI Smart Washroom</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-stack-lg">
            <a className="text-primary border-b-2 border-primary font-bold transition-all duration-200" href="#">
              Home
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
              About Us
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
              System Overview
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
              Contact
            </a>
          </nav>
          
          <div className="relative" id="login-portal">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-[0.98]"
            >
              <span>Login</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            {/* Portal Dropdown */}
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl border border-outline-variant shadow-xl z-20 p-2 transform origin-top-right transition-all">
                  <p className="text-label-md font-label-md px-3 py-2 text-outline">Select Portal</p>
                  <Link
                    href="/login/admin"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        security
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-body-sm font-bold text-on-surface">AAI Admin</span>
                      <span className="text-[11px] text-on-surface-variant">Super admin access</span>
                    </div>
                  </Link>
                  <Link
                    href="/login/terminal"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-container transition-colors mt-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        groups
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-body-sm font-bold text-on-surface">Terminal Admin</span>
                      <span className="text-[11px] text-on-surface-variant">Terminal level access</span>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20 flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#f8f9ff] to-[#e5eeff] relative overflow-hidden min-h-[500px] py-16 flex items-center">
          <div className="max-w-container-max mx-auto px-margin-page grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center relative z-10">
            <div className="space-y-stack-md" id="hero-content">
              <h1 className="font-display-lg text-display-lg text-on-background tracking-tight font-bold">
                AAI Smart Washroom <br />
                <span className="text-primary">Monitoring System</span>
              </h1>
              <p className="text-body-md text-on-surface-variant max-w-lg">
                Empowering airport management with real-time monitoring, intelligent alerts, and data-driven insights for cleaner, smarter, and more efficient passenger facilities across India.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-primary text-3xl">sensors</span>
                  <div className="flex flex-col">
                    <span className="text-label-md font-bold text-on-surface">Real-time</span>
                    <span className="text-[11px] text-on-surface-variant">Monitoring</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-secondary text-3xl">notifications_active</span>
                  <div className="flex flex-col">
                    <span className="text-label-md font-bold text-on-surface">Intelligent</span>
                    <span className="text-[11px] text-on-surface-variant">Alerts</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-tertiary text-3xl">analytics</span>
                  <div className="flex flex-col">
                    <span className="text-label-md font-bold text-on-surface">Data</span>
                    <span className="text-[11px] text-on-surface-variant">Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse"></div>
              <img
                alt="Modern Airport Control Tower"
                className="relative rounded-3xl shadow-2xl border border-white/50 w-full object-cover aspect-[4/3] transform group-hover:scale-[1.02] transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GQ083yOmK0mr-HoMsAq8ch_sX1yfHG8u1wZGQYLrx-xZXMKN7_BjQJ1jHfGFlI0exSK5UVq8daY0sw0LifmMlYpeD5aFtPHM_2P2UybXUHivy7bMGYixh19I5OZlmW7Aq9KHRQ5VLGPmkYaJs2pvQUmoZlK2iVUkpsYTijszpGO9arsfEtrUWlM7-T2BOQc2I6pDug071BltpIEU2Z40PumHc_WkgseXFKVYfc2nstXCRke8Ftk4oX7DQTPKHBveug5g_Pgul8Ce"
              />
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-16 bg-surface-container-lowest border-y border-outline-variant">
          <div className="max-w-container-max mx-auto px-margin-page">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-outline-variant/30">
                <span className="text-data-num-lg font-data-num-lg text-primary mb-2 font-bold">48</span>
                <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  Airports Covered
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-outline-variant/30">
                <span className="text-data-num-lg font-data-num-lg text-primary mb-2 font-bold">1,250</span>
                <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  Smart Washrooms
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-outline-variant/30">
                <span className="text-data-num-lg font-data-num-lg text-primary mb-2 font-bold">94%</span>
                <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  Positive Feedback
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-outline-variant/30">
                <span className="text-data-num-lg font-data-num-lg text-primary mb-2 font-bold">8.2k</span>
                <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  Online Devices
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-24 bg-background">
          <div className="max-w-container-max mx-auto px-margin-page">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-headline-lg font-headline-lg text-on-background font-bold">
                Intelligent Infrastructure Management
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Our ecosystem integrates IoT sensors with advanced cloud computing to ensure the highest standards of sanitation and operational excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Large Card: Real-time Monitoring */}
              <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-stack-lg border border-outline-variant overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-stack-lg h-full">
                  <div className="flex-1 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-on-primary-container">monitoring</span>
                    </div>
                    <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                      Live Occupancy &amp; Usage Monitoring
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      Track facility traffic in real-time. Our sensors provide precise data on footfall patterns, peak hours, and resource utilization across multiple terminals simultaneously.
                    </p>
                    <ul className="space-y-2 pt-4">
                      <li className="flex items-center gap-2 text-body-sm text-on-surface">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        Real-time footfall counters
                      </li>
                      <li className="flex items-center gap-2 text-body-sm text-on-surface">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        Dynamic janitorial scheduling
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 min-h-[300px] relative">
                    <img
                      alt="Dashboard Interface"
                      className="rounded-2xl border border-outline-variant shadow-lg object-cover w-full h-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbAHt1lpCAODgQhIB_dmxEebCkgujwKulOw-Tbrr4T7YlSFsgBOqbxQyQcp5VSjJNf9J7hqpCYlD1GhHTMrfHrjxqW6DIEZG2uOp4ygyaY22Du60crjEPT1Sg0CRq4to-iUFx4P-p5dXQIy0ovjb9lE6Cd-FOXk_3xRdcOWNmd8QRtq9t9Fwzy0viqVzW10jRv0q4YIfBH-ySfVCMTKTcGG1hU8PHYIWCn2h8BrBhkoV0sU2eC-5FWe8l0Hp6ZbdH1EUvMkLYF9zsG"
                    />
                  </div>
                </div>
              </div>
              {/* Small Card: Smart Alerts */}
              <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-stack-lg flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-on-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary">emergency_home</span>
                  </div>
                  <h3 className="text-title-lg font-headline-md font-semibold text-white">
                    Zero-Latency <br />
                    Critical Alerts
                  </h3>
                  <p className="text-body-sm opacity-80">
                    Immediate notifications for resource depletion, equipment failure, or sanitation threshold breaches directly to staff handhelds.
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <span className="material-symbols-outlined text-6xl opacity-20 transform group-hover:rotate-12 transition-transform duration-500">
                    notifications_active
                  </span>
                </div>
              </div>
              {/* Small Card: Analytics */}
              <div className="md:col-span-4 bg-surface-container-highest rounded-3xl p-stack-lg border border-outline-variant">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-tertiary-container">query_stats</span>
                  </div>
                  <h3 className="text-title-lg font-headline-md text-on-surface font-semibold">
                    Predictive Analytics
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    Harness the power of AI to predict peak usage days and optimize maintenance windows, reducing operational costs by up to 30% annually.
                  </p>
                </div>
              </div>
              {/* Large Card: Network Map */}
              <div className="md:col-span-8 bg-surface-container-low rounded-3xl p-stack-lg border border-outline-variant flex flex-col md:flex-row gap-gutter overflow-hidden">
                <div className="flex-1 space-y-4">
                  <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                    Pan-India Integration
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    A unified ecosystem connecting every airport under AAI. Centralized management with localized control capabilities for every terminal head.
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    View Network Status <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <div className="flex-1 relative h-64 md:h-full min-h-[200px]">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/20 text-9xl">map</span>
                    <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-container-max mx-auto px-margin-page">
            <div className="bg-on-background rounded-[40px] p-stack-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-stack-lg">
              <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
                <h2 className="text-display-lg text-white font-headline-lg font-bold">
                  Ready to Modernize Your Facility?
                </h2>
                <p className="text-body-md text-surface-variant/80">
                  Join the smart infrastructure revolution. Get started with the terminal-wide monitoring system today.
                </p>
              </div>
              <div className="relative z-10 flex gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Request Demo
                </button>
                <button className="border border-outline text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                  Technical Spec
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant">
        <div className="w-full py-stack-lg px-margin-page flex flex-col md:flex-row justify-between items-center gap-stack-md max-w-container-max mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance</span>
              <span className="text-title-lg font-headline-md text-on-background font-bold">
                Airports Authority of India
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">© 2024 Airports Authority of India. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-stack-md">
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Support
            </a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Contact
            </a>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
