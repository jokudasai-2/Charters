import { supabase } from '@/lib/supabase';

export async function sendStakeholderNotification(
  documentId: string,
  stakeholderEmail: string,
  documentTitle: string,
  ownerEmail: string
) {
  try {
    const { error } = await supabase
      .from('email_queue')
      .insert([
        {
          to_address: stakeholderEmail,
          subject: `You've been added as a stakeholder to "${documentTitle}"`,
          content: `
            Hello,

            You have been added as a stakeholder to the charter "${documentTitle}" by ${ownerEmail}.

            You can view and provide feedback on this charter by signing in to the platform.

            Best regards,
            The Charters Team
          `.trim(),
          status: 'pending'
        }
      ]);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error queueing stakeholder notification:', err);
    return false;
  }
}