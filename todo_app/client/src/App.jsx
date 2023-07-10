import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [id, setId] = useState([]);
  const [edit, setEdit] = useState({});
  const [update, setUpdate] = useState('');
  const [category, setCategory] = useState('');
  const [datalist, setDataList] = useState([]);
  const [categoryDataList, setCategoryDataList] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {

    async function alldata() {

      let data = await axios.get('http://localhost:8000/alltodo');
      let categoryData = await axios.get('http://localhost:8000/allcategory');

      setDataList(data.data);
      setCategoryDataList(categoryData.data);

    }

    alldata();

  }, [active]);

  let handleSubmit = async () => {

    let data = await axios.post('http://localhost:8000/addtodo', {
      name: text,
      category: id,
    });

    setActive(!active);
    setText('');

    console.log(data);

  }

  // Create Category
  let handleCategory = async () => {

    let categoryData = await axios.post('http://localhost:8000/createcategory', {
      name: category,
    });

    setActive(!active);
    setCategory('');
    console.log(categoryData);

  }

  let handleId = (e) => {

    setId(e.target.value);

  }

  // Edit 
  let handleEdit = (item) => {
    setEdit(item);
  }

  // Update
  let handleUpdate = async () => {

    let data = await axios.post('http://localhost:8000/edit', {
      id: edit._id,
      name: edit.name
    });

    setActive(!active);

    console.log(data)

  }

  // Delete
  let handleDelete = async (item) => {

    let data = await axios.post('http://localhost:8000/delete', {
      id: item._id,
    });

    setActive(!active);

  }

  return (
    <>
      <h1>Create Category</h1>
      <input onChange={(e) => setCategory(e.target.value)} value={category} />
      <button onClick={handleCategory}>Create</button>

      <h2>Todo</h2>
      <input onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={handleSubmit}>Submit</button>

      <select onClick={handleId}>
        <option>Select Category</option>
        {categoryDataList.map((item) => (
          <option value={item._id}>{item.name}</option>
        ))}
      </select>

      <h2>Todo List</h2>
      {datalist.map((item) => (
        <li>{item.name} -- <small>{item.category.name}</small>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item)}>Delete</button>
        </li>
      ))}

      <h2>Edit List</h2>
      <input onChange={(e) => setEdit({ ...edit, name: e.target.value })} value={edit.name} />
      <button onClick={handleUpdate}>Update</button>

    </>
  )
}

export default App;
