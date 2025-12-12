import ExamsComponent from "../_components/exams-component";

export default function Exams() {
  return (
    <div className="bg-white flex flex-col gap-4 p-6 h-full">
      <ExamsComponent />
      <p className="font-geist text-gray-600 text-center w-full py-7">
        End of list
      </p>
    </div>
  );
}
