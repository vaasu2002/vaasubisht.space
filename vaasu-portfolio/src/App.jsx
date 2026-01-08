import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Briefcase, GraduationCap, Award, Heart, Activity, Zap, BookOpen, ArrowLeft, Calendar, Clock } from 'lucide-react';

// ArticlesPage Component
function ArticlesPage({ onBack }) {
  const [filter, setFilter] = useState('all');
  const [articleCount, setArticleCount] = useState(0);
  const [totalReadTime, setTotalReadTime] = useState(0);
  const canvasRef = useRef(null);

  const articlesData = [
    {
      title: "Event loop: Scaling My Backend Without Threads",
      description: "Deep dive into creating scalable WebSocket architectures for continuous patient data streams. Handling 10,000+ concurrent connections with sub-100ms latency.",
      category: "Architecture",
      platform: "Medium",
      url: "https://medium.com/@vaasubisht/event-loop-scaling-my-backend-without-threads-4e93c2faa9c5?postPublishedType=initial",
      readTime: 7,
      date: "Jan 2025",
      icon: "🏥"
    },
    {
      title: "Translating Chaos: How I Built a High-Performance FIX Gateway Without Losing My Mind",
      description: " In a high-frequency environment, a millisecond is an eternity, and a microsecond is a long lunch break. I couldn’t just write a basic server loop and hope for the best.",
      category: "Architecture",
      platform: "Medium",
      url: "https://medium.com/@vaasubisht/translating-chaos-how-i-built-a-high-performance-fix-gateway-without-losing-my-mind-b69ade061d78",
      readTime: 3,
      date: "Dec 2025",
      icon: "🔒"
    },
    {
      title: "Stealing from CppCon: How I Built a Robust Queue So My Engine Wouldn’t Crash",
      description: "It turns out, processes are like toddlers: if you leave them unsupervised in a shared memory playground, they will hurt themselves.",
      category: "Architecture",
      platform: "Medium",
      url: "https://medium.com/@vaasubisht/stealing-from-cppcon-how-i-built-a-robust-queue-so-my-engine-wouldnt-crash-3b367ab0c509",
      readTime: 3,
      date: "Dec 2025",
      icon: "🧠"
    }
  ];

  const categories = ['all', ...new Set(articlesData.map(a => a.category))];
  const filteredArticles = filter === 'all' ? articlesData : articlesData.filter(a => a.category === filter);

  useEffect(() => {
    let count = 0;
    const target = articlesData.length;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        setArticleCount(count);
      } else {
        clearInterval(interval);
      }
    }, 50);

    const total = articlesData.reduce((sum, a) => sum + a.readTime, 0);
    let time = 0;
    const timeInterval = setInterval(() => {
      if (time < total) {
        time += Math.ceil(total / 30);
        setTotalReadTime(Math.min(time, total));
      } else {
        clearInterval(timeInterval);
      }
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animationId;

    const drawHeartbeat = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 5) {
        let y = canvas.height / 2;
        const offset = x + time;
        
        if (offset % 400 < 50) {
          y += Math.sin((offset % 50) * 0.4) * 80;
        }
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      time += 2;
      animationId = requestAnimationFrame(drawHeartbeat);
    };

    drawHeartbeat();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 opacity-10 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg transition-all mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            Knowledge Archive
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            {/* Technical insights, medical innovations, and stories from the frontlines of healthcare technology */}
          </p>

          <div className="flex justify-center gap-16 flex-wrap">
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2">{articleCount}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Articles</div>
            </div>
            {/* <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Lives Impacted</div>
            </div> */}
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2">{totalReadTime}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Min Read Time</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full transition-all font-semibold ${
                filter === cat
                  ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/60 border border-cyan-500/20 text-gray-400 hover:border-cyan-400/50'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <div
              key={idx}
              onClick={() => window.open(article.url, '_blank')}
              className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden backdrop-blur"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-lg text-xs font-semibold text-blue-300">
                {article.platform}
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {article.icon}
              </div>

              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-wide mb-4">
                {article.category}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                {article.title}
              </h3>

              <p className="text-gray-300 leading-relaxed mb-6">
                {article.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Read Article</span>
                <ExternalLink size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigateToArticles }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showProjectPage, setShowProjectPage] = useState(false);
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

    const vessels = [];
    const numVessels = 50;

    for (let i = 0; i < numVessels; i++) {
      vessels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      vessels.forEach((vessel, i) => {
        vessel.x += vessel.vx;
        vessel.y += vessel.vy;

        if (vessel.x < 0 || vessel.x > canvas.width) vessel.vx *= -1;
        if (vessel.y < 0 || vessel.y > canvas.height) vessel.vy *= -1;

        ctx.beginPath();
        ctx.arc(vessel.x, vessel.y, vessel.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.fill();

        vessels.forEach((other, j) => {
          if (i === j) return;
          const dx = vessel.x - other.x;
          const dy = vessel.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(vessel.x, vessel.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const projects = [
    {
      title: "Stock exchange",
      status: "Under development",
      description: "A high-performance stock exchange consisting various components like matching-engine, gateway etc.",
      icon: "⚡",
      theme: {
        primary: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/40",
        accent: "text-blue-400",
        bg: "bg-blue-500/10"
      },
      tech: ["C++", "Multi-threading", "Blocking queue", "Data structures", "UDP", "Shared memory", "System call", "Inter-process communication", "FIX protocol", "Linux"],
      highlights: [
        "Price-time priority matching algorithm",
        "Ticker based sharding",
        "Fault tolerant in-memory order book",
        "UDP multicast for low latency"
      ]
    },
    {
      title: "Lightweight In-Memory Storage Engine",
      status: "Under development",
      description: "Minimal, drop-in Redis replacement built in Go. It speaks the RESP protocol, so it works seamlessly with any Redis client, including redis-cli.",
      icon: "🛠️",
      theme: {
        primary: "from-green-500/20 to-emerald-500/20",
        border: "border-green-500/40",
        accent: "text-green-400",
        bg: "bg-green-500/10"
      },
      tech: ["Go", "Redis", "System call", "Event loop", "Storage engine", "I/O multiplexing", "Linux", "Socket"],
      highlights: [
        "Uses EPOLL system call for async I/O multiplexing",
        "RESP protocol–compatible server supporting redis-cli and existing Redis SDKs",
        "Single-threaded event loop with non-blocking I/O for predictable latency",
        "Custom in-memory data structures optimized for low allocation and fast lookups",
      ]
    },
    {
      title: "Predicta: Prediction Market",
      status: "Completed",
      description: "Scalable opinion trading platform with 6 microservices",
      icon: "🎯",
      theme: {
        primary: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/40",
        accent: "text-purple-400",
        bg: "bg-purple-500/10"
      },
      tech: ["Redis", "RabbitMQ", "PostgreSQL", "MongoDB", "WebSocket"],
      highlights: [
        "60% response time reduction",
        "Event-driven architecture",
        "<100ms end-to-end latency"
      ]
    },
    {
      title: "AquaInsights: Water Quality API",
      status: "Completed",
      description: "Real-time water quality monitoring using satellite imagery",
      icon: "💧",
      theme: {
        primary: "from-cyan-500/20 to-blue-500/20",
        border: "border-cyan-500/40",
        accent: "text-cyan-400",
        bg: "bg-cyan-500/10"
      },
      tech: ["Node.js", "TypeScript", "GIS", "Satellite Data"],
      highlights: [
        "Cost-effective monitoring for Bhopal region",
        "Standardized data pipeline",
        "RESTful API with authentication"
      ]
    },
    {
      title: "Stock Broker",
      status: "Planned",
      description: "Zerodha inspired stock market trading system with distributed architecture with redis as first data layer",
      icon: "📈",
      theme: {
        primary: "from-green-500/20 to-emerald-500/20",
        border: "border-green-500/40",
        accent: "text-green-400",
        bg: "bg-green-500/10"
      },
      tech: ["Go", "Redis", "Event-Driven", "Concurrency", "Message Queue"],
      highlights: [
        "Production-oriented architecture with scalability",
        "Event-driven messaging for decoupled services",
        "Redis for caching and idempotency guarantees"
      ]
    },
  ];

  const experience = [
    {
      role: "SDE Intern",
      company: "Siemens Healthineers",
      division: "Research & Development - Advanced Therapies",
      period: "June '25 - Present",
      location: "Hybrid",
      work: [
        "Developed a logging library for cross-system use, enabling configurable log routing to multiple destinations based on configration and a central log aggregation service.",
        "Conducted benchmarking to determine optimal IPC methods and implemented a shared client/server library for streamlined integration.",
        "Reduced a component's processing time by 71.6% by implementing a voxel-based neighborhood check and centroid-based point consolidation rather than a purely Euclidean distance approach.",
        "Assisted in implementing risk control measures and updating engineering documentation after a product was flagged under EU AI guidelines.",
        "Restructuring complex vessel tree hierarchies in the code to ensure compliance, modifying subtree and parent-child relationships, and ensuring the overall system met the required standards."
      ],
      skills: ["C++", "System call", "Data strcuture", "Multi threading", "Unit Test", "DICOM", "3D image processing", "Inter process communication"]
    },
    {
      role: "Intern",
      company: "i3 Digital Health",
      period: "Dec '22 - July '23",
      location: "Remote",
      work: [
        "Led backend development for oncology platform",
        "Collaborated with oncology experts for clinical decision support",
        "Achieved 30% faster processing with AWS Step Functions"
      ],
      skills: ["AWS", "Lambda", "S3", "Healthcare Systems"]
    }
  ];

  const skills = {
    "Languages": ["C++", "Go", "Java", "Python", "SQL", "TypeScript"],
    "Medical": ["DICOM", "Vessel centerline", "3D geometry", "Unit Testing"],
    "Backend": ["Distributed systems", "Node.js", "Docker", "Redis", "RabbitMQ", "MongoDB", "PostgreSQL", "AWS"],
    "Compliance": ["EU AI Act Article 14", "Risk Control"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 opacity-30 pointer-events-none" />

      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }} />
      </div>

      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <div className="absolute top-20 right-10 text-cyan-400 opacity-40 font-mono text-sm border border-cyan-500/30 p-4 rounded-lg bg-slate-900/50 backdrop-blur">
            <div className="text-xs text-gray-400 mb-2">3D COORDINATES</div>
            <div>X: {Math.round(mousePosition.x)} px</div>
            <div>Y: {Math.round(mousePosition.y)} px</div>
            <div>Z: {Math.round(scrollY)} px</div>
          </div>

          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-300 text-sm mb-4 animate-pulse">
              Open for full-time offers
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              VAASU BISHT
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Building software that supports <span className="text-teal-300 font-semibold">minimally invasive life-saving proceduers </span> @ <span className="text-emerald-300 font-semibold">Siemens Healthineers</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button
                onClick={onNavigateToArticles}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-all">
                <BookOpen size={20} />
                <span>Articles</span>
              </button>
              <a href="https://github.com/vaasu2002" target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg transition-all">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/vaasubisht" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-all">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:bishtvaasu@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg transition-all">
                <Mail size={20} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            How School Math Showed Up in Real Systems
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            In school, concepts like trigonometry, tangents, and 3D geometry felt abstract 
            I often wondered where they would ever be used beyond exams.
            <br /><br />
            The math I once questioned now shows up daily in my work on medical software, where tangents, normals, 3D geometry
            directly impacts the accuracy of results used by doctor during proceduers.
          </p>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all backdrop-blur">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{exp.role}</h3>
                    <p className="text-xl text-gray-300 mt-1">{exp.company}</p>
                    {exp.division && <p className="text-sm text-cyan-300/70 mt-1">{exp.division}</p>}
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0 text-right">
                    <div className="font-semibold text-cyan-300">{exp.period}</div>
                    <div className="text-sm">{exp.location}</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {exp.work.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="text-cyan-400 mt-1 text-lg">▹</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-br ${project.theme.primary} border ${project.theme.border} rounded-xl p-6 hover:shadow-xl transition-all backdrop-blur group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{project.icon}</div>
                  <span className={`px-3 py-1 ${project.theme.bg} border ${project.theme.border} rounded-full text-xs font-semibold ${project.theme.accent}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className={`text-2xl font-bold ${project.theme.accent} mb-2`}>
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="space-y-2 mb-4">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className={`${project.theme.accent} mt-0.5`}>•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className={`px-2 py-1 ${project.theme.bg} border ${project.theme.border} rounded text-xs ${project.theme.accent}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Award className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Skills & Technologies</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="text-cyan-400" size={32} />
            <h2 className="text-4xl font-bold">Education</h2>
          </div>

          <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-8 backdrop-blur">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">M.Tech Integrated in Computer Science Engineering with Specialization in Artificial intelligence</h3>
            <p className="text-xl text-gray-300 mb-2">Sept 2021 - June 2026 (expected)</p>
            <p className="text-gray-400 mb-4">Vellore Institute of Technology, Bhopal</p>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg font-semibold">
                CGPA: 9.06
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-cyan-500/20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300 mb-2 text-lg font-semibold">
            Exploring technology, one concept at a time.
          </p>
          <p className="text-gray-500 text-sm">
            2026 Vaasu Bisht.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'articles') {
    return <ArticlesPage onBack={() => setCurrentPage('home')} />;
  }

  return <HomePage onNavigateToArticles={() => setCurrentPage('articles')} />;
}