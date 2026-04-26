import React, { useState, useEffect } from 'react'
import { client } from '../config/supabase'
import { addExpense, removeExpense, updateExpense, setExpense, totalExpense } from '../redux/ExpenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
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

    const total = expense.reduce((acc, curr) => {
        return acc + Number(curr.amount)
    }, 0);

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
        <div
            className="min-h-screen bg-gradient-to-b from-stone-50 to-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <Navbar />

            {/* Main Content */}
            <div className="p-6 md:p-10">
                <div className="w-full mx-auto  space-y-8">

                    {/* Total Card */}
                    <div className="backdrop-blur-xl bg-white/70 border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-300">
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">Total Expense</p>
                        <h1
                            className="text-6xl text-stone-900 tracking-tight"
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                        >
                            ${total}
                        </h1>
                    </div>

                    {/* Form Card */}
                    <div className="backdrop-blur-xl bg-white/70 border border-stone-200 rounded-2xl p-8 shadow-sm space-y-5">
                        <h2
                            className="text-3xl text-stone-900"
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                        >
                            {editData ? "Edit Expense" : "Add New Expense"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Title"
                                className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 hover:border-stone-300 transition-all duration-200"
                            />
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                placeholder="Amount"
                                className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 hover:border-stone-300 transition-all duration-200"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 hover:border-stone-300 transition-all duration-200"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 hover:border-stone-300 transition-all duration-200"
                            />
                        </div>

                        <button
                            onClick={editData ? handleUpdate : handleSubmit}
                            className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-white font-medium tracking-wide rounded-xl px-6 py-3.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                        >
                            {editData ? "Update Expense" : "Add Expense"}
                        </button>
                    </div>

                    {/* Expense List */}
                    <div className="backdrop-blur-xl bg-white/70 border border-stone-200 rounded-2xl p-8 shadow-sm">
                        <h2
                            className="text-3xl text-stone-900 mb-5"
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                        >
                            Recent Expenses
                        </h2>
                        <ul className="space-y-3">
                            {expense.map((exp) => (
                                <li
                                    key={exp.id}
                                    className="group bg-white/50 border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:border-stone-300 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex-1">
                                        <p
                                            className="text-stone-900 text-xl"
                                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                                        >
                                            {exp.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block px-2.5 py-0.5 bg-stone-100 text-stone-600 rounded-md text-xs font-medium tracking-wide">
                                                {exp.category}
                                            </span>
                                            <span className="text-stone-700 font-medium">${exp.amount}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => editExpense(exp)}
                                            className="px-4 py-2 bg-white border border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-700 rounded-lg text-sm font-medium transition-all duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteExpense(exp.id)}
                                            className="px-4 py-2 bg-white border border-stone-200 hover:border-red-500 hover:bg-red-500 hover:text-white text-stone-700 rounded-lg text-sm font-medium transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );



}

export default Home





