import React from 'react'

const Page = async ({
    params
}: {
    params: { storeId: string }
}) => {
  return (
    <div>{params.storeId}</div>
  )
}


export default Page;