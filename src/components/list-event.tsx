// ListEvent.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../models/event.model';
import { HttpResponse } from '../models/http-response.model';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  };


const ListEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {

      const baseUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(baseUrl+'/v1/events');
      const json: HttpResponse<{ events: Event[] }> = await response.json();
      if (json.code === 200) {
        setEvents(json.data.events);
      } else {
        console.error('Failed to fetch events:', json.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mt-3">
  <div className="">
    <Link to="/add" className="btn btn-primary">Ajouter un événement</Link>
  </div>
  {/* Centrer le tableau avec une largeur définie */}
  <div className="table-responsive mx-auto" style={{ maxWidth: '800px' }}>
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Date de début</th>
          <th>Date de fin</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>
            <Link to={`/event/${event.id}`} className="text-decoration-none">
    {event.name}
  </Link>
            </td>
            <td>{event.description}</td>
            <td>{formatDate(event.startDate)}</td>
            <td>{formatDate(event.endDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {events.length === 0 && <p className="text-center">Aucun événement à afficher</p>}
</div>


  );
};

export default ListEvent;
