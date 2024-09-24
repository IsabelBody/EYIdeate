import eventsData from '../../../_data/events.json';

const EventsPage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 pt-20"> {/* Adjust pt-20 as needed */}
      <h1 className="text-3xl font-semibold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`/img/${event.image}`} // Adjust the path based on your project structure
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500">Duration: {event.time} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EventsPage;
