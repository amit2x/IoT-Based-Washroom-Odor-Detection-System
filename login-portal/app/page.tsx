'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [loginUrl, setLoginUrl] = useState('/login');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const callback = searchParams.get('callbackUrl');
      if (callback) {
        setLoginUrl(`/login?callbackUrl=${encodeURIComponent(callback)}`);
      }
    }
  }, []);

  // Intersection Observer for fade-in animations on sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Update browser tab title
  useEffect(() => {
    document.title = "AAI Smart Washroom Monitoring System";
  }, []);

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] font-['Plus_Jakarta_Sans'] min-h-screen w-full scroll-smooth overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}} />

      {/* Top Navigation Bar */}
      <header className="bg-white fixed top-0 w-full z-50 border-b border-[#c2c6d7]">
        <div className="flex justify-between items-center w-full px-[32px] py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="material-symbols-outlined text-[#004cb5] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[18px] leading-[24px] font-bold text-[#004cb5]">AAI Smart Washroom</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-[32px]">
            <Link className="text-[#004cb5] border-b-2 border-[#004cb5] font-bold transition-all duration-200" href="#">
              Home
            </Link>
            <Link className="text-[#424654] hover:text-[#004cb5] transition-colors text-[16px] leading-[24px] font-normal" href="#">
              About Us
            </Link>
            <Link className="text-[#424654] hover:text-[#004cb5] transition-colors text-[16px] leading-[24px] font-normal" href="#">
              System Overview
            </Link>
            <Link className="text-[#424654] hover:text-[#004cb5] transition-colors text-[16px] leading-[24px] font-normal" href="#">
              Contact
            </Link>
          </nav>
          
          <div id="login-portal">
            <Link 
              href={loginUrl}
              className="flex items-center gap-2 bg-[#004cb5] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#0062e6] transition-all active:scale-[0.98]"
            >
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden min-h-[870px] flex items-center"
          style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #e5eeff 100%)' }}
        >
          <div className="max-w-[1440px] mx-auto px-[32px] grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center relative z-10 w-full">
            <div className="space-y-[16px]" id="hero-content">
              <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-[#0b1c30] tracking-tight">
                AAI Smart Washroom <br />
                <span className="text-[#004cb5]">Monitoring System</span>
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-[#424654] max-w-lg">
                Empowering airport management with real-time monitoring, intelligent alerts, and data-driven insights for cleaner, smarter, and more efficient passenger facilities across India.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-[#c2c6d7] shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-[#004cb5] text-3xl">sensors</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium font-bold text-[#0b1c30]">Real-time</span>
                    <span className="text-[11px] text-[#424654]">Monitoring</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-[#c2c6d7] shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-[#006e2e] text-3xl">notifications_active</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium font-bold text-[#0b1c30]">Intelligent</span>
                    <span className="text-[11px] text-[#424654]">Alerts</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-[#c2c6d7] shadow-sm hover:shadow-md transition-shadow">
                  <span className="material-symbols-outlined text-[#a70031] text-3xl">analytics</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium font-bold text-[#0b1c30]">Data</span>
                    <span className="text-[11px] text-[#424654]">Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-[#004cb5]/10 blur-[100px] rounded-full animate-pulse"></div>
              <Image 
                alt="Modern Airport Control Tower" 
                className="relative rounded-3xl shadow-2xl border border-white/50 w-full object-cover aspect-[4/3] transform group-hover:scale-[1.02] transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GQ083yOmK0mr-HoMsAq8ch_sX1yfHG8u1wZGQYLrx-xZXMKN7_BjQJ1jHfGFlI0exSK5UVq8daY0sw0LifmMlYpeD5aFtPHM_2P2UybXUHivy7bMGYixh19I5OZlmW7Aq9KHRQ5VLGPmkYaJs2pvQUmoZlK2iVUkpsYTijszpGO9arsfEtrUWlM7-T2BOQc2I6pDug071BltpIEU2Z40PumHc_WkgseXFKVYfc2nstXCRke8Ftk4oX7DQTPKHBveug5g_Pgul8Ce"
                width={800}
                height={600}
                priority
              />
            </div>
          </div>
          {/* Abstract background element */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-20 pointer-events-none"></div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-16 bg-white border-y border-[#c2c6d7]">
          <div className="max-w-[1440px] mx-auto px-[32px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
              <div className="flex flex-col items-center text-center p-6 bg-[#f8f9ff] rounded-2xl border border-[#c2c6d7]/30">
                <span className="text-[36px] leading-[1] tracking-[-0.01em] font-bold text-[#004cb5] mb-2">48</span>
                <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] uppercase tracking-wider">Airports Covered</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-[#f8f9ff] rounded-2xl border border-[#c2c6d7]/30">
                <span className="text-[36px] leading-[1] tracking-[-0.01em] font-bold text-[#004cb5] mb-2">1,250</span>
                <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] uppercase tracking-wider">Smart Washrooms</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-[#f8f9ff] rounded-2xl border border-[#c2c6d7]/30">
                <span className="text-[36px] leading-[1] tracking-[-0.01em] font-bold text-[#004cb5] mb-2">94%</span>
                <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] uppercase tracking-wider">Positive Feedback</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-[#f8f9ff] rounded-2xl border border-[#c2c6d7]/30">
                <span className="text-[36px] leading-[1] tracking-[-0.01em] font-bold text-[#004cb5] mb-2">8.2k</span>
                <span className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] uppercase tracking-wider">Online Devices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-24 bg-[#f8f9ff]">
          <div className="max-w-[1440px] mx-auto px-[32px]">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-[32px] leading-[40px] font-bold text-[#0b1c30]">Intelligent Infrastructure Management</h2>
              <p className="text-[16px] leading-[24px] font-normal text-[#424654] max-w-2xl mx-auto">
                Our ecosystem integrates IoT sensors with advanced cloud computing to ensure the highest standards of sanitation and operational excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
              {/* Large Card: Real-time Monitoring */}
              <div className="md:col-span-8 bg-white rounded-3xl p-[32px] border border-[#c2c6d7] overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-[32px] h-full">
                  <div className="flex-1 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0062e6] flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[#e6ebff]">monitoring</span>
                    </div>
                    <h3 className="text-[24px] leading-[32px] font-semibold text-[#0b1c30]">Live Occupancy &amp; Usage Monitoring</h3>
                    <p className="text-[16px] leading-[24px] font-normal text-[#424654]">
                      Track facility traffic in real-time. Our sensors provide precise data on footfall patterns, peak hours, and resource utilization across multiple terminals simultaneously.
                    </p>
                    <ul className="space-y-2 pt-4">
                      <li className="flex items-center gap-2 text-[14px] leading-[20px] font-normal text-[#0b1c30]">
                        <span className="material-symbols-outlined text-[#004cb5] text-sm">check_circle</span>
                        Real-time footfall counters
                      </li>
                      <li className="flex items-center gap-2 text-[14px] leading-[20px] font-normal text-[#0b1c30]">
                        <span className="material-symbols-outlined text-[#004cb5] text-sm">check_circle</span>
                        Dynamic janitorial scheduling
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 min-h-[300px] relative">
                    <Image 
                      alt="Dashboard Interface" 
                      className="rounded-2xl border border-[#c2c6d7] shadow-lg object-cover w-full h-full" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbAHt1lpCAODgQhIB_dmxEebCkgujwKulOw-Tbrr4T7YlSFsgBOqbxQyQcp5VSjJNf9J7hqpCYlD1GhHTMrfHrjxqW6DIEZG2uOp4ygyaY22Du60crjEPT1Sg0CRq4to-iUFx4P-p5dXQIy0ovjb9lE6Cd-FOXk_3xRdcOWNmd8QRtq9t9Fwzy0viqVzW10jRv0q4YIfBH-ySfVCMTKTcGG1hU8PHYIWCn2h8BrBhkoV0sU2eC-5FWe8l0Hp6ZbdH1EUvMkLYF9zsG"
                      width={500}
                      height={375}
                    />
                  </div>
                </div>
              </div>
              
              {/* Small Card: Smart Alerts */}
              <div className="md:col-span-4 bg-[#004cb5] text-white rounded-3xl p-[32px] flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">emergency_home</span>
                  </div>
                  <h3 className="text-[18px] leading-[24px] font-semibold">Zero-Latency <br />Critical Alerts</h3>
                  <p className="text-[14px] leading-[20px] font-normal opacity-80">
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
              <div className="md:col-span-4 bg-[#d3e4fe] rounded-3xl p-[32px] border border-[#c2c6d7]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#cd1f45] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#ffe5e6]">query_stats</span>
                  </div>
                  <h3 className="text-[18px] leading-[24px] font-semibold text-[#0b1c30]">Predictive Analytics</h3>
                  <p className="text-[14px] leading-[20px] font-normal text-[#424654]">
                    Harness the power of AI to predict peak usage days and optimize maintenance windows, reducing operational costs by up to 30% annually.
                  </p>
                </div>
              </div>
              
              {/* Large Card: Network Map */}
              <div className="md:col-span-8 bg-[#eff4ff] rounded-3xl p-[32px] border border-[#c2c6d7] flex flex-col md:flex-row gap-[24px] overflow-hidden">
                <div className="flex-1 space-y-4">
                  <h3 className="text-[24px] leading-[32px] font-semibold text-[#0b1c30]">Pan-India Integration</h3>
                  <p className="text-[16px] leading-[24px] font-normal text-[#424654]">
                    A unified ecosystem connecting every airport under AAI. Centralized management with localized control capabilities for every terminal head.
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-[#004cb5] font-bold hover:gap-3 transition-all">
                    View Network Status <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <div className="flex-1 relative h-64 md:h-full min-h-[200px]">
                  <div className="absolute inset-0 bg-[#004cb5]/5 rounded-2xl border border-[#c2c6d7] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#004cb5]/20 text-9xl">map</span>
                    {/* Pulsing animations */}
                    <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-[#004cb5] rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#004cb5] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-[32px]">
            <div className="bg-[#0b1c30] rounded-[40px] p-[32px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-[32px]">
              <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
                <h2 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-white">Ready to Modernize Your Facility?</h2>
                <p className="text-[16px] leading-[24px] font-normal text-[#d3e4fe]/80">
                  Join the smart infrastructure revolution. Get started with the terminal-wide monitoring system today.
                </p>
              </div>
              <div className="relative z-10 flex gap-4">
                <button className="bg-[#004cb5] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-[#004cb5]/40 hover:-translate-y-1 transition-all">
                  Request Demo
                </button>
                <button className="border border-[#727786] text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                  Technical Spec
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#d3e4fe] border-t border-[#c2c6d7]">
        <div className="w-full py-[32px] px-[32px] flex flex-col md:flex-row justify-between items-center gap-[16px] max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004cb5]">account_balance</span>
              <span className="text-[18px] leading-[24px] font-semibold text-[#0b1c30]">Airports Authority of India</span>
            </div>
            <p className="text-[14px] leading-[20px] font-normal text-[#424654]">© 2024 Airports Authority of India. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-[16px]">
            <Link className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] hover:text-[#004cb5] transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] hover:text-[#004cb5] transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] hover:text-[#004cb5] transition-colors" href="#">
              Support
            </Link>
            <Link className="text-[12px] leading-[16px] tracking-[0.01em] font-['Inter'] font-medium text-[#424654] hover:text-[#004cb5] transition-colors" href="#">
              Contact
            </Link>
          </div>
          <div className="flex gap-4">
            <Link className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center hover:bg-[#004cb5] hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </Link>
            <Link className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center hover:bg-[#004cb5] hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
