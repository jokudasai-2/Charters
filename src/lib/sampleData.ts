import { supabase } from './supabase';
import type { CreateCharterData } from '@/features/charters/types';

const sampleCharters: CreateCharterData[] = [
  {
    title: "Mobile App Push Notification System",
    description: "Implement a sophisticated push notification system for our mobile app to improve user engagement and retention through personalized, timely communications.",
    problem_statement: "Current email-only communication has low open rates (15%) and delayed user responses. Users miss important updates and time-sensitive opportunities.",
    target_user: "Mobile app users across all demographics who have opted into notifications",
    use_cases: [
      { id: crypto.randomUUID(), description: "Deliver real-time order status updates and shipping notifications" },
      { id: crypto.randomUUID(), description: "Send personalized product recommendations based on browsing history" },
      { id: crypto.randomUUID(), description: "Alert users about flash sales and limited-time offers" },
      { id: crypto.randomUUID(), description: "Notify users about account security events (login attempts, password changes)" }
    ],
    business_case: "Projected 40% increase in user engagement, 25% improvement in retention rates, and 20% increase in conversion rates for promoted items",
    risks: "Risk: User notification fatigue → Mitigation: Implement AI-driven frequency capping and preference learning\nRisk: Privacy concerns → Mitigation: Clear opt-in/opt-out controls and transparent data usage policies\nRisk: Technical delivery failures → Mitigation: Multi-provider failover system and robust delivery monitoring"
  },
  {
    title: "Internal Knowledge Base Modernization",
    description: "Replace our outdated wiki system with a modern, searchable knowledge management platform to improve information sharing and reduce duplicate work.",
    problem_statement: "Employees spend average 5.2 hours/week searching for information across multiple disconnected systems. 30% of documented processes are outdated.",
    target_user: "Internal employees, contractors, and department managers",
    use_cases: [
      { id: crypto.randomUUID(), description: "Centralized documentation with version control" },
      { id: crypto.randomUUID(), description: "Advanced search with filters and tags" },
      { id: crypto.randomUUID(), description: "Team-specific spaces with custom permissions" },
      { id: crypto.randomUUID(), description: "Integration with existing tools (Slack, MS Office)" }
    ],
    business_case: "Estimated $450K annual savings in reduced search time, 40% reduction in onboarding time, 60% reduction in duplicate documentation",
    risks: "Risk: Data migration errors → Mitigation: Phased migration with automated validation tools\nRisk: User adoption resistance → Mitigation: Department champions program and training sessions\nRisk: System downtime → Mitigation: Redundant systems and offline access capability"
  },
  {
    title: "Customer Service AI Assistant",
    description: "Deploy an AI-powered assistant to handle routine customer inquiries and support tickets, improving response times and agent efficiency.",
    problem_statement: "Support team handles 10,000+ tickets monthly, with 65% being routine questions. Average response time is 4 hours.",
    target_user: "Customer service agents and customers seeking support",
    use_cases: [
      { id: crypto.randomUUID(), description: "Automated responses to common questions" },
      { id: crypto.randomUUID(), description: "Smart ticket routing based on inquiry type" },
      { id: crypto.randomUUID(), description: "Real-time translation for international customers" }
    ],
    business_case: "Projected 70% reduction in response time, 40% cost savings in support operations, 35% increase in customer satisfaction scores",
    risks: "Risk: Inaccurate responses → Mitigation: Human review system and continuous training\nRisk: Customer frustration with AI → Mitigation: Seamless handoff to human agents when needed\nRisk: Data security concerns → Mitigation: Encrypted communication and strict data handling policies\nRisk: System availability → Mitigation: Multi-region deployment and fallback systems"
  },
  {
    title: "Sustainability Impact Dashboard",
    description: "Create a real-time dashboard tracking company-wide sustainability metrics, carbon footprint, and environmental impact initiatives.",
    problem_statement: "Lack of centralized sustainability data makes it difficult to track progress, report to stakeholders, and identify improvement opportunities.",
    target_user: "Executive team, sustainability officers, and department heads",
    use_cases: [
      { id: crypto.randomUUID(), description: "Real-time tracking of carbon emissions" },
      { id: crypto.randomUUID(), description: "Department-level sustainability scorecards" },
      { id: crypto.randomUUID(), description: "Automated ESG reporting generation" },
      { id: crypto.randomUUID(), description: "Initiative impact simulation tools" }
    ],
    business_case: "Enhanced ESG reporting accuracy, 25% improvement in sustainability initiative ROI, strengthened investor relations",
    risks: "Risk: Data accuracy issues → Mitigation: Multi-source validation and regular audits\nRisk: System complexity → Mitigation: Phased rollout with focused KPIs\nRisk: Reporting discrepancies → Mitigation: Standardized calculation methods and third-party verification"
  }
];

export const createSampleCharters = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Please sign in first to create sample charters');
    }

    const results = await Promise.all(
      sampleCharters.map(async (charter) => {
        const { data, error } = await supabase
          .from('documents')
          .insert([{
            title: charter.title,
            description: charter.description,
            problem_statement: charter.problem_statement,
            target_user: charter.target_user,
            use_cases: charter.use_cases.map(uc => uc.description).join('\n'),
            business_case: charter.business_case,
            risks: charter.risks,
            user_id: user.id,
            status: 'draft'
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      })
    );

    return results;
  } catch (error) {
    console.error('Error creating sample charters:', error);
    throw error;
  }
};