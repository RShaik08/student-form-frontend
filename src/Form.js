import React, { useState } from 'react';
import './Form.css'; 

const Form = () => {
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      rollno,
      gender,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
    };

    try {
      const response = await fetch('https://student-form-ddnw.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('Student added:', data);
        setSuccessMessage('Student added successfully!');
        setErrorMessage('');
        // Clear form fields
        setName('');
        setRollno('');
        setGender('');
        setSkills('');
      } else if (response.status === 204) {
        console.log('Request succeeded with no content');
        setSuccessMessage('Student added successfully!');
        setErrorMessage('');
        // Clear form fields
        setName('');
        setRollno('');
        setGender('');
        setSkills('');
      } else {
        console.log('Unexpected response status:', response.status);
        setErrorMessage('Unexpected error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage('Failed to add student. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Roll Number:</label><br />
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label><br />
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Skills (comma separated):</label><br />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      </form>

      {/* Success and error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Form;
