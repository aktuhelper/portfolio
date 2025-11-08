"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter, Sparkles, Zap, Flame, Crown } from 'lucide-react';

export default function DigitalAgencyPortfolio() {
    const [darkMode, setDarkMode] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isHovering, setIsHovering] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 80;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const projects = [
        {
            id: 1,
            title: "AKTUHELPER",
            category: "AI-Powered ED-Tech Platform",
            description: "Revolutionary e-commerce with predictive analytics",
            tech: ["React", "AI/ML", "Node.js"],
            color: "from-cyan-400 via-blue-500 to-purple-600",
            image: "/aktu.png",
            link: "https://aktuhelp.vercel.app/"
        },
        {
            id: 2,
            title: "Qchatt",
            category: "Random Chat Application",
            description: "Holographic brand experience for metaverse",
            tech: ["3D Design", "WebGL", "AR"],
            color: "from-purple-400 via-pink-500 to-red-600",
            image: "/qchatt.png",
            link: "https://qchatt.com"
        },
        {
            id: 3,
            title: "Medcare",
            category: "Doctor Appointment Platform",
            description: "Decentralized finance dashboard with real-time data",
            tech: ["Blockchain", "React", "Web3"],
            color: "from-green-400 via-emerald-500 to-teal-600",
            image: "/med.png",
            link: "https://medcare-beta.vercel.app/"
        },
    ];

    const services = [
        {
            icon: <Flame className="w-10 h-10" />,
            title: "Web  Development",
            description: "Cutting-edge Full Stack Web Solutions with sleek and modern UI",
            gradient: "from-orange-500 to-red-600"
        },
        {
            icon: <Sparkles className="w-10 h-10" />,
            title: "AI Integration",
            description: "Machine learning models and intelligent automation systems",
            gradient: "from-cyan-500 to-blue-600"
        },
        {
            icon: <Zap className="w-10 h-10" />,
            title: "Immersive Design",
            description: "3D experiences, AR/VR, and metaverse-ready interfaces",
            gradient: "from-purple-500 to-pink-600"
        },
        {
            icon: <Crown className="w-10 h-10" />,
            title: "Website Maintainenece",
            description: "We Provide one stop solution for maintainence of your website",
            gradient: "from-green-500 to-emerald-600"
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        setMenuOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xrbrzekq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
                form.reset();
            } else {
                setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}>
            <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${darkMode ? 'opacity-100' : 'opacity-30'}`} />

            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] ${darkMode ? 'opacity-20' : 'opacity-10'}`}
                    style={{
                        background: darkMode ? 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,200,255,0.6) 0%, transparent 70%)',
                        left: `${20 + mousePosition.x / 50}px`,
                        top: `${10 + mousePosition.y / 50}px`,
                    }}
                />
                <div
                    className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] ${darkMode ? 'opacity-20' : 'opacity-10'}`}
                    style={{
                        background: darkMode ? 'radial-gradient(circle, rgba(255,0,255,0.8) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(200,0,255,0.6) 0%, transparent 70%)',
                        right: `${10 + mousePosition.x / 80}px`,
                        top: `${30 + mousePosition.y / 60}px`,
                    }}
                />
                <div
                    className={`absolute w-[550px] h-[550px] rounded-full blur-[110px] ${darkMode ? 'opacity-15' : 'opacity-8'}`}
                    style={{
                        background: darkMode ? 'radial-gradient(circle, rgba(0,255,128,0.8) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,200,150,0.6) 0%, transparent 70%)',
                        left: '50%',
                        bottom: `${mousePosition.y / 100}px`,
                    }}
                />
            </div>

            <div
                className="fixed pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-screen"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div className="relative">
                    <div className="w-8 h-8 border-2 border-cyan-400 rounded-full animate-ping opacity-75" />
                    <div className="absolute inset-0 w-8 h-8 border-2 border-cyan-400 rounded-full" />
                </div>
            </div>

            <nav className={`fixed w-full z-40 transition-all duration-500 ${scrollY > 50 ? (darkMode ? 'bg-black/80 backdrop-blur-2xl border-b border-cyan-500/20' : 'bg-white/80 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg') : ''}`}>
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex justify-between items-center">
                        <div className="relative group">
                            <div className={`absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur ${darkMode ? 'opacity-30' : 'opacity-20'} group-hover:opacity-60 transition duration-500`} />
                            <div className={`relative text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                                APEX TECH Solutions
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            {['home', 'services', 'projects', 'contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`relative capitalize font-semibold transition-all duration-300 group ${activeSection === item ? 'text-cyan-600' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ${activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </button>
                            ))}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-3 rounded-xl bg-gradient-to-r ${darkMode ? 'from-cyan-500/10 to-purple-500/10 border border-cyan-500/20' : 'from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'} hover:border-cyan-500/50 transition-all duration-300 hover:scale-110`}
                            >
                                {darkMode ? <Sun className="w-5 h-5 text-cyan-400" /> : <Moon className="w-5 h-5 text-cyan-600" />}
                            </button>
                        </div>

                        <button
                            className={`md:hidden p-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className={`md:hidden backdrop-blur-xl border-t ${darkMode ? 'bg-black/95 border-cyan-500/20' : 'bg-white/95 border-cyan-500/20'}`}>
                        {['home', 'services', 'projects', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`block w-full text-left px-6 py-4 capitalize border-b transition-colors ${darkMode ? 'hover:bg-cyan-500/10 border-gray-800' : 'hover:bg-cyan-500/10 border-gray-200'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="mb-8 inline-block animate-fade-in">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
                            <div className="relative px-6 py-3 bg-black rounded-full border border-cyan-500/30 text-sm font-bold tracking-wider text-cyan-400">
                                ⚡ NEXT-LEVEL DIGITAL SOLUTIONS
                            </div>
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter">
                        <span className={`block ${darkMode ? 'bg-gradient-to-r from-white via-cyan-200 to-white' : 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900'} bg-clip-text text-transparent animate-gradient-x mb-4`}>
                            WE BUILD
                        </span>
                        <span className="block bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                            THE FUTURE
                        </span>
                    </h1>

                    <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Pushing boundaries with <span className={`font-semibold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>AI</span>, <span className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Web3</span>, and <span className={`font-semibold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>immersive experiences</span>. We don't follow trends—we create them.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group relative px-10 py-5 font-bold text-lg overflow-hidden rounded-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <span className="relative flex items-center gap-3">
                                Explore Work
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`px-10 py-5 font-bold text-lg rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${darkMode ? 'border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10' : 'border-cyan-600/50 hover:border-cyan-600 hover:bg-cyan-600/10'}`}
                        >
                            Start Project
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center pt-2">
                            <div className="w-1 h-2 bg-cyan-500 rounded-full animate-scroll" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className={`font-bold tracking-widest text-sm ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>WHAT WE DO</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                            Elite <span className={`bg-gradient-to-r ${darkMode ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'} bg-clip-text text-transparent`}>Services</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setIsHovering(index)}
                                onMouseLeave={() => setIsHovering(null)}
                                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br border transition-all duration-500 ${darkMode ? 'from-gray-900 to-black border-gray-800 group-hover:border-cyan-500/50' : 'from-white to-gray-50 border-gray-300 group-hover:border-cyan-500/50 shadow-lg'}`} />
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative p-10">
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white`}>
                                        {service.icon}
                                    </div>
                                    <h3 className={`text-3xl font-bold mb-4 transition-colors ${darkMode ? 'group-hover:text-cyan-400' : 'group-hover:text-cyan-600'}`}>{service.title}</h3>
                                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>

                                    <div className={`mt-6 flex items-center gap-2 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projects" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className={`font-bold tracking-widest text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>OUR PORTFOLIO</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                            Featured <span className={`bg-gradient-to-r ${darkMode ? 'from-purple-400 to-pink-500' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>Work</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-3xl cursor-pointer block transition-all duration-500 hover:scale-105"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                    />

                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-80 transition-all duration-500 mix-blend-multiply`} />

                                    <div className="absolute inset-0 opacity-20" style={{
                                        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                                        backgroundSize: '50px 50px'
                                    }} />
                                </div>

                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div>
                                        <span className="inline-block px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-xs font-bold mb-4 border border-white/20">
                                            {project.category}
                                        </span>
                                    </div>

                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                                        <h3 className="text-3xl font-black mb-3 text-white">{project.title}</h3>
                                        <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20 text-white">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                            View Project <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>

                                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <span className={`font-bold tracking-widest text-sm ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>GET IN TOUCH</span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                            Let's Create <span className={`bg-gradient-to-r ${darkMode ? 'from-pink-400 to-orange-500' : 'from-pink-600 to-orange-600'} bg-clip-text text-transparent`}>Magic</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="space-y-8">
                            {[
                                { icon: <Mail />, title: "Email", info: "hello@apexagency.io", gradient: "from-cyan-500 to-blue-600" },
                                { icon: <Phone />, title: "Phone", info: "+1 (555) 999-0000", gradient: "from-purple-500 to-pink-600" },
                                { icon: <MapPin />, title: "Location", info: "Silicon Valley, CA", gradient: "from-pink-500 to-orange-600" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group cursor-pointer">
                                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 text-gray-400">{item.title}</h3>
                                        <p className="text-xl font-semibold">{item.info}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-4 pt-8">
                                {[
                                    { icon: <Twitter />, gradient: "from-cyan-500 to-blue-600" },
                                    { icon: <Linkedin />, gradient: "from-purple-500 to-pink-600" },
                                    { icon: <Github />, gradient: "from-pink-500 to-orange-600" }
                                ].map((social, i) => (
                                    <button
                                        key={i}
                                        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center hover:scale-110 transition-all duration-300 group`}
                                    >
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradient} blur-lg opacity-0 group-hover:opacity-75 transition-opacity`} />
                                        {social.icon}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className={`w-full px-6 py-4 border-2 rounded-2xl outline-none transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-800 focus:border-cyan-500 placeholder-gray-600' : 'bg-white border-gray-300 focus:border-cyan-500 placeholder-gray-400'}`}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className={`w-full px-6 py-4 border-2 rounded-2xl outline-none transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-800 focus:border-cyan-500 placeholder-gray-600' : 'bg-white border-gray-300 focus:border-cyan-500 placeholder-gray-400'}`}
                            />
                            <textarea
                                name="message"
                                placeholder="Tell us about your project..."
                                rows={6}
                                required
                                className={`w-full px-6 py-4 border-2 rounded-2xl outline-none transition-all duration-300 resize-none ${darkMode ? 'bg-gray-900 border-gray-800 focus:border-cyan-500 placeholder-gray-600' : 'bg-white border-gray-300 focus:border-cyan-500 placeholder-gray-400'}`}
                            />

                            {submitStatus && (
                                <div className={`px-6 py-4 rounded-2xl text-center font-semibold ${submitStatus.type === 'success' ? (darkMode ? 'bg-green-900/50 text-green-400 border-2 border-green-500/50' : 'bg-green-100 text-green-700 border-2 border-green-500/50') : (darkMode ? 'bg-red-900/50 text-red-400 border-2 border-red-500/50' : 'bg-red-100 text-red-700 border-2 border-red-500/50')}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full px-8 py-5 font-bold text-lg overflow-hidden rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                                <span className="relative">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className={`py-12 border-t relative ${darkMode ? 'border-gray-900' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            APEX
                        </div>
                        <p className={darkMode ? 'text-gray-600' : 'text-gray-500'}>© 2024 Apex Digital Agency. Redefining Digital Excellence.</p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(-5deg); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes scroll {
                    0% { opacity: 0; transform: translateY(0); }
                    50% { opacity: 1; }
                    100% { opacity: 0; transform: translateY(12px); }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }
                .animate-float-slow {
                    animation: float-slow 30s ease-in-out infinite;
                }
                .animate-scroll {
                    animation: scroll 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}