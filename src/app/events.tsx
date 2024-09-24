// "use client"; // Ensure the component is treated as a Client Component

// import { useState, useEffect } from 'react';
// import { Input } from '@/components/ui/input';
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Avatar } from '@/components/ui/avatar';
// import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

// interface Event {
//   title: string; 
//   image: string; 
//   time: number; 
//   description: string;
//   id: string;
// }

// async function getEvents(): Promise<Event[]> {
//   const result = await fetch('http://localhost:4000/events'); // Update the endpoint to match your events API
//   return result.json();
// }

// async function addEvent(newEvent: Event) {
//   await fetch('http://localhost:4000/events', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newEvent),
//   });
// }

// export default function Home() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [newEvent, setNewEvent] = useState<Event>({
//     title: '', image: '', time: 0, description: '', id: ''
//   });

//   // Fetch events when the component mounts
//   useEffect(() => {
//     async function fetchEvents() {
//       const initialEvents = await getEvents();
//       setEvents(initialEvents);
//     }
//     fetchEvents();
//   }, []); // Empty dependency array to run only on mount

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await addEvent(newEvent);  // Send event to the backend
//     const updatedEvents = await getEvents(); // Get updated list
//     setEvents(updatedEvents);  // Update UI with new event
//     setNewEvent({ title: '', image: '', time: 0, description: '', id: '' }); // Reset form
//   };

//   return (
//     <main>
//       {/* Form to add a new event */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
//         <Input placeholder="Image Name" value={newEvent.image} onChange={(e) => setNewEvent({...newEvent, image: e.target.value})} />
//         <Input placeholder="Time (in mins)" type="number" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: Number(e.target.value)})} />
//         <Input placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} />
//         <Button type="submit">Add Event</Button>
//       </form>

//       {/* Existing events */}
//       <div className="grid grid-cols-3 gap-8 mt-8">
//         {events.map(event => (
//           <Card key={event.id} className="flex flex-col justify-between">
//             <CardHeader className="flex-row gap-4 items-center">
//               <Avatar>
//                 <AvatarImage src={`/img/${event.image}`} alt="event img" />
//                 <AvatarFallback>{event.title.slice(0, 2)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle>{event.title}</CardTitle>
//                 <CardDescription>{event.time} mins</CardDescription>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p>{event.description}</p>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button>View Event</Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </main>
//   );
// }
