import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

export async function testDatabaseConnection() {
  try {
    await sql`SELECT 1`;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testDatabaseConnection();