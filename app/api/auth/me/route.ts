import { NextRequest, NextResponse } from 'next/server';
import { getAuthAdmin } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const authData: any = getAuthAdmin(req);
    
    if (!authData || !authData.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const adminUser = await db.admin_users.findUnique({
      where: { id: authData.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: adminUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
