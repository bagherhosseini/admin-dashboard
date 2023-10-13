
import React from 'react'
import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Page = async ({
  
    params
}: {
    params: { storeId: string }
}) => {
  return (
    <div>
      <h1 className="text-center m-2">The APIs functionality.</h1>
      <div className="border-solid border-2 border-sky-500 my-2">
        <h2 className="text-center my-2">Billboard</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getBillboard</code></div>
          </AlertDescription>
        </Alert>
        
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addBillboard</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteBillboard</code></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Category</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getCategories</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addCategory</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteCategory</code></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Size</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getSizes</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addSizes</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteSize</code></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Order</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/order</code></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Product</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getProduct</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getProductById</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteProduct</code></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addProduct</code></div>
          </AlertDescription>
        </Alert>
    </div>
    </div>
  )
}

export default Page;
