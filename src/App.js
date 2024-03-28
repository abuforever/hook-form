import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [newdata, setNewdata] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('key')) || [];
    setNewdata(storedData);
  }, []);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updatedData = [...newdata];
      // updatedData[editingIndex] = data;
      setNewdata(updatedData);
      setEditingIndex(null);
      localStorage.setItem('key', JSON.stringify(updatedData));
      reset();
    } else {
      const updatedData = [...newdata, data];
      setNewdata(updatedData);
      localStorage.setItem('key', JSON.stringify(updatedData));
      reset();
    }
  };

  const deleteItem = (index) => {
    const updatedData = [...newdata];
    // updatedData.splice(index, 1);
    setNewdata(updatedData);
    localStorage.setItem('key', JSON.stringify(updatedData));
  };

  const editItem = (index) => {
    const itemToEdit = newdata[index];
    setEditingIndex(index);
    reset(itemToEdit);
  };

  console.log(newdata);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: true,
            maxLength: 15,
            pattern: /^[A-Za-z]+$/i,
          })}
          placeholder="Ism"
        />
        {errors.name && <p>Raqam qatnashmasin!</p>}

        <input
          {...register("calories", {
            required: true,
            maxLength: 15,
            pattern: /^[0-9]+$/i,
          })}
          placeholder="Kaloriya"
        />
        {errors.calories && <p>Harf qatnashmasin!</p>}

        <input
          {...register("fat", {
            required: true,
            maxLength: 15,
            pattern: /^[0-9]+$/i,
          })}
          placeholder="Yog'"
        />
        {errors.fat && <p>Harf qatnashmasin!</p>}

        <input
          {...register("carbs", {
            required: true,
            maxLength: 15,
            pattern: /^[0-9]+$/i,
          })}
          placeholder="Karbohydratlar"
        />
        {errors.carbs && <p>Harf qatnashmasin!</p>}

        <input
          {...register("protein", {
            required: true,
            maxLength: 15,
            pattern: /^[0-9]+$/i,
          })}
          placeholder="Proteins (g)"
        />
        {errors.protein && <p>Harf qatnashmasin!</p>}

        <input type="submit" value={editingIndex !== null ? "Tahrirlash" : "Qo'shish"} />
      </form>
      <div className="rezult">
        <table>
          <thead>
            <tr>
              <th>Ism</th>
              <th>Kaloriya</th>
              <th>Yog'</th>
              <th>Karbohydratlar</th>
              <th>Proteins</th>
              <th>Tahrirlash/O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {newdata?.length ? newdata?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.calories}</td>
                <td>{item.fat}</td>
                <td>{item.carbs}</td>
                <td>{item.protein}</td>
                <td>
                  <button onClick={() => editItem(index)} className='editbtn'>Tahrirlash</button>
                  <button onClick={() => deleteItem(index)} className='deletebtn'>O'chirish</button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
