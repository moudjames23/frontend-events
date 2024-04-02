import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic here
    const formErrors = {};
    if (!formData.name) formErrors.name = 'Le nom est obligatoire';
    if (formData.name.length > 32) formErrors.name = 'Le nom doit contenir maximum 32 caractères';
    if (!formData.description) formErrors.description = 'La description est obligatoire';
    if (!formData.startDate) formErrors.startDate = 'La date de début est obligatoire';
    if (!formData.endDate) formErrors.endDate = 'La date de fin est obligatoire';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      formErrors.endDate = 'La date de fin ne doit pas être inférieure à la date de début';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Add timezone to dates
    const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOStartDate = new Date(new Date(formData.startDate).getTime() - timezoneOffset).toISOString().slice(0, -1);
    const localISOEndDate = new Date(new Date(formData.endDate).getTime() - timezoneOffset).toISOString().slice(0, -1);

    // API call here
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          startDate: localISOStartDate,
          endDate: localISOEndDate,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/'); // Redirect to ListEvent
      } else {
        setErrors(data.errors || {});
      }
    } catch (error) {
      console.error('Failed to submit event', error);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un événement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="invalid-feedback">{errors.description}</div>
        </div>
        {/* Date pickers for startDate and endDate */}
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Date de début</label>
          <input
            type="datetime-local"
            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.startDate}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Date de fin</label>
          <input
            type="datetime-local"
            className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.endDate}</div>
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
};

