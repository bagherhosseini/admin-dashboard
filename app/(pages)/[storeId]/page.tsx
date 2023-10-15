
import React from 'react'
import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { UrlButton } from '@/components/urlButton';
import toast, { Toaster } from 'react-hot-toast';


const Page = async ({
  
    params
}: {
    params: { storeId: string }
}) => {

  return (
    <div className="p-8">
      <div className="mb-8">
        <Heading title={"APIs(14)"} description='API links for each endpoint.' />
      </div>
      <div className="border-solid border-2 border-sky-500 my-2">
        <h2 className="text-center my-2">Billboard</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getBillboard</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getBillboard`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addBillboard</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addBillboard`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteBillboard</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/deleteBillboard`}></UrlButton></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Category</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getCategories</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getCategories`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addCategory</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addCategory`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteCategory</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/deleteCategory`}></UrlButton></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Size</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getSizes</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getSizes`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addSizes</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addSizes`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteSize</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/deleteSize`}></UrlButton></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Order</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/order</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/order`}></UrlButton></div>
          </AlertDescription>
        </Alert>
    </div>
    <div className="border-solid border-2 border-sky-500 my-6">
        <h2 className="text-center my-2">Product</h2>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getProduct</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getProduct`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>GET</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/getProductById</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getProductById`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>DELETE</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/deleteProduct</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/deleteProduct`}></UrlButton></div>
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>POST</AlertTitle>
          <AlertDescription>
              <div className="justify-between flex items-center"><code>https://admin-dashboard-kappa-one.vercel.app/api/{params.storeId}/addProduct</code><UrlButton url={`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addProduct`}></UrlButton></div>
          </AlertDescription>
        </Alert>
    </div>
      <Toaster />
    </div>
  )
}

export default Page;
