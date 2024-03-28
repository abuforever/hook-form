import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux/selectors";
import { addUser, setUsers } from "./redux/user-slice";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const users = useAppSelector("users");
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState(null);

  const onSubmit = (data) => {
    if (editingIndex) {
      const newData = users?.map((item) => {
        if (item?.id === editingIndex) {
          return data;
        }
        return item;
      });
      dispatch(setUsers(newData));
    } else {
      data.id = Math.floor(Math.random() * 1000) + users?.length;
      dispatch(addUser(data));
    }
    setEditingIndex(null);
    reset();
  };

  const deleteItem = (id) => {
    const updatedData = users?.filter((item) => item?.id !== id);
    localStorage.setItem("key", JSON.stringify(updatedData));
  };

  const editItem = (id) => {
    const isItem = users?.find((item) => item?.id === id) || {};
    Object.keys(isItem).forEach((key) => {
      setValue(key, isItem[key]);
    });
    setEditingIndex(id);
  };

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

        <input type="submit" value={editingIndex ? "Tahrirlash" : "Qo'shish"} />
        {editingIndex ? (
          <input
            type="button"
            value={"Ortga"}
            onClick={() => {
              setEditingIndex(null);
              reset();
            }}
          />
        ) : null}
      </form>
      <div className="rezult">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Ism</th>
              <th>Kaloriya</th>
              <th>Yog'</th>
              <th>Karbohydratlar</th>
              <th>Proteins</th>
              <th>Tahrirlash/O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {users?.length
              ? users?.map((item) => (
                  <tr key={item?.id}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.calories}</td>
                    <td>{item?.fat}</td>
                    <td>{item?.carbs}</td>
                    <td>{item?.protein}</td>
                    <td>
                      <button
                        onClick={() => editItem(item?.id)}
                        className="editbtn"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => deleteItem(item?.id)}
                        className="deletebtn"
                      >
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
