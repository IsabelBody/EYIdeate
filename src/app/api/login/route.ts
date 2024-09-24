import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { username, password } = await req.json(); // Get the JSON data from the request

  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), '_data', 'users.json');

  // Read the current data from the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const usersData = JSON.parse(jsonData);

  // Find the user
  const user = usersData.users.find((user: any) => user.username === username);

  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }

  // Successful login
  return NextResponse.json({ message: 'Login successful!' });
}
