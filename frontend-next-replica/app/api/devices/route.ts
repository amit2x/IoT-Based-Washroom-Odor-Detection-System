import { NextResponse } from 'next/server';
import { mockDevices } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockDevices);
}
