import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const testPassword = 'testPassword123';
    const saltRounds = 12;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, saltRounds);
    
    // Verify the password
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    
    return Response.json({ 
      success: true,
      message: 'bcrypt is working correctly!',
      hashedPassword,
      isMatch,
      original: testPassword
    });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: 'bcrypt test failed',
      details: error.message 
    }, { status: 500 });
  }
}
