const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Article = require("./models/Article");

// Load environment variables
dotenv.config();

// Sample articles data
const sampleArticles = [
  {
    title:
      "The Future of Artificial Intelligence: How AI is Transforming Industries",
    slug: "future-artificial-intelligence-transforming-industries",
    excerpt:
      "Explore how artificial intelligence is revolutionizing various sectors from healthcare to finance, and what the future holds for AI-driven innovation.",
    content: `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of our time, reshaping industries and creating new possibilities that were once considered science fiction. From healthcare to finance, transportation to entertainment, AI is making its mark everywhere.

In healthcare, AI-powered diagnostic tools are helping doctors detect diseases earlier and more accurately. Machine learning algorithms can analyze medical images, identify patterns, and assist in making critical decisions that save lives. Companies like Google Health and IBM Watson are leading the charge in this space.

The financial sector has also embraced AI with open arms. Algorithmic trading, fraud detection, and personalized banking services are just a few examples of how AI is revolutionizing finance. Banks are using AI to assess credit risk, detect suspicious transactions, and provide 24/7 customer service through intelligent chatbots.

Transportation is another area where AI is making significant strides. Autonomous vehicles, powered by sophisticated AI systems, promise to make roads safer and reduce traffic congestion. Companies like Tesla, Waymo, and others are investing billions in developing self-driving technology.

However, with great power comes great responsibility. As AI becomes more prevalent, we must address important questions about ethics, privacy, and job displacement. The future of AI depends not just on technological advancement, but on how we choose to implement and regulate these powerful tools.

Looking ahead, we can expect AI to become even more integrated into our daily lives. From smart cities to personalized education, the possibilities are endless. The key is to ensure that AI development remains human-centered and beneficial to society as a whole.`,
    author: "Sarah Johnson",
    category: "Technology",
    tags: ["AI", "Technology", "Innovation", "Future", "Machine Learning"],
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-15"),
    views: 1250,
  },
  {
    title: "Sustainable Living: 10 Easy Ways to Reduce Your Carbon Footprint",
    slug: "sustainable-living-reduce-carbon-footprint",
    excerpt:
      "Discover practical and effective ways to live more sustainably and reduce your environmental impact with these simple lifestyle changes.",
    content: `Climate change is one of the most pressing challenges of our time, and while governments and corporations play a crucial role, individual actions can make a significant difference. Here are ten practical ways you can reduce your carbon footprint and contribute to a more sustainable future.

1. **Switch to Renewable Energy**: Consider installing solar panels or switching to a renewable energy provider. Even small changes like using energy-efficient appliances can make a big difference.

2. **Reduce, Reuse, Recycle**: The classic three R's are more important than ever. Before buying something new, ask yourself if you really need it. Can you repair, repurpose, or find it second-hand?

3. **Eat Less Meat**: The meat industry is a major contributor to greenhouse gas emissions. Try incorporating more plant-based meals into your diet. Even one meatless day per week can have a significant impact.

4. **Use Public Transportation**: Whenever possible, choose public transport, cycling, or walking over driving. If you must drive, consider carpooling or investing in an electric vehicle.

5. **Conserve Water**: Simple actions like taking shorter showers, fixing leaks, and using water-efficient appliances can save thousands of gallons per year.

6. **Choose Sustainable Products**: Look for products with eco-friendly certifications and minimal packaging. Support companies that prioritize sustainability.

7. **Reduce Food Waste**: Plan your meals, store food properly, and compost organic waste. Food waste in landfills produces methane, a potent greenhouse gas.

8. **Plant Trees**: Trees absorb carbon dioxide and produce oxygen. Consider planting trees in your yard or supporting reforestation projects.

9. **Educate Others**: Share your knowledge about sustainability with friends and family. Collective action starts with individual awareness.

10. **Support Green Policies**: Vote for leaders who prioritize environmental protection and support policies that promote sustainability.

Remember, you don't have to do everything at once. Start with one or two changes and gradually incorporate more sustainable practices into your lifestyle. Every small action counts toward a healthier planet for future generations.`,
    author: "Michael Chen",
    category: "Environment",
    tags: [
      "Sustainability",
      "Environment",
      "Climate Change",
      "Green Living",
      "Eco-friendly",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-12"),
    views: 890,
  },
  {
    title:
      "The Psychology of Success: Mindset Strategies for Achieving Your Goals",
    slug: "psychology-success-mindset-strategies-goals",
    excerpt:
      "Learn about the psychological principles that drive success and discover practical strategies to develop a winning mindset for achieving your personal and professional goals.",
    content: `Success isn't just about talent or luck—it's largely about mindset. Research in psychology has revealed that our mental approach to challenges, failures, and opportunities plays a crucial role in determining our outcomes. Here's how you can harness the psychology of success to achieve your goals.

**The Growth Mindset**

Carol Dweck's groundbreaking research on mindset shows that people with a growth mindset believe their abilities can be developed through dedication and hard work. This belief creates a love of learning and resilience essential for great accomplishment.

To develop a growth mindset:
- Embrace challenges as opportunities to grow
- View effort as the path to mastery
- Learn from criticism and feedback
- Find inspiration in others' success

**The Power of Visualization**

Olympic athletes and successful entrepreneurs use visualization techniques to enhance performance. By mentally rehearsing success scenarios, you can:
- Build confidence
- Reduce anxiety
- Improve focus
- Program your subconscious for success

**Goal Setting Psychology**

Effective goal setting follows the SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound), but there's more to it:

- Write down your goals (you're 42% more likely to achieve them)
- Break large goals into smaller, manageable steps
- Set both outcome and process goals
- Review and adjust regularly

**Overcoming Limiting Beliefs**

We all have limiting beliefs that hold us back. Common ones include:
- "I'm not smart enough"
- "I don't have enough time"
- "I'm too old to start"
- "I don't have the right connections"

Challenge these beliefs by:
- Questioning their validity
- Finding evidence to the contrary
- Reframing them positively
- Taking small actions that prove them wrong

**The Compound Effect**

Success is rarely the result of one big action—it's the accumulation of small, consistent efforts over time. The compound effect means that small improvements, when sustained, lead to exponential results.

**Building Resilience**

Setbacks are inevitable on the path to success. Resilient people:
- View failures as learning opportunities
- Maintain perspective during difficult times
- Practice self-compassion
- Seek support when needed

**The Success Formula**

While there's no magic formula for success, combining these psychological principles with consistent action creates a powerful foundation for achieving your goals. Remember, success is a journey, not a destination, and the mindset you develop along the way is often more valuable than the goals you achieve.`,
    author: "Dr. Emily Rodriguez",
    category: "Psychology",
    tags: ["Success", "Psychology", "Mindset", "Goals", "Personal Development"],
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-10"),
    views: 2100,
  },
  {
    title:
      "Cryptocurrency Trends 2024: What to Watch in the Digital Asset Space",
    slug: "cryptocurrency-trends-2024-digital-assets",
    excerpt:
      "Explore the latest trends and developments in cryptocurrency for 2024, including regulatory changes, technological innovations, and market predictions.",
    content: `The cryptocurrency landscape continues to evolve rapidly, with 2024 bringing significant developments that are reshaping the digital asset ecosystem. From regulatory clarity to technological breakthroughs, here's what's driving the crypto market forward.

**Regulatory Developments**

One of the most significant factors affecting cryptocurrency in 2024 is the increasing regulatory clarity from governments worldwide. The United States has made progress on comprehensive crypto regulations, while the European Union's MiCA (Markets in Crypto-Assets) regulation is now fully implemented.

Key regulatory trends:
- Clearer guidelines for crypto exchanges and custodians
- Enhanced consumer protection measures
- Stricter anti-money laundering (AML) requirements
- Tax reporting improvements

**Institutional Adoption**

Major corporations and financial institutions are increasingly embracing cryptocurrency:
- PayPal and Square expanding crypto services
- Traditional banks offering crypto custody services
- Pension funds allocating to digital assets
- Central banks exploring digital currencies (CBDCs)

**Technological Innovations**

**Layer 2 Solutions**: Ethereum's scaling solutions like Polygon and Arbitrum are gaining traction, offering faster and cheaper transactions.

**Cross-Chain Interoperability**: Projects like Cosmos and Polkadot are enabling seamless communication between different blockchain networks.

**Zero-Knowledge Proofs**: Privacy-focused technologies are becoming more practical and user-friendly.

**DeFi Evolution**: Decentralized finance continues to mature with:
- More sophisticated lending protocols
- Improved user interfaces
- Better risk management tools
- Integration with traditional finance

**NFT Market Maturation**

The NFT market has evolved beyond simple profile pictures:
- Utility-focused NFTs gaining popularity
- Integration with real-world assets
- Improved environmental sustainability
- Better intellectual property protection

**Environmental Concerns Addressed**

The crypto industry has made significant strides in addressing environmental concerns:
- Ethereum's transition to Proof-of-Stake
- Renewable energy mining operations
- Carbon-neutral blockchain projects
- Sustainable NFT platforms

**Market Predictions for 2024**

While cryptocurrency markets remain volatile, several trends suggest continued growth:
- Increased institutional investment
- Mainstream adoption of digital payments
- Integration with traditional financial services
- Development of more user-friendly interfaces

**Risks to Consider**

Despite the positive trends, investors should remain aware of:
- Regulatory uncertainty in some jurisdictions
- Market volatility
- Security concerns
- Technological risks

**Getting Started**

For newcomers to cryptocurrency:
1. Educate yourself about blockchain technology
2. Start with small investments
3. Use reputable exchanges
4. Secure your digital assets properly
5. Stay informed about regulatory changes

The cryptocurrency space continues to mature, offering both opportunities and challenges. As the technology becomes more mainstream and regulations become clearer, we can expect continued innovation and adoption in the years ahead.`,
    author: "Alex Thompson",
    category: "Finance",
    tags: [
      "Cryptocurrency",
      "Blockchain",
      "Finance",
      "Technology",
      "Investment",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-08"),
    views: 3200,
  },
  {
    title: "Remote Work Revolution: Best Practices for Distributed Teams",
    slug: "remote-work-revolution-distributed-teams",
    excerpt:
      "Discover the latest trends and best practices for managing remote teams effectively, including tools, strategies, and tips for maintaining productivity and collaboration.",
    content: `The remote work revolution has fundamentally changed how we think about work, productivity, and team collaboration. What started as a necessity during the pandemic has evolved into a permanent shift in the global workforce. Here's how to make remote work successful for your team.

**The New Normal of Work**

Remote work is no longer just a trend—it's become a standard operating model for many companies. Studies show that remote workers are often more productive, have better work-life balance, and report higher job satisfaction.

**Essential Tools for Remote Teams**

**Communication Platforms**:
- Slack for instant messaging and team chat
- Microsoft Teams for integrated collaboration
- Discord for informal team building
- Zoom for video conferencing

**Project Management**:
- Asana for task and project tracking
- Trello for visual project management
- Monday.com for comprehensive workflow management
- Notion for all-in-one workspace

**File Sharing and Collaboration**:
- Google Workspace for real-time collaboration
- Microsoft 365 for enterprise solutions
- Dropbox for file storage and sharing
- Figma for design collaboration

**Best Practices for Remote Team Management**

**1. Establish Clear Communication Guidelines**
- Set expectations for response times
- Define which communication channels to use for different purposes
- Schedule regular team meetings and one-on-ones
- Create a communication charter

**2. Focus on Results, Not Hours**
- Set clear, measurable goals
- Trust your team to manage their time
- Focus on deliverables rather than activity
- Implement outcome-based performance reviews

**3. Create a Strong Company Culture**
- Organize virtual team building activities
- Celebrate achievements and milestones
- Encourage informal interactions
- Maintain company values and mission

**4. Invest in the Right Technology**
- Provide necessary hardware and software
- Ensure reliable internet connections
- Implement cybersecurity measures
- Offer technical support

**5. Support Employee Well-being**
- Encourage regular breaks
- Promote work-life balance
- Provide mental health resources
- Offer flexible schedules

**Challenges and Solutions**

**Isolation and Loneliness**:
- Regular virtual coffee chats
- Team building activities
- Mentorship programs
- Co-working space memberships

**Communication Barriers**:
- Use video calls when possible
- Document important decisions
- Create shared knowledge bases
- Encourage questions and feedback

**Time Zone Differences**:
- Use asynchronous communication
- Record important meetings
- Create overlapping work hours
- Use time zone management tools

**Managing Different Work Styles**:
- Understand individual preferences
- Provide flexible work arrangements
- Offer various communication options
- Regular check-ins and feedback

**The Future of Remote Work**

As we look ahead, remote work will continue to evolve:
- Hybrid work models becoming standard
- Virtual reality for immersive collaboration
- AI-powered productivity tools
- Global talent pools

**Tips for Remote Workers**

**Create a Dedicated Workspace**:
- Separate work area from living space
- Invest in ergonomic furniture
- Ensure good lighting and ventilation
- Minimize distractions

**Maintain Regular Routines**:
- Set consistent work hours
- Dress professionally for video calls
- Take regular breaks
- End your workday properly

**Stay Connected**:
- Participate in team activities
- Reach out to colleagues regularly
- Attend virtual events
- Build professional relationships

The remote work revolution has proven that productivity and collaboration can thrive outside traditional office environments. By implementing the right tools, practices, and mindset, organizations can build successful distributed teams that are more flexible, diverse, and effective than ever before.`,
    author: "Jennifer Martinez",
    category: "Business",
    tags: [
      "Remote Work",
      "Business",
      "Productivity",
      "Team Management",
      "Workplace",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-05"),
    views: 1800,
  },
  {
    title: "Mental Health in the Digital Age: Navigating Technology's Impact",
    slug: "mental-health-digital-age-technology-impact",
    excerpt:
      "Explore how technology affects our mental health and discover strategies for maintaining psychological well-being in our increasingly connected world.",
    content: `The digital age has brought unprecedented connectivity and convenience, but it has also introduced new challenges to our mental health. As we navigate this complex relationship between technology and well-being, understanding both the benefits and risks is crucial for maintaining psychological health.

**The Double-Edged Sword of Technology**

Technology has revolutionized how we communicate, work, and access information, but it has also created new sources of stress, anxiety, and social isolation. The key is finding balance and using technology mindfully.

**Positive Impacts of Technology on Mental Health**

**Access to Mental Health Resources**:
- Online therapy and counseling platforms
- Mental health apps and tools
- Educational content about mental health
- Support communities and forums

**Improved Communication**:
- Staying connected with loved ones
- Finding like-minded communities
- Access to professional help
- Reducing social isolation

**Convenience and Efficiency**:
- Reduced stress from daily tasks
- Better work-life balance
- Access to information and resources
- Time-saving tools and automation

**Negative Impacts and Challenges**

**Social Media and Mental Health**:
- Comparison and FOMO (Fear of Missing Out)
- Cyberbullying and online harassment
- Unrealistic beauty and lifestyle standards
- Addiction and compulsive usage

**Digital Overload**:
- Information overwhelm
- Constant notifications
- Multitasking and reduced focus
- Sleep disruption from screen time

**Privacy and Security Concerns**:
- Data breaches and identity theft
- Online surveillance and tracking
- Loss of privacy
- Digital footprint concerns

**Strategies for Healthy Technology Use**

**1. Set Digital Boundaries**
- Designate tech-free times and spaces
- Turn off non-essential notifications
- Use "Do Not Disturb" modes
- Create phone-free zones in your home

**2. Practice Mindful Technology Use**
- Be intentional about when and why you use devices
- Take regular breaks from screens
- Focus on one task at a time
- Reflect on how technology makes you feel

**3. Curate Your Digital Environment**
- Unfollow accounts that make you feel bad
- Use social media mindfully
- Choose quality over quantity in content consumption
- Create positive online experiences

**4. Prioritize Real-World Connections**
- Schedule regular face-to-face interactions
- Engage in offline hobbies and activities
- Practice active listening in conversations
- Build meaningful relationships

**5. Use Technology for Mental Health**
- Meditation and mindfulness apps
- Mood tracking applications
- Sleep optimization tools
- Stress management resources

**Signs of Unhealthy Technology Use**

Watch for these warning signs:
- Feeling anxious when separated from devices
- Neglecting real-world relationships
- Difficulty concentrating without technology
- Sleep problems due to screen time
- Using technology to escape negative emotions

**Building Digital Resilience**

**Develop Critical Thinking**:
- Question information sources
- Recognize manipulation tactics
- Understand algorithm influence
- Practice media literacy

**Maintain Perspective**:
- Remember that social media shows curated content
- Focus on your own journey and progress
- Avoid comparing yourself to others
- Celebrate small wins and progress

**Seek Professional Help When Needed**:
- Don't hesitate to reach out to mental health professionals
- Use technology to access therapy and support
- Join support groups and communities
- Practice self-compassion and patience

**The Future of Digital Mental Health**

Emerging technologies offer promising solutions:
- AI-powered mental health assessments
- Virtual reality therapy
- Wearable devices for mood tracking
- Personalized mental health interventions

**Creating a Healthy Digital Lifestyle**

The goal isn't to eliminate technology but to use it in ways that enhance rather than detract from our mental health. By being mindful, setting boundaries, and prioritizing our well-being, we can harness the benefits of technology while minimizing its negative impacts.

Remember, it's okay to take breaks, disconnect, and focus on your mental health. In our hyperconnected world, sometimes the most radical act is simply being present in the moment, without any device in hand.`,
    author: "Dr. Lisa Park",
    category: "Health",
    tags: [
      "Mental Health",
      "Technology",
      "Wellness",
      "Digital Wellness",
      "Psychology",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
    ],
    status: "published",
    publishedAt: new Date("2024-01-03"),
    views: 2750,
  },
];

// Function to seed the database
async function seedArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing articles (optional - remove this if you want to keep existing articles)
    await Article.deleteMany({});
    console.log("Cleared existing articles");

    // Insert sample articles
    const insertedArticles = await Article.insertMany(sampleArticles);
    console.log(`Successfully inserted ${insertedArticles.length} articles`);

    // Display inserted articles
    insertedArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} - ${article.category}`);
    });

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedArticles();
