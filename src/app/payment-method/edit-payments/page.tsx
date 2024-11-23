import React from 'react'

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6">
                <div className="mb-4"><label className="form-label">Product Name</label> <input type="text" className="form-control"
                  placeholder="Enter Product Name" /></div>
                <div className="mb-4"><label className="form-label">Product Description</label> <input type="text"
                  className="form-control" placeholder="Enter Product Description" /></div>
                <div className="mb-4"><label className="form-label">Category</label> <input type="text" className="form-control"
                  placeholder="Enter Product Category" /></div>
                <div className="mb-4"><label className="form-label">Price</label> <select className="form-select">
                  <option>$ 100</option>
                  <option>$ 200</option>
                  <option>$ 300</option>
                  <option>$ 400</option>
                  <option>$ 500</option>
                </select></div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="mb-4"><label className="form-label">Qty</label> <select className="form-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select></div>
                <div className="mb-4"><label className="form-label">Status</label> <select className="form-select">
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select></div>
                <div className="mb-4">
                  <p className="mb-3"><span className="text-danger">*</span> Recommended resolution is 640*640 with file size</p>
                  <label className="btn btn-outline-secondary" htmlFor="flupld"><i className="ti ti-upload me-2"></i> Click to
                    Upload</label> <input type="file" id="flupld" className="hidden" />
                </div>
                <div className="text-end btn-page mt-4"><button className="btn btn-outline-secondary">Cancel</button> <button
                  className="btn btn-primary">Add new Product</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
