import { useState } from "react";
import { useEffect } from "react";

import { auth } from "../../firebaseConnection";
import { db } from "../../firebaseConnection";

import { signOut } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { where } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

import "./style.css";

function Dashboard() {
    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState({});


    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem("@detailUser");

            setUser(JSON.parse(userDetail));

            if (userDetail) {
                const data = JSON.parse(userDetail);
                const taskRef = collection(db, "tasks");
                const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unSub = onSnapshot(q, (snapshot) => {
                    let list = [];

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid,
                        })
                    })

                    setTasks(list);
                })
            }
        }

        loadTasks();
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

       if (taskInput === '') {
           alert("Write your task!");

           return;
       }

       if (edit?.id) {
           handleUpdateTask();

           return;
       }

       await addDoc(collection(db, "tasks"), {
           task: taskInput,
           created: new Date(),
           userUid: user?.uid
       })
       .then(() => {
            setTaskInput('');
       })
       .catch((error) => {
           console.log("Error in task creation " + error);
       })
    }

    async function handleLogOut() {
        await signOut(auth);
    }

    async function deleteTask(id) {
        const docRef = doc(db, "tasks", id);

        await deleteDoc(docRef);
    }

    function editTask(item) {
        setTaskInput(item.task);
        setEdit(item);
    }

    async function handleUpdateTask() {
        const docRef = doc(db, "tasks", edit?.id);

        await updateDoc(docRef, {
            task: taskInput,
        })
        .then(() => {
            setTaskInput('');
            setEdit({});
        })
        .catch(() => {
            setTaskInput('');
            setEdit({});
        })
    }

    return (
        <div className="dashboard-container">
            <h1>My Tasks</h1>

            <form className="form" onSubmit={handleRegister}>
                <textarea
                    placeholder="Write your task here."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />

                { Object.keys(edit).length > 0 ? (
                    <button className="btn-create" type="submit"> Update Task</button>
                ) : (
                    <button className="btn-create" type="submit"> Create Task</button>
                )}
            </form>

            { tasks.map((item) => (
                <article className="list" key={item.id}>
                    <p> { item.task } </p>

                    <div>
                        <button onClick={() => editTask(item)}> Edit </button>
                        <button onClick={() => deleteTask(item.id)} className="btn-done">Done</button>
                    </div>
                </article>
            )) }

            <button className="btn-logout" onClick={handleLogOut}>Log Out</button>
        </div>
    );
}

export default Dashboard;