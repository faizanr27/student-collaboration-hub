import React, { useState } from 'react';

const Event = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Event 1', date: '2023-12-15', type: 'upcoming' },
    { id: 2, title: 'Event 2', date: '2023-11-01', type: 'past' },
    // Add more events to the list
  ]);

  const upcomingEvents = events.filter((event) => event.type === 'upcoming');
  const pastEvents = events.filter((event) => event.type === 'past');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-500">{event.date}</p>
            <p className="text-blue-500">Upcoming Event</p>
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold my-8">Past Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastEvents.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-500">{event.date}</p>
            <p className="text-gray-500">Past Event</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
