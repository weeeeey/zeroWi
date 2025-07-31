import { RequestRoutineFormData } from '@/types/routine';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: RequestRoutineFormData = await req.json();
    console.log(data);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 401 });
    }
    return NextResponse.json('internal error', { status: 500 });
  }
}
