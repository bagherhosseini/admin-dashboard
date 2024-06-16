
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
      <div className="my-2 flex gap-2 flex-col">
        <h2 className="my-2 text-xl">Billboard</h2>
        <div className='flex gap-2 flex-col'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>GET</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/getBillboard</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getBillboard`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>POST</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/addBillboard</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/addBillboard`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>DELETE</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/deleteBillboard</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/deleteBillboard`}></UrlButton></div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="my-2 flex gap-2 flex-col">
        <h2 className="my-2 text-xl">Category</h2>
        <div className='flex gap-2 flex-col'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>GET</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/getCategories</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getCategories`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>POST</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/addCategory</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/addCategory`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>DELETE</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/deleteCategory</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/deleteCategory`}></UrlButton></div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="my-2 flex gap-2 flex-col">
        <h2 className="my-2 text-xl">Size</h2>
        <div className='flex gap-2 flex-col'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>GET</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/getSizes</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getSizes`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>POST</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/addSizes</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/addSizes`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>DELETE</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/deleteSize</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/deleteSize`}></UrlButton></div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="my-2 flex gap-2 flex-col">
        <h2 className="my-2 text-xl">Order</h2>
        <div className='flex gap-2 flex-col'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>GET</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/order</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/order`}></UrlButton></div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="my-2 flex gap-2 flex-col">
        <h2 className="my-2 text-xl">Product</h2>
        <div className='flex gap-2 flex-col'>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>GET</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/getProduct</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getProduct`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>POST</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/getProductById</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getProductById`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>DELETE</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/deleteProduct</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/deleteProduct`}></UrlButton></div>
            </AlertDescription>
          </Alert>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>POST</AlertTitle>
            <AlertDescription>
              <div className="justify-between flex items-center"><code>{process.env.NEXT_PUBLIC_API_BASE_URL}/api/{params.storeId}/addProduct</code><UrlButton url={`{process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/addProduct`}></UrlButton></div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Page;
