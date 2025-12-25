import {
	DollarSignIcon,
	ImageIcon,
	Package2Icon,
	PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
	const { addProduct, formData, setFormData, loading } = useProductStore();
	return (
		<dialog
			id='add-product-modal'
			className='modal'>
			<div className='modal-box'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					formMethod='dialog'>
					X
				</button>
				<h3 className='font-bold text-xl mb-8'>Add New Product</h3>
				{/* Form fields for adding a product would go here */}

				<form
					onSubmit={addProduct}
					className='space-y-6'>
					<div className='grid gap-6'>
						{/* PRODUCT TITLE INPUT */}
						<div className='form-control'>
							<label className='label'>
								<span className='label-text text-base font-medium'>
									Product Name
								</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
									<Package2Icon className='size-5' />
								</div>
								<input
									type='text'
									placeholder='Enter product name'
									className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
									value={formData.title ?? ''}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
								/>
							</div>
						</div>

						{/* Product Description Input */}
						<div className='form-control mt-4'>
							<label className='label'>
								<span className='label-text text-base font-medium'>
									Product Description
								</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
									<Package2Icon className='size-5' />
								</div>
								<textarea
									className='input input-bordered w-full min-h-[100px] pl-10 py-3 focus:input-primary transition-colors duration-200'
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
								/>
							</div>
						</div>

						{/* PRODUCT PRICE INPUT */}
						<div className='form-control'>
							<label className='label'>
								<span className='label-text text-base font-medium'>Price</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
									<DollarSignIcon className='size-5' />
								</div>
								<input
									type='number'
									min='0'
									step='0.01'
									placeholder='0.00'
									className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
									value={formData.price}
									onChange={(e) =>
										setFormData({ ...formData, price: e.target.value })
									}
								/>
							</div>
						</div>

						{/* PRODUCT IMAGE */}
						<div className='form-control'>
							<label className='label'>
								<span className='label-text text-base font-medium'>
									Image URL
								</span>
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50'>
									<ImageIcon className='size-5' />
								</div>
								<input
									type='text'
									placeholder='https://example.com/image.jpg'
									className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200'
									value={formData.image}
									onChange={(e) =>
										setFormData({ ...formData, image: e.target.value })
									}
								/>
							</div>
						</div>
					</div>

					{/* ACTION BUTTONS */}
					<div className='modal-action'>
						<button
							className='btn btn-ghost'
							type='button'
							formMethod='dialog'>
							Cancel
						</button>
						<button
							type='submit'
							className='btn btn-primary min-w-[120px]'
							disabled={
								!formData.title || !formData.price || !formData.image || loading
							}>
							{loading ? (
								<span className='loading loading-spinner loading-sm' />
							) : (
								<>
									<PlusCircleIcon className='size-5 mr-2' />
									Add Product
								</>
							)}
						</button>
					</div>
				</form>
			</div>

			<form
				method='dialog'
				className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};
export default AddProductModal;
