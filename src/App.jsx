import {useEffect,useState} from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { VscSave } from "react-icons/vsc"
export default function App(){
  const [editForm, setEditForm] = useState(false)
  const [names, setNames] = useState([])
  const [hiddenID, setHiddenID] = useState('')
  const [submitText, setSubmitText] = useState(<FaPlusCircle />)
  const getNames = ()=>{
    fetch('/api/names')
      .then(res=>res.json())
      .then(json=>setNames(json))
      .catch(err=>console.log(err))
  }
  const deleteName = async (id)=>{
    await fetch(`/api/names/${id}`, {method:'DELETE'})
            .then(console.log('Deleted from Database'))
            .then(async()=> await getNames())
            .catch(err=>console.log(err))
  }
  useEffect(()=> getNames(),[])
  async function addName(formData){
    await fetch('/api/names', { method:'POST',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  firstName: formData.get('firstName'),
                                  lastName: formData.get('lastName')
                                })
          })
      .then(console.log('Submitted to Database'))
      .then(async()=>await getNames())
      .catch(err=>console.log(err))
  }
  async function updateName(formData){
    console.log(formData.get('id'))
    console.log(formData.get('firstName'))
    console.log(formData.get('lastName'))
    await fetch(`/api/names/${formData.get('id')}`, { method:'PUT',
                                headers:{'Content-Type':'application/json'},
                                body: JSON.stringify({
                                  firstName: formData.get('firstName'),
                                  lastName:formData.get('lastName')
                                })
    })
      .then(console.log('Name Updated'))
      .then(setEditForm(false))
      .then(async()=>await getNames())
      .catch(err=>console.log(err))
  }
  function updateForm(id,firstName,lastName){
    setHiddenID(id)
    document.querySelector('#first-name').value = firstName;
    document.querySelector('#last-name').value = lastName;
    setEditForm(true)
  }
  return(
    <>
      <form action={ editForm ? updateName : addName}>
        <input type='hidden' id='id' name='id' value={hiddenID} />
        <label>
          First Name:
          <input id='first-name' name='firstName' placeholder='John' type='text' />
        </label>
        <label>
          Last Name:
          <input id='last-name' name='lastName' placeholder='Smith' type='text' />
        </label>
        <button style={ editForm ? { background:'blue'} : {background:'black'}}>
          {editForm ? <><VscSave /> Save Changes</> : <><FaPlusCircle /> Add Name</>}
        </button>      
      </form>
      {names.map(data=>{
        return(
          <div key={data._id}>{data.firstName} {data.lastName} 
            <i  className="fa-solid fa-trash-can" 
                onClick={()=>deleteName(data._id)}></i>
            <i  className="fa-solid fa-pen"
                onClick={()=>updateForm(data._id,data.firstName,data.lastName)}></i>      
          </div>
        )
      })}
    </>
  )
}
