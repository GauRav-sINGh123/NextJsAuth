'use client' 

function page({params}:any) {
 
  return (
    <div className="h-screen flex items-center justify-center bg-black">
        <div className="p-10 bg-white rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold tex-white">Profile</h2>
            <p className="text-black">{params.id}</p>
        </div>
    </div>
  )
}

export default page