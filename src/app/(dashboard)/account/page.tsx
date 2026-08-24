import ProfileForm from "./_components/account-settings/profile-form";

export default async function Account() {
  return (
    <div className="flex ">
      <div className=" w-full">
        {/* Form */}
        <ProfileForm />
        
      </div>
    </div>
  );
}
