import React, { useState, useEffect } from 'react'
import { client } from '../config/supabase'
import { addExpense, removeExpense, updateExpense, setExpense } from '../redux/ExpenseSlice'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
    const dispatch = useDispatch()
    const expense = useSelector(state => state.expense.list)
    console.log(expense);
    const categories = ["Food & Drinks", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState(null);
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await client.auth.getUser();

            if (error) {
                console.log(error.message);
            } else {
                setUser(data.user);
            }
        };
        getUser();
    }, []);


    const handleSubmit = async () => {
        const { data, error } = await client
            .from('expense-tracker')
            .insert([{ user_id: user.id, title, amount, category, date }])
            .select();
        if (error) {
            console.log(error, "insert error===>");
        } else {
            dispatch(addExpense(data[0]))

            alert('insert successfully!!')
            setAmount('')
            setTitle('')
            setCategory('')
            setDate('')
        }
    }

    useEffect(() => {
        if (!user) return;
        const fetchExpenses = async () => {
            const { data, error } = await client
                .from("expense-tracker")
                .select("*")
                .eq("user_id", user.id)
                .order("date", { ascending: false });
            if (error) {
                console.log(error);
            } else {
                dispatch(setExpense(data));
            }
        };
        fetchExpenses();
    }, [user]);

    const deleteExpense = async (id) => {
        const { error } = await client
            .from("expense-tracker")
            .delete()
            .eq("id", id);
        if (!error) {
            dispatch(removeExpense(id))
        } else {
            console.log(error, 'delete error');
        }
    }

    const editExpense = (exp) => {
        console.log(exp, "edit click ho rha hai ");
        setEditData(exp)
        setTitle(exp.title)
        setAmount(exp.amount)
        setDate(exp.date)
        setCategory(exp.category)
    }


    const handleUpdate = async () => {
        const { data, error } = await client
            .from("expense-tracker")
            .update({ title, amount, category, date })
            .eq("id", editData.id)
            .select()

        if (!error) {
            dispatch(updateExpense(data[0]))
            setEditData(null);                 // Edit mode off
            setTitle("");                       // Form reset
            setAmount("");
            setCategory("");
            setDate("");
            console.log(data[0], "updated success!!");
        } else {
            console.log(error, "updated error");
        }

    }




    return (
        <>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='border rounded-xl px-5 py-2 text-2xl font-bold' type="text" placeholder='Title' />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className='border rounded-xl px-5 py-2 text-2xl font-bold' type="number" placeholder='amount' />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-xl px-5 py-2 text-2xl font-bold"
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <input className='border rounded-xl px-5 py-2 text-2xl font-bold' type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <button className='border rounded-xl px-5 py-2 text-2xl font-bold' onClick={handleSubmit}>Add Expence</button>

            <div>
                <ul>
                    {expense.map(exp => (
                        <li key={exp.id}>
                            {exp.title} - {exp.amount} - {exp.category}
                            <button className='border rounded-xl px-5 py-2 text-2xl font-bold' onClick={() => deleteExpense(exp.id)}>Delete</button>
                            {editData?.id === exp.id ? (<button className='border rounded-xl px-5 py-2 text-2xl font-bold' onClick={handleUpdate}>Update</button>) :
                                (<button className='border rounded-xl px-5 py-2 text-2xl font-bold' onClick={() => editExpense(exp)}>Edit</button>)}

                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home