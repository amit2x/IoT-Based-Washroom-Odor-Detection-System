import { NextResponse } from 'next/server';
import { mockReports } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockReports);
}
