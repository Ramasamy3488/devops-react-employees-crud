import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

function EditEmployee() {
  const { id } = useParams();
  return <EmployeeForm empId={id} title="Edit Employee" />;
}

export default EditEmployee;