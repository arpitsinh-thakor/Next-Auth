
const ProfileID = ({params}: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <h2>{params.id}</h2>
    </div>
  )
}

export default ProfileID