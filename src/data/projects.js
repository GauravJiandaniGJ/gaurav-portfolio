export default [
    {
        id: 1,
        title: 'B2B Pricing Engine',
        slug: 'b2b-pricing-engine',
        url: 'https://apps.shopify.com/wholesale-pricing-discount',
        category: 'Commerce Platform',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Redis', logo: '/static/Redis.png' },
            { name: 'React', logo: '/static/React.png' }
        ],
        productSite: 'E-commerce',
        reference: 'Seth Gold',
        // Case study fields
        challenge: 'Transform a PHP monolith into scalable microservices while maintaining service for existing merchants',
        outcome: 'Now powering 12K+ merchants and 600K+ end users',
        metrics: [
            'Migrated 60M data points to indexed clusters',
            'Response time under 2 seconds for 100K daily customers',
            'Zero-downtime migration from monolith to microservices',
            '50x revenue growth over 3 years'
        ],
        role: 'Lead Architect & Team Lead',
        featured: true,
        description: [
            {
                id: 1,
                content: 'Led the transformation from PHP monolith to Laravel microservices, migrating 60M data points while maintaining backward compatibility.'
            },
            {
                id: 2,
                content: 'Implemented cost-effective tree data structure within Redis, achieving sub-2-second response times for 100,000 daily customers.'
            },
            {
                id: 3,
                content: 'Architecture now serves 12K+ merchants and 600K+ end users.'
            },
            {
                id: 4,
                content: 'Migrated over 60 million records during refactor without any downtime.'
            },
            {
                id: 5,
                content: 'Achieved 50x revenue growth over 3 years by delivering high-impact features.'
            },
            {
                id: 6,
                content: 'Scaled engineering team from 6 → 30 pre-acquisition, then integrated into 250+ team post-acquisition.'
            }
        ],
        images: [
            { id: 1, src: '/static/WPD discout tag.png' },
            { id: 2, src: '/static/WPD price.png' }
        ],
        logo: '/static/wpd.webp',
    },
    {
        id: 2,
        title: 'Enterprise Capacity Management Platform',
        slug: 'capacity-management-platform',
        category: 'Booking & Reservations',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Vue.js', logo: '/static/Vue.png' },
            { name: 'Redis', logo: '/static/Redis.png' }
        ],
        productSite: 'SaaS Platform',
        reference: 'Confidential',
        // Case study fields
        challenge: 'Build real-time capacity management for high-volume booking platform with complex availability rules and distributed payout reconciliation',
        outcome: 'Processing 100,000+ daily booking requests with real-time accuracy',
        metrics: [
            '100K+ daily booking requests',
            'Real-time capacity synchronization across locations',
            'Distributed payout reconciliation system',
            'SR&ED qualifying R&D work (government-certified innovation)'
        ],
        role: 'Senior Backend Engineer / Architect',
        featured: true,
        description: [
            {
                id: 1,
                content: 'Architected real-time capacity management system handling 100,000+ daily booking requests with complex availability rules.'
            },
            {
                id: 2,
                content: 'Developed distributed payout reconciliation system qualifying for SR&ED tax credits—government-certified as genuine technical innovation.'
            },
            {
                id: 3,
                content: 'Led technical documentation efforts demonstrating scientific/experimental development methodology.'
            }
        ],
        images: [
            { id: 1, src: '/static/smartrez/smartrez1.png' },
            { id: 2, src: '/static/smartrez/smartrez2.png' }
        ],
        logo: '/static/smartrez/smartrez-logo.png'
    },
    {
        id: 3,
        title: 'Vebcommerce',
        slug: 'vebcommerce',
        url: 'https://www.vebcommerce.com',
        category: 'E-commerce Platform',
        technology: [
            { name: 'Lumen', logo: '/static/Lumen.png' },
            { name: 'Django', logo: '/static/django.svg' },
            { name: 'VueJS', logo: '/static/Vue.png' }
        ],
        productSite: 'E-commerce',
        reference: 'Harshit Makhija',
        // Case study fields
        challenge: 'Build language-agnostic microservices architecture for multi-tenant e-commerce platform',
        outcome: 'Scalable platform serving multiple merchant clients',
        metrics: [
            'Team of 7 developers managed',
            'Multi-language microservices architecture',
            'Agile delivery methodology'
        ],
        role: 'Technical Lead',
        featured: false,
        description: [
            { id: 1, content: 'Technical Lead' },
            { id: 2, content: 'Managing technical team of 7 developers' },
            { id: 3, content: 'Defining limits and areas of focus in projects.' },
            { id: 4, content: 'Utilized agile approach for efficient project management' },
            { id: 5, content: 'Created micro-service architecture across multiple languages to be agnostic' }
        ],
        images: [
            { id: 1, src: '/static/vebcommerce/vebcommerce1.png' }
        ],
        logo: '/static/vebcommerce.webp'
    },
    {
        id: 4,
        title: 'AReceivables',
        slug: 'areceivables',
        url: 'https://www.areceivables.com',
        category: 'Fintech',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Vue', logo: '/static/Vue.png' },
            { name: 'Digital Ocean', logo: '/static/DigitalOcean.png' }
        ],
        productSite: 'Fintech',
        reference: 'Seth Gold',
        challenge: 'Build automated accounts receivable management with intelligent payment reminders',
        outcome: 'Streamlined B2B payment collection with automated workflows',
        metrics: [
            'Full-stack solo development',
            'Automated email reminder system',
            'Custom invoice generation'
        ],
        role: 'Full Stack Developer',
        featured: false,
        description: [
            { id: 1, content: 'Sole built full stack application and hosted on DO server' },
            { id: 2, content: 'See customer\'s accounts receivable, invoices & past due orders' },
            { id: 3, content: 'View unpaid B2B orders from customers, also on net payment terms and see what is past due' },
            { id: 4, content: 'Build invoices displaying entire details of the order including discount by line item. Add customisable instructions in Invoice' },
            { id: 5, content: 'System will automatically remind the customer by sending them emails at variable times until the order is marked as paid' }
        ],
        images: [
            { id: 1, src: '/static/areceivables/areceivables1.png' },
            { id: 2, src: '/static/areceivables/areceivables2.png' },
            { id: 3, src: '/static/AR1.png' },
            { id: 4, src: '/static/AR2.png' },
            { id: 5, src: '/static/AR3.png' }
        ],
        logo: '/static/areceivables.png'
    },
    {
        id: 5,
        title: 'ProjectX',
        slug: 'projectx',
        category: 'AI-ML',
        technology: [
            { name: 'Rasa', logo: '/static/Rasa.jpg' },
            { name: 'Python', logo: '/static/Python.png' },
            { name: 'Django', logo: '/static/django.svg' }
        ],
        productSite: 'AI-ML',
        reference: 'Praveen Penumaka',
        challenge: 'Build intelligent chatbot with CRM integration for automated customer insights',
        outcome: 'Slack-integrated AI assistant pulling real-time HubSpot data',
        metrics: [
            'Rasa NLU implementation',
            'HubSpot & Slack OAuth integration',
            'Custom connector development'
        ],
        role: 'Backend Developer',
        featured: false,
        description: [
            { id: 1, content: 'Using Rasa core nlu, built a chatbot on slack providing details from hubspot using its APIs.' },
            { id: 2, content: 'Created Django application for following microservice architecture and hosted OAuth functionalities there' },
            { id: 3, content: 'Executed HubSpot OAuth and Slack OAuth' },
            { id: 4, content: 'Created custom connectors in rasa main application' }
        ],
        images: [
            { id: 1, src: '/static/projectx/projectx.png' }
        ],
        logo: '/static/projectx.png'
    },
    {
        id: 6,
        title: 'Repsorder',
        slug: 'repsorder',
        url: 'https://www.salesreporderform.com',
        category: 'Fintech',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'jQuery', logo: '/static/jQuery.png' }
        ],
        productSite: 'Fintech',
        reference: 'Seth Gold',
        challenge: 'Build sales rep management platform with comprehensive reporting',
        outcome: 'Streamlined sales operations with admin impersonation features',
        metrics: [
            'V2 product development',
            'Sales rep reporting system',
            'Superadmin portal'
        ],
        role: 'Backend Developer',
        featured: false,
        description: [
            { id: 1, content: 'Joined while V2 release of the product' },
            { id: 2, content: 'Technology stack here was Laravel and Jquery.' },
            { id: 3, content: 'Built core features such as sales rep reports, superadmin portal providing personation functionality' }
        ],
        images: [
            { id: 1, src: '/static/repsorder/repsorder1.png' },
            { id: 2, src: '/static/repsorder/repsorder2.png' }
        ],
        logo: '/static/repsorder.png'
    },
    {
        id: 7,
        title: 'SAR Contractor',
        slug: 'sar-contractor',
        category: 'Enterprise Solutions',
        technology: [
            { name: 'Vue', logo: '/static/Vue.png' },
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Zend', logo: '/static/Zend.png' },
            { name: 'Selenium', logo: '/static/Selenium.png' },
            { name: 'Vagrant', logo: '/static/Vagrant.png' }
        ],
        productSite: 'Fintech',
        reference: 'Nick Hoffman, Ankit Sharma',
        challenge: 'Build multiple enterprise solutions across different tech stacks',
        outcome: 'Delivered AWS integrations and automation tools',
        metrics: [
            'Multi-project delivery',
            'AWS CloudWatch integration',
            'Selenium automation scripts'
        ],
        role: 'Senior Developer',
        featured: false,
        description: [
            { id: 1, content: 'Worked on multiple projects with multiple teams in multiple technologies since May 2019.' },
            { id: 2, content: 'Project 1: Application catering to a client to help in his accounting from csvs thereby calculating payouts, generating reports and payments.' },
            { id: 3, content: 'Project 2: Appointed as internal dev to build functionalties and integrations such as Logging (AWSCloudWatch), Cron Job, Caching and Amazon Connect.' },
            { id: 4, content: 'Project 3: Selenium scripting tasks reducing daily work job of multiple users.' },
            { id: 5, content: 'Can\'t add images due to signed NDA.' }
        ],
        images: [
            { id: 1, src: '/static/sarInternal/employee.png' }
        ],
        logo: '/static/sar3.png'
    },
    {
        id: 8,
        title: 'ClearGlass',
        slug: 'clearglass',
        url: 'https://www.clearglass.com',
        category: 'Fintech Analytics',
        reference: 'Ritesh Singhania',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' }
        ],
        productSite: 'Fintech',
        challenge: 'Build analytics platform backend from foundation with team mentorship',
        outcome: 'Core analytics product powering financial insights',
        metrics: [
            'Backend architecture from scratch',
            'Junior developer mentorship',
            'Code review processes established'
        ],
        role: 'Senior Backend Developer',
        featured: false,
        description: [
            { id: 1, content: 'Developed heavy-lifting backend part of core-product ClearGlass Analytics right from it\'s foundation in Laravel technology.' },
            { id: 2, content: 'Followed Agile Software Development and contributed in all steps of planning, implementation, test, monitoring and delivery.' },
            { id: 3, content: 'Collaborating and Managing junior developers to deliver tasks within specified timeline also making them understand product in context of business.' },
            { id: 4, content: 'Performed POC and helping support team resolving customer issues. Conducted internal-external code reviews, domain training and technical learning sessions for contributing to overall growth of organisation' }
        ],
        images: [
            { id: 1, src: '/static/clearglass/clearglass1.png' },
            { id: 2, src: '/static/clearglass/clearglass2.png' }
        ],
        logo: '/static/clearglass.png'
    },
    {
        id: 9,
        title: 'Plexus MD',
        slug: 'plexus-md',
        url: 'https://www.plexusmd.com',
        category: 'Healthtech',
        technology: [
            { name: 'React', logo: '/static/React.png' },
            { name: 'Redux', logo: '/static/Redux.png' }
        ],
        reference: 'Kinnar Shah',
        productSite: 'Healthtech / Digital Health',
        challenge: 'Build video masterclass platform for medical education',
        outcome: 'Medcast feature connecting doctors worldwide',
        metrics: [
            'React from scratch',
            'Redux state management',
            'Video platform integration'
        ],
        role: 'Frontend Developer',
        featured: false,
        description: [
            { id: 1, content: 'College placed with an opportunity to work with 3 years old startup in medical industry that helps you connect with doctors worldwide, stay updated with the latest developments, share interesting cases, apply for jobs, courses and fellowships' },
            { id: 2, content: 'Worked on building key feature Medcast\'s (Video Masterclass in Medicine and Surgery) landing and video page of Web which was in react from scratch with full reactivity of components.' },
            { id: 3, content: 'Adapted duck pattern for retrieving & storing data via redux store obtained from apis' },
            { id: 4, content: 'Built Youtube Enhancer (Mobile youtube application with MUTE option) in react native for the purpose of learning' }
        ],
        images: [
            { id: 1, src: '/static/plexusmd/plexusmd1.png' }
        ],
        logo: '/static/plexusmd.png'
    },
    {
        id: 10,
        title: 'ClaritEx',
        slug: 'claritex',
        category: 'Data Analytics',
        technology: [
            { name: 'Angular', logo: '/static/Angular.png' }
        ],
        productSite: 'Data Analytics',
        reference: 'Simplitium',
        challenge: 'Build data visualization widgets for analytics dashboard',
        outcome: 'Interactive chart widgets for business intelligence',
        metrics: [
            'Angular development',
            'Redux pattern implementation',
            'Data visualization charts'
        ],
        role: 'Frontend Developer',
        featured: false,
        description: [
            {
                id: 1,
                content: 'Worked on contractual basis with Simplitium on Application development and data analytics solutions.'
            },
            {
                id: 2,
                content: 'Used redux pattern to carry out data used to build a chart widget for data visualization and analytics dashboard.'
            }
        ],
        images: [
            { id: 1, src: '/static/claritex.png' }
        ],
        logo: '/static/claritex.png'
    }
];
