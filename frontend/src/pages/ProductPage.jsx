import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

const ProductPage = () => {
	const {
		currentProduct,
		fetchProduct,
		updateProduct,
		deleteProduct,
		loading,
		formData,
		setFormData,
		resetFormData,
		error,
	} = useProductStore();

	const navigate = useNavigate();
	const { id } = useParams();

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this product?")) {
			return;
		}
		await deleteProduct(id);
		resetFormData();
		navigate("/");
	};

	useEffect(() => {
		fetchProduct(id);
	}, [id, fetchProduct]);

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='loading loading-spinner loading-lg' />
			</div>
		);
	}

	if (error) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='alert alert-error'>{error}</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-8 max-w-4xl'>
			<button
				className='btn btn-ghost mb-6'
				onClick={() => navigate("/")}>
				<ArrowLeftIcon className='size-4 mr-2' />
				Back to Products
			</button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='rounded-lg overflow-hidden shadow-lg bg-base-100'>
					<img
						src={currentProduct?.image}
						alt={currentProduct?.title}
						className='size-full object-cover'
					/>
				</div>

				<div className='card bg-base-100 shadow-lg'>
					<div className='card-body'>
						<h2 className='card-title text-2xl mb-6'>Edit Product</h2>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								updateProduct(id);
							}}
							className='space-y-6'>
							{/* Product Title Input */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text text-base font-medium'>
										Product Name
									</span>
								</label>
								<input
									type='text'
									placeholder='Enter product title'
									className='input input-bordered w-full'
									value={formData?.title ?? ""}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
								/>
							</div>

							{/* Product Description Input */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text text-base font-medium'>
										Product Description
									</span>
								</label>
								<textarea
									className='input input-bordered w-full min-h-[100px]'
									placeholder='Enter product description'
									value={formData?.description ?? ""}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
								/>
							</div>

							{/* Product Price Input */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text text-base font-medium'>
										Price
									</span>
								</label>
								<input
									type='number'
									placeholder='Enter product price'
									className='input input-bordered w-full'
									value={formData?.price ?? ""}
									onChange={(e) =>
										setFormData({ ...formData, price: e.target.value })
									}
								/>
							</div>

							{/* Product Image Input */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text text-base font-medium'>
										Image URL
									</span>
								</label>
								<input
									type='text'
									placeholder='Enter image URL'
									className='input input-bordered w-full'
									value={formData?.image ?? ""}
									onChange={(e) =>
										setFormData({ ...formData, image: e.target.value })
									}
								/>
							</div>

							{/* form actions */}
							<div className='flex justify-between mt-8'>
								<button
									type='button'
									onClick={handleDelete}
									className='btn btn-error'>
									<Trash2Icon className='size-4 mr-2' />
									Delete Product
								</button>

								<button
									type='submit'
									className='btn btn-primary'
									disabled={
										loading ||
										!formData.title ||
										!formData.price ||
										!formData.image ||
										!formData.description
									}>
									{loading ? (
										<span className='loading loading-spinner loading-sm' />
									) : (
										<>
											<SaveIcon className='size-4 mr-2' />
											Save Changes
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductPage;
