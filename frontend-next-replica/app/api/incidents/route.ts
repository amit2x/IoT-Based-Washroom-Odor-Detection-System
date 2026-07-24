import { NextResponse } from 'next/server';
import { mockIncidents } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockIncidents);
}
