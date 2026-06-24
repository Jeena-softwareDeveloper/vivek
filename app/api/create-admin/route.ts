import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const email = 'admin@vivekvijayandcompany.com';
    const plainPassword = 'AdminPassword123!';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingUser = await AdminUser.findOne({ email });

    if (existingUser) {
      await AdminUser.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );
      return NextResponse.json({ success: true, message: 'Admin password reset to AdminPassword123!' });
    } else {
      await AdminUser.create({
        name: 'Super Admin',
        email,
        password: hashedPassword,
        role: 'admin'
      });
      return NextResponse.json({ success: true, message: 'Admin created with password AdminPassword123!' });
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
