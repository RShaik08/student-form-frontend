import React, { useState } from 'react';
import './Form.css';
const skillOptions = ['JavaScript', 'React', 'Node', 'CSS', 'HTML'];

const Form = () => {
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState([]);

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (e.target.checked) {
      setSkills([...skills, skill]);
    } else {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      rollno,
      gender,
      skills,
    };

    try {
      const response = await fetch('https://student-form-ddnw.onrender.com/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('Student added:', data);
        alert('Student added successfully!');
        // Reset form fields
        setName('');
        setRollno('');
        setGender('');
        setSkills([]);
      } else {
        console.log('Failed to add student. Status:', response.status);
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ marginBottom: '12px' }}>
        <label>Name:</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Roll Number:</label><br />
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Gender:</label><br />
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Male
        </label>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === 'Other'}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Other
        </label>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Skills:</label><br />
        {skillOptions.map((skill) => (
          <label key={skill} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={skill}
              checked={skills.includes(skill)}
              onChange={handleSkillChange}
            />
            {skill}
          </label>
        ))}
      </div>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#6BBF59',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
