import { NextResponse } from 'next/server';
import { mockLiveFeed } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockLiveFeed);
}
