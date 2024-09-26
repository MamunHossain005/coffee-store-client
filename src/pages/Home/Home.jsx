import { Link, useLoaderData } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Home = () => {
    const loadedCoffees = useLoaderData();
    const [coffees, setCoffees] = useState(loadedCoffees);
    const { user, setSuccessText, setErrorText, logoutUser } = useContext(AuthContext);

    const MySwal = withReactContent(Swal);

    const handleDelete = id => {
        MySwal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Are you sure that you want to delete it?",
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: 'red',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/coffees/${id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                MySwal.fire({
                                    icon: 'success',
                                    title: 'Good Luck!!!',
                                    text: 'Deleted Coffee details',
                                    confirmButtonText: 'Ok'
                                });

                                const newCoffees = coffees.filter(coffee => coffee._id !== id);
                                setCoffees(newCoffees);
                            }
                        })
                }
                else if (result.dismiss === MySwal.DismissReason.cancel) {
                    MySwal.fire({
                        icon: 'error',
                        text: 'Coffee is not deleted',
                        confirmButtonText: 'Ok',
                    })
                }
            })
    }

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                setSuccessText('User logged out successfully');
            })
            .catch(error => {
                setErrorText(error.message);
            })
    }

    return (
        <div className="container mx-auto text-center mt-12">
            <div className="text-right mb-8">
                {
                    user?
                        <button className="btn btn-accent hover:text-emerald-600 hover:bg-white hover:font-bold" onClick={handleLogout}>Logout</button>
                        :
                        <Link to={"/login"}>
                            <button className="btn btn-accent hover:text-emerald-600 hover:bg-white hover:font-bold">Login</button>
                        </Link>
                }
            </div>
            <h1 className="text-2xl font-bold mb-3">Our Popular Products</h1>
            <Link to={"/addCoffee"}><button className="btn bg-[#e3b577] px-3 py-1 rounded-lg hover:outline hover:outline-1 hover:outline-[#e3b577] hover:text-[#e3b577] hover:bg-white">Add coffee</button></Link>
            <div className="grid grid-cols-2 gap-5 my-10">
                {
                    coffees.map(coffee =>
                    (<div key={coffee._id} className="flex items-center justify-between p-10 bg-gray-100 rounded-lg">
                        <img src={coffee.photo} alt="" className="w-1/3 " />
                        <div className="space-y-3">
                            <p><span className="font-bold mr-1">Name:</span> {coffee.name}</p>
                            <p><span className="font-bold mr-1">Chef:</span> {coffee.chef}</p>
                            <p><span className="font-bold mr-1">Taste:</span> {coffee.taste}</p>
                        </div>
                        <div>
                            <div className="p-2 bg-[#e3b577] rounded-lg hover:outline block mb-4"><MdRemoveRedEye className="fill-white" /></div>
                            <Link to={`/updateCoffee/${coffee._id}`}>
                                <div className="p-2 bg-[#e3b577] rounded-lg hover:outline block mb-4"><MdEdit /></div>
                            </Link>
                            <button className="p-2 bg-[#e3b577] rounded-lg hover:outline block" title="Delete" onClick={() => handleDelete(coffee._id)}><MdDelete className="fill-red-600" /></button>
                        </div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default Home;