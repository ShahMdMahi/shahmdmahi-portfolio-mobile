import { colors } from './colors';

export const portfolioData = {
  // Personal Information
  personal: {
    name: 'Shah Md Mahi',
    initials: 'SM',
    firstName: 'Shah Md',
    lastName: 'Mahi',
    title: 'Fullstack Developer',
    tagline: 'Fullstack Developer • Problem Solver • Tech Enthusiast',
    greeting: "Hello, I'm",
    description: 'Expert in Web, Mobile & Cloud Technologies\nBuilding exceptional digital experiences across all platforms',
    profileImage: require('../assets/shahmdmahi.png'),
  },

  // About Section
  about: {
    paragraphs: [
      "I'm Shah Md Mahi, a versatile fullstack developer with extensive experience in building scalable web applications, mobile apps, and cloud solutions. With a passion for clean code and innovative solutions, I've worked across every field of the IT sector, from frontend design to backend architecture, DevOps, and cloud infrastructure.",
      "My expertise spans modern frameworks like React, React Native, Node.js, Python, and cloud platforms including AWS, Azure, and Google Cloud. I believe in continuous learning and staying updated with the latest technologies to deliver cutting-edge solutions.",
    ],
    stats: [
      { icon: 'briefcase', label: 'Experience', value: '8+ Years' },
      { icon: 'code-slash', label: 'Projects', value: '150+' },
      { icon: 'people', label: 'Clients', value: '50+' },
      { icon: 'trophy', label: 'Awards', value: '25+' },
    ],
  },

  // Skills Categories
  skills: [
    {
      title: 'Frontend Development',
      icon: 'code-slash',
      skills: [
        'React', 'React Native', 'Next.js', 'Vue.js', 'Angular',
        'TypeScript', 'JavaScript', 'Tailwind', 'SCSS',
        'Material-UI', 'Shadcn UI', 'Redux', 'tRPC', 'GraphQL', 'REST APIs',
      ],
    },
    {
      title: 'Backend Development',
      icon: 'server',
      skills: [
        'Node.js', 'Express', 'Python', 'Django', 'Flask',
        'PHP', 'Laravel', 'Java', 'Spring Boot', 'Go',
        'Ruby on Rails', 'PostgreSQL', 'MongoDB', 'MySQL'
      ],
    },
    {
      title: 'Mobile Development',
      icon: 'phone-portrait',
      skills: [
        'React Native', 'Expo', 'iOS', 'Android', 'Flutter',
        'Swift', 'Kotlin', 'Firebase', 'Push Notifications',
        'App Store', 'Google Play', 'Mobile UI/UX'
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      skills: [
        'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
        'CI/CD', 'Jenkins', 'GitHub Actions', 'Terraform',
        'Linux', 'Nginx', 'Monitoring', 'Serverless'
      ],
    },
    {
      title: 'Tools & Technologies',
      icon: 'construct',
      skills: [
        'Git', 'GitHub', 'GitLab', 'Jira', 'VS Code',
        'Postman', 'Figma', 'Adobe XD', 'Webpack',
        'Vite', 'npm', 'pnpm', 'Agile', 'Scrum'
      ],
    },
    {
      title: 'Specialized Skills',
      icon: 'sparkles',
      skills: [
        'AI/ML Integration', 'Blockchain', 'Web3', 'Microservices',
        'System Design', 'Security', 'Testing', 'Performance',
        'SEO', 'Analytics', 'E-commerce', 'Payment Integration'
      ],
    },
  ],

  // Projects Portfolio
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, inventory management, and real-time analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      icon: 'cart',
      color: colors.primary,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=11',
        'https://picsum.photos/400/600?random=12',
        'https://picsum.photos/400/600?random=13',
      ],
    },
    {
      title: 'Healthcare Mobile App',
      description: 'React Native app for healthcare providers with appointment scheduling, telemedicine, and patient records management.',
      technologies: ['React Native', 'Firebase', 'WebRTC', 'Redux'],
      icon: 'medical',
      color: colors.success,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=21',
        'https://picsum.photos/400/600?random=22',
        'https://picsum.photos/400/600?random=23',
      ],
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization dashboard with AI-driven insights for business intelligence and predictive analytics.',
      technologies: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
      icon: 'analytics',
      color: colors.info,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=31',
        'https://picsum.photos/400/600?random=32',
        'https://picsum.photos/400/600?random=33',
      ],
    },
    {
      title: 'Social Media Platform',
      description: 'Full-featured social networking app with real-time messaging, media sharing, and advanced privacy controls.',
      technologies: ['React Native', 'GraphQL', 'Node.js', 'Redis'],
      icon: 'people-circle',
      color: colors.accent,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=41',
        'https://picsum.photos/400/600?random=42',
        'https://picsum.photos/400/600?random=43',
      ],
    },
    {
      title: 'Cloud Infrastructure System',
      description: 'Microservices architecture with Kubernetes, Docker, and CI/CD pipelines for scalable cloud deployment.',
      technologies: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
      icon: 'cloud-done',
      color: colors.warning,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=51',
        'https://picsum.photos/400/600?random=52',
        'https://picsum.photos/400/600?random=53',
      ],
    },
    {
      title: 'Fintech Payment Gateway',
      description: 'Secure payment processing system with blockchain integration and multi-currency support.',
      technologies: ['Node.js', 'Blockchain', 'PostgreSQL', 'Redis'],
      icon: 'card',
      color: colors.primaryLight,
      link: 'https://github.com/shahmdmahi',
      screenshots: [
        'https://picsum.photos/400/600?random=61',
        'https://picsum.photos/400/600?random=62',
        'https://picsum.photos/400/600?random=63',
      ],
    },
  ],

  // Work Experience
  experiences: [
    {
      company: 'Tech Giants Inc.',
      position: 'Senior Fullstack Developer',
      period: '2021 - Present',
      description: 'Leading development of enterprise-scale applications, mentoring junior developers, and architecting cloud-native solutions.',
      achievements: [
        'Reduced application load time by 60%',
        'Led team of 8 developers',
        'Implemented CI/CD pipeline',
      ],
      icon: 'business',
      color: colors.primary,
    },
    {
      company: 'Innovation Labs',
      position: 'Fullstack Developer',
      period: '2019 - 2021',
      description: 'Developed mobile and web applications for startups and enterprise clients using modern tech stacks.',
      achievements: [
        'Built 20+ production applications',
        'Improved code quality by 45%',
        'Achieved 99.9% uptime',
      ],
      icon: 'bulb',
      color: colors.warning,
    },
    {
      company: 'Digital Solutions Co.',
      position: 'Frontend Developer',
      period: '2017 - 2019',
      description: 'Created responsive and accessible web interfaces with focus on performance and user experience.',
      achievements: [
        'Implemented design system',
        'Improved accessibility score to 98%',
        'Reduced bundle size by 40%',
      ],
      icon: 'desktop',
      color: colors.info,
    },
    {
      company: 'StartUp Hub',
      position: 'Junior Developer',
      period: '2016 - 2017',
      description: 'Started career building websites and learning full-stack development fundamentals.',
      achievements: [
        'Completed 30+ projects',
        'Learned 10+ technologies',
        'Earned developer certification',
      ],
      icon: 'rocket',
      color: colors.success,
    },
  ],

  // Contact Information
  contact: {
    info: [
      {
        icon: 'mail',
        label: 'Email',
        value: 'shahmdmahi13@gmail.com',
        color: colors.primary,
        link: 'mailto:shahmdmahi13@gmail.com',
      },
      {
        icon: 'call',
        label: 'Phone',
        value: '+8801757290258',
        color: colors.success,
        link: 'tel:+8801757290258',
      },
      {
        icon: 'location',
        label: 'Location',
        value: 'Narail, Khulna, Bangladesh',
        color: colors.accent,
        link: 'https://maps.app.goo.gl/2cq3ubig1W8Rpqsg6',
      },
      {
        icon: 'time',
        label: 'Availability',
        value: 'Open to opportunities',
        color: colors.warning,
        link: null,
      },
    ],
    form: {
      title: 'Send a Message',
      fields: {
        name: { label: 'Name', placeholder: 'Your Name' },
        email: { label: 'Email', placeholder: 'your.email@example.com' },
        message: { label: 'Message', placeholder: 'Your message here...' },
      },
      submitButton: 'Send Message',
    },
  },

  // Social Media Links
  social: {
    title: 'Connect With Me',
    links: [
      {
        name: 'GitHub',
        icon: 'logo-github',
        color: colors.text,
        url: 'https://github.com/ShahMdMahi',
        borderColor: colors.text,
      },
      {
        name: 'LinkedIn',
        icon: 'logo-linkedin',
        color: '#0077b5',
        url: 'https://www.linkedin.com/in/shah-md-mahi',
        borderColor: '#0077b5',
      },
      {
        name: 'Twitter',
        icon: 'logo-twitter',
        color: '#1da1f2',
        url: 'https://twitter.com/shahmdmahi_',
        borderColor: '#1da1f2',
      },
      {
        name: 'Instagram',
        icon: 'logo-instagram',
        color: colors.accent,
        url: 'https://instagram.com/shah.md.mahi13',
        borderColor: colors.accent,
      },
    ],
  },

  // Resume URL
  resume: {
    url: 'https://example.com/resume.pdf', // Replace with actual resume URL
  },

  // Testimonials
  testimonials: [
    {
      name: 'John Smith',
      role: 'CEO, Tech Corp',
      company: 'Tech Corp',
      image: 'https://i.pravatar.cc/150?img=12',
      text: 'Shah is an exceptional developer who delivered our project ahead of schedule. His expertise in React Native and cloud technologies is outstanding.',
      rating: 5,
      color: colors.primary,
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager, Innovation Labs',
      company: 'Innovation Labs',
      image: 'https://i.pravatar.cc/150?img=5',
      text: 'Working with Shah was a pleasure. He transformed our complex requirements into a beautiful, performant application.',
      rating: 5,
      color: colors.success,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, StartUp Hub',
      company: 'StartUp Hub',
      image: 'https://i.pravatar.cc/150?img=33',
      text: 'Shah\'s technical knowledge and problem-solving skills are remarkable. He consistently delivers high-quality solutions.',
      rating: 5,
      color: colors.info,
    },
    {
      name: 'Emily Davis',
      role: 'Lead Designer, Digital Solutions',
      company: 'Digital Solutions',
      image: 'https://i.pravatar.cc/150?img=9',
      text: 'Shah brings designs to life with pixel-perfect implementations. His attention to detail is impressive.',
      rating: 5,
      color: colors.accent,
    },
  ],

  // Blog/Articles
  blog: [
    {
      title: 'Building Scalable React Native Apps',
      excerpt: 'Best practices and architectural patterns for building large-scale mobile applications with React Native.',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Mobile Development',
      image: 'https://picsum.photos/400/250?random=1',
      url: 'https://medium.com/@shahmdmahi',
      color: colors.primary,
    },
    {
      title: 'Microservices with Node.js',
      excerpt: 'A comprehensive guide to building microservices architecture using Node.js, Docker, and Kubernetes.',
      date: '2024-01-08',
      readTime: '12 min read',
      category: 'Backend',
      image: 'https://picsum.photos/400/250?random=2',
      url: 'https://medium.com/@shahmdmahi',
      color: colors.success,
    },
    {
      title: 'Cloud-Native Development',
      excerpt: 'Exploring modern cloud-native development practices with AWS, serverless functions, and infrastructure as code.',
      date: '2023-12-20',
      readTime: '10 min read',
      category: 'Cloud',
      image: 'https://picsum.photos/400/250?random=3',
      url: 'https://medium.com/@shahmdmahi',
      color: colors.info,
    },
    {
      title: 'TypeScript Best Practices',
      excerpt: 'Advanced TypeScript patterns and tips for writing type-safe, maintainable code.',
      date: '2023-12-10',
      readTime: '6 min read',
      category: 'Programming',
      image: 'https://picsum.photos/400/250?random=4',
      url: 'https://medium.com/@shahmdmahi',
      color: colors.warning,
    },
  ],

  // Certifications & Awards
  certifications: [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: 'ribbon',
      color: colors.warning,
    },
    {
      title: 'Google Cloud Professional',
      issuer: 'Google Cloud Platform',
      date: '2023',
      icon: 'cloud-done',
      color: colors.info,
    },
    {
      title: 'React Native Specialist',
      issuer: 'Meta (Facebook)',
      date: '2022',
      icon: 'phone-portrait',
      color: colors.primary,
    },
    {
      title: 'Kubernetes Certified Admin',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
      icon: 'layers',
      color: colors.accent,
    },
    {
      title: 'Full Stack Developer Award',
      issuer: 'Developer Excellence Awards',
      date: '2021',
      icon: 'trophy',
      color: colors.success,
    },
    {
      title: 'Top Contributor Open Source',
      issuer: 'GitHub',
      date: '2021',
      icon: 'star',
      color: colors.text,
    },
  ],

  // Footer
  footer: {
    builtWithText: 'Built with Love by Shah Md Mahi using React Native & Expo',
    copyright: (year: number) => `© ${year} Shah Md Mahi. All rights reserved.`,
  },
};

export type PortfolioData = typeof portfolioData;
