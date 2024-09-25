import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaArrowLeftLong } from "react-icons/fa6";

const AddCoffee = () => {
    const MySwal = withReactContent(Swal);

    const handleAddCoffee = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const chef = form.chef.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = {name, chef, supplier, taste, category, details, photo};
        console.log(newCoffee);

        fetch('http://localhost:5000/coffees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCoffee),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId) {
                MySwal.fire({
                    text: 'Coffee added successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
                form.reset();
            }
        })
    }

    return (
        <div className="container mx-auto bg-[#f4f3f0] mt-12 py-8 rounded-md">
            <Link to={"/"}><div className='flex items-center gap-1 btn btn-ghost w-40 ms-[13%]'><FaArrowLeftLong />Back to home</div></Link>
            <h1 className="text-center text-5xl font-bold mt-12">Add New coffee</h1>
            <p className="text-center max-w-3xl mx-auto mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo nesciunt voluptate doloribus ipsum, tempora praesentium voluptatum dignissimos dolore sunt incidunt soluta iure omnis aliquam nemo veritatis, pariatur ab voluptas distinctio.</p>
            <div className="max-w-4xl mx-auto mt-10">
                <form onSubmit={handleAddCoffee}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="coffeeName" className="mb-1 block font-bold">Name</label>
                            <input type="text" name="name" id="coffeeName" placeholder="Enter coffee name" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="chef" className="mb-1 block font-bold">Chef</label>
                            <input type="text" name="chef" id="chef" placeholder="Enter coffee chef" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="supplier" className="mb-1 block font-bold">Supplier</label>
                            <input type="text" name="supplier" id="supplier" placeholder="Enter coffee supplier" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="taste" className="mb-1 block font-bold">Taste</label>
                            <input type="text" name="taste" id="taste" placeholder="Enter coffee taste" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="category" className="mb-1 block font-bold">Category</label>
                            <input type="text" name="category" id="category" placeholder="Enter coffee category" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="details" className="mb-1 block font-bold">Details</label>
                            <input type="text" name="details" id="details" placeholder="Enter coffee details" className="w-full ps-3 py-1 rounded-md" />
                        </div>
                    </div>
                    <div className="mb-8">
                        <label htmlFor="photo" className="mb-1 block font-bold">Photo</label>
                        <input type="text" name="photo" id="photo" placeholder="Enter photo URL" className="w-full ps-3 py-1 rounded-md" />
                    </div>
                    <button type="submit" className="w-full text-center bg-[#d2b48c] py-1 rounded-lg font-bold outline outline-1 hover:outline-[#d2b48c] hover:bg-white hover:text-[#765c3a]">Add Coffee</button>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;