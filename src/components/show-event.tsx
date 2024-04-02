// ShowEvent.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpResponse } from '../models/http-response.model';
import { Event } from '../models/event.model';

export const ShowEvent: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/events/${eventId}`);
      const json: HttpResponse<{ event: Event }> = await response.json();
      if (json.code === 200) {
        setEvent(json.data.event);
      } else {
        console.error('Failed to fetch event:', json.message);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>chargement...</div>;
  }

  return (
    <div className="container my-3 p-3 shadow-sm" style={{ marginTop: '20px', padding: '20px' }}>
  <h1 className="display-4">
    {event.name}
  </h1>
  <p className="mb-2">
    {event.description}
  </p>
  <p>
    Début: {new Date(event.startDate).toLocaleString('fr-FR')}
  </p>
  <p>
    Fin: {new Date(event.endDate).toLocaleString('fr-FR')}
  </p>
</div>

  );
};

