export default [
    {
        id: 1,
        title: 'SmartRez',
        url: 'https://www.smartrezbooking.com/',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Redis', logo: '/static/Redis.png' },
            { name: 'React', logo: '/static/React.png' }
        ],
        productSite: 'SaaS · Booking & Resource Management',
        reference: 'Ashwin Sureshkumar',
        description: [
            {
                id: 1,
                content: 'Designed and implemented the slot availability engine with overlapping bookings, group capacity restrictions, blackout periods, and rescheduling workflows powering dozens of operators on a shared multi-tenant platform.'
            },
            {
                id: 2,
                content: 'Architected real-time inventory and pricing logic with seasonal/promotional rate sheets, and built admin tools for booking management, resource maintenance, and internal communications.'
            }
        ],
        images: [
            { id: 1, src: '/static/SmartRezSs.png' }
        ],
        logo: '/static/SmartRez.png',
    },
    {
        id: 2,
        title: 'WPD',
        url: 'https://apps.shopify.com/wholesale-pricing-discount',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Redis', logo: '/static/Redis.png' },
            { name: 'React', logo: '/static/React.png' }
        ],
        productSite: 'E-commerce',
        reference: 'Seth Gold',
        description: [
            {
                id: 1,
                content: 'Working in to shopify efficiently transformed a PHP app to microservices, migrating 60M data points to indexed clusters, maintaining backward compatibility leading a team of size 4.'
            },
            {
                id: 2,
                content: 'Implemented a cost-effective tree data structure within Redis and developed customer APIs using Flask to ensure a response time of under 2 seconds utilized by 100,000 customers on a daily basis.'
            }
        ],
        logo: '/static/wpd.webp',
    },
    {
        id: 3,
        title: 'Vebcommerce',
        url: 'https://www.vebcommerce.com',
        technology: [
            { name: 'Lumen', logo: '/static/Lumen.png' },
            { name: 'Django', logo: '/static/django.svg' },
            { name: 'VueJS', logo: '/static/Vue.png' }
        ],
        productSite: 'E-commerce',
        reference: 'Harshit Makhija',
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
        url: 'https://www.areceivables.com',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Vue', logo: '/static/Vue.png' },
            { name: 'Digital Ocean', logo: '/static/DigitalOcean.png' }
        ],
        productSite: 'Fintech',
        reference: 'Seth Gold',
        description: [
            { id: 1, content: 'Sole built full stack application and hosted on DO server' },
            { id: 2, content: 'See customer\'s accounts receivable, invoices & past due orders' },
            { id: 3, content: 'View unpaid B2B orders from customers, also on net payment terms and see what is past due' },
            { id: 4, content: 'Build invoices displaying entire details of the order including discount by line item. Add customisable instructions in Invoice' },
            { id: 5, content: 'System will automatically remind the customer by sending them emails at variable times until the order is marked as paid' }
        ],
        images: [
            { id: 1, src: '/static/areceivables/areceivables1.png' },
            { id: 2, src: '/static/areceivables/areceivables2.png' }
        ],
        logo: '/static/areceivables.png'
    },
    {
        id: 5,
        title: 'ProjectX',
        technology: [
            { name: 'Rasa', logo: '/static/Rasa.jpg' },
            { name: 'Python', logo: '/static/Python.png' },
            { name: 'Django', logo: '/static/django.svg' }
        ],
        productSite: 'AI-ML',
        reference: 'Praveen Penumaka',
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
        url: 'https://www.salesreporderform.com',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'jQuery', logo: '/static/jQuery.png' }
        ],
        productSite: 'Fintech',
        reference: 'Seth Gold',
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
        technology: [
            { name: 'Vue', logo: '/static/Vue.png' },
            { name: 'Laravel', logo: '/static/Laravel.svg' },
            { name: 'Zend', logo: '/static/Zend.png' },
            { name: 'Selenium', logo: '/static/Selenium.png' },
            { name: 'Vagrant', logo: '/static/Vagrant.png' }
        ],
        productSite: 'Fintech',
        reference: 'Nick Hoffman, Ankit Sharma',
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
        url: 'https://www.clearglass.com',
        reference: 'Ritesh Singhania',
        technology: [
            { name: 'Laravel', logo: '/static/Laravel.svg' }
        ],
        productSite: 'Fintech',
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
        url: 'https://www.plexusmd.com',
        technology: [
            { name: 'React', logo: '/static/React.png' },
            { name: 'Redux', logo: '/static/Redux.png' }
        ],
        reference: 'Kinnar Shah',
        productSite: 'Healthtech / Digital Health',
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
    }
];
