import { signIn } from './auth';
import { createSampleCharters } from '../src/lib/sampleData';

const run = async () => {
  try {
    // First ensure we're authenticated
    if (!process.env.SUPABASE_AUTH_EMAIL || !process.env.SUPABASE_AUTH_PASSWORD) {
      throw new Error('Please provide SUPABASE_AUTH_EMAIL and SUPABASE_AUTH_PASSWORD environment variables');
    }

    console.log('Authenticating...');
    await signIn(process.env.SUPABASE_AUTH_EMAIL, process.env.SUPABASE_AUTH_PASSWORD);

    console.log('Creating sample charters...');
    const charters = await createSampleCharters();
    console.log('Successfully created sample charters:', charters);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

run();