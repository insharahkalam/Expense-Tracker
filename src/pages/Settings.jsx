// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";


// function Settings() {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         getUserData();
//     }, []);

//     const getUserData = async () => {
//         try {
//             // current logged-in user
//             const { data: { user } } = await client.auth.getUser();

//             if (!user) return;

//             // tumhari table se data lao (name + image)
//             const { data, error } = await client
//                 .from("expense-userdata") // 👈 apni table ka naam check kar lena
//                 .select("*")
//                 .eq("user_id", user.id)
//                 .single();

//             if (error) {
//                 console.log("Fetch error:", error.message);
//                 return;
//             }

//             setUserData({
//                 email: user.email,
//                 username: data?.name,
//                 avatar: data?.profile_pic
//             });

//         } catch (err) {
//             console.log(err.message);
//         }
//     };



//     return (
//         <div
//             className="min-h-screen bg-gradient-to-b from-stone-50 to-white"
//             style={{ fontFamily: "'Inter', sans-serif" }}
//         >
//             {/* Top bar */}
//             <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-stone-200">
//                 <div className="w-full mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

//                     <Link to="/home" className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
//                             <span className="text-white font-bold text-sm">E</span>
//                         </div>
//                         <span className="text-xl text-stone-900 font-semibold">
//                             Expense_Tracker
//                         </span>
//                     </Link>

//                     <Link
//                         to="/home"
//                         className="text-sm border border-gray-200 px-6 py-2 rounded-xl text-stone-700 hover:text-stone-900 font-medium"
//                     >
//                         ← Back
//                     </Link>

//                 </div>
//             </nav>

//             <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">

//                 {/* Heading */}
//                 <div>
//                     <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">
//                         Account
//                     </p>

//                     <h1 className="text-5xl text-stone-900 font-semibold">
//                         Settings
//                     </h1>

//                     <p className="text-stone-600 mt-2">
//                         Manage your profile information and preferences.
//                     </p>
//                 </div>

//                 {/* FORM */}
//                 <form

//                     className="backdrop-blur-xl bg-white/70 border border-stone-200 rounded-2xl p-8 shadow-sm space-y-8"
//                 >

//                     {/* Avatar */}
//                     <div className="flex items-center gap-6">

//                         <div className="relative">

//                             <img
//                                 src={userData?.avatar}
//                                 alt="Profile"
//                                 className="w-10 h-10 rounded-full border-2 border-stone-200 object-cover"
//                             />

//                             <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
//                         </div>

//                         <div>
//                             <h3 className="text-xl font-semibold text-stone-900">
//                                 Profile Picture
//                             </h3>

//                             <p className="text-sm text-stone-500">
//                                 JPG, PNG or GIF. Max 5MB.
//                             </p>

//                             <div className="flex gap-2 mt-2">

//                                 <button
//                                     type="button"

//                                     className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm"
//                                 >
//                                     Upload new
//                                 </button>

//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         setAvatar("https://i.pravatar.cc/200?img=12")
//                                     }
//                                     className="px-4 py-2 bg-white border border-stone-200 hover:border-stone-900 text-stone-700 rounded-lg text-sm"
//                                 >
//                                     Reset
//                                 </button>

//                             </div>

//                             <input

//                                 type="file"
//                                 accept="image/*"

//                                 className="hidden"
//                             />
//                         </div>
//                     </div>

//                     <hr className="border-stone-200" />

//                     {/* NAME */}
//                     <div>
//                         <label className="text-sm text-stone-700 font-medium">
//                             Full Name
//                         </label>

//                         <input
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-stone-900/10 outline-none"
//                             placeholder="Your name"
//                         />
//                     </div>

//                     {/* EMAIL */}
//                     <div>
//                         <label className="text-sm text-stone-700 font-medium">
//                             Email
//                         </label>

//                         <input
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-stone-900/10 outline-none"
//                             placeholder="you@example.com"
//                         />
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="flex justify-between items-center ">

//                         <span className={`text-sm ${saved ? "text-green-600" : "opacity-0"}`}>
//                             ✓ Saved
//                         </span>

//                         <div className="flex gap-3">

//                             <Link

//                                 className="px-4 py-2 border rounded-lg text-sm"
//                             >
//                                 Cancel
//                             </Link>

//                             <Link to={'/home'}>
//                                 <button
//                                     type="submit"
//                                     className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
//                                 >
//                                     Save
//                                 </button>
//                             </Link>
//                         </div>

//                     </div>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Settings;





import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { client } from "../config/supabase";
import { useNavigate } from "react-router-dom";



function Settings() {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [saved, setSaved] = useState(false);
    const fileRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, []);

    // ✅ GET USER DATA
    const getUserData = async () => {
        try {
            const { data: { user } } = await client.auth.getUser();
            if (!user) return;

            const { data, error } = await client
                .from("expense-userdata")
                .select("*")
                .eq("user_id", user.id)
                .single();

            if (error) {
                console.log(error.message);
                return;
            }

            setUserData(data);
            setName(data?.name || "");
            setEmail(user.email || "");
            setAvatar(data?.profile_pic);

        } catch (err) {
            console.log(err.message);
        }
    };

    // ✅ IMAGE UPLOAD
    const handleImageUpload = async (file) => {
        try {
            const fileName = `${Date.now()}-${file.name}`;

            const { error } = await client.storage
                .from("profiles") // 👈 bucket name
                .upload(fileName, file);

            if (error) {
                console.log(error.message);
                return;
            }

            const { data } = client.storage
                .from("profiles")
                .getPublicUrl(fileName);

            setAvatar(data.publicUrl);

        } catch (err) {
            console.log(err.message);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const { data: { user } } = await client.auth.getUser();

            const { error } = await client
                .from("expense-userdata")
                .update({
                    name: name,
                    profile_pic: avatar
                })
                .eq("user_id", user.id);

            if (error) {
                console.log(error.message);
                return;
            }

            // ✅ localStorage me save karo (important)
            const updatedUser = {
                name,
                email,
                profile_pic: avatar
            };

            localStorage.setItem("userData", JSON.stringify(updatedUser));

            setSaved(true);

            // ✅ thoda delay + navigate
            setTimeout(() => {
                navigate("/home");
            }, 800);

        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">

            {/* NAV */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-stone-200">
                <div className="w-full mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

                    <Link to="/home" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="text-xl text-stone-900 font-semibold">
                            Expense_Tracker
                        </span>
                    </Link>

                    <Link
                        to="/home"
                        className="text-sm border border-gray-200 px-6 py-2 rounded-xl text-stone-700 hover:text-stone-900 font-medium"
                    >
                        ← Back
                    </Link>

                </div>
            </nav>

            <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">

                {/* HEADING */}
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">
                        Account
                    </p>
                    <h1 className="text-5xl text-stone-900 font-semibold">
                        Settings
                    </h1>
                    <p className="text-stone-600 mt-2">
                        Manage your profile information and preferences.
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSave}
                    className="backdrop-blur-xl bg-white/70 border border-stone-200 rounded-2xl p-8 shadow-sm space-y-8"
                >

                    {/* AVATAR */}
                    <div className="flex items-center gap-6">

                        <div className="relative">
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border-2 border-stone-200 object-cover"
                            />
                            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-stone-900">
                                Profile Picture
                            </h3>

                            <p className="text-sm text-stone-500">
                                JPG, PNG or GIF. Max 5MB.
                            </p>

                            <div className="flex gap-2 mt-2">

                                <button
                                    type="button"
                                    onClick={() => fileRef.current.click()}
                                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm"
                                >
                                    Upload new
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setAvatar("https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80")}
                                    className="px-4 py-2 bg-white border border-stone-200 hover:border-stone-900 text-stone-700 rounded-lg text-sm"
                                >
                                    Reset
                                </button>

                            </div>

                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <hr className="border-stone-200" />

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-stone-700 font-medium">
                            Full Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-stone-900/10 outline-none"
                            placeholder="Your name"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-stone-700 font-medium">
                            Email
                        </label>

                        <input
                            value={email}
                            disabled
                            className="w-full mt-2 p-3 border rounded-xl bg-gray-100 outline-none"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center">

                        <span className={`text-sm ${saved ? "text-green-600" : "opacity-0"}`}>
                            ✓ Saved
                        </span>

                        <div className="flex gap-3">

                            <Link
                                to="/home"
                                className="px-4 py-2 border rounded-lg text-sm"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default Settings;
