import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const email = 'admin@vivekvijayandcompany.com';
    const plainPassword = 'AdminPassword123!';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingUser = await db.admin_users.findUnique({ where: { email } });

    if (existingUser) {
      await db.admin_users.update({
        where: { email },
        data: { password: hashedPassword }
      });
      return NextResponse.json({ success: true, message: 'Admin password reset to AdminPassword123!' });
    } else {
      await db.admin_users.create({
        data: {
          name: 'Super Admin',
          email,
          password: hashedPassword,
          role: 'admin'
        }
      });
      return NextResponse.json({ success: true, message: 'Admin created with password AdminPassword123!' });
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
